const moment = require('moment');
const parsers = require('../../utils/parsers');
const { AirParsingError } = require('./AirErrors');

function ProviderSegmentOrderReducer(acc, { ProviderSegmentOrder }) {
  const x = parseInt(ProviderSegmentOrder, 10);
  if (x > acc) {
    return x;
  }
  return acc;
}

/**
 * getBaggage -- get baggage information from LFS search
 * @param baggageAllowance
 * @returns {{amount: number, units: string}}
 */
function getBaggage(baggageAllowance) {
  // Checking for allowance
  if (
    !baggageAllowance
    || (
      !baggageAllowance['air:NumberOfPieces']
      && !baggageAllowance['air:MaxWeight']
    )
  ) {
    console.warn('Baggage information is not number and is not weight!', JSON.stringify(baggageAllowance));
    return { units: 'piece', amount: 0 };
  }
  // Checking for max weight
  if (baggageAllowance['air:MaxWeight']) {
    return {
      units: baggageAllowance['air:MaxWeight'].Unit.toLowerCase(),
      amount: Number(baggageAllowance['air:MaxWeight'].Value),
    };
  }
  // Returning pieces
  return {
    units: 'piece',
    amount: Number(baggageAllowance['air:NumberOfPieces']),
  };
}

/**
 * getBaggageInfo -- get baggage information from airPrice
 * @param info
 * @returns {{amount: number, units: string}}
 */
function getBaggageInfo(info) {
  // Checking for allowance
  let baggageInfo = { units: 'piece', amount: 0 };

  if (typeof info === 'undefined' || info == null) {
    return baggageInfo;
  }

  if (Object.prototype.hasOwnProperty.call(info, 'air:BagDetails')) {
    baggageInfo.detail = info['air:BagDetails'].map((detail) => {
      return {
        applicableBags: detail.ApplicableBags,
        basePrice: detail.BasePrice,
        totalPrice: detail.TotalPrice,
        approximateBasePrice: detail.ApproximateBasePrice,
        approximateTotalPrice: detail.ApproximateTotalPrice,
        restrictionText: detail['air:BaggageRestriction']['air:TextInfo'],
      };
    });
  }

  if (Object.prototype.hasOwnProperty.call(info, 'air:TextInfo')) {
    const match = info['air:TextInfo'][0].match(/^(\d+)([KP]+)$/);

    if (match) {
      if (match[2] === 'P') {
        baggageInfo = Object.assign(baggageInfo, { units: 'piece', amount: match[1] });
      } else if (match[2] === 'K') {
        baggageInfo = Object.assign(baggageInfo, { units: 'kilograms', amount: match[1] });
      }
    } else {
      console.warn('Baggage information is not number and is not weight!', JSON.stringify(info));
    }
  } else {
    console.warn('Unknown', JSON.stringify(info));
  }

  return baggageInfo;
}

function formatSegment(segment) {
  const seg = {
    from: segment.Origin,
    to: segment.Destination,
    group: Number(segment.Group),
    departure: segment.DepartureTime,
    arrival: segment.ArrivalTime,
    airline: segment.Carrier,
    flightNumber: segment.FlightNumber,
    flightTime: segment.FlightTime,
    distance: segment.Distance,
    availabilitySource: segment.AvailabilitySource,
    availabilityDisplayType: segment.AvailabilityDisplayType,
    optionalServicesIndicator: segment.OptionalServicesIndicator,
    participantLevel: segment.ParticipantLevel,
    uapi_segment_ref: segment.Key,
    uapiSegmentReference: segment.Key,
  };

  if (segment['air:FlightDetails']) {
    Object.assign(seg, {
      details: Object.keys(segment['air:FlightDetails'])
        .map((flightKey) => {
          const detail = segment['air:FlightDetails'][flightKey];

          return {
            origin: detail.Origin,
            originTerminal: detail.OriginTerminal,
            destination: detail.Destination,
            destinationTerminal: detail.DestinationTerminal,
            departure: detail.DepartureTime,
            flightTime: detail.FlightTime,
            travelTime: detail.TravelTime,
            equipment: detail.Equipment,
            stat: detail.ElStat
          };
        })
    });
  }

  return seg;
}

function formatServiceSegment(segment, remark) {
  return {
    ...parsers.serviceSegment(remark['passive:Text']),
    carrier: segment.SupplierCode,
    airport: segment.Origin,
    date: segment.StartDate,
    index: segment.index,
  };
}

function formatPrices(prices) {
  return {
    basePrice: prices.BasePrice,
    taxes: prices.Taxes,
    equivalentBasePrice: prices.EquivalentBasePrice,
    totalPrice: prices.TotalPrice,
  };
}


function formatTrip(segment, flightDetails) {
  const flightInfo = flightDetails
    ? Object.keys(flightDetails).map(
      detailsKey => flightDetails[detailsKey]
    )
    : [];
  const plane = flightInfo.map(details => details.Equipment || 'Unknown');
  const duration = flightInfo.map(details => details.FlightTime || 0);
  const techStops = flightInfo.slice(1).map(details => details.Origin);

  segment['air:FlightDetails'] = flightInfo;

  return {
    ...formatSegment(segment),
    serviceClass: segment.CabinClass,
    plane,
    duration,
    techStops,
  };
}

function formatAirExchangeBundle(bundle) {
  return {
    addCollection: bundle.AddCollection,
    changeFee: bundle.ChangeFee,
    exchangeAmount: bundle.ExchangeAmount,
    refund: bundle.Refund,
  };
}

function formatPassengerCategories(pricingInfo) {
  const passengerCategories = {};
  const passengerCounts = {};

  function extractNumericValue(value) {
    return parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
  }

  function extractCurrency(value) {
    const match = value.match(/[A-Z]+/);
    return match ? match[0] : '';
  }

  Object.keys(pricingInfo).forEach(key => {
    const passengerFare = pricingInfo[key];
    const codes = Array.isArray(passengerFare['air:PassengerType'])
      ? passengerFare['air:PassengerType']
      : [passengerFare['air:PassengerType']];

    const totalCurrency = extractCurrency(passengerFare.TotalPrice);
    const baseCurrency = extractCurrency(passengerFare.BasePrice);
    const equivalentCurrency = passengerFare.EquivalentBasePrice ? extractCurrency(passengerFare.EquivalentBasePrice) : '';
    const taxesCurrency = extractCurrency(passengerFare.Taxes);

    codes.forEach(code => {
      const passengerType = typeof code === 'object' && code.Code ? code.Code : code;

      if (['ADT', 'CNN', 'INF'].includes(passengerType)) {
        // Initialize currency entries if not yet set
        if (!passengerCategories[passengerType]) {
          passengerCategories[passengerType] = {
            totalPrice: {},
            basePrice: {},
            equivalentBasePrice: {},
            taxes: {},
          };
        }

        // Initialize currency entries if not yet set
        if (!passengerCategories[passengerType].totalPrice[totalCurrency]) {
          passengerCategories[passengerType].totalPrice[totalCurrency] = 0;
        }
        if (!passengerCategories[passengerType].basePrice[baseCurrency]) {
          passengerCategories[passengerType].basePrice[baseCurrency] = 0;
        }
        if (equivalentCurrency && !passengerCategories[passengerType].equivalentBasePrice[equivalentCurrency]) {
          passengerCategories[passengerType].equivalentBasePrice[equivalentCurrency] = 0;
        }
        if (!passengerCategories[passengerType].taxes[taxesCurrency]) {
          passengerCategories[passengerType].taxes[taxesCurrency] = 0;
        }

        // Accumulate fares by currency
        passengerCategories[passengerType].totalPrice[totalCurrency] += extractNumericValue(passengerFare.TotalPrice);
        passengerCategories[passengerType].basePrice[baseCurrency] += extractNumericValue(passengerFare.BasePrice);
        if (equivalentCurrency) {
          passengerCategories[passengerType].equivalentBasePrice[equivalentCurrency] += extractNumericValue(passengerFare.EquivalentBasePrice);
        }
        passengerCategories[passengerType].taxes[taxesCurrency] += extractNumericValue(passengerFare.Taxes);

        // Update passengerCounts
        if (!passengerCounts[passengerType]) {
          passengerCounts[passengerType] = 0;
        }
        passengerCounts[passengerType] += 1;
      } else {
        console.warn(`Unexpected passenger type: ${passengerType}`);
      }
    });
  });

  // Format final fare info
  const passengerFares = Object.keys(passengerCategories).reduce((memo, ptc) => {
    const category = passengerCategories[ptc];

    const totalCurrency = Object.keys(category.totalPrice)[0] || '';
    const baseCurrency = Object.keys(category.basePrice)[0] || '';
    const equivalentCurrency = Object.keys(category.equivalentBasePrice)[0] || '';
    const taxesCurrency = Object.keys(category.taxes)[0] || '';

    if (totalCurrency && baseCurrency && taxesCurrency) {
      memo[ptc] = {
        totalPrice: `${totalCurrency}${category.totalPrice[totalCurrency].toFixed(2)}`,
        basePrice: `${baseCurrency}${category.basePrice[baseCurrency].toFixed(2)}`,
        equivalentBasePrice: equivalentCurrency ? `${equivalentCurrency}${category.equivalentBasePrice[equivalentCurrency].toFixed(2)}` : 'N/A',
        taxes: `${taxesCurrency}${category.taxes[taxesCurrency].toFixed(2)}`,
      };
    }

    return memo;
  }, {});

  return {
    passengerCounts,
    passengerCategories,
    passengerFares,
  };
}

function formatFarePricingInfo(fare) {
  const changePenalty = {};
  const cancelPenalty = {};

  if (Object.prototype.hasOwnProperty.call(fare, 'air:ChangePenalty')) {
    const fareChangePenalty = fare['air:ChangePenalty'];

    if (typeof fareChangePenalty['air:Amount'] !== 'undefined') {
      changePenalty.amount = fareChangePenalty['air:Amount'];
    }
    if (typeof fareChangePenalty['air:Percentage'] !== 'undefined') {
      changePenalty.percentage = fareChangePenalty['air:Percentage'];
    }
    if (typeof fareChangePenalty.PenaltyApplies !== 'undefined') {
      changePenalty.penaltyApplies = fareChangePenalty.PenaltyApplies;
    }
  }

  if (Object.prototype.hasOwnProperty.call(fare, 'air:CancelPenalty')) {
    const fareCancelPenalty = fare['air:CancelPenalty'];

    if (typeof fareCancelPenalty['air:Amount'] !== 'undefined') {
      cancelPenalty.amount = fareCancelPenalty['air:Amount'];
    }
    if (typeof fareCancelPenalty['air:Percentage'] !== 'undefined') {
      cancelPenalty.percentage = fareCancelPenalty['air:Percentage'];
    }
    if (typeof fareCancelPenalty.PenaltyApplies !== 'undefined') {
      cancelPenalty.penaltyApplies = fareCancelPenalty.PenaltyApplies;
    }
    if (typeof fareCancelPenalty.NoShow !== 'undefined') {
      cancelPenalty.noShow = fareCancelPenalty.NoShow;
    }
  }

  let refundable = false;

  if (Object.prototype.hasOwnProperty.call(fare, 'Refundable')) {
    refundable = fare.Refundable;
  }

  let latestTicketingTime = null;

  if (Object.prototype.hasOwnProperty.call(fare, 'LatestTicketingTime')) {
    latestTicketingTime = fare.LatestTicketingTime;
  }

  let eTicketability = false;

  if (Object.prototype.hasOwnProperty.call(fare, 'ETicketability')) {
    // eslint-disable-next-line prefer-destructuring
    eTicketability = fare.ETicketability;
  }

  return {
    latestTicketingTime,
    eTicketability,
    refundable,
    changePenalty,
    cancelPenalty,
  };
}

function formatLowFaresSearch(searchRequest, searchResult) {
  const pricesList = searchResult['air:AirPricePointList'];
  const solutionsList = searchResult['air:AirPricingSolution'];
  const fareInfos = searchResult['air:FareInfoList'];
  const segments = searchResult['air:AirSegmentList'];
  const flightDetails = searchResult['air:FlightDetailsList'];
  const { provider } = searchRequest;

  // const legs = _.first(_.toArray(searchResult['air:RouteList']))['air:Leg'];

  // TODO filter pricesList by CompleteItinerary=true & ETicketability = Yes, etc

  const fares = [];

  const isSolutionResult = typeof solutionsList !== 'undefined';

  const results = isSolutionResult ? solutionsList : pricesList;

  Object.entries(results).forEach(([fareKey, price]) => {
    const [firstKey] = Object.keys(price['air:AirPricingInfo']);
    const thisFare = price['air:AirPricingInfo'][firstKey]; // get trips from first reservation
    if (!thisFare.PlatingCarrier) {
      return;
    }

    let directions = [];
    if (isSolutionResult) {
      if (Object.prototype.toString.call(price['air:Journey']) === '[object Object]') {
        price['air:Journey'] = [price['air:Journey']];
      }

      directions = price['air:Journey'].map((leg) => {
        const trips = leg['air:AirSegmentRef'].map((segmentRef) => {
          const segment = segments[segmentRef];

          const tripFlightDetails = segment['air:FlightDetailsRef'].map(flightDetailsRef => flightDetails[flightDetailsRef]);

          const [bookingInfo] = thisFare['air:BookingInfo'].filter(info => info.SegmentRef === segmentRef);
          const fareInfo = fareInfos[bookingInfo.FareInfoRef];

          const seatsAvailable = Number(bookingInfo.BookingCount);

          return Object.assign(
            formatTrip(segment, tripFlightDetails),
            {
              serviceClass: bookingInfo.CabinClass,
              bookingClass: bookingInfo.BookingCode,
              baggage: [getBaggage(fareInfo['air:BaggageAllowance'])],
              fareBasisCode: fareInfo.FareBasis,
            },
            seatsAvailable ? { seatsAvailable } : null
          );
        });

        return [{
          from: trips[0].from,
          to: trips[trips.length - 1].to,
          duration: leg.TravelTime,
          // TODO get overnight stops, etc from connection
          platingCarrier: thisFare.PlatingCarrier,
          segments: trips,
        }];
      });
    } else {
      directions = thisFare['air:FlightOptionsList'].map(direction => Object.values(direction['air:Option']).map((option) => {
        const trips = option['air:BookingInfo'].map(
          (segmentInfo) => {
            const fareInfo = fareInfos[segmentInfo.FareInfoRef];
            const segment = segments[segmentInfo.SegmentRef];
            const tripFlightDetails = segment['air:FlightDetailsRef'].map(
              flightDetailsRef => flightDetails[flightDetailsRef]
            );
            const seatsAvailable = (
              segment['air:AirAvailInfo']
              && segment['air:AirAvailInfo'].ProviderCode === provider)
              ? (Number(
                segment['air:AirAvailInfo']['air:BookingCodeInfo'].BookingCounts
                  .match(new RegExp(`${segmentInfo.BookingCode}(\\d+)`))[1]
              ))
              : null;
            return Object.assign(
              formatTrip(segment, tripFlightDetails),
              {
                serviceClass: segmentInfo.CabinClass,
                bookingClass: segmentInfo.BookingCode,
                baggage: [getBaggage(fareInfo['air:BaggageAllowance'])],
                fareBasisCode: fareInfo.FareBasis,
              },
              seatsAvailable ? { seatsAvailable } : null
            );
          }
        );

        return {
          from: direction.Origin,
          to: direction.Destination,
          // duration
          // TODO get overnight stops, etc from connection
          platingCarrier: thisFare.PlatingCarrier,
          segments: trips,
        };
      }));
    }

    const { passengerCounts, passengerFares } = this.formatPassengerCategories(price['air:AirPricingInfo']);

    const result = {
      totalPrice: price.TotalPrice,
      basePrice: price.BasePrice,
      taxes: price.Taxes,
      platingCarrier: thisFare.PlatingCarrier,
      directions,
      bookingComponents: [
        {
          totalPrice: price.TotalPrice,
          basePrice: price.BasePrice,
          taxes: price.Taxes,
          uapi_fare_reference: fareKey, // TODO
        },
      ],
      passengerFares,
      passengerCounts,
    };

    fares.push(result);
  });

  fares.sort((a, b) => parseFloat(a.totalPrice.substr(3)) - parseFloat(b.totalPrice.substr(3)));

  if (searchRequest.faresOnly === false) {
    const result = {
      fares
    };
    if ({}.hasOwnProperty.call(searchResult, 'TransactionId')) {
      result.transactionId = searchResult.TransactionId;
    }
    if ({}.hasOwnProperty.call(searchResult, 'SearchId')) {
      result.searchId = searchResult.SearchId;
    }
    if ({}.hasOwnProperty.call(searchResult, 'air:AsyncProviderSpecificResponse')) {
      result.hasMoreResults = searchResult['air:AsyncProviderSpecificResponse'].MoreResults;
      result.providerCode = searchResult['air:AsyncProviderSpecificResponse'].ProviderCode;
    }
    return result;
  }
  return fares;
}

/**
 * This function used to transform segments and service segments objects
 * to arrays. After that this function try to set indexes with same as in
 * terminal response order. So it needs to check `ProviderSegmentOrder` field for that.
 *
 * @param segmentsObject
 * @param serviceSegmentsObject
 * @return {*}
 */
function setIndexesForSegments(
  segmentsObject = null,
  serviceSegmentsObject = null
) {
  const segments = segmentsObject
    ? Object.keys(segmentsObject).map(k => segmentsObject[k])
    : null;

  const serviceSegments = serviceSegmentsObject
    ? Object.keys(serviceSegmentsObject).map(k => serviceSegmentsObject[k])
    : null;

  if (segments === null && serviceSegments === null) {
    return { segments, serviceSegments };
  }

  if (segments !== null && serviceSegments === null) {
    const segmentsNew = segments.map((segment, key) => ({
      ...segment,
      index: key + 1,
    }));
    return { segments: segmentsNew, serviceSegments };
  }

  if (segments === null && serviceSegments !== null) {
    const serviceSegmentsNew = serviceSegments.map(
      (segment, key) => ({
        ...segment,
        index: key + 1,
      })
    );
    return { segments, serviceSegments: serviceSegmentsNew };
  }

  const maxSegmentsSegmentOrder = segments.reduce(ProviderSegmentOrderReducer, 0);
  const maxServiceSegmentsSegmentOrder = serviceSegments.reduce(ProviderSegmentOrderReducer, 0);

  const maxOrder = Math.max(
    maxSegmentsSegmentOrder,
    maxServiceSegmentsSegmentOrder
  );

  const allSegments = [];

  for (let i = 1; i <= maxOrder; i += 1) {
    segments.forEach(s => (Number(s.ProviderSegmentOrder) === i ? allSegments.push(s) : null));
    serviceSegments.forEach(s => (
      Number(s.ProviderSegmentOrder) === i ? allSegments.push(s) : null
    ));
  }

  const indexedSegments = allSegments.map((s, k) => ({ ...s, index: k + 1 }));

  return {
    segments: indexedSegments.filter(s => s.SegmentType === undefined),
    serviceSegments: indexedSegments.filter(s => s.SegmentType === 'Service'),
  };
}

function buildPassenger(name, traveler) {
  return Object.assign(
    {
      lastName: name.Last,
      firstName: name.First,
      uapi_passenger_ref: traveler.Key,
    },
    traveler.DOB ? {
      birthDate: moment(traveler.DOB).format('YYYY-MM-DD'),
    } : null,
    traveler.TravelerType ? {
      ageCategory: traveler.TravelerType,
    } : null,
    traveler.Gender ? {
      gender: traveler.Gender,
    } : null
  );
}

/**
 * This function adds segment references based on group parameter.
 * @param segments - required
 * @return [{*}]
 */
function setReferencesForSegments(segments) {
  return segments.map((segment, idx) => {
    const currentGroup = segment.group;
    const nextSegment = segments[idx + 1] || {};
    const nextGroup = nextSegment.group;
    const nextSegmentReference = currentGroup === nextGroup
      ? nextSegment.uapiSegmentReference
      : null;

    return {
      ...segment,
      nextSegmentReference,
    };
  });
}

module.exports = {
  formatLowFaresSearch,
  formatFarePricingInfo,
  formatPassengerCategories,
  formatTrip,
  formatSegment,
  formatServiceSegment,
  formatAirExchangeBundle,
  formatPrices,
  setIndexesForSegments,
  getBaggage,
  getBaggageInfo,
  buildPassenger,
  setReferencesForSegments
};

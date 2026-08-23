const aircodes = require('/static/utils/airport_codes.json')
export const state = () => ({
  userInfo: {},
  flightAllData: [],
  flightData: [],
  flightLoader: false,
  airports: aircodes,
  airportCodes: {},
  searchSummary: {
    priceRange: {},
    airlines: []
  },
  flightFilter: {
    airlines:[],
    priceRange:{},
    departureTime:{},
    arrivalTime:{},
    type:'cheap'
  },

  // Hotels
  hotelSearch: {
    // city:''
  },
  hotelPageSize: 12,
  hotelAllData: [],
  hotelLoader: false,
  hotelRoomSelect: [
    {
      person: {
        adt: 2,
        child: 0
      }
    }
  ],


  // Holiday
  holiday: {
    search: {},
    pageSize: 12,
    allData: [],
    loader: false,
  },

  // Holiday
  visa: {
    search: {},
    pageSize: 12,
    allData: [],
    loader: false,
  },


})


export const getters = {
  //search airport by country / city / code
  searchAirports(state) {
    return function (keyword = '', limit = 10) {
      const search = require('../api/search-json');
      let searchResult = [];
      let getResults = (result) => {
        // set data limit
        if (limit >= 0 && result.length > limit) {
          result.length = limit
        }
        searchResult = result;
      }
      if (keyword !== '') {
        search(keyword + "", state.airports, getResults, [])
      }
      return searchResult
    }

  },
  // get current empty room order by ASC
  getCurrentRoom(state) {
    let rooms = state.hotelRoomSelect;

    for (let roomIndex in rooms) {
      if (!rooms[roomIndex].room) {
        return roomIndex;
      }
    }
    return -1;
  },
  getTotalRoomPrice(state) {
    let regularPrice = 0;
    let discountPrice = 0;
    for (let room of state.hotelRoomSelect) {
      if (room.room) {
        regularPrice += parseFloat(room.room.price);
        discountPrice += parseFloat(room.room.discount_price);
      }
    }
    return {
      regularPrice,
      discountPrice
    }
  },
  //change 15
  cheapestPrice(state) {
    if (state.flightData.length === 0) return null;
  
    const commissionPercent = 7; // 7% commission
    const aitTax = 0.3; // 0.3% AIT tax
    
    // Find the minimum final price
    let minPriceFlight = state.flightData.reduce((minFlight, currentFlight) => {
      let price = currentFlight?.bookingComponents?.price?.totalPrice || '0';
      let taxes = currentFlight?.bookingComponents?.price?.taxes || '0';
  
      // Convert prices to numeric values
      let totalPriceNum = parseFloat(price.replace(/^\D+/g, ''));
      let taxesNum = parseFloat(taxes.replace(/^\D+/g, ''));
      let basePrice = totalPriceNum - taxesNum;
  
      // Calculate the commission
      let commissionAmount = basePrice * (commissionPercent / 100);
      let agentFare = basePrice - commissionAmount;
  
      // Calculate price with taxes and AIT tax
      let priceWithTaxes = agentFare + taxesNum;
      let aitTaxAmount = priceWithTaxes * (aitTax / 100);
      let finalPrice = priceWithTaxes + aitTaxAmount;
  
      // Return the minimum price
      if (!minFlight || finalPrice < minFlight.finalPrice) {
        return { finalPrice: parseFloat(finalPrice.toFixed(0)) };
      }
  
      return minFlight;
    }, null);
  
    return minPriceFlight ? minPriceFlight.finalPrice.toLocaleString('en-US') : null;
  },
  
  earliestFlight(state) {
    if (state.flightData.length === 0) return null;
    
    // Find the flight with the earliest departure time
    let earliestFlight = state.flightData.reduce((earliest, current) => {
      let earliestTime = new Date(earliest.directions[0].segments[0].departure);
      let currentTime = new Date(current.directions[0].segments[0].departure);
      return currentTime < earliestTime ? current : earliest;
    });

    return earliestFlight;
  },
  fastestFlight(state) {
    if (state.flightData.length === 0) return null;

    // Find the flight with the shortest total flight time
    let fastestFlight = state.flightData.reduce((fastest, current) => {
      let fastestTime = totalFlightTime(fastest.directions[0].segments);
      let currentTime = totalFlightTime(current.directions[0].segments);
      return currentTime < fastestTime ? current : fastest;
    });

    return fastestFlight;
  }
 //change end 15
}

export const mutations = {

  userInfo(state, payload) {
    state.userInfo = payload;
  },
  setAirportCodes(state, payload) {
    state.airportCodes = payload;
  },
  searchSummary(state, payload) {
    state.searchSummary = payload
  },
  flightAllData(state, payload) {
    state.flightAllData = payload;
    state.flightData = payload;
  },
  flightData(state, payload) {
    state.flightData = payload;
  },

  flightFilter(state, payload) {
    state.flightFilter = payload;
  },
  flightLoader(state, payload) {
    state.flightLoader = payload;
  },

  // hotels
  hotelSearch(state, payload) {
    state.hotelSearch = payload;
  },
  hotelLoader(state, payload) {
    state.hotelLoader = payload;
  },
  hotelAllData(state, payload) {
    state.hotelAllData = payload;
  },
  hotelRoomSelect(state, payload) {
    state.hotelRoomSelect = payload;
  },

  // Holiday
  holidaySearch(state, payload) {
    state.holiday.search = payload;
  },
  holidayLoader(state, payload) {
    state.holiday.loader = payload;
  },
  holidayAllData(state, payload) {
    state.holiday.allData = payload;
  },

  // Visa
  visaSearch(state, payload) {
    state.visa.search = payload;
  },
  visaLoader(state, payload) {
    state.visa.loader = payload;
  },
  visaAllData(state, payload) {
    state.visa.allData = payload;
  },



  increment(state) {
    state.counter++
  }
}

export const actions = {
  flightFilter({ commit, dispatch }, payload) {

    commit('flightFilter', payload);
    dispatch('flightDataFilter');
  },

  flightDataFilter({ state, commit }) {

    let filter = state.flightFilter;
    let data = state.flightAllData;
    const result = data.filter(item => {
      if (filter.priceRange.min) {
        let price = item?.bookingComponents?.price?.totalPrice || 0;
        let num = price.replace(/^\D+/g, '');
        num = parseFloat(num);
        return num >= filter.priceRange.min
      } else {
        return true;
      }
    }).filter(item => {
      if (filter.priceRange.max) {
        let price = item?.bookingComponents?.price?.totalPrice || 0;
        let num = price.replace(/^\D+/g, '');
        num = parseFloat(num);
        return num <= filter.priceRange.max
      } else {
        return true;
      }
    }).filter(item => {
      if (filter.departureTime.min) {
        let departure = item.directions[0].segments[0].departure || '';
        if (departure != '') {
          let format = 'HH:mm';
          let departureTime = this.$moment(departure).format(format);
          let time = this.$moment(departureTime, format);
          let beforeTime = this.$moment(filter.departureTime.min, format);
          let afterTime = this.$moment(filter.departureTime.max, format);

          if (time.isBetween(beforeTime, afterTime)) {
            return true;
          } else {
            return false;
          }

        }
      } else {
        return true;
      }

    }).filter(item => {
      if (filter.arrivalTime.min) {
        let arrival = item.directions[0].segments[item.directions[0].segments.length-1].arrival || '';
        if (arrival != '') {
          let format = 'HH:mm';
          let arrivalTime = this.$moment(arrival).format(format);
          let time = this.$moment(arrivalTime, format);
          let beforeTime = this.$moment(filter.arrivalTime.min, format);
          let afterTime = this.$moment(filter.arrivalTime.max, format);

          if (time.isBetween(beforeTime, afterTime)) {
            return true;
          } else {
            return false;
          }

        }
      } else {
        return true;
      }

    }).filter(item => {
      if (filter.airlines.length > 0) {
        let airline = item.directions[0]?.platingCarrier || '';
        return filter.airlines.includes(airline);
      } else {
        return true;
      }
    }).sort((a,b)=>{
      if(filter.type=='cheap'){
        let aPrice = a?.bookingComponents?.price?.totalPrice || 0;
        let aNum = aPrice.replace(/^\D+/g, '');
        aNum = parseFloat(aNum);
        let bPrice = b?.bookingComponents?.price?.totalPrice || 0;
        let bNum = bPrice.replace(/^\D+/g, '');
        bNum = parseFloat(bNum);
        return aNum-bNum;
      }else if(filter.type=='early'){
        let firstTime = a.directions[0].segments[0].departure || '';
        firstTime = new Date(firstTime);//.toUTCString();
        let secondTime = b.directions[0].segments[0].departure || '';
        secondTime = new Date(secondTime);//.toUTCString();
        return firstTime - secondTime;
      }else if(filter.type=='fast'){
        let firstFlightTime = totalFlightTime(a.directions[0].segments);
        let lastFlightTime = totalFlightTime(b.directions[0].segments);
        return firstFlightTime - lastFlightTime;
      }
    });

    commit('flightData', result)
  },
  
  async getHotels({ state, commit }, payload) {
    commit('hotelLoader', true);

    try {
      let url = `/hotel-search?page_size=${payload?.pageSize || state.hotelPageSize}&page=${payload?.page || 1}`
      let response = await this.$axios.post(url,state.hotelSearch);
      //let response = await this.$axios.post(url);
      console.log(response.data);
      commit('hotelAllData', response?.data);
      commit('hotelLoader', false);


    } catch (error) {
      console.log(error.response.data)
    }

  },

  async getHoliday({ state, commit }, payload) {
    commit('holidayLoader', true);

    try {
      let url = `/holiday-search?page_size=${payload?.pageSize || state.holiday.pageSize}&page=${payload?.page || 1}`
      let response = await this.$axios.post(url,state.holiday.search);
      //let response = await this.$axios.post(url);
      //console.log(response.data);
      commit('holidayAllData', response.data);
      commit('holidayLoader', false);


    } catch (error) {
      console.log(error.response.data)
    }

  },

  async getVisa({ state, commit }, payload) {
    commit('visaLoader', true);

    try {
      let url = `/visa-search`
      let response = await this.$axios.post(url, state.visa.search);
      commit('visaAllData', response?.data);
      commit('visaLoader', false);


    } catch (error) {
      //console.log(error.response?.config?.data)
      console.log(error.response)
    }

  },
  getLocalSelectedHotelRoom({ commit }) {
    const jsonParse = require('/static/utils/jsonParse.js');
    let rooms = {};
    if (localStorage.getItem('hotelSelectedRoom')) {
      rooms = jsonParse(localStorage.getItem('hotelSelectedRoom'));
    }
    if (rooms.length > 0) {
      commit('hotelRoomSelect', rooms)
    }
  },
  async userInfo({ commit, dispatch }) {
    try {
      let response = await this.$axios.get('/user');
      commit('userInfo', response?.data);
    } catch (error) {
      console.log(error.response?.config?.data)
      console.log(error.response)
    }
  },


  async getFlights({ state }, flightData) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}

function totalFlightTime(segments) {
  let sLength = segments.length - 1;
  let firstTime = segments[0]?.departure;
  let lastTime = segments[sLength]?.arrival;
  firstTime = new Date(firstTime).toUTCString();
  lastTime = new Date(lastTime).toUTCString();

  const date1 = new Date(firstTime);
  const date2 = new Date(lastTime);

  const minutesDiff = date2 - date1;
  return minutesDiff;
}


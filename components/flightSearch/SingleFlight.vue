<template>
  <div class="flight-card mb-2 overflow-hidden">
    <div class="row g-4">
      <div class="col-lg-9 ps-0">
        <div class="left-inner ps-4 h-100">
          <div class="row g-4 pt-4 h-100 align-items-center">
            <div class="row pt-4" v-for="(data, directionIndex) of directions" :key="directionIndex">
              <div class="col-lg-5" v-if="data.segments[0]">
                <div class="airline-namepic">
                  <figure class="flight-thumb">
                    <img :src="airlineLogo(data.platingCarrier)" @error="imageUrlAlt" />
                  </figure>
                  <div class="name-box">
                    <span class="name">
                      {{ airlineName(data.platingCarrier + "") }}
                    </span>
                    <!-- <span class="pnr">Pnr: DOMFLY0808</span> -->
                  </div>
                </div>
              </div>
              <!-- flight duration  -->
              <div class="col-lg-7">
                <div class="flight-duration">
                  <div class="top-row">
                    <div class="left">
                      <span>
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1.25977 21.0069V18.6684H19.2598V21.0069H1.25977ZM3.10977 15.1607L0.259766 9.48993L1.80977 9.13916L3.55977 10.9515L8.35977 9.43147L4.30977 1.42224L6.25977 0.720703L13.1098 7.91147L18.1098 6.33301C18.6431 6.15763 19.1264 6.27455 19.5598 6.68378C19.9931 7.09301 20.2098 7.63865 20.2098 8.3207C20.2098 8.74942 20.0974 9.12942 19.8728 9.4607C19.6474 9.79198 19.3598 10.0161 19.0098 10.133L3.10977 15.1607Z"
                            fill="#4A5568" />
                        </svg>
                      </span>
                    </div>
                    <div class="middle">
                      <span class="stops" v-if="data.segments.length > 1">
                        {{ data.segments.length - 1 }} Stops
                      </span>
                      <span class="stops" v-else> Nonstop </span>
                    </div>
                    <div class="right">
                      <span>
                        <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M0.667969 22.9712V20.6328H18.668V22.9712H0.667969ZM16.518 17.0082L0.667969 11.8636V5.43278L2.16797 6.0174L2.86797 8.47278L7.66797 10.0512V0.755859L9.66797 1.34047L12.418 11.5712L17.418 13.2082C17.8013 13.3251 18.1056 13.5636 18.331 13.9237C18.5556 14.2846 18.668 14.6892 18.668 15.1374C18.668 15.7805 18.443 16.2969 17.993 16.6866C17.543 17.0764 17.0513 17.1836 16.518 17.0082Z"
                            fill="#4A5568" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div class="middle-row">
                    <div class="left">
                      <span class="location">
                        {{ data?.from }}
                      </span>
                    </div>
                    <div class="middle">
                      <div class="arrow-container">
                        <div class="arrow-line" v-if="data.segments.length > 1">
                          <div class="round" v-for="(
                                segment, segmentIndex
                              ) of data.segments.slice(1)" :key="segmentIndex" data-bs-toggle="tooltip"
                            data-bs-html="true" data-bs-placement="top"
                            :data-bs-title="[layoverAtStop(data.segments, segmentIndex + 1) + ' at ' + segment.from]">
                            <div class="content">
                              {{ segment.from }}
                            </div>
                          </div>
                        </div>
                        <div class="arrow-line" v-else></div>
                        <div class="arrow"></div>
                      </div>
                    </div>
                    <div class="right">
                      <span class="location"> {{ data?.to }} </span>
                    </div>
                  </div>

                  <div class="bottom-row">
                    <div class="left">
                      <span class="time">
                        {{
                          getTimeValue(data.segments[0]?.departure)
                        }}
                        <br />
                        <small class="small-text">
                          {{
                            getDateValue(data.segments[0]?.departure)
                          }}
                        </small>
                      </span>
                    </div>
                    <div class="middle">
                      <span class="stops">{{
                        totalFlightTime(data.segments)
                      }}</span>
                    </div>
                    <div class="right">
                      <span class="time">
                        {{
                          getTimeValue(
                            data.segments[data.segments.length - 1]?.arrival
                          )
                        }}
                        <br />
                        <small class="small-text">
                          {{
                            getDateValue(
                              data.segments[data.segments.length - 1]?.arrival
                            )
                          }}
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="buy-info">
          <div class="top">
            <span class="refand">Partially Refundable</span>
            <div class="price">
              <span class="old" v-if="totalPrice>tsDiscountPrice">{{ currency }} {{totalPrice.toLocaleString()}}</span>
              <span class="new">{{ currency }} {{ tsDiscountPrice.toLocaleString() }}</span>
            </div>
            <button class="buy-btn" @click="buyNow()">Buy Now</button>
          </div>
          <div class="bottom">
            <a href="#" class="flight-detail" data-bs-toggle="collapse" :data-bs-target="'#collapseExample' + index">
              <span class="text">Flight Detail</span>
              <span class="icon">
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.96419 10.6969L0.630859 5.36361L1.56419 4.41361L5.29753 8.14694V0.0302734H6.63086V8.14694L10.3642 
                                      4.41361L11.2975 5.36361L5.96419 10.6969Z" fill="#718096" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="collapse border-top" :id="'collapseExample' + index">
          <div class="collapsed-detail">
            <div class="collapsed-inner">
              <div class="row g-4">
                <!-- left side tabs -->
                <div class="col-lg-6 custom-border">
                  <!-- left tab buttons -->
                  <div class="left nav nav-tabs" id="myTab" role="tablist">
                    <button v-for="(data, directionIndex) of directions" :key="directionIndex"
                      :class="['nav-link', directionIndex == 0 && 'active']" id="home-tab" data-bs-toggle="tab"
                      :data-bs-target="'#details-tab-pane-' + index + directionIndex
                        " type="button" role="tab" aria-controls="home-tab-pane">
                      {{ data?.from }} - {{ data?.to }}
                    </button>
                  </div>

                  <div class="tab-content" id="myTabContent">
                    <div v-for="(data, directionIndex) of directions" :key="directionIndex" :class="[
                        'tab-pane fade show',
                        directionIndex == 0 && 'active',
                      ]" :id="'details-tab-pane-' + index + directionIndex" role="tabpanel" aria-labelledby="home-tab"
                      tabindex="0">
                      <!-- DAC-CTG TAB CLICK-->
                      <div class="left-tab-content" v-for="(segment, sIndex ) of data.segments" :key="sIndex">
                        <div v-if="sIndex > 0" class="change-text"> Change Plane at <span> {{ segment?.from }} | {{
                          layoverAtStop(data.segments, sIndex) }}</span></div>
                        <!-- airline namepic -->
                        <div class="airline-namepic">
                          <figure class="flight-thumb">
                            <img :src="airlineLogo(segment.airline)" @error="imageUrlAlt" />
                          </figure>
                          <div class="name-box">
                            <span class="name">
                              {{ airlineName(segment.airline + "") }}
                            </span>
                            <span class="pnr">Flight No : {{ segment.airline }}
                              {{ segment?.flightNumber }} |
                              {{ segment?.plane.join("-") }}
                            </span>
                          </div>
                        </div>

                        <!-- flight duration -->
                        <div class="row">
                          <div class="col-lg-10">
                            <!--  Flight duratio-->
                            <div class="flight-duration">
                              <div class="top-row">
                                <div class="left">
                                  <span>
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <path d="M1.25977 21.0069V18.6684H19.2598V21.0069H1.25977ZM3.10977 15.1607L0.259766 9.48993L1.80977 
                                                                      9.13916L3.55977 10.9515L8.35977 9.43147L4.30977 1.42224L6.25977 0.720703L13.1098 7.91147L18.1098 
                                                                      6.33301C18.6431 6.15763 19.1264 6.27455 19.5598 6.68378C19.9931 7.09301 20.2098 7.63865 20.2098 
                                                                      8.3207C20.2098 8.74942 20.0974 9.12942 19.8728 9.4607C19.6474 9.79198 19.3598 10.0161 19.0098 
                                                                      10.133L3.10977 15.1607Z" fill="#4A5568" />
                                    </svg>
                                  </span>
                                </div>
                                <div class="middle">
                                  <span class="stops">Nonstop</span>
                                </div>
                                <div class="right">
                                  <span>
                                    <svg width="19" height="23" viewBox="0 0 19 23" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <path
                                        d="M0.667969 22.9712V20.6328H18.668V22.9712H0.667969ZM16.518 17.0082L0.667969 11.8636V5.43278L2.16797 
                                                                      6.0174L2.86797 8.47278L7.66797 10.0512V0.755859L9.66797 1.34047L12.418 11.5712L17.418 13.2082C17.8013 13.3251 
                                                                      18.1056 13.5636 18.331 13.9237C18.5556 14.2846 18.668 14.6892 18.668 15.1374C18.668 15.7805 18.443 16.2969 
                                                                      17.993 16.6866C17.543 17.0764 17.0513 17.1836 16.518 17.0082Z"
                                        fill="#4A5568" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              <div class="middle-row">
                                <div class="left">
                                  <span class="location">
                                    {{ segment?.from }}
                                  </span>
                                </div>
                                <div class="middle">
                                  <div class="arrow-container">
                                    <div class="arrow-line"></div>
                                    <div class="arrow"></div>
                                  </div>
                                </div>
                                <div class="right">
                                  <span class="location">
                                    {{ segment?.to }}
                                  </span>
                                </div>
                              </div>

                              <div class="bottom-row">
                                <div class="left">
                                  <span class="time">
                                    {{
                                      getTimeValue(
                                        segment?.departure
                                      )
                                    }}
                                  </span>
                                </div>
                                <div class="middle">
                                  <span class="stops">{{
                                    flightTime(segment)
                                  }}</span>
                                </div>
                                <div class="right">
                                  <span class="time">
                                    {{
                                      getTimeValue(segment?.arrival)
                                    }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="bottom-row d-flex justify-content-between py-3">
                          <div class="left-text pe-5">
                            <span>
                              {{
                                airportName(segment?.from)
                              }}
                            </span>
                            <span>{{
                              getDateValue(segment?.departure)
                            }}</span>
                          </div>

                          <div class="right-text">
                            <span>
                              {{
                                airportName(segment?.to)
                              }}
                            </span>
                            <!-- <span>19th Oct 2022</span> -->
                            <span>{{
                              getDateValue(segment?.arrival)
                            }}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <!-- right side tabs -->
                <div class="col-lg-6">
                  <!-- left tab buttons -->
                  <div class="left nav nav-tabs" id="myTab" role="tablist">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab"
                      :data-bs-target="'#baggage-tab-pane' + index" type="button" role="tab"
                      aria-controls="home-tab-pane">
                      Baggage
                    </button>

                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab"
                      :data-bs-target="'#refand-tab-pane' + index" type="button" role="tab"
                      aria-controls="refand-tab-pane">
                      Refund Policy
                    </button>
                  </div>

                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" :id="'baggage-tab-pane' + index" role="tabpanel"
                      aria-labelledby="home-tab" tabindex="0">
                      <!-- bAGGAGE TAB CLICL-->
                      <div class="left-tab-content">
                        <div class="baggages">
                          <div class="baggage">
                            <span>Flight</span>
                            <!-- <span>Cabin</span> -->
                            <span>Check-in</span>
                          </div>
                          <div class="" v-for="(data, directionIndex) of directions" :key="directionIndex">
                            <div class="baggage" v-for="(segment, sIndex) of data.segments" :key="sIndex">
                              <span>{{ segment?.from }} - {{ segment?.to }}</span>
                              <!-- <span></span> -->
                              <span>{{ segment?.baggage[0]?.amount }}
                                {{ segment?.baggage[0]?.units }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" :id="'refand-tab-pane' + index" role="tabpanel"
                      aria-labelledby="profile-tab" tabindex="0">
                      <!-- REFAND POLICY TAB CLICK -->
                      <div class="left-tab-content">
                        <div class="refand-wrapper">
                          <div class="refand-box">
                            <div class="refand-box-header">
                              <h4>Cancellation</h4>
                            </div>
                            <div class="refand-box-body">
                              <p>
                                Refund Amount = Paid Amount - Airline's
                                Cancellation Fee
                              </p>
                            </div>
                          </div>

                          <div class="refand-box">
                            <div class="refand-box-header">
                              <h4>Re-issue</h4>
                            </div>
                            <div class="refand-box-body">
                              <p>
                                Re-issue Fee = Airline's Fee + Fare Difference
                              </p>
                            </div>
                          </div>
                          <p class="airline-fee">
                            *The airline's fee is indicative and per person.
                            Convenience fee is non-refundable.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleFlight",
  props: ["searchData", "index"],
  data(){
    return {
      domesticAirport: ["BZL", "CGP", "DAC", "ZYL", "JSR", "SPD", "CXB", "RJH"],
    }
  },
  mounted() {
    this.rawJs();
  },
  computed: {
    bookingComponents() {
      return this.searchData?.bookingComponents;
    },
    directions() {
      return this.searchData?.directions;
    },
    currency() {
      let price = this.searchData?.bookingComponents?.price?.totalPrice;
      let num = price.replace(/^\D+/g, "");
      let currency = price.replace(num, "");
      return currency;
    },
    platingCarrier(){
      if(this.searchData?.directions?.length > 0){
        return this.searchData?.directions[0]?.platingCarrier
      }
      return "";
    },
    totalPrice() {
      let price = this.price(
        this.searchData?.bookingComponents?.price?.totalPrice,
        "num"
      );
      if(this.noCommission){
        price = price + ((price / 100) * process.env.ait_tax);
      }
      return Math.round(price);
    },
    tsDiscountPrice() {
      let totalPrice = this.price(
        this.searchData?.bookingComponents?.price?.totalPrice,
        "num"
      );
      let tax = this.price(
        this.searchData?.bookingComponents?.price?.taxes,
        "num"
      );
      let basePrice = totalPrice - tax;
      // subtruct (7%) commission
      // if its have commission
      if(this.noCommission == false){
        basePrice = basePrice - ((basePrice / 100) * process.env.commission_percent);
      }
      let total = tax + basePrice;
      // add (0.3%) AIT tax
      total = total + ((total / 100) * process.env.ait_tax);

      return Math.round(total);
    },
    noCommission(){
      // if load directions
      if(this.searchData.directions){
        let firstDerection = this.searchData.directions[0];
        // if first airline is Fly Dubai, it have no commission
        if(firstDerection.platingCarrier == "FZ"){
            return true;
        }
        // No commission air if first departure from non bangladesh airport
        const noCommissionAir = ['SQ','CZ','MU'];
        
        // if first airline match noCommissionAir and first departure from non bangladesh airport, it have no commission
        if ( noCommissionAir.indexOf(firstDerection.platingCarrier) != -1 && this.domesticAirport.indexOf(firstDerection.from) == -1) {
            return true;
        }else{
          return false;
        }
      }
      return false;
    }
  },

  methods: {
    buyNow() {
      // get from query
      let passengers = {
        adt: 0,
        cnn: 0,
        childDob: [],
        inf: 0,
      };
      let query = this.$route.query;
      if (query.adt) {
        passengers.adt = parseInt(query.adt);
      }
      if (query.cnn) {
        passengers.cnn = parseInt(query.cnn);
      }
      if (query.child_birth) {
        passengers.childDob = query.child_birth.split(",");
      }
      if (query.inf) {
        passengers.inf = parseInt(query.inf);
      }
      const book = {
        directions: this.directions,
        passengers,
        bookingComponents: this.bookingComponents,
      };
      localStorage.setItem("flightBooking", JSON.stringify(book));
      if (!this.$auth.loggedIn) {
        localStorage.setItem("previousPath", "/flight/booking");
      }
      this.$router.push("/flight/booking");
    },
    imageUrlAlt(event) {
      event.target.src =
        "https://thefinancialexpress.com.bd/public/uploads/1578301226.jpg";
    },
    airlineLogo(code) {
      return `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${code}.png`;
    },

    airlineName(inputValue, key = "iata") {
      const objectData = require("../../static/utils/airlines_codes.json");
      const input = inputValue.toString().toLowerCase();
      const result = objectData.find((data) => {
        return (
          (data[key] !== undefined && data[key] !== null && data[key])
            .toLowerCase()
            .trim() == input
        );
      });
      return result?.airline || inputValue;
    },
    airportName(inputValue, key = "code") {
      const objectData = require("../../static/utils/airport_codes.json");
      const input = inputValue.toString().toLowerCase();
      const result = objectData.find((data) => {
        return (
          (data[key] !== undefined && data[key] !== null && data[key])
            .toLowerCase()
            .trim() == input
        );
      });
      return result?.airport || inputValue;
    },
    getTimeValue(timeString) {
            const datePortion = timeString.split("T")[0];
            const timePart = timeString.split("T")[1].split(".")[0];
            // Create a Date object from the time string
            const date = new Date(`${datePortion}T${timePart}`);

            // Get the hour and minute
            let hours = date.getHours();
            const minutes = date.getMinutes();

            // Format the time to include AM/PM
            let ampm = "AM";
            if (hours >= 12) {
                ampm = "PM";
                if (hours > 12) {
                    hours -= 12;
                }
            }
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        },
        getDateValue(timeString) {
            // Your time string
            const datePortion = timeString.split("T")[0];

            // Create a Date object from the time string
            const date = new Date(datePortion);
            // Get the year, month, and day
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are 0-based, so add 1 to get the correct month
            const day = date.getDate();

            return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

        },
    layoverAtStop(segments, index) {
      let firstTime = segments[index - 1]?.arrival;
      let lastTime = segments[index]?.departure;
      firstTime = new Date(firstTime).toUTCString();
      lastTime = new Date(lastTime).toUTCString();
      const startTime = this.$moment(firstTime);
      const endTime = this.$moment(lastTime);
      const minutesDiff = endTime.diff(startTime, "minutes");

      return `${this.minutesToTime(minutesDiff)} layover`;
    },
    flightTime(segment) {
      let firstTime = segment?.departure;
      let lastTime = segment?.arrival;
      firstTime = new Date(firstTime).toUTCString();
      lastTime = new Date(lastTime).toUTCString();
      const startTime = this.$moment(firstTime);
      const endTime = this.$moment(lastTime);
      const minutesDiff = endTime.diff(startTime, "minutes");

      return this.minutesToTime(minutesDiff);
    },
    totalFlightTime(segments) {
      let sLength = segments.length - 1;
      let firstTime = segments[0]?.departure;
      let lastTime = segments[sLength]?.arrival;
      firstTime = new Date(firstTime).toUTCString();
      lastTime = new Date(lastTime).toUTCString();

      const startTime = this.$moment(firstTime);
      const endTime = this.$moment(lastTime);
      const minutesDiff = endTime.diff(startTime, "minutes");
      return this.minutesToTime(minutesDiff);
    },
    minutesToTime(minutes) {
      let duration = this.$moment.duration(minutes, "minutes");
      let days = duration.days();
      let hours = duration.hours();
      let minute = duration.minutes();
      let time = "";
      if (days > 0) {
        time = `${days}d `;
      }
      if (hours > 0) {
        time += `${hours}h `;
      }
      if (minute > 0) {
        time += `${minute}m`;
      }
      return time;
    },
    price(price = "", attr = "") {
      let num = price.replace(/^\D+/g, "");
      let currency = price.replace(num, "");
      if (attr == "") {
        return currency + " " + num;
      } else if (attr == "num") {
        return parseInt(Math.ceil(num));
      } else {
        return currency;
      }
    },
    rawJs() {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    },
  },
};
</script>

<style>
.flight-card .airline-namepic .flight-thumb img {
  height: 96%;
}
</style>
<template>
  <div class="booking-tab" id="targetElement">
    <div class="row gy-4" v-if="flightLoaderStatus == false">
      <!-- trip controls -->
      <div class="col-12">
        <div class="select-trip">
          <!-- trip radio buttons -->
          <div class="trip-radios">
            <div class="customradio">
              <input type="radio" id="oneway" class="customradio-box" value="1" name="tripType" v-model="tripType" hidden
                @click="tripTypeSelect(1)" />
              <label for="oneway" class="customradio-label">Oneway</label>
            </div>
            <div class="customradio">
              <input type="radio" id="round" class="customradio-box" value="2" name="tripType" v-model="tripType" hidden
                selected @click="tripTypeSelect(2)" />
              <label for="round" class="customradio-label">Round Trip </label>
            </div>
            <div class="customradio">
              <input type="radio" id="hotel-multi" class="customradio-box" value="3" name="tripType" v-model="tripType"
                hidden @click="tripTypeSelect(3)" />
              <label for="hotel-multi" class="customradio-label">Multi-city</label>
            </div>
          </div>
          <div class="trip-selects">
            <div class="person-dropdown" id="person-dropdown">
              <button class="dropdown-btn" @click="togglePerson">
                <span class="btn-text">
                  {{ formData.passengers.ADT }} Adult
                  <span v-if="formData.passengers.CNN > 0">
                    - {{ formData.passengers.CNN }} Child
                  </span>
                  <span v-if="formData.passengers.INF > 0">
                    - {{ formData.passengers.INF }} Infant
                  </span>
                </span>
                <span class="icon">
                  <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.04688 5.64844L0.046875 0.648438H10.0469L5.04688 5.64844Z" fill="#4A5568" />
                  </svg>
                </span>
              </button>
              <div class="person-dropdown-content" id="person-content">
                <div class="counter-container">
                  <div class="single-counter">
                    <div class="top">
                      <div class="left">
                        <span class="title">Adults</span>
                        <span class="age">12 Years +</span>
                      </div>
                      <div class="right">
                        <button type="button" @click="decrementCount('ADT')">
                          -
                        </button>
                        <span>{{ formData.passengers.ADT }}</span>
                        <button type="button" @click="incrementCount('ADT')">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="single-counter">
                    <div class="top">
                      <div class="left">
                        <span class="title">Child</span>
                        <span class="age">2-12 Years</span>
                      </div>
                      <div class="right">
                        <button type="button" @click="decrementCount('CNN')">
                          -
                        </button>
                        <span>{{ formData.passengers.CNN }}</span>
                        <button @click="incrementCount('CNN')">+</button>
                      </div>
                    </div>
                    <div class="bottom" v-for="i in formData.passengers.CNN" :key="i">
                      <div class="input-box2">
                        <label for="birthChild" class="input-label dateof">Chid {{ i }} Date of Birth
                        </label>
                        <date-picker id="birthChild" class="input-field" placeholder="DD/MM/YYYY" format="dd/MM/yyyy"
                          v-model="childDob[i - 1]" />
                      </div>
                    </div>
                  </div>
                  <div class="single-counter">
                    <div class="top">
                      <div class="left">
                        <span class="title">Infant</span>
                        <span class="age">Bellow 2 years</span>
                      </div>
                      <div class="right">
                        <button type="button" @click="decrementCount('INF')">
                          -
                        </button>
                        <span>{{ formData.passengers.INF }}</span>
                        <button type="button" @click="incrementCount('INF')">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="single-counter">
                    <div class="right">
                      <button class="proceed-btn float-end" @click="togglePerson">Done</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="customselect">
              <div class="select-wrapper">
                <div class="select">
                  <div class="select-trigger">
                    <span class="selectedvalue" @click="cabinDropdown">
                      <span v-if="formData.cabins.length == 1 &&
                        formData.cabins[0] == 'Economy'
                        ">
                        Economy
                      </span>
                      <span v-if="formData.cabins.length == 1 &&
                        formData.cabins[0] == 'Business'
                        ">
                        Business
                      </span>
                      <span v-if="formData.cabins.length == 0">
                        Any Cabins
                      </span>
                    </span>

                    <span class="arrow">
                      <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.0459 5.43115L0.0458984 0.431152H10.0459L5.0459 5.43115Z" fill="#718096"></path>
                      </svg>
                    </span>
                  </div>

                  <div class="custom-options">
                    <span :class="[
                      'custom-option',
                      formData.cabins.length == 1 &&
                      formData.cabins[0] == 'Economy' &&
                      'selected',
                    ]" @click="cabinSelect(['Economy'])">
                      Economy
                    </span>
                    <span :class="[
                      'custom-option',
                      formData.cabins.length == 1 &&
                      formData.cabins[0] == 'Business' &&
                      'selected',
                    ]" @click="cabinSelect(['Business'])">Business</span>
                    <span :class="[
                      'custom-option',
                      formData.cabins.length == 0 ? 'selected' : '',
                    ]" @click="cabinSelect([])">Any Cabins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- leaving going deparuire return -->
      <!-- round trip col  -->
      <div class="col-12">
        <div class="row gy-4 pt-2" v-for="(data, dir) in inputData" :key="dir">
          <div class="col-lg-6 position-relative">
            <button class="swap-btn" id="swapRoundtrip" @click="swapTrip(dir)" v-if="tripType == 2">
              <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.4859 28.5777L13.5859 21.9777H9.08594C8.66094 21.9777 8.30494 21.8337 8.01794 21.5457C7.72994 21.2587 7.58594 20.9027 7.58594 20.4777C7.58594 20.0527 7.72994 19.6962 8.01794 19.4082C8.30494 19.1212 8.66094 18.9777 9.08594 18.9777H13.5859L17.4859 12.3777H19.1359L17.1859 18.9777H21.4609L22.5859 17.4777H24.0859L23.1859 20.4777L24.0859 23.4777H22.5859L21.4609 21.9777H17.1859L19.1359 28.5777H17.4859ZM5.03594 16.5777L6.98594 9.97769H2.71094L1.58594 11.4777H0.0859375L0.985937 8.47769L0.0859375 5.47769H1.58594L2.71094 6.97769H6.98594L5.03594 0.377686H6.68594L10.5859 6.97769H15.0859C15.5109 6.97769 15.8674 7.12119 16.1554 7.40819C16.4424 7.69619 16.5859 8.05269 16.5859 8.47769C16.5859 8.90269 16.4424 9.25869 16.1554 9.54569C15.8674 9.83369 15.5109 9.97769 15.0859 9.97769H10.5859L6.68594 16.5777H5.03594Z"
                  fill="#718096" />
              </svg>
            </button>
            <button class="swap-btn" id="swapOneway" @click="swapTrip(dir)" v-else>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M-0.000976847 6.5L1.49902 6.5L2.99902 8.5L8.49902 8.5L5.99902 -6.11959e-07L7.99902 -5.24537e-07L12.999 8.5L18.499 8.5C18.9157 8.5 19.2697 8.646 19.561 8.938C19.853 9.22933 19.999 9.58333 19.999 10C19.999 10.4167 19.853 10.7707 19.561 11.062C19.2697 11.354 18.9157 11.5 18.499 11.5L12.999 11.5L7.99902 20L5.99902 20L8.49902 11.5L2.99902 11.5L1.49902 13.5L-0.000977153 13.5L0.999023 10L-0.000976847 6.5Z"
                  fill="#718096" />
              </svg>
            </button>
            <div class="row gy-4">
              <div class="col-lg-6 pe-lg-1">
                <div class="input-box left-box pe-lg-0" @click="focusHandler('leaving-' + dir)">
                  <label :for="'leaving-' + dir" class="input-label">Leaving from
                  </label>
                  <div class="value-box">
                    <input type="text" :id="'leaving-' + dir" placeholder="City" @input="searchAirports('', $event)"
                      @keyup="searchAirports('', $event)" @click="searchAirports(inputData[dir].from.country, $event)"
                      class="input-field" v-model="inputData[dir].from.city" autocomplete="off" />
                    <div class="dropdown-list leaving">
                      <div class="list-wrapper">
                        <div class="list" v-for="(leavingFrom, i) in searchData" :key="i"
                          @mousedown="selectAirport(leavingFrom, 'from', dir)">
                          <div class="left">
                            <span class="small-name">{{ leavingFrom.city }},
                              {{ leavingFrom.country }}</span>
                            <span class="detail-name">{{
                              leavingFrom.airport
                            }}</span>
                          </div>
                          <div class="right">
                            <span class="short-name">{{
                              leavingFrom.code
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span class="full-name shortText" v-if="inputData[dir].from.code">{{ inputData[dir].from.code }},
                    {{ inputData[dir].from.country }},
                    {{ inputData[dir].from.airport }}</span>
                  <span v-if="inputData[dir].errors.from" class="full-name text-danger">
                    Leaving from should not be empty!
                  </span>

                  <!-- dropdown  -->
                </div>
              </div>
              <div class="col-lg-6 ps-lg-1">
                <div class="input-box right-box pe-lg-0" @click="focusHandler('going-' + dir)">
                  <label :for="'going-' + dir" class="input-label">Going to</label>
                  <div class="value-box">
                    <input type="text" :id="'going-' + dir" placeholder="City" class="input-field"
                      @input="searchAirports('', $event)" @keyup="searchAirports('', $event)"
                      @click="searchAirports(inputData[dir].to.country, $event)" v-model="inputData[dir].to.city" autocomplete="off"/>
                    <div class="dropdown-list">
                      <div class="list-wrapper">
                        <div class="list" v-for="(airport, i) in searchData" :key="i"
                          @mousedown="selectAirport(airport, 'to', dir)">
                          <div class="left">
                            <span class="small-name">{{ airport.city }}, {{ airport.country }}</span>
                            <span class="detail-name">{{
                              airport.airport
                            }}</span>
                          </div>
                          <div class="right">
                            <span class="short-name">{{ airport.code }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span class="full-name shortText" v-if="inputData[dir].to.code">{{ inputData[dir].to.code }},
                    {{ inputData[dir].to.country }},
                    {{ inputData[dir].to.airport }}</span>
                  <span v-if="inputData[dir].errors.to" class="full-name text-danger">
                    Going to should not be empty!
                  </span>

                  <!-- dropdown  -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6" v-if="tripType == 3">
            <!-- row when  roundtrip radio selected  -->
            <div class="row g-4" id="roundtripShow">
              <div :class="[
                'px-lg-0',
                dir == 0 ? 'col-lg-4 col-xs-12' : 'col-8 col-sm-6 col-lg-3',
              ]">
                <div class="input-box rounded">
                  <label for="leaving" class="input-label">Departure</label>
                  <date-picker id="detarture" class="input-field fullWidth" placeholder="DD/MM/YYYY" format="dd/MM/yyyy"
                    v-model="inputData[dir].departureDate" @selected="departureDateSelect(dir)"
                    :disabledDates="disabledDates" :highlighted="highlighted" />
                  <span class="text-danger small-text" v-if="inputData[dir].errors.departureDate">
                    Date should not be empty!
                  </span>
                </div>
              </div>

              <div class="col-4 col-sm-3 col-lg-2" v-if="dir != 0">
                <div class="btn-box">
                  <button @click="removeMultiCity(dir)" class="remove-btn">
                    <span>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 1L1 25" stroke="#718096" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M1 1L25 25" stroke="#718096" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <div class="col-12 col-sm-3 col-lg-3" v-if="dir === multiCity">
                <div class="btn-box">
                  <button @click="addMultiCity" class="add-another-btn">
                    Add Another
                  </button>
                </div>
              </div>

              <div class="col-lg-4" v-if="dir === multiCity">
                <div class="btn-box">
                  <button class="go-btn" type="button" @click="submitWithValidate">
                    Search Flight
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6" v-else>
            <!-- row when  roundtrip radio selected  -->
            <div class="row g-4" id="roundtripShow">
              <div :class="[tripType == 2?'col-6 pe-0':'col-sm-12',' col-lg-4 px-lg-0']">
                <div :class="['input-box', tripType == 2 ? 'left-box' : 'rounded']">
                  <label class="input-label"> Departure </label>
                  <date-picker id="detarture" class="input-field fullWidth" placeholder="DD/MM/YYYY" format="dd/MM/yyyy"
                    v-model="inputData[dir].departureDate" @selected="departureDateSelect(dir)"
                    :disabledDates="disabledDates" :highlighted="highlighted" />
                  <span class="text-danger small-text" v-if="inputData[dir].errors.departureDate">
                    Date should not be empty!
                  </span>
                </div>
              </div>
              <div class="col-6 col-lg-4 px-lg-0 ps-0" v-if="tripType == 2">
                <div class="input-box right-box right-datepicker">
                  <label for="return" class="input-label">Return</label>
                  <date-picker id="return" class="input-field fullWidth" placeholder="DD/MM/YYYY" format="dd/MM/yyyy"
                    v-model="returnDate" @selected="returnDateSelect" :disabledDates="disabledLastDates"
                    :highlighted="highlighted" />
                  <span class="text-danger small-text" v-if="errors.returnDate">
                    Date should not be empty!
                  </span>
                </div>
              </div>
              <div class="col-6 col-lg-3" v-if="tripType == 3">
                <div class="btn-box">
                  <button @click="addMultiCity" class="add-another-btn" v-if="dir === multiCity">
                    Add Another
                  </button>

                  <button @click="removeMultiCity(dir)" v-else class="remove-btn">
                    <span>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 1L1 25" stroke="#718096" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M1 1L25 25" stroke="#718096" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <div class="col-lg-4" v-if="dir === multiCity">
                <div class="btn-box">
                  <button class="go-btn" type="button" @click="submitWithValidate">
                    Search Flight
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flight-loader-wrapper" v-else>
      <div class="flight-loader">
        <img src="/assets/images/preloader/loader.svg" alt="spinner">
        <h3 class="preloadewr-title">Searching flights</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
const aircodes = require("/static/utils/airport_codes.json");
const search = require("/static/utils/search-json.js");
export default {
  name: "FlightTab",
  data() {
    return {
      searchData: [],
      inputData: [
        {
          from: {
            code: "DAC",
            city: "Dhaka",
            country: "Bangladesh",
            continent: "Asia",
            airport: "Hazrat Shahjalal International Airport",
          },
          to: {
            code: "CGP",
            city: "Chittagong",
            country: "Bangladesh",
            continent: "Asia",
            airport: "Shah Amanat International Airport",
          },
          departureDate: "",
          errors: {
            from: false,
            to: false,
            departureDate: false,
          },
        },
      ],
      returnDate: "",

      tripType: 1,
      multiCity: 0,
      childDob: [],
      errors: {
        returnDate: false,
      },

      formData: {
        legs: [],
        passengers: {
          ADT: 1,
          CNN: 0,
          INF: 0,
          // AGE:[],
          // DOB:[],
        },
        cabins: [],
        pricing: {
          /* currency: "BDT", */
          eTicketability: true,
        },
        solutionResult: true,
        requestId:'',
        //faresOnly:true
      },
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
      disabledLastDates: {
        to: new Date(Date.now() - 8640000),
      },

      highlighted: {
        dates: [
          // your date
          new Date(Date.now()),
        ],
      },
    };
  },
  mounted() {
    this.nextDay();
    this.queryToState();
  },
  computed: {
    flightLoaderStatus() {
      return this.$store.state.flightLoader;
    }
  },
  methods: {
    // generate a trace id & store it for previous usage
    generateTraceId(){
      const requestId = uuidv4(); // requestId for trace
      this.formData.requestId = requestId;
      localStorage.setItem('requestId',requestId);
    },
    async submitWithValidate() {
      // Query String Create

      // Child Birth query
      let childBirths = [];
      if (this.childDob.length > 0) {
        this.childDob.map((item) => {
          const birth = this.$moment(item, "YYYY-MM-DD").format("YYYY-MM-DD");
          childBirths.push(birth);
        });
      }

      let queryString = `?adt=${this.formData.passengers.ADT}&cnn=${this.formData.passengers.CNN
        }&child_birth=${childBirths.join(",")}&inf=${this.formData.passengers.INF
        }&cabins=${this.formData.cabins.join()}&trip_type=${this.tripType
        }&trips=`;
      let trips = []; // For trip query

      let isSubmit = true; // flag for submission
      this.formData.legs = [];
      let airportCodes = {};
      for (let index in this.inputData) {
        let item = this.inputData[index];

        // leaving from validation
        if (item.from.code == "") {
          this.inputData[index].errors.from = true;
          isSubmit = false;
        }

        // going to validation
        if (item.to.code == "") {
          this.inputData[index].errors.to = true;
          isSubmit = false;
        }

        // departureDate validation & formatting
        if (item.departureDate == "") {
          this.inputData[index].errors.departureDate = true;
          isSubmit = false;
        } else {
          this.inputData[index].departureDate = this.$moment(
            item.departureDate,
            "YYYY-MM-DD"
          ).format("YYYY-MM-DD");
        }
        // Validation End

        if (isSubmit) {
          this.formData.legs.push({
            from: item.from.code,
            to: item.to.code,
            departureDate: item.departureDate,
          });
          //Add child birthdate to shop parameter for calcuate child age, where tax are different by age
          this.formData.childBirths = childBirths;
          trips.push(`${item.from.code}_${item.to.code}_${item.departureDate}`);
          airportCodes[item.from.code] = item.from.airport;
          airportCodes[item.to.code] = item.to.airport;
        }
      }

      // returnDate validation & formatting for round trip
      if (this.tripType == 2 && this.returnDate == "") {
        this.errors.returnDate = true;
        isSubmit = false;
      } else if (this.tripType == 2 && this.returnDate !== "") {
        this.returnDate = this.$moment(this.returnDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        );
        if (this.formData.legs[0]) {
          this.formData.legs.push({
            from: this.formData.legs[0]?.to,
            to: this.formData.legs[0].from,
            departureDate: this.returnDate,
          });
          trips.push(
            `${this.formData.legs[0]?.to}_${this.formData.legs[0].from}_${this.returnDate}`
          );
        }
      }

      if (isSubmit) {
        this.$store.commit("flightLoader", true);
        queryString += trips.join(",");
        this.$store.commit("setAirportCodes", airportCodes);
        this.$log(this.formData)
        // Age calculation by birth date
        //this.ageCalculate();

        try {
          this.generateTraceId();
          const response = await this.$Api.post("/air/shop", this.formData);
          if (response?.data?.statusCode && response?.data?.name) {
            let errorText = response?.data?.name;
            let newErrorText = errorText.replace("AirRuntimeError.", "");
            this.$toast.warning(newErrorText);
            this.$router.push("/");
          }
          this.$log(response.data);
          this.rearrengeData(response.data);

          // After real api integration time out should stop
          this.$store.commit("flightLoader", false);

          this.$router.push("/flight/search" + queryString);
        } catch (err) {
          this.$elog("error in api");
          this.$elog(err);
          this.$elog(err?.response);
          this.$toast.warning("No available airline found.");
          this.$store.commit("flightLoader", false);
          this.$router.push("/");
        }
      }
    },
    swapTrip(index) {
      let from = this.inputData[index].from;
      this.inputData[index].from = this.inputData[index].to;
      this.inputData[index].to = from;
    },
    // Datepicker selected event
    returnDateSelect() {
      this.errors.returnDate = false;
    },
    departureDateSelect(index = 0) {
      window.setTimeout(() => {
        let firstDate = this.inputData[index].departureDate;
        this.disabledLastDates = {
          to: new Date(new Date(firstDate) - 8640000),
        }
      }, 200);
      this.returnDate = "";
      this.inputData[index].errors.departureDate = false;
    },
    cabinSelect(value) {
      this.formData.cabins = value;
    },
    // Passenger Increment
    incrementCount(type) {
      if (type == "INF") {
        if (this.formData.passengers.INF < 2) {
          this.formData.passengers.INF++;
        }
      } else if (type == "CNN") {
        if (this.formData.passengers.CNN < 9) {
          this.formData.passengers.CNN++;
        }
      } else {
        this.formData.passengers[type]++;
      }
    },
    // Passenger Decrement
    decrementCount(type) {
      if (type == "ADT") {
        if (this.formData.passengers.ADT > 1) {
          this.formData.passengers.ADT--;
        }
      } else if (this.formData.passengers[type] > 0) {
        this.formData.passengers[type]--;
      }
    },
    //State update after select airport from dropdown list
    selectAirport(airport, section, index = 0) {
      if (section == "from") {
        this.inputData[index].from = {
          code: airport.code,
          city: airport.city,
          country: airport.country,
          continent: airport.continent,
          airport: airport.airport,
        };
        this.inputData[index].errors.from = false;
      } else if (section == "to") {
        this.inputData[index].to = {
          code: airport.code,
          city: airport.city,
          country: airport.country,
          continent: airport.continent,
          airport: airport.airport,
        };
        this.inputData[index].errors.to = false;
      }
      this.searchData = [];
    },
    // State update after age calculated by birthdate
    ageCalculate() {
      if (this.childDob.length > 0) {
        let ages = [];
        let dobs = [];
        this.childDob.map((item) => {
          const birth = this.$moment(item, "YYYY-MM-DD");
          const age = this.$moment().diff(birth, "years");
          const date = birth.format("YYYY-MM-DD");
          ages.push(age);
          dobs.push(date);
        });
        this.formData.passengers.AGE = ages;
        //this.formData.passengers.DOB = dobs;
      }
    },

    // search airports by country / city / code
    searchAirports(country = "", event) {
      let keyword = event.target.value;
      if (country != "") {
        event.target.select();
        keyword = country;
      }
      let limit = 10;
      this.searchData = [];
      const getResults = (result) => {
        // set data limit
        if (limit >= 0 && result.length > limit) {
          result.length = limit;
        }
        this.searchData = [...result];
      };
      if (keyword != "") {
        search(keyword + "", aircodes, getResults, []);
      }
    },
    // Search single airport by key
    searchAirportKey(inputValue, key = "code") {
      const objectData = require("/static/utils/airport_codes.json");
      const input = inputValue.toString().toLowerCase();
      const result = objectData.find((data) => {
        return (
          (data[key] !== undefined && data[key] !== null && data[key])
            .toLowerCase()
            .trim() == input
        );
      });
      return { ...result };
    },
    // multicity functions
    tripTypeSelect(type) {
      if (type == 3) {
        this.addMultiCity();
      } else {
        this.multiCity = 0;
        this.inputData.splice(1);
      }
    },
    addMultiCity() {
      const lastIndex = this.inputData.length - 1;
      const lastElement = this.inputData[lastIndex];
      // if add five destination its not add another destination
      if(lastIndex>3){
        this.$toast.warning("You can select up to 5 segments for a multicity flight.");
        return ;
      }

      this.inputData.push({
        from: {...lastElement.to}, // last going to destination import to next leaving from destination
        to: {
          code: "",
          city: "",
          country: "",
          continent: "",
          airport: "",
        },
        departureDate: "",
        errors: {
          from: false,
          to: false,
          departureDate: false,
        },
      });
      this.multiCity++;
    },
    removeMultiCity(index) {
      this.inputData.splice(index, 1);
      this.multiCity--;
    },
    togglePerson() {
      const personContent = document.getElementById("person-content");
      personContent.classList.toggle("show");
    },
    cabinDropdown() {
      const cabinClass = document.querySelector(".select").classList;
      if (cabinClass.contains("open") == false) {
        cabinClass.add("open");
      } else {
        cabinClass.remove("open");
      }
    },

    focusHandler(id) {
      document.getElementById(id).focus();
    },
    // Query string to convert state data
    queryToState() {
      let query = this.$route.query;
      if (query.adt) {
        this.formData.passengers.ADT = parseInt(query.adt);
      }
      if (query.cnn) {
        this.formData.passengers.CNN = parseInt(query.cnn);
      }
      if (query.child_birth) {
        this.childDob = query.child_birth.split(",");
      }
      if (query.inf) {
        this.formData.passengers.INF = parseInt(query.inf);
      }
      if (query.cabins) {
        this.formData.cabins = [query.cabins];
      }
      if (query.trip_type) {
        this.tripType = query.trip_type;
      }

      if (query.trips) {
        let trips = query.trips.split(",");
        if (trips.length > 0) {
          if (this.tripType == 3) {
            this.inputData = [];
            trips.map((trip) => {
              let tripDetails = trip.split("_");
              let from = this.searchAirportKey(
                tripDetails[0] ? tripDetails[0] : ""
              );
              let to = this.searchAirportKey(
                tripDetails[1] ? tripDetails[1] : ""
              );
              if (from && to) {
                this.inputData.push({
                  from,
                  to,
                  departureDate: tripDetails[2],
                  errors: {
                    from: false,
                    to: false,
                    departureDate: false,
                  },
                });
                this.multiCity++;
              }
            });
            this.multiCity--;
          } // End trip type 3
          else if (this.tripType == 2) {
            let tripDetails = trips[0] && trips[0].split("_");
            let tripDetails2 = trips[1] && trips[1].split("_");
            if (tripDetails) {
              let from = this.searchAirportKey(
                tripDetails[0] ? tripDetails[0] : ""
              );
              let to = this.searchAirportKey(
                tripDetails[1] ? tripDetails[1] : ""
              );
              if (from && to) {
                this.inputData = [
                  {
                    from,
                    to,
                    departureDate: tripDetails[2],
                    errors: {
                      from: false,
                      to: false,
                      departureDate: false,
                    },
                  },
                ];
              }
            }
            if (tripDetails2) {
              this.returnDate = tripDetails2[2];
            }
          } // End trip type 2
          else if (this.tripType == 1) {
            let tripDetails = trips[0] && trips[0].split("_");
            let from = this.searchAirportKey(
              tripDetails[0] ? tripDetails[0] : ""
            );
            let to = this.searchAirportKey(
              tripDetails[1] ? tripDetails[1] : ""
            );
            if (from && to) {
              this.inputData = [
                {
                  from,
                  to,
                  departureDate: tripDetails[2],
                  errors: {
                    from: false,
                    to: false,
                    departureDate: false,
                  },
                },
              ];
            }
          } // End trip type 1
          this.submitWithValidate();
        }
      }
    },
    nextDay() {
      // set departure date: upcoming date
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);
      tomorrow.setDate(tomorrow.getDate());
      this.inputData[0].departureDate = tomorrow;
      this.disabledLastDates = {
        to: new Date(new Date(tomorrow) - 8640000),
      }
    },
    combineArrays(arrays, extraData) {
      let arrayPropertyName = "directions";
      let extraDataPropertyName = "bookingComponents";

      if (arrays.length === 0) {
        return [{ [extraDataPropertyName]: extraData, [arrayPropertyName]: [] }];
      }

      const [firstArray, ...remainingArrays] = arrays;
      const combinationsWithoutFirst = this.combineArrays(remainingArrays, extraData);

      const combinationsWithFirst = [];

      for (let element of firstArray) {
        for (let combination of combinationsWithoutFirst) {
          const newArray = [element, ...combination[arrayPropertyName]];
          const newExtraData = combination[extraDataPropertyName];
          combinationsWithFirst.push({ [arrayPropertyName]: newArray, [extraDataPropertyName]: newExtraData });
        }
      }

      return combinationsWithFirst;
    },
    rearrengeData(searchResults) {
      // Here get data from this.$store.state.flightSearch
      let finalResult = [];
      let airlines = [];
      let prices = [];
      for (let search of searchResults) {
        let flights;
        let flightLength = 0;
        let bookingComponents = {
          price: search.bookingComponents[0] || "",
          passengerFares: search.passengerFares
        }
        if (search?.directions?.length > 1) {
          flights = this.combineArrays(search?.directions, bookingComponents);
          finalResult = finalResult.concat(flights);
          flightLength = flights.length;
        } else {
          for (let direction of search?.directions[0]) {
            finalResult.push({
              directions: [direction],
              bookingComponents,
            });
            flightLength++;
          }
        }
        // Search Summary create
        if (prices.indexOf(this.price(search.totalPrice)) == -1) {
          prices.push(this.price(search.totalPrice));
        }
        //prices.push(this.price(search.basePrice));
        let oldArilines = airlines.find(
          (air) => air.code === search.platingCarrier
        );
        if (oldArilines !== undefined && oldArilines?.code) {
          oldArilines.totalFlight += flightLength
        } else {
          airlines.push({
            code: search.platingCarrier,
            name: this.airlineName(search.platingCarrier),
            totalFlight: flightLength,
          });
        }
      }
      let searchSummary = {
        priceRange: {
          min: Math.floor(Math.min(...prices)),
          max: Math.ceil(Math.max(...prices)),
        },
        airlines,
      };
      //finalResult.length = 11;
      this.$store.commit("searchSummary", searchSummary);
      this.$store.commit("flightAllData", finalResult);
    },
    price(price = "") {
      let num = price.replace(/^\D+/g, "");
      //let currency = price.replace(num,'');
      return parseFloat(num);
    },
    airlineName(inputValue, key = "iata") {
      const objectData = require("/static/utils/airlines_codes.json");
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
  },


};
</script>

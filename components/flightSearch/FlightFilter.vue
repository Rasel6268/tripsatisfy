<template>
  <div>
    <div class="sort-filter-header">
      <button
        class="filter-btn"
        type="button"
        aria-expanded="false"
        aria-controls="collapseExample"
        id="sordFilter"
      >
        sort and filter
      </button>
      <p class="clear" @click="clearFilter()">Clear</p>
    </div>
    <div class="filter-box" id="filterCollapse">
      <!-- Price range  -->
      <div class="singlebox">
        <div class="singlebox-header">
          <h4 class="singlebox-title">Price Range</h4>
        </div>
        <div class="singlebox-body">
          <div class="range-slide-wrapper">
            <div class="range-value">
              <div class="min-box">
                <span class="min-title">Minimum</span>
                <span> {{ priceRange[0] }} </span>
              </div>
              <div class="max-box">
                <span class="max-title">Maximum</span>
                <span> {{ priceRange[1] }} </span>
              </div>
            </div>

            <vue-slider
              v-model="priceRange"
              :min="priceRangeOptions.min"
              :max="priceRangeOptions.max"
              :interval="1"
              :dragging="true"
              @change="setPriceRange"
            />
          </div>
        </div>
      </div>
      <!-- Departure Time -->
      <div class="singlebox">
        <div class="singlebox-header">
          <h4 class="singlebox-title">Departure Time</h4>
        </div>
        <div class="singlebox-body">
          <ul class="departurelist">
            <li class="departurelist-item" v-for="(time, t) of times" :key="t">
              <div class="timeoption">
                <input
                  type="radio"
                  :value="time"
                  v-model="filter.departureTime"
                  @change="getFilterData"
                  :id="prefix + 'opt' + t"
                  class="optioninput"
                  hidden
                />
                <label :for="prefix + 'opt' + t" class="optionlabel"
                  >{{ time.min }} - {{ time.max }}</label
                >
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Arival  Time -->
      <div class="singlebox">
        <div class="singlebox-header">
          <h4 class="singlebox-title">Arrival Time</h4>
        </div>
        <div class="singlebox-body">
          <ul class="departurelist">
            <li class="departurelist-item" v-for="(time, t) of times" :key="t">
              <div class="timeoption">
                <input
                  type="radio"
                  :value="time"
                  v-model="filter.arrivalTime"
                  @change="getFilterData"
                  :id="prefix + 'arrivalOpt' + t"
                  class="optioninput"
                  hidden
                />
                <label :for="prefix + 'arrivalOpt' + t" class="optionlabel"
                  >{{ time.min }} - {{ time.max }}</label
                >
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Air Lines -->
      <div class="singlebox">
        <div class="singlebox-header">
          <h4 class="singlebox-title">Air Lines</h4>
        </div>
        <div class="singlebox-body">
          <div class="checkbox-wrapper">
            <div class="customcheck" v-for="airline of airlines" :key="airline.code">
              <input
                type="checkbox"
                @change="getFilterData"
                :id="prefix + 'bimanbd-' + airline.code"
                name="airlines"
                :value="airline.code"
                v-model="filter.airlines"
                class="customcheck-box"
                hidden
              />
              <label
                :for="prefix + 'bimanbd-' + airline.code"
                class="customcheck-label"
                v-if="airline.name"
              >
                {{ airline.name }} {{ airline.totalFlight }}</label
              >
            </div>
            <button class="see-more d-none">See More</button>
          </div>
        </div>
      </div>

      <!-- Refundable -->
      <div class="singlebox d-none">
        <div class="singlebox-header">
          <h4 class="singlebox-title">Refundable</h4>
        </div>
        <div class="singlebox-body">
          <div class="checkbox-wrapper">
            <div class="customcheck">
              <input
                type="checkbox"
                id="norrefund"
                name="refandable"
                class="customcheck-box"
                hidden
              />
              <label for="norrefund" class="customcheck-label">Non Refundable</label>
            </div>
            <div class="customcheck">
              <input
                type="checkbox"
                id="refandable"
                name="refandable"
                class="customcheck-box"
                hidden
              />
              <label for="refandable" class="customcheck-label"
                >Partially refundable</label
              >
            </div>
            <div class="customcheck">
              <input
                type="checkbox"
                id="rulewise"
                name="refandable"
                class="customcheck-box"
                hidden
              />
              <label for="rulewise" class="customcheck-label">Rules Wise</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: ["prefix"],
  name: "FlightFilter",
  data() {
    return {
      times: [
        { min: "00:00", max: "05:59" },
        { min: "06:00", max: "11:59" },
        { min: "12:00", max: "17:59" },
        { min: "18:00", max: "23:59" },
      ],
      filter: {
        airlines: [],
        priceRange: {},
        departureTime: {},
        arrivalTime: {},
      },
      priceRange: [0, 100],
    };
  },
  computed: {
    airlines() {
      return this.$store.state.searchSummary?.airlines;
    },
   

    priceRangeOptions() {
      let ranges = this.$store.state.searchSummary?.priceRange;
      let min = ranges.min || 0;
      let max = ranges.max || 0;
      this.priceRange = [min, max];
      return {
        min: min - 100,
        max: max + 100,
      };
    },
  },
  methods: {
    getFilterData() {
      // set filter data to store
      this.$store.dispatch("flightFilter", {
        ...this.filter,
      });
      //this.filterData();
    },
    setPriceRange: _.debounce(function (data) {
      this.filter.priceRange.min = data[0];
      this.filter.priceRange.max = data[1];
      this.getFilterData();
    }, 500),
    clearFilter() {
      this.priceRange = [this.priceRangeOptions.min, this.priceRangeOptions.max];
      this.filter = {
        airlines: [],
        priceRange: {},
        departureTime: {},
        arrivalTime: {},
        type: "cheap",
      };
      this.$store.dispatch("flightFilter", {
        ...this.filter,
      });
    },
  },
};
</script>

<style></style>

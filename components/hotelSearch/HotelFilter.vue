<template>
  <!-- ===================== FILTER MODAL START ============================ -->

  <div
    class="modal fade filterModal pe-0"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="header-title">Short and Filter</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1765 15.2754L8.51964 9.61853L2.86278 15.2754L0.977167 13.3898L6.63402 7.73291L0.977167 2.07606L2.86278 0.190438L8.51964 5.84729L14.1765 0.190437L16.0621 2.07606L10.4053 7.73291L16.0621 13.3898L14.1765 15.2754Z"
                fill="#718096"
              />
            </svg>
          </button>
        </div>

        <div class="modal-body p-0">
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="filter-content">
                <div class="filter-content-header">
                  <h3 class="filter-title">Price Range</h3>
                </div>
                <div class="range-slide-wrapper" v-if="firstRange[0]-100 == priceRangeOptions.min">
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
                  
                  
                  <vue-slider v-model="priceRange" :min="priceRangeOptions.min" :max="priceRangeOptions.max" 
                  :interval="1" :dragging="true" @change="setPriceRange" />
                </div>
              </div>
            </div>
          </div>
          <div class="row g-4">
            <div
              class="col-lg-6"
              v-for="(amenities, groupName) of amenitiesGroup"
              :key="groupName"
            >
              <div
                class="filter-content hideSome"
                :id="'amenities-' + noSpaceText(groupName)"
              >
                <div class="filter-content-header">
                  <h3 class="filter-title">{{ groupName }}</h3>
                </div>
                <div class="filter-content-body">
                  <div class="checkbox-wrapper">
                    <div
                      v-for="(data, i) of amenities"
                      :class="['customcheck', i > 3 && 'notShow']"
                      :key="data.id"
                    >
                      <input
                        type="checkbox"
                        :id="'mealitem-'+data.id"
                        name="aminities"
                        :value="data.id"
                        class="customcheck-box"
                        v-model="checkedAmenities"
                        @change="submitFilter"
                        hidden
                      />
                      <label :for="'mealitem-'+data.id" class="customcheck-label">{{
                        data.name
                      }}</label>
                    </div>
                  </div>
                  <button
                    v-if="amenities.length > 3"
                    @click="seeMore(groupName)"
                    :id="'seeMore-' + noSpaceText(groupName)"
                    type="button"
                    class="see-more"
                  >
                    See More
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer sticky-bottom bg-white">
            <button class="clear" @click="clearAll">Clear</button>
            <button class="show-btn" data-bs-dismiss="modal" aria-label="Close">
              Show {{ dataCount }} Hotels
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===================== FILTER MODAL END ============================ -->
</template>

<script>
import _ from 'lodash';
export default {
  name: "HotelFilter",
  props:['data-count'],
  data() {
    return {
      checkedAmenities: [],
      amenitiesGroup: [],
      prices:{},
      priceRange:[0,100],
      firstRange:[0,100],
    };
  },
  mounted() {
    this.getAmenities();
  },
  computed: {
    totalData() {
      return this.$store.state.hotelAllData.count;
    },
    
    hotelSearch(){
      return this.$store.state.hotelSearch;
    },
   
    priceRangeOptions() {
      let ranges = this.$store.state.hotelAllData.price_range;
      let min = ranges?.min || 0;
      let max = ranges?.max || 0;
      if(this.hotelSearch?.prices == undefined){
        this.priceRange = [min, max];
        this.firstRange = [min, max];
        return {
          min : min - 100,
          max : max + 100, 
        };
      }else{
        return {
          min : this.firstRange[0] - 100,
          max : this.firstRange[1] + 100, 
        };
      }
    },
  },

  methods: {
    submitFilter(){
      let filter = {
        amenities: this.checkedAmenities,
      }
      if(this.prices?.min && this.prices?.max){
        filter.prices = this.prices
      }
      const search = Object.assign({}, this.hotelSearch, filter);
      this.$store.commit('hotelSearch',search);
      this.$store.dispatch('getHotels')
    },
    clearAll(){
      this.checkedAmenities = [];
      this.submitFilter();
    },
    setPriceRange: _.debounce(function(data) {
      this.prices.min = data[0];
      this.prices.max = data[1];
      this.submitFilter();
    }, 500),

    async getAmenities() {
      try {
        let response = await this.$axios.get("/amenities-list");
        this.amenitiesGroup = response.data;
      } catch (error) {
        this.$elog(error.response.data);
      }
    },
    seeMore(idSuffix) {
      let group = this.noSpaceText(idSuffix);
      let amenity = `amenities-${group}`;
      let seeMore = `seeMore-${group}`;
      let id = document.getElementById(amenity);
      if (id.className.includes("hideSome")) {
        id.classList.remove("hideSome");
        document.getElementById(seeMore).innerHTML = "See Less";
      } else {
        id.classList.add("hideSome");
        document.getElementById(seeMore).innerHTML = "See More";
      }
    },
    noSpaceText(text) {
      return text.replace(/ /g, "");
    },
  },
};
</script>

<style>
.hideSome .notShow {
  display: none;
}
</style>
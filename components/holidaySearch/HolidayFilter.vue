<template>
  <div class="modal fade filterModal pe-0" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <div class="modal-header">
                    <h3 class="header-title">Short and Filter</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.1765 15.2754L8.51964 9.61853L2.86278 15.2754L0.977167 13.3898L6.63402 7.73291L0.977167 2.07606L2.86278 
                                0.190438L8.51964 5.84729L14.1765 0.190437L16.0621 2.07606L10.4053 7.73291L16.0621 13.3898L14.1765 15.2754Z"
                                fill="#718096" />
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
                                <div class="filter-content-body">
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
                            <div class="filter-content">
                                <div class="filter-content-header">
                                    <h3 class="filter-title">Air fare</h3>
                                </div>
                                <div class="filter-content-body">
                                    <div class="checkbox-wrapper">
                                        <div class="customradio">
                                            <input type="radio" id="with" class="customradio-box" value="True" v-model="filter.air_fare" name="airfare" @change="submitFilter" hidden checked>
                                            <label for="with" class="customradio-label">With Air Fare</label>
                                        </div>
                                        <div class="customradio">
                                            <input type="radio" id="without" value="False" class="customradio-box" v-model="filter.air_fare" name="airfare" @change="submitFilter" hidden checked>
                                            <label for="without" class="customradio-label">Without Air Fare</label>
                                        </div>
                                    </div>
                    
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="filter-content">
                                <div class="filter-content-header">
                                    <h3 class="filter-title">Duration</h3>
                                </div>
                                <div class="filter-content-body">
                                    <div class="checkbox-wrapper">
                                        <div class="customradio">
                                            <input type="radio" id="four" class="customradio-box" value="4 days" v-model="filter.duration" @change="submitFilter" name="duration" hidden checked>
                                            <label for="four" class="customradio-label">4 Days</label>
                                        </div>
                                        <div class="customradio">
                                            <input type="radio" id="five" class="customradio-box" value="5 days" v-model="filter.duration" @change="submitFilter" name="duration" hidden checked>
                                            <label for="five" class="customradio-label">5 Days</label>
                                        </div>
                                        <div class="customradio">
                                            <input type="radio" id="six" class="customradio-box" value="6 days" v-model="filter.duration" @change="submitFilter" name="duration" hidden checked>
                                            <label for="six" class="customradio-label">6 Days</label>
                                        </div>
                                        <div class="customradio">
                                            <input type="radio" id="seven" class="customradio-box" value="7 days" v-model="filter.duration" @change="submitFilter" name="duration" hidden checked>
                                            <label for="seven" class="customradio-label">7 Days</label>
                                        </div>
                                        <div class="customradio">
                                            <input type="radio" id="eight" class="customradio-box" value="More than 7 days" v-model="filter.duration" @change="submitFilter" name="duration" hidden checked>
                                            <label for="eight" class="customradio-label">More than 7 Days</label>
                                        </div>
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                    
                    </div>
                <div class="modal-footer sticky-bottom  bg-white">
                  <button class="clear" @click="clearAll">Clear</button>
                   <button class="show-btn" data-bs-dismiss="modal" aria-label="Close">
                    Show {{ dataCount }} Packages
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

import PriceRange from '../utils/PriceRange.vue';
import _ from 'lodash';
export default {
  components: { PriceRange },
    name:"HolidayFilter",
    props:['data-count'],
    data(){
        return {
            prices:{},
            filter:{
                air_fare:'',
                duration:''
            },
            priceRange:[0,100],
            firstRange:[0,100],
        }
    },
    mounted(){
        
    },

    computed:{
        priceRangeOptions() {
            let ranges = this.$store.state.holiday?.allData.price_range;
            let min = ranges?.min || 0;
            let max = ranges?.max || 0;
            if(this.holidaySearch?.prices == undefined){
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
       
        holidaySearch(){
            return this.$store.state.holiday?.search;
        },
    },
        
    methods:{
        submitFilter(){
            if(this.prices?.min && this.prices?.max){
                this.filter.prices = this.prices
            }

            const search = Object.assign({}, this.hotelSearch, this.filter);
            this.$store.commit('holidaySearch',search);
            this.$store.dispatch('getHoliday')
        },
        clearAll(){
            this.filter = {
                air_fare:'',
                duration:''
            };
            this.submitFilter();
        },
        setPriceRange: _.debounce(function(data) {
            this.prices.min = data[0];
            this.prices.max = data[1];
            this.submitFilter();
        }, 500),
    },
    
}
</script>

<style>

</style>
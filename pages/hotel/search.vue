<template>
    <div>
        <section class="search pt-5">
            <div class="go-container">
                <div class="bg">
                    <div class="booking-content">
                        <div class="booking-top">
                            <hotel-tab />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- ================== AVILABLE START========================== -->
        <section class="avilable">
            <div class="go-container">
                <div class="avilable-content">
                    <h2 class="text-center text-danger"  v-if="totalData==0"> We do not have any hotels for your desired search.</h2>
                    <div class="avilable-header" v-if="totalData>0">
                        <h3 class="avilable-title">{{totalData}} Available Hotels</h3>
                        <ul class="filter-list">
                            <li class="filter-list-item">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <span>
                                        <svg width="20" height="37" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 11.1914H2.5" stroke="#718096" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M13.5 11.1914H10.5" stroke="#718096" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4.5 5.69141H2.5" stroke="#718096" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M13.5 5.69141H6.5" stroke="#718096" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6.5 4.19141V7.19141" stroke="#718096" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M10.5 12.6914V9.69141" stroke="#718096" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                            
                                            
                                    </span>
                                    Filter
                                </button>
                            </li>
                            
                            <li class="filter-list-item">
                                <div class="customselect py-1">
                                    <div class="select-wrapper">
                                    <div :class="['select', matchStatus && 'open']">
                                        <div class="select-trigger bg-transparent " @click="setMatchStatus">
                                        <span class="selectedvalue">{{matchData==2 ? 'Lowest price' : 'Best Matches' }}</span>
            
                                        <span class="arrow">
                                            <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.46094 8.20078L0.460938 2.20078L1.86094 0.800781L6.46094 5.40078L11.0609 0.800781L12.4609
                                                2.20078L6.46094 8.20078Z" fill="#718096"/>
                                            </svg>
                                                
                                        </span>
                                        </div>
                                        
                                        <div class="custom-options">
                                            <span :class="['custom-option', matchData==1 && 'selected']" @click="setMatchData(1)">Best Matches</span>
                                            <span :class="['custom-option', matchData==2 && 'selected']" @click="setMatchData(2)">Lowest price</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-if="hotelLoader" >
                        <flight-loader />
                        <flight-loader />
                    </div>
                    <div class="avilable-body" v-else>
                        <div class="row g-4 gy-lg-5">
                            <!-- single hotel card -->
                            <single-hotel v-for="(search, i) of searchData" :key="i" :search-data="search" />
                         
                        
                        </div>
                         <!-- Pagination -->
                        <div v-if="totalPage > 1" class="d-flex  align-items-center justify-content-center justify-content-md-end  flex-wrap">
                            <nav aria-label="Page navigation example d-flex">

                            <ul class="pagination">
                                    <li :class="['page-item', page == 1 && 'disabled']"><button class="page-link" @click="paginateData(page-1)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
    </svg>
    </button></li>
                                    <li :class="['page-item', (page == pIndex) && 'active']" v-for="pIndex of totalPage" :key="pIndex"><button class="page-link" @click="paginateData(pIndex)" > {{pIndex}} </button></li>


                                    <li :class="['page-item', page == totalPage && 'disabled']" ><button class="page-link" @click="paginateData(page+1)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
    </svg>
    </button></li>
                                </ul>

                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- ================== AVILABLE END========================== -->
        <div>
            <hotel-filter :data-count="totalData" />
        </div>
        

    </div>
  
</template>

<script>
import HotelTab from '../../components/home/search/HotelTab.vue'
import HotelFilter from '../../components/hotelSearch/HotelFilter.vue'
import SingleHotel from '../../components/hotelSearch/SingleHotel.vue'
import FlightLoader from '../../components/utils/FlightLoader.vue'
export default {
  components: { HotelTab, HotelFilter, SingleHotel, FlightLoader },
    name:'HotelSearch',
  head(){
    return{
      title:"Hotel Search",
    }
  },
  data(){
    return {
        matchData:2,
        matchStatus:false,
    }
  },
  mounted(){
    // remove old localstorage data
    localStorage.removeItem('hotelSelectedRoom');
    localStorage.removeItem('hotelSearch');
  },
  computed:{
        page(){
            return this.$store.state.hotelAllData.page;
        },
        pageSize(){
            return this.$store.state.hotelPageSize
        },
        totalData(){
            return this.$store.state.hotelAllData.count;
        },
        totalPage(){
           return this.$store.state.hotelAllData.total_pages; 
        },
        
        searchData(){
            return this.$store.state.hotelAllData.results
        },
        hotelLoader(){
            return this.$store.state.hotelLoader;
        },
        hotelSearch(){
            return this.$store.state.hotelSearch;
        },
  },
  methods:{
    paginateData(pIndex){
        if(pIndex>0 && pIndex <= this.totalPage){
            this.$store.dispatch('getHotels',{pageSize:this.pageSize,page:pIndex})
            window.scrollTo({top: 300, behavior: 'smooth'});
        }
    },
    setMatchStatus(){
        this.matchStatus = !this.matchStatus;
    },
    setMatchData(data){
        // 'order':'low_price' or 'order': 'best_match'

        this.matchData = data;
        this.matchStatus = false;
        const order = this.matchData == 1 ?'best_match' :'low_price';
        const search = Object.assign({}, this.hotelSearch, {order});
        this.$store.commit('hotelSearch',search);
        this.$store.dispatch('getHotels')
    }
  }
}
</script>

<style>

</style>
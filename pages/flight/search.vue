<template>
    <div>
            <!-- ================== MODIFY SEARCH START========================== -->
        <section class="search pt-5">
            <div class="go-container">
                <div class="bg">
                    <div class="booking-content">
                        <div class="booking-top">
                            <flight-tab />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- ================== MODIFY SEARCH END========================== -->
        
    
    
      <!-- ================ AVILABLE FLIGHT START ===================== -->
        <section class="avilableflights">
            
            <div class="go-container">
                <div class="avilableflights-content">
    
                    <!-- left sidebar  -->
                    <aside class="avilableflights-sidebar">
                       <!-- filter for mobile  -->
                    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasBottomLabel">{{totalData}} Available Flights</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2849 15.5425L7.62804 9.88562L1.97118 15.5425L0.0855651 13.6569L5.74242 8L0.0855651 
                                    2.34315L1.97118 0.457528L7.62804 6.11438L13.2849 0.457527L15.1705 2.34315L9.51366 8L15.1705 13.6569L13.2849 
                                    15.5425Z" fill="#718096"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="offcanvas-body">
                            <div class="sidebar-content d-block d-lg-none">
                               <!-- soldout time -->
                            <div class="soldout-time">
                                <p class="title">Book Now before it gets sold out</p>
                                <div class="d-flex align-items-center ">
                                    <span class="icon">
                                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 21C9.56111 21 8.20467 20.7231 6.93067 20.1693C5.65744 19.6148 4.54444 18.8611 3.59167 
                                                17.9083C2.63889 16.9556 1.88522 15.8426 1.33067 14.5693C0.776889 13.2953 0.5 11.9389 0.5 10.5C0.5 
                                                9.64444 0.597222 8.813 0.791667 8.00567C0.986111 7.19911 1.26806 6.44078 1.6375 5.73067C2.00694 
                                                5.02133 2.4495 4.36061 2.96517 3.7485C3.48006 3.13561 4.05833 2.58611 4.7 2.1L12.6333 10.0333L11 
                                                11.6667L4.7 5.36667C4.11667 6.06667 3.65972 6.8495 3.32917 7.71517C2.99861 8.58006 2.83333 9.50833 
                                                2.83333 10.5C2.83333 12.7556 3.63056 14.6806 5.225 16.275C6.81944 17.8694 8.74444 18.6667 11 
                                                18.6667C13.2556 18.6667 15.1806 17.8694 16.775 16.275C18.3694 14.6806 19.1667 12.7556 19.1667 
                                                10.5C19.1667 8.41944 18.5009 6.6255 17.1693 5.11817C15.837 3.61161 14.1694 2.72222 12.1667 
                                                2.45V4.66667H9.83333V0H11C12.4389 0 13.7953 0.276889 15.0693 0.830667C16.3426 1.38522 17.4556 
                                                2.13889 18.4083 3.09167C19.3611 4.04444 20.1148 5.15744 20.6693 6.43067C21.2231 7.70467 21.5 
                                                9.06111 21.5 10.5C21.5 11.9389 21.2231 13.2953 20.6693 14.5693C20.1148 15.8426 19.3611 16.9556 
                                                18.4083 17.9083C17.4556 18.8611 16.3426 19.6148 15.0693 20.1693C13.7953 20.7231 12.4389 21 11 
                                                21ZM11 17.5C10.6694 17.5 10.3926 17.388 10.1693 17.164C9.94533 16.9408 9.83333 16.6639 9.83333 
                                                16.3333C9.83333 16.0028 9.94533 15.7259 10.1693 15.5027C10.3926 15.2787 10.6694 15.1667 11 
                                                15.1667C11.3306 15.1667 11.6078 15.2787 11.8318 15.5027C12.0551 15.7259 12.1667 16.0028 
                                                12.1667 16.3333C12.1667 16.6639 12.0551 16.9408 11.8318 17.164C11.6078 17.388 11.3306 17.5 
                                                11 17.5ZM16.8333 11.6667C16.5028 11.6667 16.2259 11.5547 16.0027 11.3307C15.7787 11.1074 
                                                15.6667 10.8306 15.6667 10.5C15.6667 10.1694 15.7787 9.89217 16.0027 9.66817C16.2259 
                                                9.44494 16.5028 9.33333 16.8333 9.33333C17.1639 9.33333 17.4408 9.44494 17.664 9.66817C17.888
                                                9.89217 18 10.1694 18 10.5C18 10.8306 17.888 11.1074 17.664 11.3307C17.4408 11.5547 17.1639 
                                                11.6667 16.8333 11.6667ZM5.16667 11.6667C4.83611 11.6667 4.55883 11.5547 4.33483 11.3307C4.11161 
                                                11.1074 4 10.8306 4 10.5C4 10.1694 4.11161 9.89217 4.33483 9.66817C4.55883 9.44494 4.83611 9.33333 
                                                5.16667 9.33333C5.49722 9.33333 5.7745 9.44494 5.9985 9.66817C6.22172 9.89217 6.33333 10.1694 6.33333 
                                                10.5C6.33333 10.8306 6.22172 11.1074 5.9985 11.3307C5.7745 11.5547 5.49722 11.6667 5.16667 11.6667Z" fill="#4A5568"></path>
                                        </svg>
                                    </span>
                                    <span class="time ">{{ countdown }}</span>
                                </div>
                            </div>
                            <!-- Filter Start -->
                            <flight-filter prefix="mobile" :key="maxPrice" />
                            </div>
                        </div>
                
                    </div>
                    <!-- filter for desktop  -->
                        <div class="sidebar-content d-none d-lg-block">
                            <!-- soldout time -->
                            <div class="soldout-time">
                                <p class="title">Book Now before it gets sold out</p>
                                <div class="d-flex align-items-center ">
                                    <span class="icon">
                                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 21C9.56111 21 8.20467 20.7231 6.93067 20.1693C5.65744 19.6148 4.54444 18.8611 3.59167 
                                                17.9083C2.63889 16.9556 1.88522 15.8426 1.33067 14.5693C0.776889 13.2953 0.5 11.9389 0.5 10.5C0.5 
                                                9.64444 0.597222 8.813 0.791667 8.00567C0.986111 7.19911 1.26806 6.44078 1.6375 5.73067C2.00694 
                                                5.02133 2.4495 4.36061 2.96517 3.7485C3.48006 3.13561 4.05833 2.58611 4.7 2.1L12.6333 10.0333L11 
                                                11.6667L4.7 5.36667C4.11667 6.06667 3.65972 6.8495 3.32917 7.71517C2.99861 8.58006 2.83333 9.50833 
                                                2.83333 10.5C2.83333 12.7556 3.63056 14.6806 5.225 16.275C6.81944 17.8694 8.74444 18.6667 11 
                                                18.6667C13.2556 18.6667 15.1806 17.8694 16.775 16.275C18.3694 14.6806 19.1667 12.7556 19.1667 
                                                10.5C19.1667 8.41944 18.5009 6.6255 17.1693 5.11817C15.837 3.61161 14.1694 2.72222 12.1667 
                                                2.45V4.66667H9.83333V0H11C12.4389 0 13.7953 0.276889 15.0693 0.830667C16.3426 1.38522 17.4556 
                                                2.13889 18.4083 3.09167C19.3611 4.04444 20.1148 5.15744 20.6693 6.43067C21.2231 7.70467 21.5 
                                                9.06111 21.5 10.5C21.5 11.9389 21.2231 13.2953 20.6693 14.5693C20.1148 15.8426 19.3611 16.9556 
                                                18.4083 17.9083C17.4556 18.8611 16.3426 19.6148 15.0693 20.1693C13.7953 20.7231 12.4389 21 11 
                                                21ZM11 17.5C10.6694 17.5 10.3926 17.388 10.1693 17.164C9.94533 16.9408 9.83333 16.6639 9.83333 
                                                16.3333C9.83333 16.0028 9.94533 15.7259 10.1693 15.5027C10.3926 15.2787 10.6694 15.1667 11 
                                                15.1667C11.3306 15.1667 11.6078 15.2787 11.8318 15.5027C12.0551 15.7259 12.1667 16.0028 
                                                12.1667 16.3333C12.1667 16.6639 12.0551 16.9408 11.8318 17.164C11.6078 17.388 11.3306 17.5 
                                                11 17.5ZM16.8333 11.6667C16.5028 11.6667 16.2259 11.5547 16.0027 11.3307C15.7787 11.1074 
                                                15.6667 10.8306 15.6667 10.5C15.6667 10.1694 15.7787 9.89217 16.0027 9.66817C16.2259 
                                                9.44494 16.5028 9.33333 16.8333 9.33333C17.1639 9.33333 17.4408 9.44494 17.664 9.66817C17.888
                                                9.89217 18 10.1694 18 10.5C18 10.8306 17.888 11.1074 17.664 11.3307C17.4408 11.5547 17.1639 
                                                11.6667 16.8333 11.6667ZM5.16667 11.6667C4.83611 11.6667 4.55883 11.5547 4.33483 11.3307C4.11161 
                                                11.1074 4 10.8306 4 10.5C4 10.1694 4.11161 9.89217 4.33483 9.66817C4.55883 9.44494 4.83611 9.33333 
                                                5.16667 9.33333C5.49722 9.33333 5.7745 9.44494 5.9985 9.66817C6.22172 9.89217 6.33333 10.1694 6.33333 
                                                10.5C6.33333 10.8306 6.22172 11.1074 5.9985 11.3307C5.7745 11.5547 5.49722 11.6667 5.16667 11.6667Z" fill="#4A5568"></path>
                                        </svg>
                                    </span>
                                    <span class="time ">{{ countdown }}</span>
                                </div>
                            </div>
                            <!-- Filter Start -->
                            <flight-filter prefix="desktop"  :key="maxPrice" />
    
                        </div>
                        <!-- filter button -->
                    <div class="d-lg-none  filtermobile">
                        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                            aria-controls="offcanvasBottom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                            </svg> 
                            filter
                        </button>
                    </div>
                    </aside>
    
                    <!-- right content -->
                    <div class="avilableflights-list" id="avilableflights-list">
                        <!-- flgiht counter -->
                        <div class="flight-counter">
                            <p class="avilable-text">{{totalData}} Available Flights</p>
                            <span class="looking-for"> *Price includes VAT &amp; Tax </span>
                            <!-- <span class="looking-for"> 11 people are looking at this flight.</span> -->
    
                        </div>
                       
                        <!--change 15-->
                        <div class="airline-container">
                            <button class="nav-button left" @click="prevSlide" :disabled="disableLeft"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="nav-button right" @click="nextSlide" :disabled="disableRight"><i class="fa-solid fa-chevron-right"></i></button>
                             <div class="alirline-list">
                            <div class="airline-card css-212"  v-for="airline in visibleAirlines" :key="airline.code" 
                             :class="{ active: $store.state.flightFilter.airlines.includes(airline.code),hovered: hoveredAirline === airline.code }"
                             @click="toggleAirlineSelection(airline.code)"
                             @mouseenter="hoveredAirline = airline.code"
                             @mouseleave="hoveredAirline = null">
                                <img :src="airlineLogo(airline.code)" @error="imageUrlAlt" class="logo" />
                                <div class="details">
                                    <span class="code">{{ airline.code }}</span>
                                    <span class="price">{{ airline.lowestPrice }}</span>
                                </div>
                            </div> 
                        </div>
                        </div>
                         <!-- flight deal buttons -->
                        <div class="FlightDealFilter">
                            <button :class="['flight-dealBtn', (flightFilterData?.type == 'cheap' || !flightFilterData?.type) && 'active']" @click="setFilterData('cheap')">Cheapest<span>BDT: {{cheapestPrice }}</span></button>
                            <button :class="['flight-dealBtn', flightFilterData?.type == 'early' && 'active']" @click="setFilterData('early')">Earliest<span>{{ earliestFlightTime }}</span></button>
                            <button :class="['flight-dealBtn', flightFilterData?.type == 'fast' && 'active']" @click="setFilterData('fast')">Fastest<span>{{ fastestFlightTime }}</span></button>
                        </div>
                        <div v-if="flightLoaderStatus" >
                            <flight-loader/>
                            <flight-loader/>
                            <flight-loader/>
                        </div>
                        
                        <!-- roundtrip flights -->
                        <div class="tripflights" v-else>
                            <!-- single-flight -->
                            <single-flight v-for="(search, i) of searchData" :key="i" :search-data="search" :index="i" />
                             
                             <!-- Pagination -->
                            <!-- <div v-if="totalPage > 1" class="d-flex  align-items-center justify-content-center justify-content-md-end  flex-wrap">
                                <p class="pe-4"> Showing Results {{paginateStart}} - {{paginateEnd}} of {{totalData}}  </p>
                                <nav aria-label="Page navigation example d-flex">
    
                                <ul class="pagination">
                                        <li :class="['page-item', page ==1 && 'disabled']"><button class="page-link" @click="paginateData(page-1)" >
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
                            </div> -->
                            
                            
                        </div>
                    </div>
    
                        
    
    
                </div>
    
            </div>
        </section>
        <!-- ================ AVILABLE FLIGHT END ===================== -->
    </div>
    </template>
    
    <script>
    import FlightFilter from '../../components/flightSearch/FlightFilter.vue'
    import SingleFlight from '../../components/flightSearch/SingleFlight.vue'
    import FlightTab from '../../components/home/search/FlightTab.vue'
    import FlightLoader from '../../components/utils/FlightLoader.vue'
    export default {
      components: { FlightTab, FlightFilter, SingleFlight, FlightLoader },
        head() {
            return {
                title: "Flight Search",
                meta:[
                    {
                    hid: "Description",
                    name:"description",
                    content: "Flight Search"
                    }
                ]
            }
        },
        data(){
            return {
                //searchData: [],
                disable: false,
                // page: 0,
                // pageSize: 10,
                totalTrips:0,
                timeRemaining: 1800,
                countdown: '',
                intervalID: null,
                filter:{
                    airlines:[],
                    prefix:'prefix',
                },
                hoveredAirline: null,
                currentIndex: 0,
                maxVisible: 4, 
            }
        },
        
        mounted(){
            // this.paginateData(1);
            this.queryToState();
            this.countdownMethod();
            window.onload = () => {
                this.scrollIfNecessary()        
            }
            this.applyFilters();
            
        },
        // updated(){
        //     if(this.page==0){
                //this.paginateData(1);
        //     }
        // },
        watch:{
            maxPrice(){
                this.timeRemaining = 1800;
                this.countdownMethod();
            },
            flightLoaderStatus(){
                this.scrollIfNecessary();
            },
            flightData(){
                //this.paginateData(1);
                this.searchData = this.flightData;
            }
        },
        computed:{

            airlines() {
                return this.$store.state.searchSummary?.airlines || [];
            },
            filteredFlights() {
                return this.$store.state.filteredFlights || [];
                },
            maxPrice(){
                let ranges = this.$store.state.searchSummary?.priceRange;
                return ranges.max || 0;
            },
            lowestPrices(){
                const commissionPercent = 7;// 7% commission
                const aitTax = 0.3;// 0.3% AIT tax
                return this.airlines.map(airline => {
                    let lowestPrice = Math.min(
                        ...this.$store.state.flightAllData
                        .filter(flight => flight.directions[0]?.platingCarrier === airline.code)
                        .map(flight => { 
                              // Extract total price and taxes from the flight data
                            let price = flight?.bookingComponents?.price?.totalPrice || '0';
                            let taxes = flight?.bookingComponents?.price?.taxes || '0';

                            // Convert prices to numeric values
                            let totalPriceNum = parseFloat(price.replace(/^\D+/g, ''));
                            let taxesNum = parseFloat(taxes.replace(/^\D+/g, ''));

                            // Calculate the base price (total price - taxes)
                            let basePrice = totalPriceNum - taxesNum;

                            // Calculate commission (7% of the base price)
                            let commissionAmount = basePrice * (commissionPercent / 100);

                            // Calculate agent fare (base price - commission)
                            let agentFare = basePrice - commissionAmount;

                            // Calculate price with taxes
                            let priceWithTaxes = agentFare + taxesNum;

                            // Calculate AIT tax (0.3% of the price with taxes)
                            let aitTaxAmount = priceWithTaxes * (aitTax / 100);

                            // Calculate AIT tax (0.3% of the price with taxes)
                            let finalPrice = priceWithTaxes + aitTaxAmount;

                            return parseFloat(finalPrice.toFixed(0));
                        })
                    );

                    return { ...airline, lowestPrice: lowestPrice && lowestPrice > 0 ? lowestPrice.toLocaleString('en-US') : 'N/A' };
                })

            },
            visibleAirlines() {
                return this.lowestPrices.slice(this.currentIndex, this.currentIndex + this.maxVisible);
                },
            disableLeft() {
            return this.currentIndex === 0;
            },
            disableRight() {
            return this.currentIndex + this.maxVisible >= this.lowestPrices.length;
            },
            //change 15
            cheapestPrice() {
                return this.$store.getters.cheapestPrice;
                },
                earliestFlightTime() {
                    const earliestFlight = this.$store.getters.earliestFlight;
                    if (earliestFlight) {
                        // Extract and format the departure time
                        let departureTime = new Date(earliestFlight.directions[0].segments[0].departure);
                        return departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    }
                    return null;
                    },fastestFlightTime() {
                    const fastestFlight = this.$store.getters.fastestFlight;
                    if (fastestFlight) {
                        // Extract and format the departure and arrival time
                        const segments = fastestFlight.directions[0].segments;
                        const departureTime = new Date(segments[0].departure);
                        const arrivalTime = new Date(segments[segments.length - 1].arrival);
                        const duration = (arrivalTime - departureTime) / (1000 * 60); // Duration in minutes

                        // Format duration to hours and minutes (e.g., "2h 15m")
                        const hours = Math.floor(duration / 60);
                        const minutes = duration % 60;
                        return `${hours}Hr ${minutes}Min`;
                    }
                    return null;
                    },
                    //change end 15
            totalData(){
                return this.$store.state.flightData.length;
            },
            // totalPage(){
            //    return Math.ceil(this.$store.state.flightData.length/this.pageSize); 
            // },
            // paginateStart(){
            //     let start = (this.page - 1) * this.pageSize;
            //     return start + 1;
            // },
            // paginateEnd(){
            //     let end = this.page * this.pageSize;
            //     if(this.page == this.totalPage){
            //         end = this.totalData;
            //     }
            //     return end;
            // },
            
            flightFilterData(){
                return this.$store.state.flightFilter;
            },
            flightData(){
                return this.$store.state.flightData;
            },
            flightLoaderStatus(){
                return this.$store.state.flightLoader;
            },
            searchData() {
                return this.flightData; 
                }
            
            // searchData: {
            //     set(){
            //         //this.$elog("hello");
            //         //this.page = 1;
            //     },
            //     get(){
            //         return this.flightData.slice((this.paginateStart-1), this.paginateEnd)
            //     }
            // },
        },
      methods:{
        toggleAirlineSelection(code) {
            const currentAirlines = [...this.$store.state.flightFilter.airlines];
            const index = currentAirlines.indexOf(code);

            if (index === -1) {
            currentAirlines.push(code); // Add airline if not present
            } else {
            currentAirlines.splice(index, 1); // Remove airline if already present
            }

            // Dispatch action to update the filter
            this.$store.dispatch('flightFilter', {
            ...this.$store.state.flightFilter,
            airlines: [code], // Replace with the new airline selection
            });
        },
    
        nextSlide() {
            if (this.currentIndex + 1 < this.lowestPrices.length) {
        this.currentIndex += 1; // Move one item forward
      }
    },
    prevSlide() {
        if (this.currentIndex > 0) {
        this.currentIndex -= 1; // Move one item back
      }
    },
        // after complete search it scroll to list
        scrollIfNecessary(){
            if(this.flightLoaderStatus == false){
                const targetElement = document.getElementById('avilableflights-list');
                const windowWidth = window.innerWidth;
                let yOffset = -220; // desktop issue
                if (windowWidth < 992) {
                    // Scroll using scrollIntoView()
                    //targetElement.scrollIntoView({ behavior: 'smooth' });
                    yOffset = 90;   
                }
                const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        },
        // paginateData(pIndex){
        //     this.$store.commit("flightLoader", true);
        //     if(pIndex>0 && pIndex <= this.totalPage){
        //         this.searchData = [];
        //         this.page = pIndex;
        //         this.searchData = this.flightData.slice((this.paginateStart-1), this.paginateEnd);
        //         if(this.searchData.length == 0 && this.page > 1){
        //           //
        //         }
        //         window.scrollTo({top: 300, behavior: 'smooth'});
        //     }
        //     window.setTimeout(()=>{
        //         this.$store.commit("flightLoader", false);
        //     },300)
        // },
        queryToState() {
          let query = this.$route.query;
          if (query.trips) {
            let trips = query.trips.split(",");
            this.totalTrips = trips.length;
          }
        },
        setFilterData(type){
        // set filter data to store
            this.$store.dispatch('flightFilter',{
                ...this.flightFilterData,
                type
            });
       },
       countdownMethod(){
        clearInterval(this.intervalID);
        this.intervalID = setInterval(() => {
            if (this.timeRemaining > 0) {
                this.timeRemaining--
                const minutes = Math.floor(this.timeRemaining / 60)
                const seconds = this.timeRemaining % 60
                this.countdown = `${minutes}:${seconds.toString().padStart(2, '0')}`
            } else {
                this.countdown = 'Time is up!';
                clearInterval(this.intervalID);
                this.$toast.warning("Search again for your desired flight.");
                this.$router.push("/");
            }
        }, 1000)
       },
      
       applyFilters(){
        this.$store.dispatch("flightDataFilter",{
            airlines: this.filter.airlines,

        })

       },
       airlineLogo(code) {
      return `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${code}.png`;
    },
    // Fallback image if logo fails to load
    imageUrlAlt(event) {
      event.target.src = "https://thefinancialexpress.com.bd/public/uploads/1578301226.jpg";
    },
      },
    
    }
    </script>
    
    <style>
   
  
 
    
    </style>
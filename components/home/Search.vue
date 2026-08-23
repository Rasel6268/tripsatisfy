<template>
    <section class="booking" id="search-box">
        <div class="go-container">
            <div class="bg">
                <div class="booking-content">
                    <div class="booking-top">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item first" role="presentation">
                                <button :class="['nav-link', currentRoute == '/' && 'active']" id="flight-tab" data-bs-toggle="tab" data-bs-target="#flight" type="button"
                                    role="tab" aria-controls="home" aria-selected="true">Flight</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button :class="['nav-link', currentRoute == '/hotel' && 'active']" id="hotel-tab" data-bs-toggle="tab" data-bs-target="#hotel" type="button" role="tab"
                                    aria-controls="profile" aria-selected="false">Hotel</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button :class="['nav-link', currentRoute == '/holiday' && 'active']" id="holiday-tab" data-bs-toggle="tab" data-bs-target="#holiday" type="button"
                                    role="tab" aria-controls="contact" aria-selected="false">Holiday</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button :class="['nav-link', currentRoute == '/visa' && 'active']" id="visa-tab" data-bs-toggle="tab" data-bs-target="#visa" type="button" role="tab"
                                    aria-controls="contact" aria-selected="false">Visa</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div :class="['tab-pane fade', currentRoute == '/' && 'show active']" id="flight" role="tabpanel" aria-labelledby="home-tab">
                                <!-- flight tab -->
                                <FlightTab />
                            </div>
                            <div :class="['tab-pane fade', currentRoute == '/hotel' && 'show active']" id="hotel" role="tabpanel" aria-labelledby="profile-tab">

                                <!-- Hotel tab -->
                                <HotelTab />
                                
                            </div>
                            <div :class="['tab-pane fade', currentRoute == '/holiday' && 'show active']" id="holiday" role="tabpanel" aria-labelledby="contact-tab">

                                <!-- Holiday -->
                                <HolidayTab />

                            </div>
                            <div :class="['tab-pane fade', currentRoute == '/visa' && 'show active']" id="visa" role="tabpanel" aria-labelledby="contact-tab">
                                <!-- Visa tab -->
                                 <VisaTab />
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </section>
    <!-- ================== BOOKING END========================== -->
</template>

<script>
import FlightTab from './search/FlightTab.vue';
import HolidayTab from './search/HolidayTab.vue';
import HotelTab from './search/HotelTab.vue';
import VisaTab from './search/VisaTab.vue';
export default {
    name:"Search",
  components: { FlightTab, HotelTab, HolidayTab, VisaTab },
    mounted: ()=>{
       
    },

    computed:{
        currentRoute(){
            return this.$route.path;
        }
    },
}
</script>
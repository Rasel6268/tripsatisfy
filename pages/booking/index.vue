<template>
  <!-- ============== MY Booking  START================== -->
  <section class="myaccount mw-100">
    <div class="go-container">
      <div class="myaccount-content">
        <profile-aside />

        <div class="profile-content">
          <div class="mybooking-filter" role="tablist">
            <button
              class="mybooking-filter-btn"
              :class="['mybooking-filter-btn', (!booking || booking =='flight') && 'active']"
              data-bs-toggle="tab"
              data-bs-target="#fligh-tab-pane"
              id="flight-tab"
            >
              Flights
            </button>
            <button
              :class="['mybooking-filter-btn', booking && booking =='hotel' && 'active']"
              data-bs-toggle="tab"
              id="hotel-tab"
              data-bs-target="#hotel-tab-pane"
            >
              Hotel
            </button>
            <button
              :class="['mybooking-filter-btn', booking && booking =='holiday' && 'active']"
              data-bs-toggle="tab"
              id="holiday-tab"
              data-bs-target="#holiday-tab-pane"
            >
              Holiday
            </button>
            <button
              :class="['mybooking-filter-btn', booking && booking =='visa' && 'active']"
              data-bs-toggle="tab"
              id="visa-tab"
              data-bs-target="#visa-tab-pane"
            >
              Visa
            </button>
          </div>

          <div class="tab-content" id="myTabContent">
            <!-- flight booking tab  -->
            <div
              :class="['tab-pane fade', (!booking || booking =='flight') && 'show active']"
              id="fligh-tab-pane"
              role="tabpanel"
              aria-labelledby="flight-tab"
              tabindex="0"
            >
              <div class="booking-cards">
                <!-- single card -->
                <single-flight :balance="balance" v-for="(flight, i) of flights" :key="i" :flight-data="flight" :id="flight.id" />
                <!-- End single card -->
              </div>
            </div>

            <!-- Hotel booking tab  -->
            <div
            :class="['tab-pane fade', booking && booking =='hotel' && 'show active']"
              id="hotel-tab-pane"
              role="tabpanel"
              aria-labelledby="hotel-tab"
              tabindex="0"
            >
              <div class="booked__cards">
                <!-- single hotel booked card -->
                <div class="booked__card" v-for="(hotel, hotelIndex) of hotels" :key="hotelIndex">
                  <div class="booked__card-header">
                    <div class="booking__id">
                      <span>Transection: {{hotel.tran_id}} </span>
                    </div>

                    <div class="confirm">
                      <button class="confirm__btn capitalize">{{hotel.status}}</button>
                    </div>
                  </div>
                  <div class="booked__card-body">
                    <div class="row">
                      <div class="col-lg-7 col-xl-8 custom-border">
                        <div class="names__info">
                          <div class="left">
                            <h3 class="name">{{hotel.hotel.name}}</h3>
                            <div class="location-box">
                              <div class="location-icon">
                                <span>
                                  <svg
                                    width="22"
                                    height="31"
                                    viewBox="0 0 22 31"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.1094 21.8707C13.5844 19.8707 15.4534 17.9457 16.7164 16.0957C17.9784 14.2457 18.6094 12.5082 18.6094 10.8832C18.6094 9.4832 18.3534 8.2892 17.8414 7.3012C17.3284 6.3142 16.6969 5.5142 15.9469 4.9012C15.1969 4.2892 14.3844 3.8457 13.5094 3.5707C12.6344 3.2957 11.8344 3.1582 11.1094 3.1582C10.3844 3.1582 9.58437 3.2957 8.70937 3.5707C7.83437 3.8457 7.02187 4.2892 6.27187 4.9012C5.52187 5.5142 4.89087 6.3142 4.37888 7.3012C3.86588 8.2892 3.60938 9.4832 3.60938 10.8832C3.60938 12.5082 4.24038 14.2457 5.50238 16.0957C6.76538 17.9457 8.63437 19.8707 11.1094 21.8707ZM11.1094 25.6582C7.58438 23.0582 4.95288 20.5332 3.21487 18.0832C1.47787 15.6332 0.609375 13.2332 0.609375 10.8832C0.609375 9.1082 0.928375 7.5517 1.56638 6.2137C2.20337 4.8767 3.02188 3.7582 4.02188 2.8582C5.02188 1.9582 6.14687 1.2832 7.39687 0.833203C8.64687 0.383203 9.88437 0.158203 11.1094 0.158203C12.3344 0.158203 13.5719 0.383203 14.8219 0.833203C16.0719 1.2832 17.1969 1.9582 18.1969 2.8582C19.1969 3.7582 20.0159 4.8767 20.6539 6.2137C21.2909 7.5517 21.6094 9.1082 21.6094 10.8832C21.6094 13.2332 20.7404 15.6332 19.0024 18.0832C17.2654 20.5332 14.6344 23.0582 11.1094 25.6582ZM11.1094 13.6582C11.9344 13.6582 12.6409 13.3642 13.2289 12.7762C13.8159 12.1892 14.1094 11.4832 14.1094 10.6582C14.1094 9.8332 13.8159 9.1267 13.2289 8.5387C12.6409 7.9517 11.9344 7.6582 11.1094 7.6582C10.2844 7.6582 9.57838 7.9517 8.99137 8.5387C8.40338 9.1267 8.10938 9.8332 8.10938 10.6582C8.10938 11.4832 8.40338 12.1892 8.99137 12.7762C9.57838 13.3642 10.2844 13.6582 11.1094 13.6582ZM0.609375 30.1582V27.1582H21.6094V30.1582H0.609375Z"
                                      fill="#718096"
                                    />
                                  </svg>
                                </span>
                              </div>
                              <div class="location-text" v-html="hotel.hotel.address">
                              </div>
                            </div>
                          </div>
                          <div class="right">
                            <span class="contact-title">Contact Person: </span>
                            <span class="contact-name"> {{hotel.primary_guest_name}} </span>
                            <span class="contact-title">Contact Number: </span>
                            <span class="contact-name"> {{hotel.primary_guest_contact}} </span>
                          </div>
                        </div>

                        <div class="dates__info">
                          <div class="check__dates">
                            <div class="check__box">
                              <div class="checkin">
                                <span class="checkin-title">Check-in Date</span>
                                <span class="checkin-date">{{$moment(hotel.check_in, "YYYY-MM-DD").format("DD MMM YYYY")}}</span>
                              </div>
                              <div class="checkout">
                                <span class="checkout-title"
                                  >Check-out Date</span
                                >
                                <span class="checkout-date">{{$moment(hotel.check_out, "YYYY-MM-DD").format("DD MMM YYYY")}}</span>
                              </div>
                            </div>
                          </div>
                          <div class="guests">
                            <div class="guest__box">
                              <span class="guest-title">Guest</span>
                              <div class="guest-count">
                                <span> {{hotelGuest(hotel.guest_names)}} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-5 col-xl-4">
                        <div class="right-col">
                          <table class="total-table">
                            <tr v-for="(room,i) of hotel.booking_rooms" :key="hotelIndex+'-'+i">
                              <td class="first">
                                <div class="title-wrapper">
                                  <span>
                                    {{room.room.name}}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <span v-if="room.room?.regular_price_per_night">{{room.room?.regular_price_per_night - ((hotel.hotel.discount_percentage / 100) * room.room?.regular_price_per_night)}} x {{hotelDayDifference(hotel.check_in,hotel.check_out)}}</span>
                              </td>
                              <td>
                                <span v-if="room.room?.regular_price_per_night"> BDT {{((room.room?.regular_price_per_night - ((hotel.hotel.discount_percentage / 100) * room.room?.regular_price_per_night)) * hotelDayDifference(hotel.check_in,hotel.check_out))?.toLocaleString() || ''}}</span>
                              </td>
                            </tr>
                            <tr v-if="hotel.coupon_discount_amount>0">
                              <td colspan="2">
                                  <span> Discount </span>
                              </td>
                              <td>
                                <span> - BDT  {{hotel.coupon_discount_amount}} </span>
                              </td>
                            </tr>
                            
                          </table>

                          <div class="price border-top">
                            <span>BDT {{hotel.total_amount?.toLocaleString() || ""}} </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Holiday booking tab   -->
            <div
              :class="['tab-pane fade', booking && booking =='holiday' && 'show active']"
              id="holiday-tab-pane"
              role="tabpanel"
              aria-labelledby="holiday-tab"
              tabindex="0"
            >
              <div class="booked__cards">
                <!-- single holiday  booked card -->
                <div class="booked__card visa__booked-card" v-for="(holiday, hIndex) of holidays" :key="hIndex">
                  <div class="booked__card-header">
                    <div class="booking__id">
                      <span>Transection: {{holiday.tran_id}} </span>
                    </div>

                    <div class="confirm">
                      <button class="confirm__btn"> {{holiday.status || 'Pending'}}</button>
                    </div>
                  </div>
                  <div class="booked__card-body">
                    <div class="row">
                      <div class="col-lg-7 col-xl-8 custom-border">
                        <div class="names__info">
                          <div class="left">
                            <div class="name-box">
                              <h3 class="name">
                                {{holiday?.holiday?.name}}
                              </h3>
                              <span class="val"> {{holiday?.holiday?.duration}} </span>
                            </div>
                            <div class="location-box">
                              <div class="location-icon">
                                <span>
                                  <svg
                                    width="22"
                                    height="31"
                                    viewBox="0 0 22 31"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.1094 21.8707C13.5844 19.8707 15.4534 17.9457 16.7164 16.0957C17.9784 14.2457 18.6094 12.5082 18.6094 10.8832C18.6094 9.4832 18.3534 8.2892 17.8414 7.3012C17.3284 6.3142 16.6969 5.5142 15.9469 4.9012C15.1969 4.2892 14.3844 3.8457 13.5094 3.5707C12.6344 3.2957 11.8344 3.1582 11.1094 3.1582C10.3844 3.1582 9.58437 3.2957 8.70937 3.5707C7.83437 3.8457 7.02187 4.2892 6.27187 4.9012C5.52187 5.5142 4.89087 6.3142 4.37888 7.3012C3.86588 8.2892 3.60938 9.4832 3.60938 10.8832C3.60938 12.5082 4.24038 14.2457 5.50238 16.0957C6.76538 17.9457 8.63437 19.8707 11.1094 21.8707ZM11.1094 25.6582C7.58438 23.0582 4.95288 20.5332 3.21487 18.0832C1.47787 15.6332 0.609375 13.2332 0.609375 10.8832C0.609375 9.1082 0.928375 7.5517 1.56638 6.2137C2.20337 4.8767 3.02188 3.7582 4.02188 2.8582C5.02188 1.9582 6.14687 1.2832 7.39687 0.833203C8.64687 0.383203 9.88437 0.158203 11.1094 0.158203C12.3344 0.158203 13.5719 0.383203 14.8219 0.833203C16.0719 1.2832 17.1969 1.9582 18.1969 2.8582C19.1969 3.7582 20.0159 4.8767 20.6539 6.2137C21.2909 7.5517 21.6094 9.1082 21.6094 10.8832C21.6094 13.2332 20.7404 15.6332 19.0024 18.0832C17.2654 20.5332 14.6344 23.0582 11.1094 25.6582ZM11.1094 13.6582C11.9344 13.6582 12.6409 13.3642 13.2289 12.7762C13.8159 12.1892 14.1094 11.4832 14.1094 10.6582C14.1094 9.8332 13.8159 9.1267 13.2289 8.5387C12.6409 7.9517 11.9344 7.6582 11.1094 7.6582C10.2844 7.6582 9.57838 7.9517 8.99137 8.5387C8.40338 9.1267 8.10938 9.8332 8.10938 10.6582C8.10938 11.4832 8.40338 12.1892 8.99137 12.7762C9.57838 13.3642 10.2844 13.6582 11.1094 13.6582ZM0.609375 30.1582V27.1582H21.6094V30.1582H0.609375Z"
                                      fill="#718096"
                                    />
                                  </svg>
                                </span>
                              </div>
                              <div class="location-text">
                                <span> {{holiday?.holiday?.address}} </span>
                              </div>

                              <div class="check__dates">
                                <div class="check__box">
                                  <div class="checkout">
                                    <span class="checkout-title"
                                      >Travel date</span
                                    >
                                    <span class="checkout-date"> {{$moment(holiday.others.travel_date, "YYYY-MM-DD").format("DD MMM YY")}} </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-5 col-xl-4">
                        <div class="right-col">
                          <table class="total-table">
                            <tr>
                              <th>{{holiday.others.person}} Person<span v-if="holiday.others.person>1">s</span> <span v-else> Single </span> </th>
                            </tr>

                            <tr>
                              <td class="first">
                                <div class="title-wrapper">
                                  <span> Base Fare </span>
                                </div>
                              </td>
                              <td>
                                <span> {{holiday?.holiday?.cost_per_person}} x {{holiday.others.person}}</span>
                              </td>
                              <td>
                                <span>BDT {{(holiday?.holiday?.cost_per_person * holiday.others.person)?.toLocaleString() || ''}} </span>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="2">
                                <span> TS Convenience Fee </span>
                              </td>
                              <td>
                                <span>BDT {{holiday.convenience_fee}}</span>
                              </td>
                            </tr>
                            <tr v-if="holiday.coupon_discount_amount>0">
                              <td colspan="2">
                                  <span> Discount </span>
                              </td>
                              <td>
                                <span> - BDT  {{holiday.coupon_discount_amount}} </span>
                              </td>
                            </tr>
                          </table>

                          <div class="price border-top">
                            <span>BDT {{holiday.total_amount?.toLocaleString() || ""}} </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visa booking tab   -->
            <div
              :class="['tab-pane fade', booking && booking =='visa' && 'show active']"
              id="visa-tab-pane"
              role="tabpanel"
              aria-labelledby="contact-tab"
              tabindex="0"
            >
              <div class="booked__cards">
                <!-- single visa booked card -->
                <div class="booked__card visa__booked-card" v-for="(visa, vIndex) of visaBooking" :key="vIndex">
                  <div class="booked__card-header">
                    <div class="booking__id">
                      <span>Transection: {{visa.tran_id}} </span>
                    </div>

                    <div class="confirm">
                      <button class="confirm__btn">{{visa.status}}</button>
                    </div>
                  </div>
                  <div class="booked__card-body">
                    <div class="row">
                      <div class="col-lg-7 col-xl-8 custom-border">
                        <div class="names__info">
                          <div class="left">
                            <div class="name-box">
                              <h3 class="name">
                                {{visa.visa_type.name}} Type: {{visa.visa_type.type}}
                              </h3>
                              <span class="val">Val. {{visa.visa_type.validity}} Days</span>
                            </div>
                            <div class="location-box">
                              <div class="location-icon">
                                <span>
                                  <svg
                                    width="22"
                                    height="31"
                                    viewBox="0 0 22 31"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.1094 21.8707C13.5844 19.8707 15.4534 17.9457 16.7164 16.0957C17.9784 14.2457 18.6094 12.5082 18.6094 10.8832C18.6094 9.4832 18.3534 8.2892 17.8414 7.3012C17.3284 6.3142 16.6969 5.5142 15.9469 4.9012C15.1969 4.2892 14.3844 3.8457 13.5094 3.5707C12.6344 3.2957 11.8344 3.1582 11.1094 3.1582C10.3844 3.1582 9.58437 3.2957 8.70937 3.5707C7.83437 3.8457 7.02187 4.2892 6.27187 4.9012C5.52187 5.5142 4.89087 6.3142 4.37888 7.3012C3.86588 8.2892 3.60938 9.4832 3.60938 10.8832C3.60938 12.5082 4.24038 14.2457 5.50238 16.0957C6.76538 17.9457 8.63437 19.8707 11.1094 21.8707ZM11.1094 25.6582C7.58438 23.0582 4.95288 20.5332 3.21487 18.0832C1.47787 15.6332 0.609375 13.2332 0.609375 10.8832C0.609375 9.1082 0.928375 7.5517 1.56638 6.2137C2.20337 4.8767 3.02188 3.7582 4.02188 2.8582C5.02188 1.9582 6.14687 1.2832 7.39687 0.833203C8.64687 0.383203 9.88437 0.158203 11.1094 0.158203C12.3344 0.158203 13.5719 0.383203 14.8219 0.833203C16.0719 1.2832 17.1969 1.9582 18.1969 2.8582C19.1969 3.7582 20.0159 4.8767 20.6539 6.2137C21.2909 7.5517 21.6094 9.1082 21.6094 10.8832C21.6094 13.2332 20.7404 15.6332 19.0024 18.0832C17.2654 20.5332 14.6344 23.0582 11.1094 25.6582ZM11.1094 13.6582C11.9344 13.6582 12.6409 13.3642 13.2289 12.7762C13.8159 12.1892 14.1094 11.4832 14.1094 10.6582C14.1094 9.8332 13.8159 9.1267 13.2289 8.5387C12.6409 7.9517 11.9344 7.6582 11.1094 7.6582C10.2844 7.6582 9.57838 7.9517 8.99137 8.5387C8.40338 9.1267 8.10938 9.8332 8.10938 10.6582C8.10938 11.4832 8.40338 12.1892 8.99137 12.7762C9.57838 13.3642 10.2844 13.6582 11.1094 13.6582ZM0.609375 30.1582V27.1582H21.6094V30.1582H0.609375Z"
                                      fill="#718096"
                                    />
                                  </svg>
                                </span>
                              </div>
                              <div class="location-text">
                                <span>Visa for {{ visa?.visa_type?.visa?.country }}</span>
                              </div>

                              <div class="check__dates">
                                <div class="check__box">
                                  <div class="checkin">
                                    <span class="checkin-title"
                                      >Check-in Date</span
                                    >
                                    <span class="checkin-date"> {{$moment(visa.date_of_entry, "YYYY-MM-DD").format("DD MMM YY")}} </span
                                    >
                                  </div>
                                  <div class="checkout">
                                    <span class="checkout-title"
                                      >Check-out Date</span
                                    >
                                    <span class="checkout-date"> {{$moment(visa.date_of_exit, "YYYY-MM-DD").format("DD MMM YY")}} </span
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-5 col-xl-4">
                        <div class="right-col">
                          <table class="total-table">
                            <tr>
                              <th>Travellers {{visa.person.length}} </th>
                            </tr>
                            <tr>
                              <td class="first">
                                <div class="title-wrapper">
                                  <span>Visa Fee </span>
                                </div>
                              </td>
                              <td>
                                <span>{{visa.visa_type?.price?.toLocaleString() || ''}} x {{visa.person.length}}</span>
                              </td>
                              <td>
                                <span>BDT  {{(visa.visa_type.price * visa.person.length)?.toLocaleString() || ''}} </span>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                  <span> TS Convenience Fee </span>
                              </td>
                              <td>
                                <span>BDT  {{visa?.convenience_fee}} </span>
                              </td>
                            </tr>
                            <tr v-if="visa.discount_amount>0">
                              <td colspan="2">
                                  <span> Discount </span>
                              </td>
                              <td>
                                <span> - BDT  {{visa.discount_amount}} </span>
                              </td>
                            </tr>
                          </table>

                          <div class="price border-top">
                            <span>BDT {{visa.total_amount.toLocaleString() || ''}} </span>
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
  </section>
  <!-- =========== MY Booking END============== -->
</template>

<script>
import SingleFlight from '../../components/booking/singleFlight.vue';
import ProfileAside from "../../components/profile/ProfileAside.vue";
export default {
  middleware: "auth",
  components: { ProfileAside, SingleFlight },
  name: "MyBooking",
  head(){
    return {
      title:'My Booking'
    }
  },
  data(){
    return {
      flights:[],
      hotels:[],
      holidays:[],
      visaBooking:[],
      balance:0,
    }
  },
  mounted() {
    this.getBooking();
    this.getBalance();
  },
  computed:{
    booking(){
      return this.$route.params.booking;
    },
    userInfo() {
        return {
            ...this.$store.state.userInfo,
        };
    },
    
  },
  methods: {
    getBooking() {
      this.$axios
        .get("/my-booking")
        .then((res) => {
          this.$log(res.data); //instead of console log
          this.flights = res.data.flight_booking;
          this.$log(res.data.flight_booking);
          this.hotels = res.data.hotel_booking;
          this.holidays = res.data.holiday_booking;
          this.visaBooking = res.data.visa_booking;
        })
        .catch((err) => {
          err.response;
        });
    },
    hotelGuest(guests){
      let adults = 0;
      let child = 0;
      for(let g of guests){
       adults += parseInt(g.guests?.adult?.length || 0)
       child += parseInt(g.guests?.child?.length || 0)
      }
      let string = `Adult ${adults} `;
      if(child>0){
        string+=`Child ${child}`
      }
      return string
    },
    hotelDayDifference(checkInDate,checkOutDate) {
      let checkIn = this.$moment(checkInDate);
      let checkOut = this.$moment(checkOutDate);
      var daysDiff = checkOut.diff(checkIn, "days");
      if(isNaN(parseInt(daysDiff + 1))){
        return 1
      }
      return parseInt(daysDiff + 1);
    },
    async getBalance() {
            if (this.userInfo.customer_type == 'B2B') {
            this.$axios
                .get(`/customer-b2b-balance`)
                .then((res) => {
                    this.balance = res.data?.current_balance
                })
                .catch((err) => {
                    this.$elog(err.response.data);

                });
            }
        },
  },
};
</script>

<style>
</style>
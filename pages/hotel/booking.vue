<template>
  <section class="customer-details">
    <div class="go-container">
      <div class="customer-details-content">
        <!-- CUSTOMER DETAILS HEADER -->
        <div class="customer-details-header">
          <h3 class="customer-details-title">Customer Details</h3>
          <p class="customer-details-description">
            Please fill in with valid information. first served basis. We’ll
            send yours <br />
            right after you book.
          </p>
        </div>

        <!-- CUSTOMER DETAILS BODY -->
        <div class="customer-details-body">
          <div class="row g-4">
            <div class="col-lg-8">
              <div class="details-container">
                <!-- TWIN BED NON SMOKING   -->
                <div class="guestinfo-card" v-for="(room, i) of rooms" :key="i">
                  <div class="guestinfo-card-header">
                    <h3 class="guestinfo-card-title" v-if="room?.room?.name">{{ room?.room?.name }}</h3>
                  </div>
                  <div class="guestinfo-card-body" v-if="bookingRooms[i]">
                    <div
                      class="input-box2"
                      v-for="adt of room?.person.adt"
                      :key="'adt-' + i + adt"
                    >
                      <label for="guest1" class="input-label"
                        >Guest {{ adt }} Name (Adult) <span class="text-danger">*</span> :</label
                      >
                      <input
                        type="text"
                        v-model="bookingRooms[i].guests.adult[adt - 1]"
                        class="input-field"
                        placeholder="Given Name"
                      />
                    </div>
                    <div
                      class="input-box2"
                      v-for="child of room?.person.child"
                      :key="'child-' + i + child"
                    >
                      <label for="guest1"
                        >Guest {{ parseInt(room?.person.adt) + child }} Name
                        (Child) :</label
                      >
                      <input
                        v-if="bookingRooms[i].guests.child"
                        type="text"
                        v-model="bookingRooms[i].guests.child[child - 1]"
                        class="input-field"
                        placeholder="Given Name"
                      />
                    </div>
                  </div>
                </div>

                <!-- Primary Contact   -->
                <div class="guestinfo-card">
                  <div class="guestinfo-card-header">
                    <h3 class="guestinfo-card-title">Primary Contact</h3>
                  </div>
                  <div class="guestinfo-card-body">
                    <div class="input-box2">
                      <label for="guest1" class="input-label"
                        >Guest Name <span class="text-danger">*</span> :
                      </label>
                      <!-- custom select -->
                      <div class="select-wrapper">
                        <div class="select" id="selectGuest">
                          <div
                            class="select-trigger"
                            @click="primaryGuestTriger"
                          >
                            <span class="selectedvalue">
                              {{ primaryGuest.name || "Select" }}
                            </span>

                            <span class="arrow">
                              <svg
                                width="13"
                                height="6"
                                viewBox="0 0 13 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0.958496 0L6.50016 6L12.0418 0H0.958496Z"
                                  fill="#B5B5BD"
                                />
                              </svg>
                            </span>
                          </div>

                          <div class="custom-options">
                            <span
                              :class="[
                                'custom-option',
                                primaryGuest.name == guestName && 'selected',
                              ]"
                              v-for="(guestName, i) of guestList"
                              :key="i"
                              @click="selectGuestName(guestName)"
                            >
                              {{ guestName }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span class="text-danger small-text" v-if="errors.primaryGuest.name"> Primary guest name can not be null! </span>
                    </div>
                    <div class="input-box2">
                      <label for="guestContact">Contact Number <span class="text-danger">*</span> :</label>
                      <input
                        type="number"
                        v-model="primaryGuest.contact"
                        id="guestContact"
                        class="input-field"
                        placeholder="+88"
                        minlength="10"
                        @keyup="errors.primaryGuest.contact = false"
                      />
                      <span class="text-danger small-text" v-if="errors.primaryGuest.contact"> Primary contact number can not be null! </span>

                    </div>
                  </div>
                </div>

                <!-- let us know   -->
                <div class="guestinfo-card">
                  <div class="guestinfo-card-header">
                    <h3 class="guestinfo-card-title">
                      Let us know what you need
                    </h3>
                    <p class="guestinfo-card-text">
                      Requests are fulfilled on a first come, first served
                      basis. We’ll send <br />
                      yours right after you book.
                    </p>
                  </div>
                  <div class="guestinfo-card-body">
                    <!-- radio box 1 -->
                    <div class="radio-box">
                      <div class="radio-box-header">
                        <h3 class="radio-box-title">
                          Do you have a smoking preference?
                        </h3>
                      </div>
                      <div class="radio-box-body">
                        <div class="customradio">
                          <input
                            type="radio"
                            id="smoker"
                            v-model="isSmoker"
                            class="customradio-box"
                            name="hotel-trip"
                            value="True"
                            hidden
                          />
                          <label for="smoker" class="customradio-label"
                            >Yes</label
                          >
                        </div>
                        <div class="customradio">
                          <input
                            type="radio"
                            v-model="isSmoker"
                            id="nonsmoker"
                            class="customradio-box"
                            value="False"
                            name="hotel-trip"
                            hidden
                          />
                          <label for="nonsmoker" class="customradio-label"
                            >No</label
                          >
                        </div>
                      </div>
                    </div>

                    <!-- checkbox  -->
                    <div class="check-box">
                      <div class="check-box-header">
                        <h3 class="check-box-title">
                          Click here for more requests
                        </h3>
                      </div>
                      <div class="check-box-body">
                        <div class="row g-0">
                          <div class="col-md-6 col-xl-4">
                            <div class="customcheck mb-2">
                              <input
                                type="checkbox"
                                v-model="moreRequest"
                                value="I’d like a room on a high floor"
                                id="more1"
                                class="customcheck-box"
                                name="more-request"
                                hidden
                              />
                              <label for="more1" class="customcheck-label"
                                >I’d like a room on a high floor</label
                              >
                            </div>
                          </div>
                          <div class="col-md-6 col-xl-4">
                            <div class="customcheck mb-2">
                              <input
                                type="checkbox"
                                v-model="moreRequest"
                                value="I’d like a quiet room"
                                id="more3"
                                class="customcheck-box"
                                name="more-request"
                                hidden
                              />
                              <label for="more3" class="customcheck-label"
                                >I’d like a quiet room</label
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="guestinfo-card">
                <!-- coupon box -->
                <div class="coupon">
                  <h4 class="coupon-title">Have a coupon?</h4>
                  <div class="coupon-box">
                    <input
                      type="text"
                      placeholder="Write down your coupon code"
                      v-model="coupon.code"
                      class="inputfield"
                      @keyup="couponOnchange"
                    />
                    <button class="btn-coupon" @click="applyCoupon">
                      Apply
                    </button>
                  </div>
                  <p class="text-success" v-if="coupon.success">
                    <small> Coupon Added. </small>
                    <label
                      class="text-danger"
                      role="button"
                      title="Remove Coupon"
                      @click="removeCoupon"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                        />
                      </svg>
                    </label>
                  </p>
                  <p class="text-danger" v-if="coupon.error">
                    <small> {{ coupon.error }} </small>
                  </p>
                </div>

                <!-- fare summery -->

                <div class="fare-summery">
                  <div class="fare-summery-header">
                    <h4 class="fare-title">Fare Summary</h4>
                    <div class="row g-0">
                      <div class="col-6">
                        <div class="input-box rounded-0 rounded-start">
                          <label for="hotelCheckin" class="input-label"
                            >Check-in Date</label
                          >
                          <date-picker
                            id="hotelCheckin"
                            class="input-field fullWidth"
                            placeholder="DD/MM/YYYY"
                            format="dd/MM/yyyy"
                            v-model="checkInDate"
                            :disabledDates="disabledDates"
                            :highlighted="highlighted"
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="input-box right-datepicker rounded-0 rounded-end">
                          <label for="hotelCheckout" class="input-label"
                            >Check-out Date</label
                          >
                          <date-picker
                            id="hotelCheckout"
                            class="input-field fullWidth"
                            placeholder="DD/MM/YYYY"
                            format="dd/MM/yyyy"
                            v-model="checkOutDate"
                            :disabledDates="disabledDates"
                            :highlighted="highlighted"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row g-0">
                      <div class="col">
                        <p><b> Total Stay: </b> {{ dayDifference }} Days</p>
                      </div>
                    </div>
                  </div>
                  <div class="fare-summery-body">
                    <div class="card-paynow">
                      <div class="payment-header">
                        <span>Details</span>
                        <span>Amount</span>
                      </div>
                      <div
                        class="paument-item"
                        v-for="(room, i) of rooms"
                        :key="i"
                      >
                        <span class="product-name" v-if="room?.room?.name">
                          {{ room?.room?.name }}
                        </span>
                        <span class="product-quantity"
                          >{{ room?.room?.discount_price }} x
                          {{ dayDifference }}
                        </span>
                        <span class="product-price"
                          >BDT
                          {{
                            (
                              room?.room?.discount_price * dayDifference
                            ).toLocaleString()
                          }}</span
                        >
                      </div>
                      <div class="paument-item" v-if="coupon.response.id">
                        <span class="product-name"> Coupon Discount </span>
                        <span class="product-quantity">
                          "{{ coupon.code }}"
                        </span>
                        <span class="product-price">
                          - BDT {{ coupon.response.discount }}
                        </span>
                      </div>
                      <div class="paument-item">
                        <span>Payment Gateway Fee</span>
                        <span> BDT {{ sslFee }}</span>
                      </div>
                      <button
                        type="submit"
                        class="payment-btn"
                        @click="confirmBooking"
                      >
                        <span>Pay Now</span>
                        <span class="total"
                          >BDT {{ finalPrice.toLocaleString() }}</span
                        >
                      </button>
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
</template>

<script>
import jsonParse from "/static/utils/jsonParse.js";
export default {
  middleware: "auth",
  name: "HotelBooking",
  data() {
    return {
      hotel: "",
      checkInDate: "",
      checkOutDate: "",
      bookingRooms: [
        {
          guests: {
            adult: [],
          },
        },
      ],
      primaryGuest: {
        name: "",
        contact: "",
      },
      isSmoker: "False",
      moreRequest: [],
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
      highlighted: {
        dates: [
          // your date
          new Date(Date.now()),
        ],
      },
      coupon: {
        code: "",
        error: "",
        success: false,
        response: {},
      },
      userInfo: {},
      errors:{
        primaryGuest: {
        name: false,
        contact: false,
      },
      }
    };
  },

  mounted() {
    this.$store.dispatch("getLocalSelectedHotelRoom");
    this.bookingRoomsCreate();
    this.getHotelSearch();
    this.getUser();
    this.getLocalCoupon();
  },
  computed: {
    dayDifference() {
      let checkIn = this.$moment(this.checkInDate);
      let checkOut = this.$moment(this.checkOutDate);
      var daysDiff = checkOut.diff(checkIn, "days");
      return parseInt(daysDiff + 1);
    },
    rooms() {
      return this.$store.state.hotelRoomSelect;
    },
    totalRoomPrice() {
      return this.$store.getters.getTotalRoomPrice;
    },
    guestList() {
      let guests = [];
      for (let room of this.bookingRooms) {
        guests.push.apply(guests, room?.guests?.adult);
      }
      let newArray = guests.filter((element) => element != null);
      return newArray;
    },
    priceWithoutPG() {
      let price = this.totalRoomPrice.discountPrice * this.dayDifference;
      if (this.coupon.response.total_amount) {
        price = this.coupon.response.total_amount;
      }
      return price;
    },
    sslRate() {
      return process.env.ssl_fee || 0;
    },
    sslFee() {
      return Math.round((this.priceWithoutPG / 100) * this.sslRate);
    },
    
    finalPrice() {
      return this.priceWithoutPG + this.sslFee;
    },
  },
  methods: {
    confirmBooking() {
      // validation
      if(this.primaryGuest.name == ''){
        this.errors.primaryGuest.name = true;
        return ;
      }
      if(this.primaryGuest.contact == ''){
        this.errors.primaryGuest.contact = true;
        return ;
      }


      let final = {
        hotel: this.hotel,
        customer: this.userInfo?.user?.id,
        coupon: this.coupon.response?.id || "",
        coupon_discount_amount: this.coupon.response?.discount || 0,
        payment_amount: this.finalPrice,
        check_in: this.$moment(this.checkInDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        ),
        check_out: this.$moment(this.checkOutDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        ),
        rooms: this.bookingRooms,
        primary_guest_name: this.primaryGuest.name,
        primary_guest_contact: this.primaryGuest.contact,
        others: {
          isSmoker: this.isSmoker,
          moreRequest: this.moreRequest,
        },
        payment_info: {
          total_amount: this.finalPrice,
          ssl_fee: this.sslFee,
          currency: "BDT",
          emi_option: 0,
          cus_email: this.userInfo?.user?.email,
          cus_phone: this.userInfo?.phone_number || this.primaryGuest.contact,
          cus_add1: this.userInfo?.address || "Daka, Bangladesh",
          cus_city: "Dhaka",
          cus_country: this.userInfo?.nationality || "Bangladesh",
          shipping_method: "NO",
          num_of_item: 1,
          product_name: "Hotel Booking",
          product_category: "Room Booking",
          product_profile: "general",
        },
        url: `${process.env.ROOT_URL}/booking/hotel`,
        convenience_fee: 10,
      };
      if (
        this.userInfo?.user?.first_name &&
        this.userInfo?.user?.first_name != null
      ) {
        final.payment_info.cus_name = `${this.userInfo?.user?.first_name} ${this.userInfo?.user?.last_name}`;
      } else {
        final.payment_info.cus_name = this.userInfo?.user?.username;
      }
      //this.$log(final);
      //return "";
      this.$axios
        .post("/hotel-booking", final)
        .then((res) => {
          this.$log(res.data);
          if (res.data.status == "SUCCESS") {
            //window.open(res.data?.redirectGatewayURL, "_blank");
            window.location.href = res.data?.redirectGatewayURL;
          }
        })
        .catch((err) => {
          this.$elog(err.response);
          this.$elog(err.response.data.message);
        });
    },
    // apply Coupon
    applyCoupon() {
      if (this.coupon.code == "") {
        this.coupon.error = "Empty field not allow!";
      } else {
        this.$axios
          .post("/apply-coupon/", {
            coupon_code: this.coupon.code,
            total_amount:
              this.totalRoomPrice.discountPrice * this.dayDifference,
          })
          .then((response) => {
            // this.$log(response.data);
            if (response.data?.message) {
              this.coupon.error = response.data?.message;
            } else {
              this.coupon.success = true;
              this.coupon.response = response.data;
              localStorage.setItem(
                "hotelCoupon",
                JSON.stringify({ ...response.data, code: this.coupon.code })
              );
            }
          })
          .catch((error) => {
            this.coupon.error = "Invalid coupon code!";
            this.$elog(error.response);
          });
      }
    },
    // this function for who get back to this page without booking
    getLocalCoupon() {
      if (localStorage.getItem("hotelCoupon")) {
        let coupon = jsonParse(localStorage.getItem("hotelCoupon"));
        this.coupon.success = true;
        this.coupon.response = coupon;
        this.coupon.code = coupon?.code;
      }
    },
    removeCoupon() {
      localStorage.removeItem("hotelCoupon");
      this.coupon.success = false;
      this.coupon.response = {};
      this.coupon.code = "";
    },
    // coupon on change event
    couponOnchange() {
      this.coupon.error = "";
    },

    // open /close primary guest dropdown
    primaryGuestTriger() {
      const classes = document.getElementById("selectGuest").classList;
      if (classes.contains("open")) {
        classes.remove("open");
      } else {
        classes.add("open");
      }
    },
    // Select primary guest name from dropdown
    selectGuestName(name) {
      this.primaryGuest.name = name;
      this.errors.primaryGuest.name = false;
      const classes = document.getElementById("selectGuest").classList;
      if (classes.contains("open")) {
        classes.remove("open");
      }
    },
    // Booking room array create for render
    bookingRoomsCreate() {
      let bookingRoom = [];
      for (let room of this.rooms) {
        let adult = [];
        adult.length = room.person.adt; // Make an empty array for get adult name
        let child = [];
        child.length = room.person.child; // Make an empty array for get child name

        bookingRoom.push({
          room: room?.room?.id,
          quantity: 1,
          guests: {
            adult: adult,
            child: child,
          },
        });
        if (this.hotel == "") {
          this.hotel = room?.room?.hotel;
        }
      }
      this.bookingRooms = bookingRoom;
    },
    // get hotel checkin & checkout date from localstorage which is store in previous page
    getHotelSearch() {
      let search = {};
      if (localStorage.getItem("hotelSearch")) {
        search = jsonParse(localStorage.getItem("hotelSearch"));
      }

      if (search.checkInDate) {
        this.checkInDate = search.checkInDate;
      }
      if (search.checkOutDate) {
        this.checkOutDate = search.checkOutDate;
      }
    },
    //get user information
    getUser() {
      this.$axios
        .get("/user")
        .then((res) => {
          // this.$log(res.data);
          this.userInfo = res.data;
        })
        .catch((err) => {
          this.$log(err.response);
        });
    },
  },
};
</script>

<style>
</style>
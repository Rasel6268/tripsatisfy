<template>
  <!-- =================== CUSTOMER DETAILS START =========================== -->
  <section class="customer-details">
    <div class="go-container">
      <div class="customer-details-content">
        <!-- CUSTOMER DETAILS HEADER -->
        <div class="customer-details-header">
          <h3 class="customer-details-title">Traveller Details</h3>
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
                <!-- Traveler 1   -->
                <div class="guestinfo-card">
                  <div class="guestinfo-card-header">
                    <h3 class="guestinfo-card-title">Customer Details</h3>
                    <p class="guestinfo-card-text">
                      Please fill in with valid information.
                    </p>
                  </div>
                  <div class="guestinfo-card-body">
                    <div class="row">
                      <div class="col-lg-8">
                        <div class="row g-4">
                          <!-- title -->
                          <div class="col-lg-2">
                            <div class="input-box-2">
                              <div class="input-box2">
                                <label for="guest1" class="input-label"
                                  >Title :</label
                                >
                                <div class="select-wrapper">
                                  <div class="select">
                                    <div class="select-trigger">
                                      <span class="selectedvalue">
                                        {{ customer.title }}
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
                                          customer.title == 'Mr' && 'selected',
                                        ]"
                                        @click="setTitle('Mr')"
                                        >Mr</span
                                      >
                                      <span
                                        :class="[
                                          'custom-option',
                                          customer.title == 'Mrs' && 'selected',
                                        ]"
                                        @click="setTitle('Mrs')"
                                        >Mrs.</span
                                      >
                                      <span
                                        :class="[
                                          'custom-option',
                                          customer.title == 'Ms' && 'selected',
                                        ]"
                                        @click="setTitle('Ms')"
                                        >Ms.</span
                                      >
                                      <span
                                        :class="[
                                          'custom-option',
                                          customer.title == 'MD' && 'selected',
                                        ]"
                                        @click="setTitle('MD')"
                                        >MD</span
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- first name -->
                          <div class="col-lg-5">
                            <div class="input-box2">
                              <label for="first_name" class="input-label"
                                >Firtst Name <span class="text-danger">* </span>: </label
                              >
                              <input
                                type="text"
                                v-model="customer.firstName"
                                id="first_name"
                                class="input-field"
                                placeholder="First Name"
                                @keyup="onChangeField('firstName')"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors.firstName"
                            >
                              First Name can not be null!
                            </span>
                          </div>
                          <!-- sur name name -->
                          <div class="col-lg-5">
                            <div class="input-box2">
                              <label for="surname" class="input-label"
                                >Surname :</label
                              >
                              <input
                                type="text"
                                v-model="customer.last_name"
                                id="surname"
                                class="input-field"
                                placeholder="Surname"
                              />
                            </div>
                          </div>
                          <!-- gender -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label for="gender" class="input-label"
                                >Gender :</label
                              >
                              <!-- trip radio buttons -->
                              <div class="trip-radios">
                                <div class="customradio">
                                  <input
                                    type="radio"
                                    id="male"
                                    class="customradio-box"
                                    value="Male"
                                    v-model="customer.gender"
                                    hidden
                                    checked
                                  />
                                  <label for="male" class="customradio-label"
                                    >Male</label
                                  >
                                </div>
                                <div class="customradio">
                                  <input
                                    type="radio"
                                    id="female"
                                    class="customradio-box"
                                    value="Female"
                                    v-model="customer.gender"
                                    hidden
                                  />
                                  <label for="female" class="customradio-label"
                                    >Female</label
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Nationality -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label for="guest1" class="input-label"
                                >Nationality :
                              </label>
                              <!-- custom select -->
                              <div class="select-wrapper">
                                <div class="select">
                                  <div class="select-trigger">
                                    <span class="selectedvalue">
                                      {{ customer.nationality || "-select-" }}
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
                                        customer.nationality == country.name &&
                                          'selected',
                                      ]"
                                      v-for="country of allCountry"
                                      :key="country.id"
                                      @click="setNationality(country.name)"
                                    >
                                      {{ country.name }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Mobile No -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label for="Mobile_number" class="input-label"
                                >Mobile Number <span class="text-danger">* </span>:</label
                              >
                              <input
                                type="number"
                                v-model="customer.mobile"
                                id="Mobile_number"
                                class="input-field"
                                placeholder="Your Mobile Number"
                                @keyup="onChangeField('mobile')"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors.mobile"
                            >
                              Mobile number can not be null!
                            </span>
                          </div>
                          <!-- Email  -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label for="email" class="input-label"
                                >Email <span class="text-danger">* </span>:
                              </label>
                              <input
                                type="text"
                                v-model="customer.email"
                                id="email"
                                class="input-field"
                                placeholder="Email"
                                @keyup="onChangeField('email')"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors.email"
                            >
                              Email can not be null!
                            </span>
                          </div>

                          <!-- Address -->
                          <div class="col-12">
                            <div class="input-box2">
                              <label for="address" class="input-label"
                                >Address <span class="text-danger">* </span>:
                              </label>
                              <input
                                type="text"
                                v-model="customer.address"
                                id="address"
                                class="input-field full-width"
                                placeholder="Address"
                                @keyup="onChangeField('address')"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors.address"
                            >
                              Address can not be null!
                            </span>
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
                  </div>
                  <div class="fare-summery-body">
                    <div class="card-paynow">
                      <div class="payment-header">
                        <span>Details</span>
                        <span>Amount</span>
                      </div>
                      <!-- single item -->
                      <div class="paument-item">
                        <div>
                          <p>
                            <strong>Travellers {{ checkout.person }} </strong>
                          </p>
                        </div>
                        <div>
                          <p v-if="checkout?.price">
                            {{ checkout.price?.toLocaleString() || "" }} x
                            {{ checkout?.person }}
                          </p>
                        </div>
                        <div>
                          <p>
                            BDT
                            {{
                              (
                                checkout.price * checkout.person
                              )?.toLocaleString() || ""
                            }}
                          </p>
                        </div>
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
                      <div class="paument-item" v-if="convenience > 0">
                        <span>TS Convenience Fee</span>
                        <span> BDT {{ convenience }}</span>
                      </div>
                      <div class="paument-item">
                        <span>Payment Gateway Fee</span>
                        <span> BDT {{ sslFee }}</span>
                      </div>

                      <button
                        type="submit"
                        class="payment-btn"
                        @click="confirmOrder"
                      >
                        <span>Pay Now</span>
                        <span class="total"
                          >BDT {{ finalPrice.toLocaleString() || "" }}
                        </span>
                      </button>
                      <span class="text-danger small-text" v-if="errors.final">
                        Some input field are null!
                      </span>
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
  <!-- =================== CUSTOMER DETAILS END=========================== -->
</template>

<script>
import jsonParse from "/static/utils/jsonParse.js";
export default {
  middleware: "auth",
  name: "HolidayCheckout",
  head() {
    return {
      title: "Holiday Checkout",
    };
  },
  data() {
    return {
      customer: {
        id: "",
        title: "",
        firstName: "",
        last_name: "",
        gender: "",
        nationality: "",
        mobile: "",
        email: "",
        address: "",
      },
      checkout: {},
      coupon: {
        code: "",
        error: "",
        success: false,
        response: {},
      },
      convenience: 0,
      allCountry: [],
      errors: {
        firstName: false,
        mobile: false,
        email: false,
        address: false,
        final: false,
      },
    };
  },
  mounted() {
    this.getCheckoutData();
    this.getUser();
    this.getCountry();
    this.getLocalCoupon();
    this.rawJsSelect();
  },
  computed: {
    priceWithoutPG() {
      let price = this.checkout.price * this.checkout.person;
      if (this.coupon.response.total_amount) {
        price = this.coupon.response.total_amount;
      }
      if (this.convenience) {
        price += parseInt(this.convenience);
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
    confirmOrder() {
      let isSubmit = true;
      // first name validation
      if (this.customer.firstName == "") {
        isSubmit = false;
        this.errors.firstName = true;
      }
      // mobile number validation
      if (this.customer.mobile == "") {
        isSubmit = false;
        this.errors.mobile = true;
      }
      // email validation
      if (this.customer.email == "") {
        isSubmit = false;
        this.errors.email = true;
      }
      // address validation
      if (this.customer.address == null || this.customer.address == "") {
        isSubmit = false;
        this.errors.address = true;
      }

      if (isSubmit) {
        let final = {
          holiday: this.checkout.holiday,
          total_amount: this.finalPrice,
          //ssl_fee: this.sslFee,
          title: this.customer.title,
          currency: "BDT",
          //tran_id: "string",
          emi_option: 0,
          gender: this.customer.gender,
          nationality: this.customer.nationality,
          cus_name: `${this.customer.firstName} ${this.customer.last_name}`,
          cus_email: this.customer.email,
          cus_phone: this.customer.mobile,
          cus_add1: this.customer.address,
          cus_city: this.checkout.search.city,
          cus_country: this.customer.nationality,
          shipping_method: "No",
          num_of_item: 1,
          product_name: "Holiday Booking",
          product_category: "Holiday",
          //status: "Yes",
          product_profile: "general",
          customer: this.customer.id,
          others: {
            person: this.checkout?.person || 1,
            room: this.checkout?.search?.rooms?.length || 1,
            travel_date: this.checkout?.search?.travelDate,
            city: this.checkout?.search?.city,
          },
          url: `${process.env.ROOT_URL}/booking/holiday`,
          convenience_fee: this.convenience,
          coupon_discount_amount: this.coupon.response?.discount || 0,
        };
        this.$axios
          .post("/holiday/place-order/", final)
          .then((res) => {
            this.$log(res.data);
            if (res.data.status == "SUCCESS") {
              //window.open(res.data?.redirectGatewayURL, "_blank");
              window.location.href = res.data?.redirectGatewayURL;
            }
          })
          .catch((err) => {
            this.$elog(err.response);
            this.$elog(err.response.data);
          });
      } else {
        this.errors.final = true;
      }
    },
    onChangeField(key) {
      this.errors.final = false;
      this.errors[key] = false;
    },
    getCheckoutData() {
      let checkout = {};
      if (localStorage.getItem("holidayCheckout") != null) {
        checkout = jsonParse(localStorage.getItem("holidayCheckout"));
      }
      if (checkout?.price) {
        this.checkout = checkout;
      } else {
        this.$router.push("/holiday");
      }
      this.$elog(this.checkout);
    },
    // apply Coupon
    applyCoupon() {
      if (this.coupon.code == "") {
        this.coupon.error = "Empty field not allow!";
      } else {
        this.$axios
          .post("/apply-coupon/", {
            coupon_code: this.coupon.code,
            total_amount: this.checkout.price * this.checkout.person,
          })
          .then((response) => {
            this.$log(response.data);
            if (response.data?.message) {
              this.coupon.error = response.data?.message;
            } else {
              this.coupon.success = true;
              this.coupon.response = response.data;
              localStorage.setItem(
                "holidayCoupon",
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
      if (localStorage.getItem("holidayCoupon")) {
        let coupon = jsonParse(localStorage.getItem("holidayCoupon"));
        this.coupon.success = true;
        this.coupon.response = coupon;
        this.coupon.code = coupon?.code;
      }
    },
    removeCoupon() {
      localStorage.removeItem("holidayCoupon");
      this.coupon.success = false;
      this.coupon.response = {};
      this.coupon.code = "";
    },
    // coupon on change event
    couponOnchange() {
      this.coupon.error = "";
    },
    setTitle(title) {
      this.customer.title = title;
    },
    setNationality(name) {
      this.customer.nationality = name;
    },
    getCountry() {
      this.$axios
        .get("/countries")
        .then((res) => {
          this.allCountry = res.data?.results || [];
        })
        .catch((err) => {
          this.$elog(err.response.status);
        });
    },
    getUser() {
      this.$axios
        .get("/user")
        .then((res) => {
          this.customer.id = res.data?.id;
          this.customer.title = res.data?.title || "MD";
          this.customer.gender = res.data?.gender || "Male";
          this.customer.nationality = res.data?.nationality || "Bangladesh";
          this.customer.address = res.data?.address;
          this.customer.mobile = res.data?.phone_number;
          this.customer.email = res.data?.user?.email;
          this.customer.firstName = res.data?.user?.first_name || "";
          this.customer.last_name = res.data?.user?.last_name || "";
          this.$log(res.data);
        })
        .catch((err) => {
          this.$elog(err.response);
        });
    },

    rawJsSelect() {
      const selectWrapper = document.querySelectorAll(".select-wrapper");

      selectWrapper.forEach((select) => {
        select.addEventListener("click", function () {
          this.querySelector(".select").classList.toggle("open");
        });
      });

      const options = document.querySelectorAll(".custom-option");

      for (const option of options) {
        option.addEventListener("click", function () {
          if (!this.classList.contains("selected")) {
            this.parentNode
              .querySelector(".custom-option.selected")
              .classList.remove("selected");
            this.classList.add("selected");
            this.closest(".select").querySelector(
              ".select-trigger span"
            ).textContent = this.textContent;

            const total =
              this.closest(".customselect").previousSibling.previousSibling;
            total.value = this.textContent;
          }
        });
      }

      window.addEventListener("click", function (e) {
        const selectAll = document.querySelectorAll(".select");

        for (const select of selectAll) {
          if (!select.contains(e.target)) {
            select.classList.remove("open");
          }
        }
      });
    },
  },
};
</script>

<style>
</style>
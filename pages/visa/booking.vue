<template>
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
                <div
                  class="guestinfo-card"
                  v-for="(person, i) of persons"
                  :key="i"
                >
                  <div class="guestinfo-card-header">
                    <h3 class="guestinfo-card-title">
                      Traveller {{ i + 1 }}
                      <span v-if="i == 0">(Primary Contact)</span>
                    </h3>
                    <p class="guestinfo-card-text">
                      As mentioned on your passport or government approved IDs
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
                                  >Title</label
                                >
                                <div class="select-wrapper">
                                  <div class="select">
                                    <div class="select-trigger">
                                      <span class="selectedvalue">{{
                                        person.title
                                      }}</span>

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
                                          person.title == 'Mr' && 'selected',
                                        ]"
                                        @click="person.title = 'Mr'"
                                        >Mr</span
                                      >
                                      <span
                                        :class="[
                                          'custom-option',
                                          person.title == 'Mrs' && 'selected',
                                        ]"
                                        @click="person.title = 'Mrs'"
                                        >Mrs</span
                                      >
                                      <span
                                        :class="[
                                          'custom-option',
                                          person.title == 'Mstr' && 'selected',
                                        ]"
                                        @click="person.title = 'Mstr'"
                                        >Mstr</span
                                      >
                                      <span
                                        :class="[
                                          'custom-option',
                                          person.title == 'Miss' && 'selected',
                                        ]"
                                        @click="person.title = 'Miss'"
                                        >Miss</span
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
                                v-model="person.first_name"
                                id="first_name"
                                class="input-field"
                                placeholder="First Name"
                                @keyup="errors[i].first_name = false"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].first_name"
                            >
                              First Name can not be null!
                            </span>
                          </div>
                          <!-- sur name name -->
                          <div class="col-lg-5">
                            <div class="input-box2">
                              <label for="sur_name" class="input-label"
                                >Surname <span class="text-danger">* </span>:</label
                              >
                              <input
                                type="text"
                                v-model="person.last_name"
                                id="sur_name"
                                class="input-field"
                                placeholder="Surname"
                                @keyup="errors[i].last_name = false"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].last_name"
                            >
                              Surname can not be null!
                            </span>
                          </div>
                          <!-- gender -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label for="gender" class="input-label"
                                >Gender</label
                              >
                              <!-- trip radio buttons -->
                              <div class="trip-radios">
                                <div class="customradio">
                                  <input
                                    type="radio"
                                    :id="'male-' + i"
                                    class="customradio-box"
                                    :name="'gender-' + i"
                                    v-model="person.gender"
                                    value="Male"
                                    hidden
                                  />
                                  <label
                                    :for="'male-' + i"
                                    class="customradio-label"
                                    >Male</label
                                  >
                                </div>
                                <div class="customradio">
                                  <input
                                    type="radio"
                                    :id="'female-' + i"
                                    class="customradio-box"
                                    :name="'gender-' + i"
                                    v-model="person.gender"
                                    value="Female"
                                    hidden
                                  />
                                  <label
                                    :for="'female-' + i"
                                    class="customradio-label"
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
                                >Nationality <span class="text-danger">* </span>:
                              </label>
                              <!-- custom select -->
                              <div class="select-wrapper">
                                <div class="select">
                                  <div class="select-trigger">
                                    <span class="selectedvalue">
                                      {{ person.nationalityName || '-select nationality-' }}
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
                                        person.nationality == country.id &&
                                          'selected',
                                      ]"
                                      v-for="country of nationalities"
                                      :key="country.id"
                                      @click="()=>{
                                        person.nationalityName = country.name;
                                        person.nationality = country.id;
                                        errors[i].nationality = false;
                                        }"
                                    >
                                      {{ country.name }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].nationality"
                            >
                              Nationality can not be null!
                            </span>
                          </div>
                          <!-- date of birth  -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label
                                :for="'dateofbirth-' + i"
                                class="input-label"
                                >Date Of Birth <span class="text-danger">* </span>:
                              </label>
                              <date-picker
                                :id="'dateofbirth-' + i"
                                class="input-field fullWidth"
                                placeholder="DD/MM/YYYY"
                                format="dd/MM/yyyy"
                                v-model="person.date_of_birth"
                                @selected="errors[i].date_of_birth = false"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].date_of_birth"
                            >
                              Date Of Birth can not be null!
                            </span>
                          </div>
                          <!-- Profession -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label for="guest1" class="input-label"
                                >Profession
                              </label>
                              <!-- custom select -->
                              <div class="select-wrapper">
                                <div class="select">
                                  <div class="select-trigger">
                                    <span class="selectedvalue">
                                      {{
                                        person.profession ||
                                        "-select profession-"
                                      }}
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
                                        person.profession == pro && 'selected',
                                      ]"
                                      v-for="(pro, i) of professions"
                                      :key="i"
                                      @click="person.profession = pro"
                                      >{{ pro }}</span
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Pusport Number  -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label class="input-label">Passport Number <span class="text-danger">* </span>:</label>
                              <input
                                type="text"
                                class="input-field"
                                placeholder="Passport Number"
                                v-model="person.passport_number"
                                @keyup="errors[i].passport_number = false"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].passport_number"
                            >
                              Passport Number can not be null!
                            </span>
                          </div>
                          <!-- Pusport Expire date  -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label class="input-label"
                                >Passport Expiry Date <span class="text-danger">* </span>:</label
                              >
                              <date-picker
                                class="input-field fullWidth"
                                placeholder="DD/MM/YYYY"
                                format="dd/MM/yyyy"
                                v-model="person.passport_expiry_date"
                                @selected="
                                  errors[i].passport_expiry_date = false
                                "
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].passport_expiry_date"
                            >
                              Expiry Date can not be null!
                            </span>
                          </div>
                          <!-- Mobile No -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label for="Mobile_number" class="input-label"
                                >Mobile Number <span class="text-danger">* </span>:</label
                              >
                              <input
                                type="number"
                                v-model="person.phone"
                                @keyup="errors[i].phone = false"
                                class="input-field"
                                placeholder="Your Mobile Number"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].phone"
                            >
                              Mobile Number can not be null!
                            </span>
                          </div>
                          <!-- Email  -->
                          <div class="col-lg-6">
                            <div class="input-box2">
                              <label class="input-label">Email <span class="text-danger">* </span>:</label>
                              <input
                                type="email"
                                v-model="person.email"
                                @keyup="errors[i].email = false"
                                class="input-field"
                                placeholder="Email"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].email"
                            >
                              Email can not be null!
                            </span>
                          </div>

                          <!-- Local Address -->
                          <div class="col-12">
                            <div class="input-box2">
                              <label class="input-label">Local Address <span class="text-danger">* </span>:</label>
                              <input
                                type="text"
                                v-model="person.local_address"
                                @keyup="errors[i].local_address = false"
                                class="input-field full-width"
                                placeholder="Local Address"
                              />
                            </div>
                            <span
                              class="text-danger small-text"
                              v-if="errors[i].local_address"
                            >
                              Address can not be null!
                            </span>
                          </div>
                          <!-- Foreign Address  -->
                          <div class="col-12">
                            <div class="input-box2">
                              <label class="input-label">Foreign Address</label>
                              <input
                                type="text"
                                v-model="person.freign_address"
                                @keyup="errors[i].freign_address = false"
                                class="input-field full-width"
                                placeholder="Foreign Address"
                              />
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
                            <strong>Travellers {{ travellers }} </strong>
                          </p>
                          <p>Visa Fee</p>
                        </div>
                        <div>
                          <p v-if="checkout?.price">
                            {{ checkout?.price?.toLocaleString() || "" }} x
                            {{ travellers }}
                          </p>
                        </div>
                        <div>
                          <p>
                            BDT
                            {{
                              (
                                checkout?.price * travellers
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
                        @click="confirmBooking"
                      >
                        <span>Pay Now</span>
                        <span class="total"
                          >BDT {{ finalPrice.toLocaleString() || "" }}</span
                        >
                      </button>
                      <span class="text-danger small-text" v-if="!isSubmit">
                        Some of fields are empty!
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
</template>

<script>
import jsonParse from "/static/utils/jsonParse.js";
export default {
  middleware: "auth",
  name: "VisaBooking",
  data() {
    return {
      checkout: {},
      persons: [],
      errors: [],
      coupon: {
        code: "",
        error: "",
        success: false,
        response: {
          id: "",
          discount: 0,
        },
      },
      convenience: 0,
      nationalities: [],
      userInfo: {},
      professions: [
        "Teacher",
        "Doctor",
        "Engineer",
        "Architect",
        "Actor",
        "Others",
      ],
      requiredFields: [
        "first_name",
        "last_name",
        "date_of_birth",
        "nationality",
        "passport_number",
        "passport_expiry_date",
        "phone",
        "email",
        "local_address",
      ],
      isSubmit: true,
    };
  },
  mounted() {
    this.getLocalData();
    this.getNationality();
    this.getUser();

    // After calculating number of travellers
    window.setTimeout(() => {
      this.rawJsSelect();
    }, 300);
  },
  computed: {
    travellers() {
      if (this.checkout?.traveller) {
        return parseInt(this.checkout.traveller);
      }
      return 0;
    },
    priceWithoutPG() {
      let price = this.checkout.price * this.travellers;
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
    confirmBooking() {
      this.isSubmit = true;
      this.persons.forEach((person, i) => {
        // Required Fields Validation
        this.requiredFields.forEach((field) => {
          if (person[field] == "" || person[field] == undefined) {
            this.errors[i][field] = true;
            this.isSubmit = false;
          } else {
            if (field == "date_of_birth" || field == "passport_expiry_date") {
              person[field] = this.$moment(person[field], "YYYY-MM-DD").format(
                "YYYY-MM-DD"
              );
            }
          }
        });
      });
      if (this.isSubmit) {
        let final = {
          customer: this.userInfo.user.id,
          date_of_entry: this.checkout.entryDate,
          date_of_exit: this.checkout.exitDate,
          total_amount: this.finalPrice,
          coupon: this.coupon.response?.id || "",
          discount_amount: this.coupon.response?.discount || 0,
          visa_type: this.checkout.id,
          persons: this.persons,
          payment_info: {
            total_amount: this.finalPrice,
            currency: "BDT",
            emi_option: 0,
            cus_name: `${this.persons[0]?.first_name || ""} ${
              this.persons[0]?.last_name || ""
            }`,
            cus_email: this.userInfo.user.email,
            cus_phone: this.userInfo.phone_number,
            cus_add1:
              this.userInfo.address ||
              this.persons[0]?.local_address ||
              "Bangladesh",
            cus_city: "Dhaka",
            cus_country:
              this.userInfo.nationality ||
              this.persons[0]?.nationality ||
              "Bangladesh",
            shipping_method: "NO",
            num_of_item: "1",
            product_name: "Visa Booking",
            product_category: "Visa",
            product_profile: "general",
          },
          url:`${process.env.ROOT_URL}/booking/visa`,
          convenience_fee: this.convenience
        };
        this.$axios
          .post("/visa-booking", final)
          .then((res) => {
            this.$log(res.data);
            if (res.data.status == "SUCCESS") {
              //window.open(res.data?.redirectGatewayURL, "_blank");
              window.location.href = res.data?.redirectGatewayURL;
            }
          })
          .catch((err) => {
           // this.$elog(err.response);
            this.$elog(err.response.data);
            if(err.response.data.length > 0){

            }
          });
        this.$log(final);
      }
    },
    // apply Coupon
    applyCoupon() {
      if (this.coupon.code == "") {
        this.coupon.error = "Empty field not allow!";
      } else {
        this.$axios
          .post("/apply-coupon/", {
            coupon_code: this.coupon.code,
            total_amount: this.checkout.price * this.travellers,
          })
          .then((response) => {
            if (response.data?.message) {
              this.coupon.error = response.data?.message;
            } else {
              this.coupon.success = true;
              this.coupon.response = response.data;
            }
          })
          .catch((error) => {
            this.coupon.error = "Invalid coupon code!";
            this.$elog(error.response);
          });
      }
    },
    // coupon on change event
    couponOnchange() {
      this.coupon.error = "";
    },
    getLocalData() {
      let checkout = {};
      if (localStorage.getItem("visaBooking") != null) {
        checkout = jsonParse(localStorage.getItem("visaBooking"));
      }
      if (checkout?.traveller) {
        this.checkout = checkout;
        for (let i = 0; i < parseInt(checkout.traveller); i++) {
          this.persons.push({
            title: "MD",
            first_name: "",
            last_name: "",
            gender: "Male",
            nationality:'',
            nationalityName:'',
            date_of_birth: "",
            profession: "",
            passport_number: "",
            passport_expiry_date: "",
            phone: "",
            email: "",
            local_address: "",
            freign_address: "",
          });
          // Errors field add for showing error message.
          let errors = {};
          this.requiredFields.forEach((field) => {
            errors[field] = false;
          });
          this.errors.push(errors);
        }
      } else {
        this.$router.push("/visa");
      }
    },

    getNationality() {
      this.$axios
        .get("/nationalities")
        .then((res) => {
          this.nationalities = res.data?.results || [];
        })
        .catch((err) => {
          this.$elog(err.response.status);
        });
    },
    getUser() {
      this.$axios
        .get("/user")
        .then((res) => {
          this.userInfo = res.data;
          //this.$log(res.data);
          this.primaryUserDefault();
        })
        .catch((err) => {
          this.$log(err.response);
        });
    },
    primaryUserDefault() {
      this.persons[0].first_name = this.userInfo?.user?.first_name;
      this.persons[0].last_name = this.userInfo?.user?.last_name;
      this.persons[0].title = this.userInfo?.title;
      this.persons[0].gender = this.userInfo?.gender;
      this.persons[0].phone = this.userInfo?.phone_number;
      this.persons[0].date_of_birth = this.userInfo?.birthdate;
      this.persons[0].passport_number = this.userInfo?.passport_number;
      this.persons[0].email = this.userInfo?.user?.email;
    },

    rawJsSelect() {
      const selectWrapper = document.querySelectorAll(".select-wrapper");
      selectWrapper.forEach((select) => {
        select.addEventListener("click", function () {
          this.querySelector(".select").classList.toggle("open");
        });
      });

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
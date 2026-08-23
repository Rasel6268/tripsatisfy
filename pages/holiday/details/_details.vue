<template>
  <div>
    <section class="hoteldetails">
      <div class="go-container">
        <div class="row g-4">
          <div class="col-lg-6">
            <div class="photo-gallery">
              <vue-easy-lightbox
                escDisabled
                moveDisabled
                :visible="visible"
                :imgs="images"
                :index="index"
                @hide="handleHide"
              />
              <div class="flex-container">
                <div class="left-image">
                  <div class="swiper hotelGallery">
                    <div class="swiper-wrapper">
                      <div
                        class="swiper-slide cursor-pointer"
                        v-for="(img, i) of images"
                        :key="i"
                        @click="openLightBox(i)"
                      >
                        <img
                          :src="img.src || img"
                          :alt="img.title || 'Image'"
                        />
                      </div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                  </div>
                </div>
                <div class="right-images">
                  <figure
                    class="cursor-pointer"
                    v-for="(img, i) of images"
                    :key="i"
                    @click="openLightBox(i)"
                  >
                    <img :src="img.src || img" :alt="img.title || 'Image'" />
                  </figure>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="facility-location">
              <div class="row g-4">
                <div class="col-lg-7">
                  <!-- location box -->
                  <div class="location-box">
                    <h2 class="hotel-name">{{ holiday.name }}</h2>
                    <div class="icon-text">
                      <span>
                        <svg
                          width="22"
                          height="31"
                          viewBox="0 0 22 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 22.3043C13.475 20.3043 15.344 18.3793 16.607 16.5293C17.869 14.6793 18.5 12.9418 
                                                18.5 11.3168C18.5 9.9168 18.244 8.7228 17.732 7.7348C17.219 6.7478 16.5875 5.9478 15.8375 
                                                5.3348C15.0875 4.7228 14.275 4.2793 13.4 4.0043C12.525 3.7293 11.725 3.5918 11 3.5918C10.275 
                                                3.5918 9.475 3.7293 8.6 4.0043C7.725 4.2793 6.9125 4.7228 6.1625 5.3348C5.4125 5.9478 4.7815 
                                                6.7478 4.2695 7.7348C3.7565 8.7228 3.5 9.9168 3.5 11.3168C3.5 12.9418 4.131 14.6793 5.393 
                                                16.5293C6.656 18.3793 8.525 20.3043 11 22.3043ZM11 26.0918C7.475 23.4918 4.8435 20.9668 3.1055 
                                                18.5168C1.3685 16.0668 0.5 13.6668 0.5 11.3168C0.5 9.5418 0.819 7.9853 1.457 6.6473C2.094 5.3103 
                                                2.9125 4.1918 3.9125 3.2918C4.9125 2.3918 6.0375 1.7168 7.2875 1.2668C8.5375 0.816797 9.775 0.591797 
                                                11 0.591797C12.225 0.591797 13.4625 0.816797 14.7125 1.2668C15.9625 1.7168 17.0875 2.3918 18.0875 
                                                3.2918C19.0875 4.1918 19.9065 5.3103 20.5445 6.6473C21.1815 7.9853 21.5 9.5418 21.5 11.3168C21.5 
                                                13.6668 20.631 16.0668 18.893 18.5168C17.156 20.9668 14.525 23.4918 11 26.0918ZM11 14.0918C11.825 
                                                14.0918 12.5315 13.7978 13.1195 13.2098C13.7065 12.6228 14 11.9168 14 11.0918C14 10.2668 13.7065 
                                                9.5603 13.1195 8.9723C12.5315 8.3853 11.825 8.0918 11 8.0918C10.175 8.0918 9.469 8.3853 8.882 
                                                8.9723C8.294 9.5603 8 10.2668 8 11.0918C8 11.9168 8.294 12.6228 8.882 13.2098C9.469 13.7978 
                                                10.175 14.0918 11 14.0918ZM0.5 30.5918V27.5918H21.5V30.5918H0.5Z"
                            fill="#718096"
                          />
                        </svg>
                      </span>
                      <div class="location-name">
                        <span>{{ holiday.address }}</span>
                      </div>
                      <div class="tagline">
                        <span class="icons">
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 20C1.45 20 0.979 19.8043 0.587 19.413C0.195667 19.021 0 18.55 0 18V4C0 3.45 0.195667 2.97933 0.587 2.588C0.979 2.196 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.021 2.196 17.413 2.588C17.8043 2.97933 18 3.45 18 4V18C18 18.55 17.8043 19.021 17.413 19.413C17.021 19.8043 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM9 12C8.71667 12 8.47933 11.904 8.288 11.712C8.096 11.5207 8 11.2833 8 11C8 10.7167 8.096 10.479 8.288 10.287C8.47933 10.0957 8.71667 10 9 10C9.28333 10 9.521 10.0957 9.713 10.287C9.90433 10.479 10 10.7167 10 11C10 11.2833 9.90433 11.5207 9.713 11.712C9.521 11.904 9.28333 12 9 12ZM5 12C4.71667 12 4.479 11.904 4.287 11.712C4.09567 11.5207 4 11.2833 4 11C4 10.7167 4.09567 10.479 4.287 10.287C4.479 10.0957 4.71667 10 5 10C5.28333 10 5.521 10.0957 5.713 10.287C5.90433 10.479 6 10.7167 6 11C6 11.2833 5.90433 11.5207 5.713 11.712C5.521 11.904 5.28333 12 5 12ZM13 12C12.7167 12 12.4793 11.904 12.288 11.712C12.096 11.5207 12 11.2833 12 11C12 10.7167 12.096 10.479 12.288 10.287C12.4793 10.0957 12.7167 10 13 10C13.2833 10 13.5207 10.0957 13.712 10.287C13.904 10.479 14 10.7167 14 11C14 11.2833 13.904 11.5207 13.712 11.712C13.5207 11.904 13.2833 12 13 12ZM9 16C8.71667 16 8.47933 15.904 8.288 15.712C8.096 15.5207 8 15.2833 8 15C8 14.7167 8.096 14.4793 8.288 14.288C8.47933 14.096 8.71667 14 9 14C9.28333 14 9.521 14.096 9.713 14.288C9.90433 14.4793 10 14.7167 10 15C10 15.2833 9.90433 15.5207 9.713 15.712C9.521 15.904 9.28333 16 9 16ZM5 16C4.71667 16 4.479 15.904 4.287 15.712C4.09567 15.5207 4 15.2833 4 15C4 14.7167 4.09567 14.4793 4.287 14.288C4.479 14.096 4.71667 14 5 14C5.28333 14 5.521 14.096 5.713 14.288C5.90433 14.4793 6 14.7167 6 15C6 15.2833 5.90433 15.5207 5.713 15.712C5.521 15.904 5.28333 16 5 16ZM13 16C12.7167 16 12.4793 15.904 12.288 15.712C12.096 15.5207 12 15.2833 12 15C12 14.7167 12.096 14.4793 12.288 14.288C12.4793 14.096 12.7167 14 13 14C13.2833 14 13.5207 14.096 13.712 14.288C13.904 14.4793 14 14.7167 14 15C14 15.2833 13.904 15.5207 13.712 15.712C13.5207 15.904 13.2833 16 13 16Z"
                              fill="#FFA801"
                            ></path>
                          </svg>
                        </span>
                        <span class="text">{{ holiday.duration }}</span>
                      </div>
                    </div>
                    <p class="price" v-if="holiday?.cost_per_person">
                      BDT
                      {{ holiday?.cost_per_person?.toLocaleString()
                      }}<span>/Person</span>
                    </p>
                  </div>
                </div>
                <div class="col-12 order-lg-3">
                  <div class="btn-cpntainer">
                    <button class="proceed-btn" @click="holidayCheckout">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
                <div class="col-lg-5 order-lg-2">
                  <!-- facility box  -->
                  <div class="facility">
                    <div class="tags">
                      <ul class="tag-list">
                        <li
                          class="tag-list-item"
                          v-for="(facility, i) of holiday.amenities"
                          :key="i"
                        >
                          <span class="icon">
                            <img
                              :src="facility.icon || iconUrlAlt"
                              width="20px"
                              height="20px"
                              class="mt-1"
                              alt="Icon"
                              @error="iconUrlAlt"
                            />
                          </span>
                          <span class="text">{{ facility.name }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ================== MODIFY SEARCH START========================== -->
    <section class="search">
      <div class="go-container">
        <div class="bg">
          <div class="booking-content">
            <div class="booking-top">
              <holiday-tab />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ================== HOLIDAY DETAIL  START  ======================== -->
    <section class="holidaydetail">
      <div class="go-container">
        <div class="holidaydetail-content">
          <div class="holidaydetail-header bg-white">
            <ul class="accordionlist">
              <li class="accordionlist-item">
                <button
                  :class="['accordionlist-link', collapsed == 1 && 'active']"
                  type="button"
                  @click="collapseHandle(1)"
                >
                  Overview
                </button>
              </li>
              <li class="accordionlist-item">
                <button
                  :class="['accordionlist-link', collapsed == 2 && 'active']"
                  type="button"
                  @click="collapseHandle(2)"
                >
                  Location
                </button>
              </li>
              <li class="accordionlist-item">
                <button
                  :class="['accordionlist-link', collapsed == 3 && 'active']"
                  type="button"
                  @click="collapseHandle(3)"
                >
                  Timing
                </button>
              </li>
              <li class="accordionlist-item">
                <button
                  :class="['accordionlist-link', collapsed == 4 && 'active']"
                  type="button"
                  @click="collapseHandle(4)"
                >
                  Itinerary
                </button>
              </li>
              <li class="accordionlist-item">
                <button
                  :class="['accordionlist-link', collapsed == 5 && 'active']"
                  type="button"
                  @click="collapseHandle(5)"
                >
                  Inclusion &amp; Exclusion
                </button>
              </li>
              <li class="accordionlist-item">
                <button
                  :class="['accordionlist-link', collapsed == 6 && 'active']"
                  type="button"
                  @click="collapseHandle(6)"
                >
                  Options
                </button>
              </li>
              <li class="accordionlist-item">
                <button
                  :class="['accordionlist-link', collapsed == 7 && 'active']"
                  type="button"
                  @click="collapseHandle(7)"
                >
                  Policy
                </button>
              </li>
            </ul>
          </div>
          <div class="holidaydetail-body">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    :class="[
                      'accordion-button',
                      collapsed !== 1 && 'collapsed',
                    ]"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#overview"
                    @click="collapseHandle(1)"
                  >
                    Overview
                  </button>
                </h2>
                <div
                  id="overview"
                  :class="[
                    'accordion-collapse collapse',
                    collapsed == 1 && 'show',
                  ]"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div
                          class="accordion-inner-text"
                          v-html="holiday.overview"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    :class="[
                      'accordion-button',
                      collapsed !== 2 && 'collapsed',
                    ]"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#location"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    @click="collapseHandle(2)"
                  >
                    Location
                  </button>
                </h2>
                <div
                  id="location"
                  :class="[
                    'accordion-collapse collapse',
                    collapsed == 2 && 'show',
                  ]"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div
                          class="accordion-inner-text"
                          v-html="holiday.location"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    :class="[
                      'accordion-button',
                      collapsed !== 3 && 'collapsed',
                    ]"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#timing"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                    @click="collapseHandle(3)"
                  >
                    Timing
                  </button>
                </h2>
                <div
                  id="timing"
                  :class="[
                    'accordion-collapse collapse',
                    collapsed == 3 && 'show',
                  ]"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div
                          class="accordion-inner-text"
                          v-html="holiday.timing"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                  <button
                    :class="[
                      'accordion-button',
                      collapsed !== 4 && 'collapsed',
                    ]"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#itinerary"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                    @click="collapseHandle(4)"
                  >
                    Itinerary
                  </button>
                </h2>
                <div
                  id="itinerary"
                  :class="[
                    'accordion-collapse collapse',
                    collapsed == 4 && 'show',
                  ]"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div
                          class="accordion-inner-text"
                          v-html="holiday.itinerary"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFive">
                  <button
                    :class="[
                      'accordion-button',
                      collapsed !== 5 && 'collapsed',
                    ]"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#inclusion"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                    @click="collapseHandle(5)"
                  >
                    Inclusion &amp; Exclusion
                  </button>
                </h2>
                <div
                  id="inclusion"
                  :class="[
                    'accordion-collapse collapse',
                    collapsed == 5 && 'show',
                  ]"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div
                          class="accordion-inner-text"
                          v-html="holiday.inclusion_exclusion"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSix">
                  <button
                    :class="[
                      'accordion-button',
                      collapsed !== 6 && 'collapsed',
                    ]"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#option"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                    @click="collapseHandle(6)"
                  >
                    Option
                  </button>
                </h2>
                <div
                  id="option"
                  :class="[
                    'accordion-collapse collapse',
                    collapsed == 6 && 'show',
                  ]"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div
                          class="accordion-inner-text"
                          v-html="holiday.option"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSeven">
                  <button
                    :class="[
                      'accordion-button',
                      collapsed !== 7 && 'collapsed',
                    ]"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#policy"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                    @click="collapseHandle(7)"
                  >
                    Policy
                  </button>
                </h2>
                <div
                  id="policy"
                  :class="[
                    'accordion-collapse collapse',
                    collapsed == 7 && 'show',
                  ]"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div
                          class="accordion-inner-text"
                          v-html="holiday.policy"
                        ></div>
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
    <!-- ================== HOLIDAY DETAIL  END =========================== -->
  </div>
</template>

<script>
import HolidayTab from "../../../components/home/search/HolidayTab.vue";
export default {
  components: { HolidayTab },
  name: "HolidayDetails",
  head() {
    return {
      title: `${this.holiday?.name || "Holiday Details"}`,
    };
  },
  data() {
    return {
      visible: false,
      index: 0,
      images: ["/assets/images/no-image.jpg"],
      holiday: {},
      collapsed: 1,
    };
  },
  mounted() {
    this.swipeSlider();
    this.getDetails();
    localStorage.removeItem("holidayCheckout");
  },
  computed: {
    totalPerson() {
      let total = 0;
      for (let room of this.$store.state.holiday?.search?.rooms) {
        total += room.adt;
        total += room.child;
      }
      return total;
    },
  },
  methods: {
    holidayCheckout() {
      localStorage.removeItem("holidayCoupon");
      if (!this.$auth.loggedIn) {
        localStorage.setItem("previousPath", '/holiday/checkout');
      }
      let data = {
        holiday: this.holiday.id,
        price: this.holiday?.cost_per_person,
        person: this.totalPerson || 2,
        search: this.$store.state.holiday?.search,
      };
      localStorage.setItem("holidayCheckout", JSON.stringify(data));
      this.$router.push("/holiday/checkout");
    },

    getDetails() {
      this.$axios("holiday-details/" + this.$route.params?.details)
        .then((response) => {
          this.$log(response.data);
          this.holiday = response.data;
          if(this.holiday?.holiday_images?.length > 0){
            this.images = [];
            for(let img of this.holiday?.holiday_images){
              this.images.push(img.image);
            }
          }
        })
        .catch((error) => {
          this.$elog(error.response);
        });
    },
    openLightBox(i) {
      this.visible = true;
      this.index = i;
    },
    collapseHandle(id) {
      this.collapsed = id;
    },

    handleHide() {
      this.visible = false;
    },
    swipeSlider() {
      var swiper3 = new Swiper(".hotelGallery", {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    },
    imageUrlAlt(event) {
      event.target.src = "/assets/images/hotel/about-hotel.svg";
    },
    iconUrlAlt(event) {
      event.target.src = "/assets/images/default/heart.png";
    },
  },
};
</script>
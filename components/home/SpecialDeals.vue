<template>
  <!-- ================== SPECIAL DEAL START ========================== -->
  <section class="special-deal">
    <div class="go-container">
      <div class="special-deal-content">
        <!-- SPECIAL DEAL HEADER START -->
        <div class="special-deal-header">
          <div class="row g-4">
            <div class="col-lg-6 col-12">
              <div class="specialinfo">
                <h3 class="special-deal-title"> {{ appName }} Special Deals</h3>
              </div>
            </div>
          </div>
        </div>
        <!-- SPECIAL DEAL HEADER END -->

        <!-- SPECIAL DEAL BODY START -->
        <div class="special-deal-body">
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
              <!-- Single slide Start -->
              <div class="swiper-slide" v-for="deal of deals" :key="deal.id">
                <nuxt-link
                v-if="deal?.id"
                  :to="
                    detailsPage(
                      deal?.holiday?.slug,
                      deal?.holiday?.city,
                      deal?.country
                    )
                  "
                >
                  <div class="cardspecial">
                    <figure class="cardspecial-header">
                      <img
                        :src="deal?.holiday?.thumbnail_image || imageUrlAlt"
                        :alt="deal?.holiday?.name"
                        @error="imageUrlAlt"
                      />
                      <div class="overlay"></div>
                    </figure>
                    <div class="cardspecial-body">
                      <h5 class="special-title">{{ deal?.holiday?.name }}</h5>
                      <div class="special-info">
                        <div class="left">
                          <span class="day-icon">
                            <svg
                              width="12"
                              height="14"
                              viewBox="0 0 12 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.33333 13.387C0.966667 13.387 0.652667 13.2566 0.391333 12.9957C0.130444 12.7344 0 12.4204 0 12.0537V2.72038C0 2.35371 0.130444 2.03993 0.391333 1.77904C0.652667 1.51771 0.966667 1.38704 1.33333 1.38704H2V0.0537109H3.33333V1.38704H8.66667V0.0537109H10V1.38704H10.6667C11.0333 1.38704 11.3473 1.51771 11.6087 1.77904C11.8696 2.03993 12 2.35371 12 2.72038V12.0537C12 12.4204 11.8696 12.7344 11.6087 12.9957C11.3473 13.2566 11.0333 13.387 10.6667 13.387H1.33333ZM1.33333 12.0537H10.6667V5.38704H1.33333V12.0537ZM1.33333 4.05371H10.6667V2.72038H1.33333V4.05371ZM6 8.05371C5.81111 8.05371 5.65289 7.98971 5.52533 7.86171C5.39733 7.73415 5.33333 7.57593 5.33333 7.38704C5.33333 7.19815 5.39733 7.03971 5.52533 6.91171C5.65289 6.78415 5.81111 6.72038 6 6.72038C6.18889 6.72038 6.34733 6.78415 6.47533 6.91171C6.60289 7.03971 6.66667 7.19815 6.66667 7.38704C6.66667 7.57593 6.60289 7.73415 6.47533 7.86171C6.34733 7.98971 6.18889 8.05371 6 8.05371ZM3.33333 8.05371C3.14444 8.05371 2.986 7.98971 2.858 7.86171C2.73044 7.73415 2.66667 7.57593 2.66667 7.38704C2.66667 7.19815 2.73044 7.03971 2.858 6.91171C2.986 6.78415 3.14444 6.72038 3.33333 6.72038C3.52222 6.72038 3.68067 6.78415 3.80867 6.91171C3.93622 7.03971 4 7.19815 4 7.38704C4 7.57593 3.93622 7.73415 3.80867 7.86171C3.68067 7.98971 3.52222 8.05371 3.33333 8.05371ZM8.66667 8.05371C8.47778 8.05371 8.31956 7.98971 8.192 7.86171C8.064 7.73415 8 7.57593 8 7.38704C8 7.19815 8.064 7.03971 8.192 6.91171C8.31956 6.78415 8.47778 6.72038 8.66667 6.72038C8.85556 6.72038 9.01378 6.78415 9.14133 6.91171C9.26933 7.03971 9.33333 7.19815 9.33333 7.38704C9.33333 7.57593 9.26933 7.73415 9.14133 7.86171C9.01378 7.98971 8.85556 8.05371 8.66667 8.05371ZM6 10.7204C5.81111 10.7204 5.65289 10.6564 5.52533 10.5284C5.39733 10.4008 5.33333 10.2426 5.33333 10.0537C5.33333 9.86482 5.39733 9.7066 5.52533 9.57904C5.65289 9.45104 5.81111 9.38704 6 9.38704C6.18889 9.38704 6.34733 9.45104 6.47533 9.57904C6.60289 9.7066 6.66667 9.86482 6.66667 10.0537C6.66667 10.2426 6.60289 10.4008 6.47533 10.5284C6.34733 10.6564 6.18889 10.7204 6 10.7204ZM3.33333 10.7204C3.14444 10.7204 2.986 10.6564 2.858 10.5284C2.73044 10.4008 2.66667 10.2426 2.66667 10.0537C2.66667 9.86482 2.73044 9.7066 2.858 9.57904C2.986 9.45104 3.14444 9.38704 3.33333 9.38704C3.52222 9.38704 3.68067 9.45104 3.80867 9.57904C3.93622 9.7066 4 9.86482 4 10.0537C4 10.2426 3.93622 10.4008 3.80867 10.5284C3.68067 10.6564 3.52222 10.7204 3.33333 10.7204ZM8.66667 10.7204C8.47778 10.7204 8.31956 10.6564 8.192 10.5284C8.064 10.4008 8 10.2426 8 10.0537C8 9.86482 8.064 9.7066 8.192 9.57904C8.31956 9.45104 8.47778 9.38704 8.66667 9.38704C8.85556 9.38704 9.01378 9.45104 9.14133 9.57904C9.26933 9.7066 9.33333 9.86482 9.33333 10.0537C9.33333 10.2426 9.26933 10.4008 9.14133 10.5284C9.01378 10.6564 8.85556 10.7204 8.66667 10.7204Z"
                                fill="#718096"
                              />
                            </svg>
                          </span>
                          <span class="day-text">
                            {{ deal?.holiday?.duration }}</span
                          >
                        </div>
                        <div class="right">
                          <span class="location-icon">
                            <img
                              src="assets/images/icons/location.svg"
                              alt=" location icon"
                            />
                          </span>
                          <span class="location-text">
                            {{ deal?.holiday?.city || "City Name Here" }}</span
                          >
                        </div>
                      </div>
                      <div class="special-price">
                        <h3>
                          BDT
                          {{
                            deal?.holiday?.cost_per_person.toLocaleString() ||
                            ""
                          }}/<span>person</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <!-- Single Slide End -->
            </div>
          </div>
          <!-- SWIPPER JS NAVIGATION BUTTON -->
          <div class="swiper-button-prev top-prev">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 0.116128L12.9 1.98279L5.43336 9.44946L21.6667 9.44946L21.6667 12.1161L5.43336 12.1161L12.9 19.5828L11 21.4495L0.333354 10.7828L11 0.116128Z"
                fill="#718096"
              />
            </svg>
          </div>
          <!-- SWIPPER JS NAVIGATION BUTTON -->
          <div class="swiper-button-next top-next">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 21.4493L9.10004 19.5826L16.5667 12.116H0.333374V9.4493H16.5667L9.10004 1.98263L11 0.115967L21.6667 10.7826L11 21.4493Z"
                fill="#718096"
              />
            </svg>
          </div>
        </div>
        <!-- SPECIAL DEAL BODY END-->
      </div>
    </div>
  </section>
  <!-- ================== SPECIAL DEAL END ============================ -->
</template>

<script>
export default {
  name: "SpecialDeals",
  data() {
    return {
      deals: [],
    };
  },

  mounted() {
    this.getSpecialDeals();
  },
  computed:{
    appName() {
      return process.env.APP_NAME || "";
    },
  },
  methods: {
    getSpecialDeals() {
      this.$axios
        .get("/special-deal-list")
        .then((res) => {
          this.deals = res.data;
          this.swipeSlider();
        })
        .catch((err) => {
          this.$elog(err.response.status);
        });
    },
    imageUrlAlt(event) {
      event.target.src = "/assets/images/special-card/special-card-2.png";
    },
    detailsPage(slug, city, country = "") {
      let tomorrow = this.$moment().add(1, "days");
      tomorrow = tomorrow.format("YYYY-MM-DD");
      let url = `/holiday/details/${slug}?city=${city}&country=${country}&date=${tomorrow}&rooms=2_0&child_age=`;
      return url;
    },
    swipeSlider() {
      let swiper = new Swiper(".mySwiper", {
        mousewheelControl: false,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        },
      });
    },
  },
};
</script>
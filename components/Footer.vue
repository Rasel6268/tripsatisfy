<template>
  <div>
    <!-- ===================== FOOTER START ========================== -->
    <footer class="footer">
      <div class="footer-content">
        <!-- footer logo -->
        <div class="footer-logo">
          <div class="go-container">
            <figure>
              <img src="/assets/images/logo/logo.svg" alt="Go sobai logo" />
            </figure>
          </div>
        </div>
        <!-- footer info -->
        <div class="footer-info">
          <div class="go-container">
            <div class="row g-4">
              <div class="col-lg-3 col-sm-6 left">
                <div class="footer-details">
                  <div class="footer-details-body">
                    <h6>{{ appName }}</h6>
                    <p class="address" v-html="address"></p>
                    <ul class="social">
                      <li class="social-item" v-if="social.facebook">
                        <a
                          :href="social.facebook"
                          target="_blank"
                          class="social-link"
                          data-bs-toggle="tooltip" 
                          data-bs-placement="top" 
                          data-bs-title="Contact on Facebook"
                        >
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.00002 12.6606C9.57736 12.6606 11.6667 
                                                    10.5713 11.6667 7.99398C11.6667 5.41665 9.57736 3.32731 7.00002 3.32731C4.42269 3.32731 
                                                    2.33335 5.41665 2.33335 7.99398C2.33335 10.5713 4.42269 12.6606 7.00002 12.6606ZM7.00002 
                                                    13.8273C10.2217 13.8273 12.8334 11.2156 12.8334 7.99398C12.8334 4.77232 10.2217 2.16064 
                                                    7.00002 2.16064C3.77836 2.16064 1.16669 4.77232 1.16669 7.99398C1.16669 11.2156 3.77836 
                                                    13.8273 7.00002 13.8273Z"
                              fill="#718096"
                            />
                            <path
                              d="M7.00002 6.82739C7.00002 6.50523 7.26118 6.24406 7.58335 6.24406H8.16669C8.48886 
                                                    6.24406 8.75002 5.9829 8.75002 5.66073C8.75002 5.33856 8.48886 5.07739 8.16669 5.07739H7.58335C6.61683 
                                                    5.07739 5.83335 5.8609 5.83335 6.82739V7.99406H5.25002C4.92786 7.99406 4.66669 8.25522 4.66669 
                                                    8.57739C4.66669 8.89957 4.92785 9.16073 5.25002 9.16073H5.83335V12.6607C5.83335 12.9829 6.09451 
                                                    13.2441 6.41669 13.2441C6.73886 13.2441 7.00002 12.9829 7.00002 12.6607V9.16073H8.16669C8.48886 
                                                    9.16073 8.75002 8.89957 8.75002 8.57739C8.75002 8.25522 8.48886 7.99406 8.16669 7.99406H7.00002V6.82739Z"
                              fill="#718096"
                            />
                          </svg>
                        </a>
                      </li>
                      <li class="social-item" v-if="social.youtube">
                        <a
                          :href="social.youtube"
                          target="_blank"
                          class="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Contact on Youtube"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                          
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" fill="#718096" />
</svg>
                        </a>
                      </li>
                      <li class="social-item" v-if="social.linkedin">
                        <a
                          :href="social.linkedin"
                          target="_blank"
                          class="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Contact on Linkedin"
                        >
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.5 3.32731H3.50002C2.85569 3.32731 2.33335 
                                                    3.84965 2.33335 4.49398V11.494C2.33335 12.1383 2.85569 12.6606 3.50002 12.6606H10.5C11.1444 
                                                    12.6606 11.6667 12.1383 11.6667 11.494V4.49398C11.6667 3.84965 11.1444 3.32731 10.5 3.32731ZM3.50002 
                                                    2.16064C2.21136 2.16064 1.16669 3.20531 1.16669 4.49398V11.494C1.16669 12.7826 2.21136 13.8273 3.50002 
                                                    13.8273H10.5C11.7887 13.8273 12.8334 12.7826 12.8334 11.494V4.49398C12.8334 3.20531 11.7887 2.16064 10.5 
                                                    2.16064H3.50002Z"
                              fill="#718096"
                            />
                            <path
                              d="M4.08333 5.66069C4.4055 5.66069 4.66667 5.39952 4.66667 5.07735C4.66667 4.75519 4.4055 4.49402 
                                                    4.08333 4.49402C3.76117 4.49402 3.5 4.75519 3.5 5.07735C3.5 5.39952 3.76117 5.66069 4.08333 5.66069Z"
                              fill="#718096"
                            />
                            <path
                              d="M4.08333 6.82739C3.76117 6.82739 3.5 7.08855 3.5 7.41073V10.9107C3.5 11.2329 3.76117 11.4941 
                                                    4.08333 11.4941C4.4055 11.4941 4.66667 11.2329 4.66667 10.9107V7.41073C4.66667 7.08855 4.4055 6.82739 
                                                    4.08333 6.82739Z"
                              fill="#718096"
                            />
                            <path
                              d="M8.16665 7.99406C7.5223 7.99406 6.99998 8.51638 6.99998 9.16073V10.9107C6.99998 11.2329 
                                                    6.73882 11.4941 6.41665 11.4941C6.09447 11.4941 5.83331 11.2329 5.83331 10.9107V7.41073C5.83331 
                                                    7.08855 6.09447 6.82739 6.41665 6.82739C6.65313 6.82739 6.85671 6.96809 6.9483 7.17033C7.3029
                                                    6.95281 7.72016 6.82739 8.16665 6.82739C9.45529 6.82739 10.5 7.87208 10.5 9.16073V10.9107C10.5 
                                                    11.2329 10.2388 11.4941 9.91665 11.4941C9.59447 11.4941 9.33331 11.2329 9.33331 10.9107V9.16073C9.33331 
                                                    8.51638 8.811 7.99406 8.16665 7.99406Z"
                              fill="#718096"
                            />
                          </svg>
                        </a>
                      </li>
                      <li class="social-item" v-if="social.instagram">
                        <a
                          :href="social.instagram"
                          target="_blank"
                          class="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Contact on Instagram"
                        >
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.33335 3.32731H4.66669C3.37802 3.32731 
                                                    2.33335 4.37198 2.33335 5.66064V10.3273C2.33335 11.616 3.37802 12.6606 4.66669 12.6606H9.33335C10.622 
                                                    12.6606 11.6667 11.616 11.6667 10.3273V5.66064C11.6667 4.37198 10.622 3.32731 9.33335 3.32731ZM4.66669 
                                                    2.16064C2.73369 2.16064 1.16669 3.72765 1.16669 5.66064V10.3273C1.16669 12.2603 2.73369 13.8273 4.66669 
                                                    13.8273H9.33335C11.2663 13.8273 12.8334 12.2603 12.8334 10.3273V5.66064C12.8334 3.72765 11.2663 2.16064 
                                                    9.33335 2.16064H4.66669Z"
                              fill="#718096"
                            />
                            <path
                              d="M9.91665 5.66069C10.2388 5.66069 10.5 5.39952 10.5 5.07735C10.5 4.75519 10.2388 4.49402 9.91665 
                                                    4.49402C9.59447 4.49402 9.33331 4.75519 9.33331 5.07735C9.33331 5.39952 9.59447 5.66069 9.91665 5.66069Z"
                              fill="#718096"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.91665 7.99406C9.91665 9.60488 8.6108 10.9107 6.99998 
                                                    10.9107C5.38915 10.9107 4.08331 9.60488 4.08331 7.99406C4.08331 6.38323 5.38915 5.07739 6.99998 
                                                    5.07739C8.6108 5.07739 9.91665 6.38323 9.91665 7.99406ZM8.74998 7.99406C8.74998 8.96058 7.9665 
                                                    9.74406 6.99998 9.74406C6.03345 9.74406 5.24998 8.96058 5.24998 7.99406C5.24998 7.02753 6.03345 
                                                    6.24406 6.99998 6.24406C7.9665 6.24406 8.74998 7.02753 8.74998 7.99406Z"
                              fill="#718096"
                            />
                          </svg>
                        </a>
                      </li>
                      <li class="social-item" v-if="social.twitter">
                        <a
                          :href="social.twitter"
                          target="_blank"
                          class="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Contact on X "
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                             <path
                             d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                            </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="footer-links">
                  <div class="footerlist_1">
                    <!-- Footer links -->
                    <h6 class="mb-2">Pages</h6>
                    <ul class="footerlist">
                      <li class="footerlist-item" v-for="page of pages" :key="page.id">
                        <nuxt-link :to="'/page/'+page.slug" class="footerlist-link">{{ page.title }}</nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 payment">
                <div class="footer-details">
                  <div class="footer-details-header">
                    <h6>We accept</h6>
                  </div>
                  <div class="footer-details-body">
                    <img
                      src="/assets/images/footer/SSL-Commerz-Pay.jpg"
                      alt="payment image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- copyright -->
        <div class="footer-copyright">
          <p class="copyright-text">
            Copyright @ {{ new Date().getFullYear() }}. {{ appName }}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    <!-- ===================== FOOTER END ============================ -->

    <!-- BACK TO TOP START -->
    <button class="btn-back-to-top d-none" @click="scrollToTop" id="back-to-up">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 
                3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 
                1-.708.708L8.5 5.707V11.5z"
        />
      </svg>
    </button>
    <!-- BACK TO TOP END -->

    <!-- ===========================MOBILE OFFCANVAS MENU  START======================== -->

    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="mobileMenu"
      aria-labelledby="mobileMenu"
    >
      <div class="offcanvas-header">
        <nuxt-link to="/" class="logo">
          <img src="/assets/images/logo/logo.svg" alt="logo" />
        </nuxt-link>

        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2849 15.5425L7.62804 9.88562L1.97118 15.5425L0.0855651 13.6569L5.74242 8L0.0855651 
                        2.34315L1.97118 0.457528L7.62804 6.11438L13.2849 0.457527L15.1705 2.34315L9.51366 8L15.1705 13.6569L13.2849 
                        15.5425Z"
              fill="#718096"
            />
          </svg>
        </button>
      </div>

      <div class="offcanvas-body">
        <ul class="mobilelist">
          <li class="mobilelist-item" data-bs-dismiss="offcanvas">
            <nuxt-link to="/" class="mobilelist-link" >Flights</nuxt-link>
          </li>
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <nuxt-link to="/hotel" class="mobilelist-link">Hotel</nuxt-link>
          </li>
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <nuxt-link to="/holiday" class="mobilelist-link"
              >Holiday
            </nuxt-link>
          </li>
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <nuxt-link to="/visa" class="mobilelist-link">Visa</nuxt-link>
          </li>
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <nuxt-link to="/blogs" class="mobilelist-link">Blog </nuxt-link>
          </li>
        </ul>

        <ul class="mobilelist mobilelist-loged" v-if="loggedIn">
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <nuxt-link to="/profile" class="mobilelist-link"
              >My Account</nuxt-link
            >
          </li>
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <nuxt-link to="/booking" class="mobilelist-link"
              >My Booking
            </nuxt-link>
          </li>
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <span class="mobilelist-link" @click="logout">Logout</span>
          </li>
        </ul>
        <ul class="mobilelist mobilelist-loged" v-else>
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <nuxt-link to="/login" class="mobilelist-link">Login</nuxt-link>
          </li>
          <li class="mobilelist-item"  data-bs-dismiss="offcanvas">
            <nuxt-link to="/signup" class="mobilelist-link">Signup</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- ===========================MOBILE OFFCANVAS MENU END ======================== -->
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      isSidebarOpen:false,
      pages:[]
    }
  },
  computed: {
    appName() {
      return process.env.APP_NAME || "";
    },
    address() {
      return process.env.address || "";
    },
    social() {
      return process.env.social || {};
    },
    loggedIn() {
      return this.$auth.loggedIn;
    },
  },
  mounted(){
    this.getPages();
  },
  methods: {
    getPages() {
      this.$axios
          .get(`/extra-pages`)
          .then((res) => {
              this.pages = res.data;
          })
          .catch((err) => {
              this.$elog(err.response.data);
          });
    },
    async logout() {
      try {
        let response = await this.$auth.logout();
        this.$log(response);
        this.$toast.success("Logout Successfully!");
      } catch (err) {
        this.$elog(err.response);
        this.$elog(err);
      }
      this.$router.push("/");
    },
    // Back to top button click function
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
};
</script>
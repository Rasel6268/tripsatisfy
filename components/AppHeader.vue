<template>
  <div>
    <!--========== PRELOADER-START ==========-->
    <div class="preloader" id="preloader">
      <img src="/assets/images/preloader/238.gif" alt="spinner" />
    </div>
    <!--========== PRELOADER-END ==========-->
    <header class="header-others" id="header">
      <div class="go-container">
        <!-- Header Navigation  -->
        <nav class="header-nav">
          <!-- logo -->
          <nuxt-link to="/" class="logo">
            <img src="/assets/images/logo/logo.svg" alt="logo" />
          </nuxt-link>
          <!-- Middle Menu  -->
          <div class="middlemenu d-none d-lg-block" v-if="currentRoute !== ''">
            <ul class="desktoplist">
              <li class="desktoplist-item">
                <nuxt-link
                  to="/"
                  :class="[
                    'desktoplist-link',
                    currentRoute == 'flight' && 'active',
                  ]"
                  >Flight</nuxt-link
                >
              </li>
              <li class="desktoplist-item">
                <nuxt-link
                  to="/hotel/search"
                  :class="[
                    'desktoplist-link',
                   currentRoute == 'hotel' &&
                      'active',
                  ]"
                  >Hotel</nuxt-link
                >
              </li>
              <li class="desktoplist-item">
                <nuxt-link
                  to="/holiday/search"
                  :class="[
                    'desktoplist-link',
                   currentRoute == 'holiday' &&
                      'active',
                  ]"
                  >Holiday</nuxt-link
                >
              </li>
              <li class="desktoplist-item">
                <nuxt-link
                  to="/visa/search"
                  :class="[
                    'desktoplist-link',
                   currentRoute == 'visa' &&
                      'active',
                  ]"
                  >Visa</nuxt-link
                >
              </li>
            </ul>
          </div>

          <!-- desktop list -->
          <div class="deskmenu d-none d-lg-block">
            <ul class="desktoplist">
              <li class="desktoplist-item">
                <nuxt-link class="desktoplist-link" to="/blogs">
                  Blog
                </nuxt-link>
              </li>
              <li class="desktoplist-item ms-1 ms-md-4">
                <a
                  href="#"
                  :class="['desktoplist-icon', loggedIn && 'loggedin']"
                >
                  <span class="icon header-user-icon">
                    <img v-if="loggedIn" :src="userImage() || defaultUserImg" alt="profile image ">
                    <img v-else :src="defaultUserImg" alt="profile image ">
                  </span>
                </a>
                <div class="header-dropwown">
                  <ul class="dropdownlist" v-if="loggedIn">
                    <li class="dropdownlist-item overflow-hidden" v-if="userData?.user?.username" :title="userData?.user?.username">
                      <small class="small-text"> {{ userData?.user?.username || '' }} </small>
                    </li>
                    <li class="dropdownlist-item">
                      <nuxt-link to="/profile" class="dropdownlist-link">
                        <span class="icon">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 5.78271C10 6.88728 9.10457 7.78271 
                                                8 7.78271C6.89543 7.78271 6 6.88728 6 5.78271C6 4.67815 6.89543 3.78271 
                                                8 3.78271C9.10457 3.78271 10 4.67815 10 5.78271ZM8 8.78271C9.65685 8.78271 11 
                                                7.43957 11 5.78271C11 4.12586 9.65685 2.78271 8 2.78271C6.34315 2.78271 5 4.12586 
                                                5 5.78271C5 7.43957 6.34315 8.78271 8 8.78271ZM14 13.7827C14 14.7827 13 14.7827 
                                                13 14.7827H3C3 14.7827 2 14.7827 2 13.7827C2 12.7827 3 9.78271 8 9.78271C13 
                                                9.78271 14 12.7827 14 13.7827ZM13 13.7792C12.9986 13.5324 12.8462 12.7932 
                                                12.1679 12.1148C11.5156 11.4626 10.2891 10.7827 7.99999 10.7827C5.71088 10.7827 
                                                4.48435 11.4626 3.8321 12.1148C3.15375 12.7932 3.00142 13.5324 3 13.7792H13Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span class="name"> My Profile</span>
                      </nuxt-link>
                    </li>
                    <li class="dropdownlist-item">
                      <nuxt-link to="/booking" class="dropdownlist-link">
                        <span class="icon">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.5 3.78271H1.5C1.22386 3.78271 1 4.00657 1 4.28271V13.2827C1 
                                                13.5589 1.22386 13.7827 1.5 13.7827H14.5C14.7761 13.7827 15 13.5589 15 13.2827V4.28271C15 4.00657 14.7761 3.78271 14.5 3.78271ZM1.5 
                                                2.78271C0.671573 2.78271 0 3.45429 0 4.28271V13.2827C0 14.1111 0.671573 14.7827 1.5 14.7827H14.5C15.3284 
                                                14.7827 16 14.1111 16 13.2827V4.28271C16 3.45429 15.3284 2.78271 14.5 2.78271H1.5Z"
                              fill="black"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5 8.78271C5 8.50657 5.22386 8.28271 5.5 8.28271H12.5C12.7761 
                                                8.28271 13 8.50657 13 8.78271C13 9.05886 12.7761 9.28271 12.5 9.28271H5.5C5.22386 9.28271 5 9.05886 5 8.78271Z"
                              fill="black"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5 6.28271C5 6.00657 5.22386 5.78271 5.5 5.78271H12.5C12.7761 
                                                5.78271 13 6.00657 13 6.28271C13 6.55886 12.7761 6.78271 12.5 6.78271H5.5C5.22386 6.78271 5 6.55886 5 6.28271Z"
                              fill="black"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5 11.2827C5 11.0066 5.22386 10.7827 5.5 10.7827H12.5C12.7761 
                                                10.7827 13 11.0066 13 11.2827C13 11.5589 12.7761 11.7827 12.5 11.7827H5.5C5.22386 11.7827 5 11.5589 5 11.2827Z"
                              fill="black"
                            />
                            <circle
                              cx="3.5"
                              cy="6.28271"
                              r="0.5"
                              fill="black"
                            />
                            <circle
                              cx="3.5"
                              cy="8.78271"
                              r="0.5"
                              fill="black"
                            />
                            <circle
                              cx="3.5"
                              cy="11.2827"
                              r="0.5"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span class="name">My Booking</span>
                        <!-- <span class="number">7</span> -->
                      </nuxt-link>
                    </li>
                    <li class="dropdownlist-item" v-if="userData.customer_type == 'B2B'">
                      <nuxt-link to="/mybalance" class="dropdownlist-link">
                        <span class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
</svg>
                        </span>
                        <span class="name">My Balance</span>
                      </nuxt-link>
                    </li>
                    <li class="dropdownlist-item" v-if="userData.customer_type == 'B2B'">
                      <nuxt-link to="/mytransactions" class="dropdownlist-link">
                        <span class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
  <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
</svg>
                        </span>
                        <span class="name">My Transactions</span>
                      </nuxt-link>
                    </li>
                    <li class="dropdownlist-item">
                      <nuxt-link to="/flight/history" class="dropdownlist-link">
                        <span class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-columns-reverse" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5m4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5m-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
</svg>
                        </span>
                        <span class="name">Flight History</span>
                      </nuxt-link>
                    </li>
                    <li class="dropdownlist-item">
                      <button class="dropdownlist-link" @click="logout">
                        <span class="icon">
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <mask
                              id="mask0_6999_46844"
                              style="mask-type: alpha"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="17"
                              height="16"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.53613 12.5C6.53613 12.7761 6.75999 13 7.03613 
                                                    13L15.0361 13C15.3123 13 15.5361 12.7761 15.5361 12.5L15.5361 3.5C15.5361 3.22386 15.3123 3 15.0361 
                                                    3L7.03613 3C6.75999 3 6.53613 3.22386 6.53613 3.5L6.53613 5.5C6.53613 5.77614 6.31227 6 6.03613 
                                                    6C5.75999 6 5.53613 5.77614 5.53613 5.5L5.53613 3.5C5.53613 2.67157 6.20771 2 7.03613 2L15.0361 
                                                    2C15.8646 2 16.5361 2.67157 16.5361 3.5L16.5361 12.5C16.5361 13.3284 15.8646 14 15.0361 14L7.03613 
                                                    14C6.20771 14 5.53613 13.3284 5.53613 12.5L5.53613 10.5C5.53613 10.2239 5.75999 10 6.03613 10C6.31227 
                                                    10 6.53613 10.2239 6.53613 10.5L6.53613 12.5Z"
                                fill="black"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0.682579 8.35355C0.487317 8.15829 0.487317 7.84171 
                                                    0.682579 7.64645L3.68258 4.64645C3.87784 4.45118 4.19442 4.45118 4.38969 4.64645C4.58495 4.84171 4.58495 
                                                    5.15829 4.38969 5.35355L2.24324 7.5L11.0361 7.5C11.3123 7.5 11.5361 7.72386 11.5361 8C11.5361 8.27614 
                                                    11.3123 8.5 11.0361 8.5L2.24324 8.5L4.38969 10.6464C4.58495 10.8417 4.58495 11.1583 4.38969 
                                                    11.3536C4.19442 11.5488 3.87784 11.5488 3.68258 11.3536L0.682579 8.35355Z"
                                fill="black"
                              />
                            </mask>
                            <g mask="url(#mask0_6999_46844)">
                              <rect
                                x="0.536133"
                                width="16"
                                height="16"
                                fill="#425466"
                              />
                            </g>
                          </svg>
                        </span>
                        <span class="name"> Logout</span>
                      </button>
                    </li>
                  </ul>
                  <ul class="dropdownlist" v-else>
                    <li class="dropdownlist-item">
                      <nuxt-link to="/login" class="dropdownlist-link">
                        <span class="icon">
                          <svg
                            width="16"
                            height="17"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span class="name"> Login</span>
                      </nuxt-link>
                    </li>
                    <li class="dropdownlist-item">
                      <nuxt-link to="/signup" class="dropdownlist-link">
                        <span class="icon">
                          <svg
                            width="16"
                            height="17"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                              fill="black"
                            />
                          </svg>
                        </span>

                        <span class="name"> Signup</span>
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <!-- HAMBURGER MENU -->
          <div class="hamburger d-lg-none">
            <button
              type="button"
              class="btn-hamburger"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileMenu"
              aria-controls="mobileMenu"
            >
              <svg
                width="19"
                height="13"
                viewBox="0 0 19 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.407227 12.9297V10.9297H18.4072V12.9297H0.407227ZM0.407227 7.92969V5.92969H18.4072V7.92969H0.407227ZM0.407227 
                            2.92969V0.929688H18.4072V2.92969H0.407227Z"
                  fill="#718096"
                />
              </svg>
            </button>

            <!-- offcanvas erer -->
            <!-- offcanvas erer -->
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data(){
    return {
      defaultUserImg:'/assets/images/user.svg',
    }
  },
  mounted() {
    this.preloaderScript();
    if (this.$auth.loggedIn) {
        this.$store.dispatch("userInfo");
      }
  },
  computed: {
    currentRoute() {
      let str = this.$route.path;
      const parts = str.split('/');
      return parts[1];
    },
    loggedIn() {
      return this.$auth.loggedIn;
    },
    userData() {
      return {
        ...this.$store.state.userInfo,
      };
    },
  },
  watch: {
    loggedIn() {
      if (this.$auth.loggedIn) {
        this.$store.dispatch("userInfo");
      }
    },
  },
  methods: {
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
    userImage(){
      if(this.userData.social_id != null && this.userData.image == null){
        return this.userData.social_img;
      }
      return this.userData.image;
    },
    preloaderScript() {
      const preloader = document.querySelector("#preloader");
     
      window.setTimeout(()=>{
        preloader.classList.add("d-none");
      },1500)
      /* window.addEventListener("load", () => {
      }); */
    },
  },
};
</script>


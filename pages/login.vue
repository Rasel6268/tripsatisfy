<template>
  <!-- ==============login start==================== -->
  <section class="login-section">
    <div class="go-container">
      <div class="row">
        <div class="col-lg-6 col-xl-5">
          <div class="login-box">
            <div class="login-box-header">
              <h2 class="login-title">Welcome back!</h2>
              <div class="social-signup">
                <p class="social-label">Sign in with</p>
                <div class="row g-2">
                  <div class="col-md-6">
                    <google-signin type="Sign in" />
                  </div>
                  <div class="col-md-6">
                    <button class="social-btn facebook-button" @click="loginWithFacebook">
                            <span class="icon">
                                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="url(#paint0_linear_6885_50730)"></circle>
                                    <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 
                                    11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 
                                    13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 
                                    30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"></path>
                                    <defs>
                                    <linearGradient id="paint0_linear_6885_50730" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#18ACFE"></stop>
                                    <stop offset="1" stop-color="#0163E0"></stop>
                                    </linearGradient>
                                    </defs>
                                </svg> 
                            </span>
                            <span class="title">
                              Sign in with Facebook
                            </span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="or">
                <span>OR</span>
                <div class="line"></div>
              </div>
            </div>
            <div class="login-box-body">
              <form @submit.prevent="submitWithValidation">
                <div class="row g-4">
                  <div class="col-12">
                    <div :class="['input-box2', errors.email && 'invalid']">
                      <label for="email" class="input-label">Email <span class="text-danger">*</span></label>
                      <input type="email" @keyup="fieldValiation('email')" v-model="email" id="email" required
                        class="input-field" placeholder="Write Your Email" />
                      <span v-if="errors.email" class="text-danger fl-Cap fs-12">
                        {{ errors.email }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div :class="['input-box2', errors.password && 'invalid']">
                      <label for="password" class="input-label">Password <span class="text-danger">*</span></label>
                      <div class="input-group flex-nowrap">
                        <input name="password" type="password" @keyup="fieldValiation('password')" minlength="8" required
                          v-model="password" id="new_password" class="form-control input-field"
                          placeholder="Write Your Password" />
                        <span class="input-group-text" id="addon-wrapping" role="button" @click="passwordShowTrigger()">
                          <svg v-if="passwordShow" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path
                              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path
                              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                          </svg>

                          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path
                              d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                            <path
                              d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                            <path
                              d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        </span>
                      </div>
                      <span v-if="errors.password" class="text-danger fl-Cap fs-12">
                        {{ errors.password }}
                      </span>
                      <p>
                        <nuxt-link to="/password" class="forget-link">Forget Password?</nuxt-link>
                      </p>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <div class="button-wrapper">
                      <button class="save-btn" type="submit">Log In</button>
                    </div>
                  </div>

                  <div class="col-12 text-center">
                    <p class="already-text">
                      Dont Have an account ?
                      <nuxt-link to="/signup">Sign UP</nuxt-link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-lg-6 col-xl-7 d-none d-lg-flex align-items-center justify-content-center">
          <figure class="aroplane-thumb">
            <img src="/assets/images/header/aroplan.png" alt="" />
          </figure>
        </div>
      </div>
    </div>
  </section>
  <!-- ==================Login End==================== -->
</template>

<script>

import googleSignin from '../components/login/googleSignin.vue';
export default {
  components: { googleSignin },
  auth: false,
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      passwordShow: false,
      errors: {
        email: false,
        password: false,
      },
      // for store facebook data
      
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.go(-1);
    }
  },

  methods: {
    loginWithFacebook() {
      const clientId = process.env.FACEBOOK_APP_ID;
      
      const redirectUri = `${process.env.ROOT_URL}${process.env.facebook_call_back}`;
     
      const scope = 'email'; // Add additional scopes as required

      window.location.href = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      
    },
    passwordShowTrigger() {
      this.passwordShow = !this.passwordShow;
      let passId = document.getElementById('new_password');
      if (this.passwordShow) {
        passId.setAttribute('type', 'text');
      } else {
        passId.setAttribute('type', 'password');
      }
    },
    async submitWithValidation() {
      // error check
      let errors = Object.values(this.errors).filter((item) => {
        return item;
      });
      if (errors.length == 0 && this.email != "" && this.password != "") {
        try {
          let response = await this.$auth.loginWith("local", {
            data: { email: this.email, password: this.password },
          });
          // this.$log(response.data)
          this.$toast.success("Login Successfully!");
          if (localStorage.getItem("previousPath") != null) {
            this.$router.push(localStorage.getItem("previousPath"));
            localStorage.removeItem("previousPath");
          } else {
            this.$router.push("/");
          }
        } catch (error) {
          if (error.response) {
            this.$elog(error.response);
            if (error.response.data) {
              let errors = error.response.data;
              if (errors.message) {
                this.errors.password = errors.message.join(",");
              }
            }
          } else if (error.request) {
            this.$elog(error.request);
          } else {
            this.$elog("Error", error.message);
          }
        }
      }
    },
    fieldValiation(name) {
      if (this[name] != undefined) {
        if (this[name] == "") {
          this.errors[name] = `${name} can not be null`;
        } else {
          this.errors[name] = false;
        }
      }
    },
  },
};
</script>

<style></style>
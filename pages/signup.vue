<template>
  <!-- ==================== HEADER END================================ -->
  <section class="login-section">
    <div class="go-container">
      <div class="row">
        <div class="col-lg-6 col-xl-5">
          <div class="login-box">
            <div class="login-box-header">
              <h2 class="login-title">
                Create an account to easily use our services.
              </h2>
              <div class="social-signup">
                <p class="social-label">Sign up with</p>
                <div class="row g-2">
                  <div class="col-md-6">
                    <google-signin type="Sign up" />
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
                        Sign up with Facebook
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
                      <label for="email" class="input-label">Email <span class="text-danger">*</span> </label>
                      <input type="email" @keyup="fieldValiation('email')" v-model="user.email" id="email" required
                        class="input-field" placeholder="Write Your Email" />
                      <span v-if="errors.email" class="text-danger fl-Cap fs-12">
                        {{ errors.email }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div :class="['input-box2', errors.password && 'invalid']">
                      <label for="password" class="input-label">Password <span class="text-danger">*</span></label>
                      <input type="password" @keyup="fieldValiation('password')" minlength="8" required
                        v-model="user.password" id="new_password" class="input-field" placeholder="Write Your Password" />
                      <span v-if="errors.password" class="text-danger fl-Cap fs-12">
                        {{ errors.password }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div :class="[
                      'input-box2',
                      errors.confirmPassword && 'invalid',
                    ]">
                      <label for="con_passsword" class="input-label">Confirm Password <span
                          class="text-danger">*</span></label>
                      <input type="password" minlength="8" @keyup="passwordMatch" required v-model="user.confirmPassword"
                        id="con_password" class="input-field" placeholder="Re write your new password here" />
                      <span v-if="errors.confirmPassword" class="text-danger fs-12">
                        {{ errors.confirmPassword }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div :class="['input-box2', errors.mobile && 'invalid']">
                      <label for="mobile" class="input-label">Mobile Number <span class="text-danger">*</span></label>
                      <input type="number" @keyup="fieldValiation('mobile')" minlength="11" required min="0"
                        v-model="user.mobile" id="mobile" class="input-field" placeholder="Write Your Mobile Number" />
                      <span v-if="errors.mobile" class="text-danger fl-Cap fs-12">
                        {{ errors.mobile }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <div class="button-wrapper">
                      <button type="submit" class="save-btn">Sign UP</button>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <p class="already-text">
                      Already have an account ?
                      <nuxt-link to="/login">Login</nuxt-link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="
            col-lg-6 col-xl-7
            d-none d-lg-flex
            align-items-center
            justify-content-center
          ">
          <figure class="aroplane-thumb">
            <img src="/assets/images/header/aroplan.png" alt="" />
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import googleSignin from '../components/login/googleSignin.vue';
export default {
  components: { googleSignin },
  name: "Signup",

  data() {
    return {
      user: {
        username: "a",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
      },
      errors: {
        confirmPassword: false,
        mobile: false,
        email: false,
        password: false,
      },
      isSubmit: false,
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
    submitWithValidation() {
      // error check
      let errors = Object.values(this.errors).filter((item) => {
        return item;
      });
      // blank check
      let blanks = Object.values(this.user).filter((item) => {
        return item == "";
      });
      if (errors.length == 0 && blanks.length == 0) {
        const data = {
          user: {
            username: this.user.email,
            email: this.user.email,
            password: this.user.password,
          },
          phone_number: this.user.mobile,
        };
        this.$axios
          .post("/users/", data)
          .then((res) => {
            this.$auth.loginWith("local", {
              data: { email: this.user.email, password: this.user.password },
            });
            this.$toast.success("Successfully Registered.");

            if (localStorage.getItem("previousPath") != null) {
              this.$router.push(localStorage.getItem("previousPath"));
              localStorage.removeItem("previousPath");
            } else {
              this.$router.push("/");
            }
          })
          .catch((error) => {
            if (error.response) {
              this.$elog(error.response.data);
              if (error.response.data) {
                let errors = error.response.data?.user;
                if (errors.username) {
                  this.errors.email = errors.username.join(",");
                }
                if (errors.email) {
                  this.errors.email = errors.email.join(",");
                }
                if (errors.password) {
                  this.errors.password = errors.password.join(",");
                }
              }
            } else if (error.request) {
              this.$elog(error.request);
            } else {
              this.$elog("Error", error.message);
            }
            // this.$elog(error.config);
          });
      }
    },
    fieldValiation(name) {
      if (this.user[name] != undefined) {
        if (this.user[name] == "") {
          this.errors[name] = `${name} can not be null`;
        } else {
          this.errors[name] = false;
        }
        if (name == "mobile") {
          if (this.user.mobile != "" && this.user.mobile.length < 11) {
            this.errors.mobile = "Mobile Number at least 11 digit";
          }
        }
        if (name == "password") {
          if (this.user.password != "") {
            this.passwordMatch();
            this.errors.password = false;
          }
        }
      }
    },
    passwordMatch() {
      if (this.user.confirmPassword != "") {
        if (this.user.password != this.user.confirmPassword) {
          this.errors.confirmPassword =
            "The password confirmation does not match";
        } else {
          this.errors.confirmPassword = false;
        }
      } else if (this.user.password == "") {
        this.errors.confirmPassword = "Password can not be null.";
      }
    },
  },
};
</script>

<style></style>
<template>
  <!-- ==============login start==================== -->
  <section class="login-section">
    <div class="go-container">
      <div class="row">
        <div class="col-lg-6 col-xl-5">
          <div class="login-box">
            <div class="login-box-header">
              <h2 class="login-title">Password Reset</h2>
              <h6 class="text-center">New Password</h6>
            </div>
            <div class="login-box-body">
              <form @submit.prevent="submitWithValidation">
                <div class="row g-4">
                  <div class="col-12">
                    <div class="input-box2">
                      <br />
                      <label class="input-label"
                        ><b> Email: </b> {{ email }}
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div :class="['input-box2', errors.password && 'invalid']">
                      <label for="password" class="input-label">Password</label>
                      <input
                        type="password"
                        @keyup="fieldValiation('password')"
                        minlength="8"
                        required
                        v-model="password"
                        id="password"
                        class="input-field"
                        placeholder="Write your password"
                      />
                      <span
                        v-if="errors.password"
                        class="text-danger fl-Cap fs-12"
                      >
                        {{ errors.password }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div
                      :class="[
                        'input-box2',
                        errors.confirmPassword && 'invalid',
                      ]"
                    >
                      <label for="con_passsword" class="input-label"
                        >Confirm Password</label
                      >
                      <input
                        type="password"
                        minlength="8"
                        @keyup="passwordMatch"
                        required
                        v-model="confirmPassword"
                        id="con_password"
                        class="input-field"
                        placeholder="Rewrite your password"
                      />
                      <span
                        v-if="errors.confirmPassword"
                        class="text-danger fs-12"
                      >
                        {{ errors.confirmPassword }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <div class="button-wrapper">
                      <button class="save-btn" type="submit">Submit</button>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <p class="already-text">
                      <nuxt-link to="/signup">Signup</nuxt-link> |
                      <nuxt-link to="/login">Login</nuxt-link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          class="
            col-lg-6 col-xl-7
            d-none d-lg-flex
            align-items-center
            justify-content-center
          "
        >
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
import jsonParse from "/static/utils/jsonParse.js";
export default {
  auth: false,
  name: "PasswordReset",
  data() {
    return {
      password: "",
      confirmPassword: "",
      email: "",
      otp: "",
      errors: {
        password: false,
        confirmPassword: false,
      },
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.go(-1);
    }
    this.getEmail();
  },

  methods: {
    async submitWithValidation() {
      if (this.password != "" && this.confirmPassword != "") {
        try {
          let response = await this.$axios.post(
            "/reset-password/reset-password",
            {
              otp: this.otp,
              email: this.email,
              password: this.password,
            }
          );
          this.$log(response.data);
          this.$toast.success("Password Changed Successfully!");
          localStorage.removeItem("passwordOtp");
          this.$router.push("/login");
        } catch (error) {
          if (error.response) {
            this.errors.password = "Credentials is not valid!";
          }
        }
      } else {
        this.errors.password = "Password can not be empty!";
      }
    },
    // get email from local storage
    getEmail() {
      if (localStorage.getItem("passwordOtp") != null) {
        let credentials = jsonParse(localStorage.getItem("passwordOtp"));
        this.email = credentials.email;
        this.otp = credentials.otp;
      } else {
        this.$router.push("/password");
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
    passwordMatch() {
      if (this.confirmPassword != "") {
        if (this.password != this.confirmPassword) {
          this.errors.confirmPassword =
            "The password confirmation does not match";
        } else {
          this.errors.confirmPassword = false;
        }
      } else if (this.password == "") {
        this.errors.confirmPassword = "Password can not be null.";
      }
    },
  },
};
</script>

<style>
</style>
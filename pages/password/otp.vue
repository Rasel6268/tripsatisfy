<template>
  <!-- ==============login start==================== -->
  <section class="login-section">
    <div class="go-container">
      <div class="row">
        <div class="col-lg-6 col-xl-5">
          <div class="login-box">
            <div class="login-box-header">
              <h2 class="login-title">Password Reset</h2>
              <h6 class="text-center">Submit your otp</h6>
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
                    <div :class="['input-box2', errors.otp && 'invalid']">
                      <label for="otp" class="input-label">OTP</label>
                      <input
                        type="otp"
                        @keyup="fieldValiation('otp')"
                        v-model="otp"
                        id="otp"
                        class="input-field"
                        placeholder="Write Your OTP"
                      />
                      <span v-if="errors.otp" class="text-danger fl-Cap fs-12">
                        {{ errors.otp }}
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
export default {
  auth: false,
  name: "SubmitOTP",
  data() {
    return {
      email: "",
      otp: "",
      errors: {
        email: false,
        otp: false,
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
      if (this.email != "" && this.otp != "") {
        try {
          let response = await this.$axios.post("/reset-password/check-otp", {
            email: this.email,
            otp: this.otp,
          });
          this.$log(response);
          localStorage.removeItem("passwordReset");
          localStorage.setItem("passwordOtp", JSON.stringify(response.data));
          this.$router.push("/password/reset");
          this.$toast.success("Otp matched Successfully!");
        } catch (error) {
          if (error.response) {
            this.errors.otp = "OTP is not valid!";
          }
        }
      } else {
        this.errors.otp = "OTP can not be empty!";
      }
    },
    // get email from local storage
    getEmail() {
      if (localStorage.getItem("passwordReset")) {
        this.email = localStorage.getItem("passwordReset");
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
  },
};
</script>

<style>
</style>
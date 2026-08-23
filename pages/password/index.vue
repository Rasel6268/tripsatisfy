<template>
  <!-- ==============login start==================== -->
  <section class="login-section">
    <div class="go-container">
      <div class="row">
        <div class="col-lg-6 col-xl-5">
          <div class="login-box">
            <div class="login-box-header">
              <h2 class="login-title">Password Reset</h2>
            </div>
            <div class="login-box-body">
              <form @submit.prevent="submitWithValidation">
                <div class="row g-4">
                  <div class="col-12">
                    <div :class="['input-box2', errors.email && 'invalid']">
                      <label for="email" class="input-label">Email</label>
                      <input
                        type="email"
                        @keyup="fieldValiation('email')"
                        v-model="email"
                        id="email"
                        class="input-field"
                        placeholder="Write Your Email"
                      />
                      <span
                        v-if="errors.email"
                        class="text-danger fl-Cap fs-12"
                      >
                        {{ errors.email }}
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
  name: "ResetPassword",
  data() {
    return {
      email: "",
      errors: {
        email: false,
      },
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.go(-1);
    }
  },

  methods: {
    async submitWithValidation() {
      if (this.email != "") {
        try {
          let response = await this.$axios.post("/reset-password/get-otp", {
            email: this.email,
          });
          localStorage.setItem("passwordReset", this.email);
          //   this.$log(response.data);
          this.$toast.success("Otp Sent to your email Successfully!");

          this.$router.push("/password/otp");
        } catch (error) {
          if (error.response) {
            this.errors.email = "Email address is not valid!";
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

<style>
</style>
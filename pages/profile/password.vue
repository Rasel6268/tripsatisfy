<template>
  <section class="myaccount">
    <div class="go-container">
      <div class="myaccount-content">
        <profile-aside />
        <div class="profile-content">
          <div class="change-password">
            <div class="change-password-header">
              <figure class="pass-thumb">
                <img
                  src="/assets/images/change-pass.svg"
                  alt=" change password"
                />
              </figure>
              <h3 class="change-password-title"> <span v-if="userData.has_usable_password">Change</span> <span v-else>Set</span>  Password</h3>
            </div>
            <div class="change-password-body">
              <form @submit.prevent="submitWithValidation">
                <div class="row g-4">
                  <div class="col-12" v-if="userData.has_usable_password">
                    <div
                      :class="['input-box2', errors.old_password && 'invalid']"
                    >
                      <label for="old_password" class="input-label"
                        >Old Password</label
                      >
                      <input
                        type="password"
                        @keyup="fieldValiation('old_password')"
                        minlength="8"
                        required
                        v-model="user.old_password"
                        id="old_password"
                        class="input-field"
                        placeholder="Write Your Old Password"
                      />
                      <span
                        v-if="errors.old_password"
                        class="text-danger fl-Cap fs-12"
                      >
                        {{ errors.old_password }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div
                      :class="['input-box2', errors.new_password && 'invalid']"
                    >
                      <label for="new_password" class="input-label"
                        >Password</label
                      >
                      <input
                        type="password"
                        @keyup="fieldValiation('new_password')"
                        minlength="8"
                        required
                        v-model="user.new_password"
                        id="new_password"
                        class="input-field"
                        placeholder="Write Your Password"
                      />
                      <span
                        v-if="errors.new_password"
                        class="text-danger fl-Cap fs-12"
                      >
                        {{ errors.new_password }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div
                      :class="[
                        'input-box2',
                        errors.retype_password && 'invalid',
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
                        v-model="user.retype_password"
                        id="con_password"
                        class="input-field"
                        placeholder="Re write your new password here"
                      />
                      <span
                        v-if="errors.retype_password"
                        class="text-danger fs-12"
                      >
                        {{ errors.retype_password }}
                      </span>
                    </div>
                  </div>
                  <div class="col-12 text-end">
                    <div class="button-wrapper">
                      <button class="save-btn" type="submit">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileAside from "../../components/profile/ProfileAside.vue";
export default {
  components: { ProfileAside },
  name: "ChangePassword",
  data() {
    return {
      user: {
        old_password: "",
        new_password: "",
        retype_password: "",
      },
      errors: {
        old_password: false,
        new_password: false,
        retype_password: false,
      },
      isSubmit: false,
    };
  },
  computed:{
    userData() {
      return {
        ...this.$store.state.userInfo,
      };
    },
  },
  methods: {
    submitWithValidation() {
      // error check, if have any true flag is error object its return true as an index of errors array
      
      let errors = Object.values(this.errors).filter((item) => {
        return item; // if item has true value its return true
      });
      // if social login first time, should not need old password check
      if(this.userData.has_usable_password == false){
        delete this.user.old_password;
      }
      // blank check
      let blanks = Object.values(this.user).filter((item) => {
        return item == ""; // if blanks its return true
      });
      if (errors.length == 0 && blanks.length == 0) {
        
        this.$axios
          .post("/change-password", this.user)
          .then((res) => {
            this.$toast.success("Successfully Passwrod Changed.");
            // window.location.href = '/profile'
            this.$store.dispatch("userInfo");
            this.$router.push('/profile');
          })
          .catch((error) => {
            this.errors.old_password = 'Old Password not matched.'
          });
      }
    },
    fieldValiation(name) {
      if (this.user[name] != undefined) {
        if (this.user[name] == "") {
          this.errors[name] = `${name.replace('_',' ')} can not be null`;
        } else {
          this.errors[name] = false;
        }
        // if (name == "mobile") {
        //   if (this.user.mobile != "" && this.user.mobile.length < 11) {
        //     this.errors.mobile = "Mobile Number at least 11 digit";
        //   }
        // }
        if (name == "new_password") {
          if (this.user.new_password != "") {
            this.passwordMatch();
            this.errors.new_password = false;
          }
        }
      }
    },
    passwordMatch() {
      if (this.user.retype_password != "") {
        if (this.user.new_password != this.user.retype_password) {
          this.errors.retype_password =
            "The password confirmation does not match";
        } else {
          this.errors.retype_password = false;
        }
      } else if (this.user.new_password == "") {
        this.errors.retype_password = "Password can not be null.";
      }
    },
  },
};
</script>

<style>
</style>
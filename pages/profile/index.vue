<template>
  <!-- ================ MY ACCOUND START============= -->
  <section class="myaccount">
    <div class="go-container">
      <form @submit.prevent="submitWithValidation" enctype="multipart/form-data">
        <div class="myaccount-content">

          <profile-aside />

          <div class="profile-content">
            <div class="guestinfo-card">
              <div class="guestinfo-card-body">
                <div class="row g-4" v-if="userInfo?.user">
                  <div class="col-lg-12">
                    <div class="text-end"> <nuxt-link class="upload-file-btn" to="/profile/edit"><svg
                          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg> Edit Profile</nuxt-link> </div>
                  </div>
                  <div class="col-lg-12">
                    <table class="table table-bordered mt-2">
                      <tr>
                        <th width="35%" class="p-2">Name</th>
                        <th width="5%">:</th>
                        <td>{{ userInfo.title }} {{ userInfo.user.first_name }} {{ userInfo.user.last_name }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Gender</th>
                        <th>:</th>
                        <td>{{ userInfo.gender }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Date of Birth</th>
                        <th>:</th>
                        <td>{{ userInfo.birthdate }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Nationality</th>
                        <th>:</th>
                        <td>{{ userInfo.nationality }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Post Code</th>
                        <th>:</th>
                        <td>{{ userInfo.post_code }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Address</th>
                        <th>:</th>
                        <td>{{ userInfo.address }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Mobile Number</th>
                        <th>:</th>
                        <td>{{ userInfo.phone_number }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Email</th>
                        <th>:</th>
                        <td>{{ userInfo.user.email }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Passport Number</th>
                        <th>:</th>
                        <td>{{ userInfo.passport_number }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Passport Expiry Date</th>
                        <th>:</th>
                        <td>{{ userInfo.passport_expiry_date }}</td>
                      </tr>
                      <tr>
                        <th class="p-2">Passport Copy</th>
                        <th>:</th>
                        <td>
                          <p v-if="userInfo.passport">
                        <small>
                          <a :href="userInfo.passport" target="_blank">
                            <span>
                              <svg width="16" height="14" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor">
                                <path
                                  d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                              </svg>
                            </span>
                            Passport Copy
                          </a>
                        </small>
                      </p>
                        </td>
                      </tr>
                      <tr>
                        <th class="p-2">Visa Copy</th>
                        <th>:</th>
                        <td>
                          <p v-if="userInfo.visa">
                            <small>
                              <a :href="userInfo.visa" target="_blank"> 
                                <span>
                                  <svg width="16" height="14" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor">
                                    <path
                                      d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                  </svg>
                                </span>
                                Visa Copy
                              </a>
                            </small>
                          </p>
                        </td>
                      </tr>
                      
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
  <!-- ============= MY ACCOUND  END================ -->
</template>

<script>
import ProfileAside from '../../components/profile/ProfileAside.vue';
export default {
  components: { ProfileAside },
  middleware: "auth",
  name: "Profile",
  data() {
    return {
      userInfo: {
        title: "",
        user: {
          first_name: "",
          last_name: "",
          email: "",
        },
      },
      defaultUserImg: 'assets/images/user.svg',
    };
  },
  mounted() {
    this.getUser();
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    userData() {
      console.log(this.$store.state.userInfo)
      return {
        ...this.$store.state.userInfo,
        user: {
          id: this.$store.state.userInfo.user?.id,
          email: this.$store.state.userInfo.user?.email,
          first_name: this.$store.state.userInfo.user?.first_name,
          last_name: this.$store.state.userInfo.user?.last_name,
          username: this.$store.state.userInfo.user?.username,
        },
      };
    },
  },
  watch: {
    userData() {
      this.getUser();
    },
  },
  methods: {
    
    getUser() {
      this.userInfo = { ...this.userData };
      if (this.userInfo.title == null) {
        this.userInfo.title = "Mr";
      }
    },
  },
};
</script>

<style></style>
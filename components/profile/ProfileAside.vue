<template>
  <aside class="profile-sidebar">
    <div class="profile-sidebar-content">
      <div class="profile-sidebar-header">
        <figure class="profile-thumb">
            <img :src="userImage() || defaultUserImg" alt="profile image ">
        </figure>
        <h2 class="user-name" v-if="userData.user?.first_name">{{userData.user?.first_name}} {{userData.user?.last_name}}</h2>
        <p class="user-email"> {{userData.user?.email}} </p>
      </div>
      <div class="profile-sidebar-body">
        <ul class="menulist">
          <li
            :class="['menulist-item', currentRoute == '/profile' && 'active']"
          >
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="8" fill="#F6F0FE" />
              </svg>
            </span>
            <nuxt-link to="/profile" class="menulist-link"
              >My Profile</nuxt-link
            >
          </li>
          <li
            :class="['menulist-item', currentRoute == '/booking' && 'active']"
          >
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="8" fill="#F6F0FE" />
              </svg>
            </span>
            <nuxt-link to="/booking" class="menulist-link"
              >My Booking</nuxt-link
            >
          </li>
          <li
            :class="[
              'menulist-item',
              currentRoute == '/mybalance' && 'active',
            ]"
            v-if="userData.customer_type == 'B2B'"
          >
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="8" fill="#F6F0FE" />
              </svg>
            </span>
            <nuxt-link to="/mybalance" class="menulist-link"
              >My Balance  </nuxt-link
            >
          </li>
          <li
            :class="[
              'menulist-item',
              currentRoute == '/profile/password' && 'active',
            ]"
          >
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="8" fill="#F6F0FE" />
              </svg>
            </span>
            <nuxt-link to="/profile/password" class="menulist-link"
              ><span v-if="userData.has_usable_password">Change</span> <span v-else>Set</span> Password </nuxt-link
            >
          </li>
          
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "ProfileAside",
  data(){
    return {
      defaultUserImg:'/assets/images/user.svg',
    }
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    userData() {
      return {
        ...this.$store.state.userInfo,
      };
    },
  },
  methods:{
    userImage(){
      if(this.userData.social_id != null && this.userData.image == null){
        return this.userData.social_img;
      }
      return this.userData.image;
    },
  }
};
</script>

<style>
</style>
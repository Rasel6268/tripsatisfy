<template>
  <div id="g_id_signin"></div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
    
  props: ["type"],
  mounted() {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID,
        callback: this.handleCredentialResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" }
      );
    } else {
      console.error("Google Identity Services not loaded");
    }
  },
  methods: {
    async handleCredentialResponse(response) {
      const token = response.credential;
      if (!token) {
        console.error("Google token not found");
        return;
      }

      const decoded = jwt_decode(token);
      const data = {
        social_id: decoded.sub,
        email: decoded.email,
        first_name: decoded.given_name,
        last_name: decoded.family_name,
        image_url: decoded.picture
      };

      try {
        const res = await this.$axios.post("/social-login/", data);
        this.$auth.strategy.token.set(res.data.access);
        this.$toast.success("Login Successfully!");

        const previousPath = localStorage.getItem("previousPath");
        if (previousPath) {
          window.location.href = previousPath;
          localStorage.removeItem("previousPath");
        } else {
          window.location.href = "/profile/edit";
        }
      } catch (error) {
        console.error("Backend login failed", error);
        this.$toast.error("Backend error found!");
      }
    }
  }
};
</script>

<template></template>

<script>
export default {
    name: "FacebookLoginCallback",
    data() {
        return {
            accessToken: ''
        }
    },
    mounted() {
        if (this.$auth.loggedIn) {
            this.$router.go(-1);
        }
        this.getQuery();

    },
    methods: {
        async getQuery() {
            const code = this.$route.query?.code;
            if (code) {
                const clientId = process.env.FACEBOOK_APP_ID;
                const clientSecret = process.env.FACEBOOK_APP_SECRET;
                const redirectUri = `${process.env.ROOT_URL}${process.env.facebook_call_back}`;

                // Get access token from facebook
                this.$axios.$get(
                    `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`
                ).then(response => {
                    // Get user information by access token from facebook
                    this.$axios.$get(
                        `https://graph.facebook.com/v13.0/me?fields=id,first_name,last_name,email,picture{url}&access_token=${response.access_token}`
                    ).then(userInfo => {
                        // Store user information into backend
                        const data = {
                            social_id: userInfo.id,
                            email: userInfo.email,
                            first_name: userInfo.first_name,
                            last_name: userInfo.last_name,
                            image_url: userInfo.picture?.data?.url
                        }
                        // Call backend api for social login
                        this.$axios.post("/social-login/", data)
                            .then((res) => {
                                this.$auth.strategy.token.set(res.data.access);
                                this.$toast.success("Login Successfully!");
                                if (localStorage.getItem("previousPath") != null) {
                                    window.location.href = localStorage.getItem("previousPath");
                                    localStorage.removeItem("previousPath");
                                } else {
                                    // this.$router.push("/profile/edit");
                                    window.location.href = "/profile/edit";
                                }
                                //  this.$router.push("/");
                            })
                            .catch((error) => {
                                this.$router.push("/login");
                                this.$toast.error("Something error found in final step.");
                                console.log(error.config);
                            });
                    }).catch(err => {
                        this.$router.push("/login");
                        this.$toast.error("User information not found!");
                    });
                }).catch(erro => {
                    this.$router.push("/login");
                    this.$toast.error("Access token not found!");
                });



            }
        }
    }
}
</script>

<style></style>
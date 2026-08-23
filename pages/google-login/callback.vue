<template></template>

<script>
export default {
    name: "GoogleLogin",
    data() {
        return {

        }
    },
    mounted() {
        this.getQuery();

    },
    methods: {
        async getQuery() {
            const query = this.$route.query;
            console.log(query)
        }
    }
}
</script>

<style></style>
<template>
  <div class="blgofilter-header">
    <ul class="filterbox">
      <li> <nuxt-link to="/blogs" :class="['filterbox-item', !category && 'active']"> All </nuxt-link> </li>
      <li v-for="cat of allData" :key="cat.id"> <nuxt-link :to="`/blogs/${cat.slug || cat.id}`" :class="['filterbox-item', cat.slug == category && 'active']"> {{cat.name}} </nuxt-link> </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BlogCategory",
  data() {
    return {
      allData: [],
    };
  },
  mounted() {
    this.getCategory();
  },
  computed:{
    category(){
      return this.$route.params.category;
    }
  },
  methods: {
    getCategory() {
      this.$axios
        .get("/blog-categories?page_size=20")
        .then((res) => {
        //   this.$log(res.data);
          this.allData = res.data.results
        })
        .catch((err) => {
          consoole.log(err.response);
        });
    },
  },
};
</script>

<style>
</style>
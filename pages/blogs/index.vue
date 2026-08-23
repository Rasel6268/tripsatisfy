<template>
  <div>
    <!-- ==================== BREADCRUMB START================================ -->
    <section class="breadcrumb">
      <div class="go-container w-100">
        <div class="row">
          <div class="col-12">
            <ul class="breadcrumb-list">
              <li class="breadcrumb-list-item">
                <nuxt-link to="/" class="breadcrumb-list-link">Home</nuxt-link>
              </li>
              <li class="breadcrumb-list-item">
                <nuxt-link to="/blogs" class="breadcrumb-list-link"
                  >Blog</nuxt-link
                >
              </li>
              <li class="breadcrumb-list-item">
                <span class="breadcrumb-list-link active"> Category Name </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== BREADCRUMB END================================ -->
    <!-- ==================== BLOGFILTER START================================ -->
    <section class="blogfilter">
      <div class="go-container">
        <div class="blogfilter-content">
          <blog-category />
          <div class="blogfilter-body">
            <!-- single row -->
            <blog-chunk v-for="(blogs,i) of chunkArray(allData.results,5)" :key="i" :blogs="blogs" />
            <!-- single row -->
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== BLOGFILTER END ================================ -->
  </div>
</template>

<script>
import BlogChunk from "../../components/blogs/BlogChunk.vue";
import BlogCategory from "../../components/blogs/Category.vue";
export default {
  components: { BlogCategory, BlogChunk },
  name: "Blogs",
  head() {
    return {
      title: "Blogs",
    };
  },
  data() {
    return {
      pageSize: 15,
      allData: [],
    };
  },
  mounted() {
    this.getBlogs();
  },
  computed: {
    category() {
      return this.$route.params.category;
    },
  },
  methods: {
    getBlogs() {
      if (this.category) {
        this.$axios
          .get(`/blogs?page_size=${this.pageSize}&category=${this.category}`)
          .then((res) => {
            this.$log(res.data);
            this.allData = res.data;
          })
          .catch((err) => {
            this.$elog(err.response);
          });
      } else {
        this.$axios
          .get(`/blogs?page_size=${this.pageSize}`)
          .then((res) => {
            this.$log(res.data);
            this.allData = res.data;
          })
          .catch((err) => {
            this.$elog(err.response);
          });
      }
    },
    chunkArray(myArray, chunkSize) {
      var results = [];
      if(myArray?.length){
          while (myArray.length) {
            results.push(myArray.slice(0, chunkSize));
            myArray = myArray.slice(chunkSize);
          }
      }

      return results;
    },
  },
};
</script>
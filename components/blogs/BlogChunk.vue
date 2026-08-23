<template>
  <div class="row g-4" v-if="firstBlog?.id">
    <div class="col-lg-5">
      <nuxt-link
        class="blogpost large-post"
        :to="`/blogs/details/${firstBlog.slug}`"
      >
        <figure class="blogpost-thumb">
          <img
            :src="firstBlog?.thumbnail || imageUrlAlt"
            :alt="firstBlog?.name || 'Blog Thumbnail'"
            @error="imageUrlAlt"
          />
          <span class="blog-category">{{ firstBlog.category }}</span>
        </figure>
        <div class="blogpost-text">
          <h3 class="blog-title">
            {{ firstBlog.name }}
          </h3>
        </div>
      </nuxt-link>
    </div>
    <div class="col-lg-7">
      <div class="row g-4">
        <div class="col-12 col-lg-6" v-for="(blog, i) of restOfBlogs" :key="i">
          <nuxt-link class="blogpost" :to="`/blogs/details/${blog.slug}`">
            <figure class="blogpost-thumb">
              <img
                :src="blog?.thumbnail || imageUrlAlt"
                :alt="blog?.name || 'Blog Thumbnail'"
                @error="imageUrlAlt"
              />
              <span class="blog-category">{{ blog.category }}</span>
            </figure>
            <div class="blogpost-text">
              <h3 class="blog-title">
                {{ blog.name }}
              </h3>
            </div>
          </nuxt-link>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blogs"],
  name: "BlogChunk",
  computed: {
    firstBlog() {
      return this.blogs[0] || {};
    },
    restOfBlogs() {
      return this.blogs.slice(1, this.blogs.length);
    },
  },
  methods: {
    imageUrlAlt(event) {
      event.target.src = "/assets/images/blogs/blog-cat.png";
    },
  },
};
</script>

<style>
</style>
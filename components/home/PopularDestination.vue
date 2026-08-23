<template>
  <!-- ================== POPULAR DESTINATION START =================== -->
  <section class="popular-destination">
    <div class="go-container">
      <div class="popular-destination-content">
        <!-- POPULAR DESTINATION HEADER START -->
        <div class="popular-destination-header">
          <div class="row g-4">
            <div class="col-lg-6 col-12">
              <div class="popularinfo">
                <h3 class="popular-destination-title">
                  Packages in Popular Destination
                </h3>
              </div>
            </div>
          </div>
        </div>
        <!-- POPULAR DESTINATION HEADER END -->

        <!-- POPULAR DESTINATION BODY START -->
        <div class="popular-destination-body">
          <div class="row g-4">
            <div class="col-lg-8 col-sm-6" v-if="firstDestination.id">
              <nuxt-link
                :to="detailsPage(firstDestination.city,firstDestination?.country)"
                class="h-100"
              >
                <div class="cardpopular-big h-100">
                  <div class="card-wrapper">
                    <figure class="image-wrapper">
                      <img
                        :src="firstDestination?.image"
                        :alt="firstDestination?.city || 'City Name Here'"
                        @error="imageUrlAlt"
                      />
                      <div class="hover-box"></div>
                    </figure>
                    <div class="card-content">
                      <div class="left">
                        <span class="package"
                          >{{ firstDestination?.holiday }} Packages</span
                        >
                        <span class="location">{{
                          firstDestination?.city || "City Name Here"
                        }}</span>
                      </div>
                      <div class="right">
                        <span>Start from </span>
                        <span class="price"
                          >BDT
                          {{
                            firstDestination?.start_from.toLocaleString() || ""
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>

            <div class="col-lg-4 col-sm-6" v-if="secondDestination.id">
              <nuxt-link
                :to="detailsPage(secondDestination.city,secondDestination?.country)"
                class="h-100"
              >
                <div class="cardpopular h-100">
                  <figure class="cardpopular-header">
                    <img
                      :src="secondDestination?.image"
                      :alt="secondDestination?.city || 'City Name Here'"
                      @error="imageUrlAlt"
                    />
                    <div class="hover-box"></div>
                  </figure>
                  <div class="cardpopular-body">
                    <p class="pacakges">
                      {{ secondDestination?.holiday }} Packages
                    </p>
                    <p class="location">
                      {{ secondDestination?.city || "City Name Here" }}
                    </p>
                    <p class="start">
                      <span>Start from </span> BDT
                      {{ secondDestination?.start_from.toLocaleString() || "" }}
                    </p>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>

          <div class="row g-4">
            <div
              class="col-lg-3 col-sm-6"
              v-for="data of allDestination"
              :key="data.id"
            >
              <nuxt-link :to="detailsPage(data.city,data?.country)">
                <div class="cardpopular">
                  <figure class="cardpopular-header">
                    <img
                      :src="data?.image"
                      :alt="data?.city || 'City Name Here'"
                      @error="imageUrlAlt"
                    />
                    <div class="hover-box"></div>
                  </figure>
                  <div class="cardpopular-body">
                    <p class="pacakges">{{ data?.holiday }} Packages</p>
                    <p class="location">{{ data?.city || "City Name Here" }}</p>
                    <p class="start">
                      <span>Start from </span> BDT
                      {{ data?.start_from.toLocaleString() || "" }}
                    </p>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- POPULAR DESTINATION BODY END -->
      </div>
    </div>
  </section>
  <!-- ================== POPULAR DESTINATION END ===================== -->
</template>

<script>
export default {
  name: "PopularDestination",
  data() {
    return {
      firstDestination: "",
      secondDestination: "",
      allDestination: [],
    };
  },
  mounted() {
    this.getData();
    this.detailsPage("Dahaka");
  },
  methods: {
    getData() {
      this.$axios
        .get("/popular-destination-package-list")
        .then((res) => {
          if (res.data.length > 0) {
            this.firstDestination = res.data[0] || "";
            this.secondDestination = res.data[1] || "";
          }
          if (res.data.length > 2) {
            this.allDestination = res.data.slice(2);
          }
        })
        .catch((err) => {
          this.$elog(err.response.status);
        });
    },
    detailsPage(city,country = '') {
      let tomorrow = this.$moment().add(1, "days");
      tomorrow = (tomorrow.format("YYYY-MM-DD"));
      let url = `/holiday/search?city=${city}&country=${country}&date=${tomorrow}&rooms=2_0&child_age=`;
      return url;
    },
    imageUrlAlt(event) {
      event.target.src = "/assets/images/popular/popular-2.svg";
    },
  },
};
</script>
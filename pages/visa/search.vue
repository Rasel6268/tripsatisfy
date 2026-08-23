<template>
  <div>
    <!-- ================== BOOKING START========================== -->
    <section class="search">
      <div class="go-container">
        <div class="bg">
          <div class="booking-content">
            <div class="booking-top">
              <visa-tab />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ================== BOOKING END========================== -->

    <!-- ==================HERO IMAGE  START=============================== -->
    <section class="hero-image">
      <div class="go-container">
        <div class="row">
          <div class="col-12">
            <figure class="hero-thumb">
              <img
                :src="visaImage"
                alt="Visa hero image "
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================HERO IMAGE END=============================== -->
    <h2 class="text-center text-danger mt-4" v-if="searchData?.length==0"> We do not have any data for your desired search.</h2>
    <div id="visalist">
      <div v-for="(data, i) of searchData" :key="i">
        <!-- ================== VISA LIST START ====================================== -->
        <section class="visalist" >
          <div class="go-container">
            <div class="visalist-content">
              <div class="visalist-header">
                <p class="visa-for">{{ data.country }}</p>
                <h1 class="visa-type">{{ data.title }}</h1>
                <ul>
                  <li v-if="data.visa_required">Visa Required</li>
                  <li>Currency: {{ data.currency }}</li>
                  <li>Local Time: {{ data.local_time }}</li>
                </ul>
              </div>
  
              <div class="visalist-body">
                <single-visa
                  v-for="(visa, vIndex) of data.visa_type"
                  :key="vIndex"
                  :visa="visa"
                />
              </div>
            </div>
          </div>
        </section>
        <!-- ================== VISA LIST END====================================== -->
  
        <!-- ================== IMPORTANT LIST START============================== -->
        <section class="importantnotes">
          <div class="go-container">
            <div class="importantnotes-content">
              <h3>Importans Notes</h3>
              <p v-if="data?.note" v-html="data?.note"></p>
            </div>
          </div>
        </section>
        <!-- ================== IMPORTANT LIST END =============================== -->
      </div>
    </div>

    <!-- ================== FAQ START ====================================== -->
    <section class="faq">
      <div class="go-container">
        <div class="row">
          <div class="col-12">
            <div class="faq-content">
              <div class="faq-header">
                <h3 class="faq-title">Frequently Asked Questions</h3>
              </div>
              <div class="faq-body">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="accordion" id="faqAccordion">
                      <!-- accordion item one  -->
                      <div
                        class="accordion-item"
                        v-for="(faq, fIndex) of faqs"
                        :key="fIndex"
                      >
                        <h2 class="accordion-header" :id="'heading-' + faq.id">
                          <button
                            :class="[
                              'accordion-button',
                              fIndex > 0 && 'collapsed',
                            ]"
                            type="button"
                            data-bs-toggle="collapse"
                            :data-bs-target="'#collapse-' + faq.id"
                            aria-expanded="true"
                            :aria-controls="'collapse-' + faq.id"
                          >
                            {{ faq.question }}
                          </button>
                        </h2>
                        <div
                          :id="'collapse-' + faq.id"
                          :class="[
                            'accordion-collapse collapse',
                            fIndex == 0 && 'show',
                          ]"
                          :aria-labelledby="'heading-' + faq.id"
                          data-bs-parent="#faqAccordion"
                        >
                          <div class="accordion-body" v-html="faq.answer"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ================== FAQ END ====================================== -->
  </div>
</template>

<script>
import VisaTab from "../../components/home/search/VisaTab.vue";
import SingleVisa from "../../components/visa/SingleVisa.vue";
export default {
  components: { VisaTab, SingleVisa },
  name: "VisaSearch",
  head() {
    return {
      title: "Visa Search",
    };
  },
  data() {
    return {
      faqs: [],
    };
  },
  mounted() {
    this.getFaq();
    window.onload = () => {
        this.scrollIfNecessary()        
    }
  },
  computed: {
    searchData() {
      return this.$store.state.visa?.allData.results;
    },
    visaLoadStatus() {
      return this.$store.state.visa?.loader;
    },
     visaImage(){
      let image = "/assets/images/visa-search.jpeg";
      if(this.searchData && this.searchData[0]){
        if(this.searchData[0].image != null){
          const backendApi = process.env.BACKEND_API;
          const backendUrl = backendApi.replace('/api', '');
          image = backendUrl + this.searchData[0].image
        }
      }
      return image
     }
  },
  watch:{
    visaLoadStatus(){
          this.scrollIfNecessary();
      }
  },
  methods: {
    scrollIfNecessary(){
          if(this.visaLoadStatus == false){
              const targetElement = document.getElementById('visalist');
              const windowWidth = window.innerWidth;
              let yOffset = -100; // desktop issue
              if (windowWidth < 992) {
                  yOffset = -40;   
              }
              const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
          }
      },
    getFaq() {
      this.$axios
        .get("/visa-faq")
        .then((res) => {
          this.faqs = res.data;
        })
        .catch((err) => {
          this.$elog(err.response);
        });
    },
  },
};
</script>

<style>
</style>
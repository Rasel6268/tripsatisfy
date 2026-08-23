<template>
  <main>
    <!--======== HEADER START ===========-->
    <div class="hero">  
        <div class="go-container">
           
            <!-- Header Content  -->
            <div class="hero-content">
                <div class="row justify-content-center">
                    <!-- <div class="col-xl-6 col-lg-7 col-12">
                        <div class="inner">
                          <h1 class="inner-title d-none d-lg-block">Travel and feel around the world </h1>
                            <h1 class="inner-title d-block d-lg-none">Travel and feel  </h1>
                            <h1 class="inner-title d-block d-lg-none">around the world </h1>
                        </div>
                    </div> -->
                </div>
            </div>

        </div>
    </div>


    <Search />
    <SpecialDeals />
    <PopularDestination />
    <CheapestFlight />
    <PopularAirline />
  </main>
</template>

<script>
import CheapestFlight from '../components/home/CheapestFlight.vue'
import PopularAirline from '../components/home/PopularAirline.vue'
import PopularDestination from '../components/home/PopularDestination.vue'
import SpecialDeals from '../components/home/SpecialDeals.vue'
import Search from '../components/home/Search.vue'
export default {
  components: { SpecialDeals, PopularDestination, CheapestFlight, PopularAirline, Search },
  name: 'Index',
  props: ['pageTitle'],
  head(){
    return{
      title:this.title,
    }
  },
  computed:{
    title(){
      return this.pageTitle || 'Home Page';
    }
  }
}
</script>

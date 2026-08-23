<template>
    
    <!-- ================== POPULAR AIRLINES END ======================== -->
    <section class="popular-airline">
        <div class="go-container">
            <div class="popular-airline-content">
                <!-- POPULAR AIRLINE HEADER START -->
                <div class="popular-airline-header">
                    <div class="row g-4">
                        <div class="col-lg-6 col-12">
                            <div class="popularinfo">
                                <h3 class="popular-airline-title">Popular airlines in Bangladesh</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- POPULAR AIRLINE HEADER END -->

                <!-- POPULAR AIRLINE BODY START -->
                <div class="popular-airline-body">
                    <div class="swiper logoSlider">
                        <div class="swiper-wrapper">

                            <div class="swiper-slide" v-for="data of allData" :key="data.id">
                                <div class="card-airline-logo">
                                    <figure class="airline-logo-wrapper">
                                        <img :src="data?.airline?.image" :alt="data?.airline?.name" @error="imageUrlAlt">
                                    </figure>
                                </div>
                                <p class="card-airline-title mt-2"> {{data?.airline?.name}} </p>
                            </div>
                        </div>
                         
                    </div>
                     <!-- SWIPPER JS NAVIGATION BUTTON -->
                     <div class="swiper-button-prev buttom-prev">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 0.116128L12.9 1.98279L5.43336 9.44946L21.6667 9.44946L21.6667 12.1161L5.43336 12.1161L12.9 
                                19.5828L11 21.4495L0.333354 10.7828L11 0.116128Z"
                                fill="#718096" />
                        </svg>
                     </div>
                    <!-- SWIPPER JS NAVIGATION BUTTON -->
                     <div class="swiper-button-next buttom-next">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 21.4493L9.10004 19.5826L16.5667 12.116H0.333374V9.4493H16.5667L9.10004 1.98263L11 
                                0.115967L21.6667 10.7826L11 21.4493Z"
                                fill="#718096" 
                            />
                        </svg>
                     </div>

                </div>
                <!-- POPULAR AIRLINE BODY END -->
            </div>
        </div>
    </section>
    <!-- ================== POPULAR AIRLINES END ======================= -->
</template>

<script>
export default {
    name: "PopularAirline",
    data(){
        return {
            allData:[]
        }
    },
    mounted(){
        this.getData();
    }, 
    methods:{
        getData(){
            this.$axios.get('/popular-airline-list').then(res=>{
                this.allData = res.data;
                this.airlineSlider();
            }).catch(err=>{
                this.$elog(err.response.status)
            })
        },
        imageUrlAlt(event) {
            event.target.src = "/assets/images/images/popular-airline/logo-1.svg"
        },
        airlineSlider(){
            let swiper2 = new Swiper(".logoSlider", {
            mousewheelControl : false,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            },
            slidesPerView: 2,
            spaceBetween: 10,
            breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 40,
            },
            1920: {
                slidesPerView: 8,
                spaceBetween: 40,
            }

            },
            });
        }
    }
}
</script>
<template>
  <div>
   <!-- ========================== HOTEL DETAILS START ============================ -->
    <section class="hoteldetails">
        <div class="go-container">
            <div class="row g-4">

                <div class="col-lg-6">
                    <div class="photo-gallery">
                        <vue-easy-lightbox
                            escDisabled
                            moveDisabled
                            :visible="visible"
                            :imgs="images"
                            :index="index"
                            @hide="handleHide"
                        />
                        <div class="flex-container">
                            
                            <div class="left-image">
                                <div class="swiper hotelGallery">
                                    <div class="swiper-wrapper">
                                      <div class="swiper-slide cursor-pointer" v-for="(img,i) of images" :key="i" @click="openLightBox(i)">
                                        <img :src="img.src || img" :alt="img.title || 'Image'">
                                      </div>
                                      
                                    </div>
                                    <div class="swiper-button-next"></div>
                                    <div class="swiper-button-prev"></div>
                                </div>
                            </div>
                            <div class="right-images">
                                <figure class="cursor-pointer" v-for="(img,i) of fourImages" :key="i" @click="openLightBox(i)">
                                    <img :src="img.src || img" :alt="img.title || 'Image'">
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="facility-location">
                        <div class="row g-4">
                            <div class="col-lg-7">
                                <!-- location box -->
                                <div class="location-box">
                                    <h2 class="hotel-name">{{hotel.name}}</h2>
                                    <div class="icon-text">
                                        <span>
                                            <svg width="22" height="31" viewBox="0 0 22 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 22.3043C13.475 20.3043 15.344 18.3793 16.607 16.5293C17.869 14.6793 18.5 12.9418 
                                                18.5 11.3168C18.5 9.9168 18.244 8.7228 17.732 7.7348C17.219 6.7478 16.5875 5.9478 15.8375 
                                                5.3348C15.0875 4.7228 14.275 4.2793 13.4 4.0043C12.525 3.7293 11.725 3.5918 11 3.5918C10.275 
                                                3.5918 9.475 3.7293 8.6 4.0043C7.725 4.2793 6.9125 4.7228 6.1625 5.3348C5.4125 5.9478 4.7815 
                                                6.7478 4.2695 7.7348C3.7565 8.7228 3.5 9.9168 3.5 11.3168C3.5 12.9418 4.131 14.6793 5.393 
                                                16.5293C6.656 18.3793 8.525 20.3043 11 22.3043ZM11 26.0918C7.475 23.4918 4.8435 20.9668 3.1055 
                                                18.5168C1.3685 16.0668 0.5 13.6668 0.5 11.3168C0.5 9.5418 0.819 7.9853 1.457 6.6473C2.094 5.3103 
                                                2.9125 4.1918 3.9125 3.2918C4.9125 2.3918 6.0375 1.7168 7.2875 1.2668C8.5375 0.816797 9.775 0.591797 
                                                11 0.591797C12.225 0.591797 13.4625 0.816797 14.7125 1.2668C15.9625 1.7168 17.0875 2.3918 18.0875 
                                                3.2918C19.0875 4.1918 19.9065 5.3103 20.5445 6.6473C21.1815 7.9853 21.5 9.5418 21.5 11.3168C21.5 
                                                13.6668 20.631 16.0668 18.893 18.5168C17.156 20.9668 14.525 23.4918 11 26.0918ZM11 14.0918C11.825 
                                                14.0918 12.5315 13.7978 13.1195 13.2098C13.7065 12.6228 14 11.9168 14 11.0918C14 10.2668 13.7065 
                                                9.5603 13.1195 8.9723C12.5315 8.3853 11.825 8.0918 11 8.0918C10.175 8.0918 9.469 8.3853 8.882 
                                                8.9723C8.294 9.5603 8 10.2668 8 11.0918C8 11.9168 8.294 12.6228 8.882 13.2098C9.469 13.7978 
                                                10.175 14.0918 11 14.0918ZM0.5 30.5918V27.5918H21.5V30.5918H0.5Z" fill="#718096"/>
                                            </svg>
                                                
                                        </span>
                                        <div class="location-name">
                                            <span> {{hotel.address}} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 order-lg-3">
                                <div class="hotel-map" v-html="hotelMap"></div>
                            </div>
                            <div class="col-lg-5 order-lg-2">
                                <!-- facility box  -->
                                <div class="facility ">
                                    <div class="tags">
                                        <ul class="tag-list">
                                            <li class="tag-list-item" v-for="(facility,i) of amenityArray" :key="i">
                                                <span class="icon">
                                                    <img :src="facility.icon || iconUrlAlt" width="20px" height="20px" class="mt-1" alt="Icon" @error="iconUrlAlt" />
                                                </span>
                                                <span class="text">{{facility.name}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        


                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- ========================== HOTEL DETAILS END ============================ -->

     <section class="search py-5">
        <div class="go-container">
            <div class="bg">
                <div class="booking-content">
                    <div class="booking-top">
                        <hotel-tab />
                    </div>
                </div>
            </div>
        </div>
    </section>

     <!-- ================== HOTEL DETAIL START  ======================== -->
    <section class="roomdetails ">
        <div class="go-container">
            <div class="roomdetails-content">
                <div class="roomdetails-header">
                    <nav class="test" id="hotel-details-navbar">
                        <ul class="nav nav-pills">
                            <li class="nav-item">
                                <a href="#rooms"  class="nav-link first">Rooms</a>
                            </li>
                            <li class="roomdetails-list-item nav-item">
                                <a href="#aminity" class="roomdetails-list-link nav-link">Amenities of the hotel</a>
                            </li>
                            <li class="roomdetails-list-item nav-item">
                                <a href="#description" class="roomdetails-list-link nav-link">Description</a>
                            </li>
                            <li class="roomdetails-list-item nav-item">
                                <a href="#notes" class="roomdetails-list-link nav-link">Note</a>
                            </li>
                           
                        </ul>
                    </nav>
                </div>
                <div data-bs-spy="scroll" data-bs-target="#hotel-details-navbar" data-bs-root-margin="0px 0px 0"  data-bs-smooth-scroll="true" class="roomdetails-body scrollspy-example rounded-2" tabindex="0">
                  
                    <!-- rooms -->
                    <div class="rooms" id="rooms">
                         <!-- single hotel  -->
                         <single-room v-for="(room,i) of hotel.rooms" :key="i" :room="room" />
                    </div>

                    <!-- Amenities of the hotel -->
                    <div class="aminity-hotel"  id="aminity">
                        <div class="aminities py-5">
                            <div class="amenities-content pb-1">
                                <!-- amenities header part -->
                                <div class="amenities-header">
                                    <h3 class="amenities-title">Amenities of the hotel</h3>
                                </div>
                                 <!-- amenities body part -->
                                <div class="amenities-body">
                                    <div class="row g-4">
                                        <div class="col-lg-6" v-for="(facilities, amenity) of amenities" :key="amenity">
                                            <div class="facility-box-container">
                                                <div class="facility-box" >
                                                    <div class="facility-box-header">
                                                        <h5>{{amenity}}</h5>
                                                    </div>
                                                    <div class="facility-box-body">
                                                        <div class="tags">
                                                            <ul class="tag-list">
                                                                <li class="tag-list-item" v-for="(facility,i) of facilities" :key="i">
                                                                    <span class="icon">
                                                                        <img :src="facility.icon || iconUrlAlt" width="20px" height="20px" class="mt-1" alt="Icon" @error="iconUrlAlt" />
                                                                    </span>
                                                                    <span class="text">{{facility.name}}</span>
                                                                </li>
                                                            </ul>
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

                    <!-- About hotel -->
                    <div class="abouthotel" id="description">
                        <div class="abouthotel-content pt-5">
                            <div class="abouthotel-header">
                                <h3 class="abouthotel-title">About hotel</h3>
                            </div>
                            <div class="abouthotel-body">
                                <div class="row g-4">
                                    <div :class="[hotel.about_image != null ? 'col-lg-6' : 'col-lg-12']">
                                        <div class="abouthotel-text" v-html="hotel.about"></div>
                                    </div>
                                    <div class="col-lg-6 d-none  d-lg-flex align-items-center justify-content-center" v-if="hotel.about_image!= null">
                                        <figure class="abouthotel-thumb ">
                                            <img :src="hotel.about_image || imageUrlAlt" alt="about hotel image " @error="imageUrlAlt">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Important Notes -->
                    <div class="importantnotes" id="notes">
                        <div class="importantnotes-content">
                            <div class="importantnotes-header">
                                <h3 class="importantnotes-title">Important Note:</h3>
                            </div>
                            <div class="importantnotes-body" v-html="hotel.important_note"></div>
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    </section>
    <!-- ================== HOTEL DETAIL  END =========================== -->

    <hotel-card />
    

  </div>
</template>

<script>
import HotelTab from '../../../components/home/search/HotelTab.vue'
import SingleRoom from '../../../components/hotelSearch/SingleRoom.vue'
export default {
  components: { HotelTab, SingleRoom },
    name:"HotelDetails",
    head(){
        return {
            title: `${this.hotel?.name || 'Hotel Details'}`
        }
    },

    data() {
        return {
            visible: false,
            index: 0,
            images: [],
            mainImage:{
                index:0,
                src:"/assets/images/hotel/rooms/room-2.jpg"
            },
            hotel:{},
            amenities:{},
            amenityArray:[],
            
        }
    },
    mounted(){
        this.swipeSlider();
       if(this.$route.params?.details){
        this.getDetails();
       }else{
        this.$router.push('/');
       }

        window.setTimeout(function(){
            new bootstrap.ScrollSpy(document.body, {
                target: '#hotel-details-navbar',
                smoothScroll:true,
                rootMargin:"0px 0px -60%",
            })
        },500)
        
    
    },
    computed:{
        hotelMap(){
            if(this.hotel.location_map != undefined){
                const iframeCode = this.hotel.location_map;
                const srcRegex = /src="([^"]+)"/;
                const match = iframeCode.match(srcRegex);
                if (match) {
                    const srcValue = match[1];
                    return `<iframe src="${srcValue}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
                }
            }
            return "";
        },
        fourImages() {
            return this.images.slice(0, 4);
        }  
    },
     methods: {
        openLightBox(i){
            this.visible = true;
            this.index = i;
        },
        getDetails(){
            this.$axios('hotel-details/'+this.$route.params?.details).then(response=>{
                this.$log(response.data);
                this.hotel = response.data;
                this.amenities = response.data?.amenities;
                console.log(this.amenities)
                this.makeAmenitesArray();
                this.imageRearrange();
            }).catch(error => {
                this.$elog(error.response);
            })
        },
        
        handleHide() {
            this.visible = false
        },
         imageRearrange(){
            if(this.hotel?.hotel_images?.length > 0){
                let mainImage = {};
                for(let imgIndex in this.hotel?.hotel_images){
                    let image = this.hotel?.hotel_images[imgIndex];
                    if(image.is_main){
                        mainImage = {
                            index: parseInt(imgIndex),
                            src:image.image
                        }
                    }
                    this.images.push(image.image);
                }
                if(mainImage?.src){
                    this.mainImage = mainImage;
                }else{
                   this.mainImage = {
                        index:0,
                        src:this.hotel?.hotel_images[0].image
                    } 
                }

            }else{
                this.images.push("/assets/images/hotel/rooms/room-2.jpg")
            }
        },
        swipeSlider(){
            var swiper3 = new Swiper(".hotelGallery", {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                }
            });
        },
        imageUrlAlt(event) {
            event.target.src = "/assets/images/hotel/about-hotel.svg";
        },
        iconUrlAlt(event){
            event.target.src = "/assets/images/default/heart.png";
        },
        makeAmenitesArray(){
            let amenityArray = [];
            for(let ami in this.amenities){
                amenityArray = [...amenityArray, ...this.amenities[ami]];
            }
            this.amenityArray = amenityArray;
        },
        
  }

}
</script>

<style>
    
</style>
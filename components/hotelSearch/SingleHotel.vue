<template>
  <div class="col-lg-3 col-sm-6">
        <nuxt-link :to="'/hotel/details/'+searchData.slug+queryString" class="card-available">
            <figure class="card-available-header">
                <img :src="searchData?.thumbnail_image || defaultImg" :alt="searchData.name" @error="imageUrlAlt">
            </figure>
            <div class="card-available-body">
                <h3 class="hotel-name">{{searchData.name}}</h3>
                <p class="hotel-location">{{searchData.address}}</p>
                <div class="price-start">
                    <span class="start">Starts from <b> BDT {{searchData.price_start_from.toLocaleString()}} </b></span>
                    <span class="off"> {{searchData.discount_percentage}}% OFF</span>
                </div>
                <p class="price">BDT {{searchData.discount_price_start_from.toLocaleString()}} <span>/night</span></p>
                <p class="includes">*Price includes VAT &amp; Tax</p>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    name:"SingleHotel",
    props: ['searchData'],
    data(){
        return {
            defaultImg:"/assets/images/available/1.png"
        }
    },
    computed:{
        queryString() {
            return '?' + qs.stringify(this.$route.query)
        }
    },
    
    methods:{
        imageUrlAlt(event) {
            event.target.src = this.defaultImg
        },
    }
}
</script>

<style>

</style>
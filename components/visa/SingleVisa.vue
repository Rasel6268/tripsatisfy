<template>
  <div class="single-visa">
        <div class="row">
            <div class=" col-md-8 col-lg-9">
                <div class="left-content">
                    <h2 class="visa-title"> {{visa.name}} <br> <small class="fs-6">Type: {{visa.type}} </small> </h2>
                    <div class="desc">
                        <span class="validity">Validity: {{visa.validity}} Days</span>
                        <span class="max-stay">Max Stay: {{visa.max_stay}} Days</span>
                    </div>
                </div>
            </div>
            <div class=" col-md-4 col-lg-3 custom-border">
                <div class="right-content">
                    <p class="price">BDT {{visa.price.toLocaleString() || ''}} <span>/ Person</span></p>
                    <button class="select-btn" @click="visaBooking">Select Offer</button>
                    <button class="require-document" data-bs-toggle="collapse" data-bs-target="#two">
                        <span>
                            See Required Documents
                        </span>
                        <span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.0013 11.3337L0.667969 6.00033L1.6013 5.05033L5.33464 
                                8.78366V0.666992H6.66797V8.78366L10.4013 5.05033L11.3346 6.00033L6.0013 11.3337Z" fill="#3C40C6"/>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <div class="collapse col-12" id="two">
                <div class="detail-info">
                    <div class="detail-inner" v-html="visa.require_document"></div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name:"SingleVisa",
    props:['visa'],
    methods:{
        visaBooking(){
            if (!this.$auth.loggedIn) {
                localStorage.setItem("previousPath", '/visa/booking');
            }
            const search = this.$store.state.visa.search;
            let data = {
                id:this.visa.id,
                price:this.visa.price,
                ...search
            }
            localStorage.setItem('visaBooking', JSON.stringify(data));
            this.$router.push('/visa/booking')
        }
    }
}
</script>

<style>

</style>
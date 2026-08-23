<template>
    <div>
        <AppHeader/>
           <!--========== GAP-START ============-->
            <div class="gap"></div>
            <!--========== GAP-END ==============-->
        <nuxt/>
        <Footer/>
    </div>
</template>

<script>

export default {
    mounted() {
      window.onscroll = this.scrollFunction;
      this.bgChange();
    },
    computed:{
        currentRoute(){
            return this.$route.path;
        }
    },
    watch: {
        currentRoute(){
            this.bgChange()
        }
     
   },

    methods: {
        scrollFunction(){
            // call back to top icon 
            this.toggleTopButton()
            // Header Backgroud change
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.getElementById("header").style.backgroundColor= "#ffff";
                document.getElementById("header").style.boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                document.getElementById("header").style.transition = "all .3s"
            } else {
                document.getElementById("header").style.backgroundColor = "transparent";
                document.getElementById("header").style.boxShadow = "none"

            }
        },
        // back to top icon view 
        toggleTopButton(){
            if (document.body.scrollTop > 200 ||
                document.documentElement.scrollTop > 200) {
                document.getElementById('back-to-up').classList.remove('d-none');
            } else {
                document.getElementById('back-to-up').classList.add('d-none');
            }
        },
        bgChange(){
             if(['/login','/signup'].includes(this.currentRoute)){
                document.body.classList.add('login-bg');
            }else{
                document.body.classList.remove('login-bg');
            }
        }
    }
}
</script>
<style>
.no-bg{background: none;}
.no-padding{padding:0 !important}
</style>
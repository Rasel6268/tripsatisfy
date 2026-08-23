<template>
    <div class="bg-white">
        <!-- ============ BREADCRUMB START============ -->
        <section class="breadcrumb">
            <div class="go-container w-100">
                <div class="row">
                    <div class="col-12">
                        <ul class="breadcrumb-list">
                            <li class="breadcrumb-list-item">
                                <nuxt-link to="/" class="breadcrumb-list-link">Home</nuxt-link>
                            </li>
                            <li class="breadcrumb-list-item">
                                <span class="breadcrumb-list-link active"> {{ pageData?.title }} </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- ============BREADCRUMB END============ -->
        <section class="blogdetail">
            <div class="go-container">
                <div class="page-content blogdetail-body">
                    <h1 class="border-bottom pb-2 mb-2"> {{ pageData?.title }} </h1>
                    <div class="page-description blog-text text-dark" v-if="pageData?.description">
                        <img-prefixer :htmlCode="pageData?.description" :prefix="backendUrl"></img-prefixer>
                    </div>
                </div>
            </div>
        </section>


    </div>
</template>

<script>
import ImgPrefixer from '../../components/blogs/ImgPrefixer.vue';
export default {
    components: { ImgPrefixer },
    head() {
        return {
            title: this.pageData?.title || "Page",
            meta: [
                {
                    hid: "Description",
                    name: "description",
                    content: this.pageData?.title || "Page"
                }
            ]
        }
    },
    data(){

        return {
            pageData:{}
        }
    },
    computed:{
        slug() {
            return this.$route.params?.page;
        },
        backendUrl(){
            const backendApi = process.env.BACKEND_API;
            return backendApi.replace('/api', '');
        }
    },
    mounted(){
       this.getPageDetails();
    }, 
    methods:{
        getPageDetails() {
            this.$axios
                .get(`/extra-pages/${this.slug}`)
                .then((res) => {
                    this.$log(res.data);
                    this.pageData = res.data;
                })
                .catch((err) => {
                    this.$elog(err.response.data);
                });
        },
    }
}
</script>
<style></style>
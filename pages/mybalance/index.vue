<template>
    <!-- ============== MY Ticket  START================== -->
    <section class="myaccount mw-100">
        <div class="go-container">
            <div class="myaccount-content">
                <profile-aside />
                <div class="profile-content">
                    <div class="row">
                        <div class="col-lg-4 offset-lg-8 col-md-6 offset-md-6">
                            <div class="alert alert-primary text-center" role="alert">
                               <h4> Current Balance <br> <b> BDT {{ balance.toLocaleString() }} </b> </h4>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        
                        <div class="col-lg-12 pt-2">
                            
                            <h4 class="mb-3"> Topup Transactions: <nuxt-link to="/mytransactions" class="btn btn-success float-end">View all transactions  </nuxt-link> </h4>
                            <div class="booked__cards">

                                <!-- single visa booked card -->
                                <div class="booked__card visa__booked-card mt-2" v-for="(bHistory,i) of balanceHistory" :key="i">
                                    <div class="booked__card-body">
                                        <div class="row">
                                            <div class=" col-lg-7 col-xl-8 custom-border">

                                                <div class="names__info p-3">
                                                    <div class="left">
                                                        <div class="">
                                                            <h6>Date: {{ $moment(bHistory.added_at).format(
                                                                "DD-MM-YY"
                                                            ) }}</h6>
                                                        </div>
                                                        <!-- <div class="location-box" >
                                                            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                                                Quaerat unde voluptatem vero, natus, earum nisi </p>
                                                        </div> -->
                                                    </div>


                                                </div>


                                            </div>
                                            <div class=" col-lg-5 col-xl-4 d-flex">
                                                <div class="right-col d-flex align-items-center text-center p-3">
                                                    <h6>BDT {{ bHistory?.amount?.toLocaleString() }}</h6>
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
        </div>
    </section>
    <!-- ==================== MY Ticket END================================ -->
</template>

<script>
import ProfileAside from "../../components/profile/ProfileAside.vue";
export default {
    middleware: "auth",
    components: { ProfileAside },
    name: "MyBalance",
    head() {
        return {
            title: 'My Balance'
        }
    },
    data() {
        return {
            balance:0,
            balanceHistory:[],
        }
    },
    mounted(){
        this.getBalance();
        this.getBalanceHistory();
    },
    methods: {
        async getBalance() {
            this.$axios
            .get(`/customer-b2b-balance`)
            .then((res) => {
                this.balance = res.data?.current_balance
            })
            .catch((err) => {
                this.$elog(err.response.data);

            });
        },
        async getBalanceHistory() {
            this.$axios
            .get(`/customer-add-balance-history`)
            .then((res) => {
                this.$log(res.data);
               this.balanceHistory = res.data

            })
            .catch((err) => {
                this.$elog(err.response.data);

            });
        },
    }
};
</script>
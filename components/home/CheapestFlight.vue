<template>
    <!-- ================== CHEAPEST FLIGHT START ======================= -->
    <section class="cheapest-flight">
        <div class="go-container">
            <div class="cheapest-flight-content">
                <!-- CHEAPEST FLIGHTS HEADER START -->
                <div class="cheapest-flight-header">
                    <div class="row g-4">
                        <div class="col-lg-6 col-12">
                            <div class="cheapestinfo">
                                <h3 class="cheapest-flight-title">Cheapest flights in popular route</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- CHEAPEST FLIGHTS HEADER END -->

                <!-- CHEAPEST FLIGHTS BODY START -->
                <div class="cheapest-flight-body">
                    <div class="row g-2">
                        <div class="col-lg-3 col-sm-6" v-for="(flights, index) of allData" :key="index">
                            <div class="single-fligths">
                                <!-- This div can be modified as link tag -->
                                <div role="button" class="single-flight" v-for="data of flights" :key="data.id" @click="scrollToTop">
                                    <span class="left-icon">
                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.239565 10.0565L1.45383 9.1758L3.84231 9.91415L8.2946 6.68506L1.28041 1.27201L2.89943
                                            0.0977921L11.9374 4.04307L16.3897 0.813973C16.727 0.569345 17.0993 0.479696 17.5065 0.545028C17.914
                                            0.609429 18.24 0.810278 18.4846 1.14757C18.7292 1.48487 18.8189 1.85715 18.7536 2.26442C18.6892 
                                            2.67184 18.4883 2.99787 18.151 3.2425L13.6987 6.47159L14.6416 16.288L13.0226 17.4622L10.0559 9.11358L5.60363 
                                            12.3427L5.56359 14.8424L4.34932 15.723L3.10395 12.3026L0.239565 10.0565Z"
                                                fill="#2D3748" />
                                        </svg>
                                    </span>
                                    <span class="middle-content">
                                        <span class="name">{{ data.flying_from }} - {{ data.flying_to }}</span>
                                        <span class="price">From <b>BDT {{ data.from_price.toLocaleString() ||
                                            '' }}</b></span>
                                    </span>
                                    <span class="right-icon">
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.18115 16.1453L6.75615 14.7453L12.3562 9.14526H0.181152V7.14526H12.3562L6.75615 
                                            1.54526L8.18115 0.145264L16.1812 8.14526L8.18115 16.1453Z"
                                                fill="#718096" />
                                        </svg>
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <!-- CHEAPEST FLIGHTS BODY START -->

            </div>
        </div>
    </section>
    <!-- ================== CHEAPEST FLIGHT END ======================== -->
</template>

<script>
export default {
    name: "CheapestFlight",
    data() {
        return {
            allData: []
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$axios.get('/popular-route-cheapest-flight-list').then(res => {
                if (res.data.length > 0) {
                    this.allData = this.arrayChunk(res.data, 3)
                }
            }).catch(err => {
                this.$elog(err.response.status)
            })
        },
        arrayChunk(arr, chunkSize) {
            const res = [];
            for (let i = 0; i < arr.length; i += chunkSize) {
                const chunk = arr.slice(i, i + chunkSize);
                res.push(chunk);
            }
            return res;
        },
        scrollToTop() {
            window.scrollTo({ top: 100, behavior: "smooth" });
        }
    }
}
</script>
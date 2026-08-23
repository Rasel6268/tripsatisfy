<template>
    <!-- ============== MY Ticket  START================== -->
    <section class="myaccount mw-100">
        <div class="go-container">
            <div class="myaccount-content">
                <profile-aside />
                <div class="profile-content">
                    <div class="row">
                        <div class="col-lg-10">
                            <div class="eticket" >
                                <div class="eticket-header">
                                    <div class="header-left">
                                        <span class="name">E-Ticket</span>
                                        <div class="vl"></div>
                                        <span class="ticket-id">Airline Pnr: {{ ticketData?.booking?.pnr }} </span>
                                        <div class="vl"></div>
                                        <span class="ticket-id">Status: Reserved </span>
                                    </div>
                                    <div class="header-right">
                                        <nuxt-link to="/booking">
                                            <span class="cross-btn">
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M13.2859 16.0425L7.62901 10.3856L1.97216 16.0425L0.0865417 14.1569L5.7434 8.5L0.0865417 2.84315L1.97216 0.957528L7.62901 6.61438L13.2859 0.957527L15.1715 2.84315L9.51463 8.5L15.1715 14.1569L13.2859 16.0425Z"
                                                        fill="white" />
                                                </svg>
                                            </span>
                                        </nuxt-link>
                                    </div>
                                </div>
                                <div class="eticket-body" v-for="(passenger, index) of ticketData?.booking?.passengers" :key="index">
                                    <div class="airline-info travel-agency border-bottom py-2 mb-1">
                                        <img class="ticket-logo" src="/assets/images/logo/logo.svg" alt="logo" />
                                        <div class="phone-numbers">
                                            <p v-html="address"></p>
                                        </div>
                                    </div>
                                    <!-- airline info -->
                                    <div class="airline-info mb-0">
                                        <div class="airline-namepic">
                                            <span>Airline Pnr: <b> {{ ticketData?.booking?.pnr }} </b></span>
                                        </div>
                                        
                                    </div>
                                    <div class="py-4 border-bottom"
                                        v-for="(segment, segmentIndex) of ticketData?.booking?.segments" :key="segmentIndex">

                                        <div class="airline-info">
                                            <div class="airline-namepic">
                                                <span>Passengers: <br> <b> {{ passenger?.lastName }} {{
                                                    titleSplit(passenger?.firstName) }} </b></span>
                                            </div>
                                            <div class="phone-numbers">
                                                <span>Reference Number: <br> <b>{{ flight?.invoice_number }} </b></span>
                                            </div>
                                        </div>
                                        <div class="airline-info">
                                            <div class="airline-namepic">
                                                <figure class="flight-thumb">
                                                    <img :src="airlineLogo(segment.airline)" @error="imageUrlAlt" />
                                                </figure>
                                                <div class="name-box">
                                                    <span class="name">
                                                        {{ airlineName(segment.airline + "") }}
                                                    </span>
                                                    <span class="pnr">Flight Num. : {{ segment.flightNumber }}</span>

                                                </div>
                                            </div>
                                            <div class="phone-numbers">
                                                <div class="arrow-etickt">
                                                    <div class="left">
                                                        <span>{{ segment.from }}</span>
                                                        <span>{{
                                                            $moment(segment?.departure).format("hh:mm A")
                                                        }}</span>
                                                    </div>
                                                    <div class="middle">
                                                        <span>Non stop</span>
                                                        <div class="arrow-container">
                                                            <div class="arrow-line">

                                                            </div>
                                                            <div class="arrow">
                                                            </div>
                                                        </div>
                                                        <span>{{
                                                            totalFlightTime(segment?.departure, segment.arrival)
                                                        }}</span>
                                                    </div>

                                                    <div class="right">
                                                        <span>{{ segment.to }}</span>
                                                        <span>{{
                                                            $moment(segment.arrival).format("hh:mm A")
                                                        }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- ticket info -->
                                        <div class="ticket-info">
                                            <!-- ticket header -->
                                            <div class="ticket">
                                                <div class="left">
                                                    <span>Departure: <b>{{ $moment(segment?.departure).format("DD-MM-YY hh:mm A") }} </b> </span>
                                                </div>
                                                <div class="right">
                                                    <span>Arrival: <b>{{
                                                        $moment(segment.arrival).format("DD-MM-YY hh:mm A") }} </b> </span>
                                                </div>
                                            </div>
                                            <div class="ticket">
                                                <div class="left">
                                                    <span>From: <b>{{ segment.from }} </b> </span>
                                                </div>
                                                <div class="right">
                                                    <span>To: <b>{{ segment.to }} </b> </span>
                                                </div>
                                            </div>
                                            <div class="ticket">
                                                <div class="left">
                                                    <span>Airport: </span>
                                                    <p> <b>{{ airportName(segment.from) }}</b> </p>
                                                </div>
                                                <div class="right">
                                                    <span>Airport: </span>
                                                    <p><b>{{ airportName(segment.to) }} </b></p>
                                                </div>
                                            </div>
                                            <div class="ticket">
                                                <div class="left">
                                                    <span>Cabin: <b>{{
                                                        segment.serviceClass }} </b>
                                                    </span>
                                                </div>
                                                <div class="right">
                                                    <span>Flight Info: <b>{{ segment.airline }} {{ segment.flightNumber }} {{
                                                        segment.plane.join("-") }}
                                                        </b> </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-2">
                            <div class="">
                                <button class="download-btn" @click="downloadBookingPdf">
                                    <img v-if="pdfDownloadLoader" class="m-auto d-inline" src="/assets/images/preloader/circle-loader.gif" style="height:20px" />
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
</svg> Download</button>  
                                 
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
    name: "MyBooking",
    head() {
        return {
            title: 'My Booking'
        }
    },
    data() {
        return {
            flight: {},
            pdfDownloadLoader:false
        }
    },
    mounted() {
        this.getQuery();
    },
    computed: {
        ticketData() {
            return this.flight?.ticket_data;
        },
        appName() {
            return process.env.APP_NAME || "";
        },
        address() {
            return process.env.address || "";
        },
        backendUrl(){
            const backendApi = process.env.BACKEND_API;
            return backendApi.replace('/api', '');
        }
    },
    methods: {
        async getQuery() {

            let query = this.$route.query;
            if (query?.id) {
                this.loader = true;
                this.$axios
                    .get(`/flight-booking/${query.id}`)
                    .then((res) => {
                        this.$log(res.data);
                        this.flight = res.data

                    })
                    .catch((err) => {
                        this.$elog(err.response.data);

                    });
            }
        },
        
        downloadBookingPdf() {
            this.pdfDownloadLoader = true;
            let query = this.$route.query;
            if (query?.id) {
                this.$axios({
                    url: `/booking-details/${query.id}/download`,
                    method: 'GET',
                    responseType: 'blob', // Important to get the response as a Blob
                }).then((res) => {
                        this.$log(res);
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                        const pdfUrl = URL.createObjectURL(pdfBlob);

                        const a = document.createElement('a');
                        a.href = pdfUrl;
                        a.download = `booking-${this.ticketData?.booking?.pnr}`; // Set the desired file name here
                        a.style.display = 'none';
                        
                        document.body.appendChild(a);
                        
                        a.click();
                        
                        URL.revokeObjectURL(pdfUrl);
                        document.body.removeChild(a);
                        this.pdfDownloadLoader = false;

                    })
                    .catch((err) => {
                        this.$elog(err);
                        this.pdfDownloadLoader = false;

                    });
            }
        },
       
        titleSplit(string){
            // Regular expression pattern to match the four strings: Mr, Mrs, Ms, MD
            const pattern = /(Mr|Mrs|Ms|MD)$/;

            // Check if the last 2 or 3 characters match the pattern
            const match = string.match(pattern);

            if (match) {
                // Add a space before the matched string
                string = string.replace(pattern, ` ${match[0]}`);
            }
            return string;
        
        },
       
        
        imageUrlAlt(event) {
            event.target.src =
                "https://thefinancialexpress.com.bd/public/uploads/1578301226.jpg";
        },
        airlineLogo(code) {
            return `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${code}.png`;
        },
        airlineName(inputValue, key = "iata") {
            const objectData = require("../../static/utils/airlines_codes.json");
            const input = inputValue.toString().toLowerCase();
            const result = objectData.find((data) => {
                return (
                    (data[key] !== undefined && data[key] !== null && data[key])
                        .toLowerCase()
                        .trim() == input
                );
            });
            return result?.airline || inputValue;
        },
        airportName(inputValue, key = "code") {
            const objectData = require("../../static/utils/airport_codes.json");
            const input = inputValue.toString().toLowerCase();
            const result = objectData.find((data) => {
                return (
                    (data[key] !== undefined && data[key] !== null && data[key])
                        .toLowerCase()
                        .trim() == input
                );
            });
            return result?.airport || inputValue;
        },
        totalFlightTime(firstTime, lastTime) {
            firstTime = new Date(firstTime).toUTCString();
            lastTime = new Date(lastTime).toUTCString();

            const startTime = this.$moment(firstTime);
            const endTime = this.$moment(lastTime);
            const minutesDiff = endTime.diff(startTime, "minutes");
            return this.minutesToTime(minutesDiff);
        },
        minutesToTime(minutes) {
            let duration = this.$moment.duration(minutes, "minutes");
            let days = duration.days();
            let hours = duration.hours();
            let minute = duration.minutes();
            let time = "";
            if (days > 0) {
                time = `${days}d `;
            }
            if (hours > 0) {
                time += `${hours}h `;
            }
            if (minute > 0) {
                time += `${minute}m`;
            }
            return time;
        },
    }
};
</script>
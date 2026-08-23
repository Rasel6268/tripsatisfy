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
                                        <span class="ticket-id">Status: {{ this.flight.status }} </span>
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
                                <div class="eticket-body" v-for="(ticket, index) of ticketData?.ticket" :key="index">
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
                                        <div class="airline-namepic">
                                            <span>Reference: <b> {{ flight?.invoice_number }} </b></span>
                                        </div>
                                        
                                    </div>
                                    <div class="py-4 border-bottom"
                                        v-for="(coupon, couponIndex) of ticket?.tickets[0]?.coupons" :key="couponIndex">

                                        <div class="airline-info">
                                            <div class="airline-namepic">
                                                <span>Passengers: <br> <b> {{ ticket.passengers[0]?.lastName }} {{
                                                    titleSplit(ticket.passengers[0]?.firstName) }} </b></span>
                                            </div>
                                            <div class="phone-numbers">
                                                <span>Ticket / Coupon: <br> <b>{{ coupon.ticketNumber }} / {{
                                                    coupon.couponNumber }}</b></span>
                                            </div>
                                        </div>
                                        <div class="airline-info">
                                            <div class="airline-namepic">
                                                <figure class="flight-thumb">
                                                    <img :src="airlineLogo(coupon.airline)" @error="imageUrlAlt" />
                                                </figure>
                                                <div class="name-box">
                                                    <span class="name">
                                                        {{ airlineName(coupon.airline + "") }}
                                                    </span>
                                                    <span class="pnr">Flight Num. : {{ coupon.flightNumber }}</span>

                                                </div>
                                            </div>
                                            <div class="phone-numbers">
                                                <div class="arrow-etickt">
                                                    <div class="left">
                                                        <span>{{ coupon.from }}</span>
                                                        <span>{{
                                                            $moment(coupon?.departure).format("hh:mm A")
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
                                                            totalFlightTime(coupon?.departure, ticketData?.booking?.segments[couponIndex]?.arrival)
                                                        }}</span>
                                                    </div>

                                                    <div class="right">
                                                        <span>{{ coupon.to }}</span>
                                                        <span>{{
                                                            $moment(ticketData?.booking?.segments[couponIndex]?.arrival).format("hh:mm A")
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
                                                    <span>Departure: <b>{{ $moment(coupon?.departure).format("DD-MM-YY hh:mm A") }} </b> </span>
                                                </div>
                                                <div class="right">
                                                    <span>Arrival: <b>{{
                                                        $moment(ticketData?.booking?.segments[couponIndex]?.arrival).format("DD-MM-YY hh:mm A") }} </b> </span>
                                                </div>
                                            </div>
                                            <div class="ticket">
                                                <div class="left">
                                                    <span>From: <b>{{ coupon.from }} </b> </span>
                                                </div>
                                                <div class="right">
                                                    <span>To: <b>{{ coupon.to }} </b> </span>
                                                </div>
                                            </div>
                                            <div class="ticket">
                                                <div class="left">
                                                    <span>Airport: </span>
                                                    <p> <b>{{ airportName(coupon.from) }}</b> </p>
                                                </div>
                                                <div class="right">
                                                    <span>Airport: </span>
                                                    <p><b>{{ airportName(coupon.to) }} </b></p>
                                                </div>
                                            </div>
                                            <div class="ticket">
                                                <div class="left">
                                                    <span>Cabin: <b>{{
                                                        ticketData?.booking?.segments[couponIndex]?.serviceClass }} </b>
                                                    </span>
                                                </div>
                                                <div class="right">
                                                    <span>Flight Info: <b>{{ coupon.airline }} {{ coupon.flightNumber }} {{
                                                        ticketData?.booking?.segments[couponIndex]?.plane.join("-") }}
                                                        </b> </span>
                                                </div>
                                            </div>
                                            <div class="ticket">
                                                <div class="left">
                                                    <span>Baggage Allowance: <b>
                                                        {{ baggage(coupon.fareBasisCode,couponIndex).amount }} {{ baggage(coupon.fareBasisCode,couponIndex).units }} </b>
                                                    </span>
                                                </div>
                                                <div class="right">
                                                    <span>Carry-on: <b> 7 Kilograms </b> </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-2">
                            <div class="">
                                <button class="download-btn" @click="downloadFiles"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
</svg> Ticket</button>    
                                 
                            </div>
                            <div class="ticket-cancel mt-2">
                                <button class="download-btn btn btn-danger" @click="downloadInvoices">
                                    <img v-if="invoiceDownloadLoader" class="m-auto d-inline" src="/assets/images/preloader/circle-loader.gif" style="height:20px" />
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
</svg> Invoice</button>  
                                <button type="button" class="d-none download-btn btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">Cancel Ticket</button>
                                <!-- Modal -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header border-bottom">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Ticket Cancelation</h1>
                                                <button class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <h5>Refund policy:</h5>
                                                <p>Refund Amount= Paid Amount – (Airline’s Cancellation Fee + TS Service
                                                    Fee).</p>
                                                <p>TS Convenience fee is non-refundable.</p>
                                                <p>We does not guarantee the accuracy of refund/date change fees.</p>
                                                <p>The airline refund/date change fee is an estimation and can be changed
                                                    without any prior notice by the airlines.</p>
                                                <h5 class="text-danger">Are you sure you want to cancel your ticket?</h5>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-success" @click="ticketCancel()">Yes, Cancel
                                                    Ticket</button>
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
import TicketPdf from '../../components/utils/ticketPdf.vue';

export default {
    middleware: "auth",
    components: { ProfileAside, TicketPdf },
    name: "MyTicket",
    head() {
        return {
            title: 'My Ticket'
        }
    },
    data() {
        return {
            flight: {},
            ticketsPdf:[],
            invoiceDownloadLoader:false
        }
    },
    mounted() {
        this.getQuery();
        this.ticketPdfLoad();
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
        ticketPdfLoad(){
            let query = this.$route.query;
            if (query?.id) {
                this.$axios
                    .get(`/pdfs/${query.id}`)
                    .then((res) => {
                        this.$log(res.data);
                        this.ticketsPdf = res.data;

                    })
                    .catch((err) => {
                        this.$elog(err.response.data);

                    });
            }
        },
        ticketPdfDownload(id,filename){
            let query = this.$route.query;
            if (query?.id) {
                this.$axios({
                    url: `/pdfs/${id}/download`,
                    method: 'GET',
                    responseType: 'blob', // Important to get the response as a Blob
                }).then((res) => {
                       // this.$log(res);
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                        const pdfUrl = URL.createObjectURL(pdfBlob);

                        const a = document.createElement('a');
                        a.href = pdfUrl;
                        a.download = filename; // Set the desired file name here
                        a.style.display = 'none';
                        
                        document.body.appendChild(a);
                        
                        a.click();
                        
                        URL.revokeObjectURL(pdfUrl);
                        document.body.removeChild(a);

                    })
                    .catch((err) => {
                        this.$elog(err);

                    });
            }
        },
        downloadFiles() {
           
            //console.log(this.ticketsPdf)
            // Loop through selected files and initiate their download
            for (const file of this.ticketsPdf) {
                this.ticketPdfDownload(file.id, file.title);
            }
        },
        downloadInvoices() {
            this.invoiceDownloadLoader = true;
            let query = this.$route.query;
            if (query?.id) {
                this.$axios({
                    url: `/invoice/${query.id}/download`,
                    method: 'GET',
                    responseType: 'blob', // Important to get the response as a Blob
                }).then((res) => {
                        this.$log(res);
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                        const pdfUrl = URL.createObjectURL(pdfBlob);

                        const a = document.createElement('a');
                        a.href = pdfUrl;
                        a.download = `invoice-${this.ticketData?.booking?.pnr}`; // Set the desired file name here
                        a.style.display = 'none';
                        
                        document.body.appendChild(a);
                        
                        a.click();
                        
                        URL.revokeObjectURL(pdfUrl);
                        document.body.removeChild(a);
                        this.invoiceDownloadLoader = false;

                    })
                    .catch((err) => {
                        this.$elog(err);
                        this.invoiceDownloadLoader = false;

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
        baggage(fareBasisCode,couponIndex){
            let pricingInfos = this.ticketData?.booking?.fareQuotes[0]?.pricingInfos;
            let infoIndex;
            for(infoIndex in pricingInfos){
                let fareCalculation = pricingInfos[infoIndex].fareCalculation;
                if (fareCalculation.includes(fareBasisCode)) {
                    return pricingInfos[infoIndex].baggage[couponIndex];
                }
            }
        },
        async ticketCancel() {
            return ;
            let pnr = this.ticketData?.booking[0]?.pnr || this.ticketData?.booking?.pnr;
            console.log(pnr);
            // this.getTickets(pnr);
            // this.getBooking(pnr);
            try {
                let params = { pnr};

                const response = await this.$Api.post("/air/cancel-pnr", params);
                if (response?.data?.statusCode && response?.data?.name) {
                    let errorText = response?.data?.name;
                    let newErrorText = errorText.replace("AirRuntimeError.", "");
                    this.$toast.warning(newErrorText);
                    // this.$router.push("/booking/flight");
                    // this.loader = false;
                }
                console.log(response.data);
            } catch (err) {
                let newErrorText = "Error found!";
                if (err?.response?.data?.statusCode && err?.response?.data?.name) {
                    let errorText = err?.response?.data?.name;
                    newErrorText = errorText.replace(
                        "AirFlightInfoRuntimeError.",
                        ""
                    );
                }
                if (err?.response?.status && err?.response?.status == 400 && err?.response?.data?.name) {
                    newErrorText = err?.response?.data?.name;
                }
                this.$toast.warning(newErrorText);
                this.$elog("error in api");
                this.$elog(err?.response);
                // this.$router.push("/booking/flight");
                //this.loader = false;
            }
        },
        storeTicketData(ticket_data) {
            let data = {
                ticket_data
            };
            let query = this.$route.query;
            this.$axios
                .patch(`/flight-booking/${query.booking_id}`, data)
                .then((res) => {
                    this.$log(res.data);
                    if (res.status == 200) {
                        this.$toast.success("Successfully ticket issued.");
                        this.$router.push("/booking/flight");
                        this.loader = false;
                    }
                })
                .catch((err) => {
                    this.$elog(err.response);
                });
        },
        async getBooking(pnr) {
            try {
                const response = await this.$Api.post(
                    "/air/get-booking",
                    {
                        pnr,
                    }
                );
                if (response?.data?.statusCode && response?.data?.name) {
                    let errorText = response?.data?.name;
                    let newErrorText = errorText.replace("AirRuntimeError.", "");
                    this.$toast.warning(newErrorText);
                    this.$router.push("/booking/flight");
                    this.loader = false;
                }
                console.log(response.data);

                //this.getTickets(pnr, response.data);

                // this.$router.push("/booking/flight");
                // this.loader = false;
            } catch (err) {
                let newErrorText = "Error found!";
                if (err?.response?.data?.statusCode && err?.response?.data?.name) {
                    let errorText = err?.response?.data?.name;
                    newErrorText = errorText.replace(
                        "AirFlightInfoRuntimeError.",
                        ""
                    );
                }
                if (err?.response?.status && err?.response?.status == 400 && err?.response?.data?.name) {
                    newErrorText = err?.response?.data?.name;
                }
                this.$toast.warning(newErrorText);
                this.$elog("error in api");
                this.$elog(err?.response);
            }
        },
        async getTickets(pnr) {
            try {
                const response = await this.$Api.post(
                    "/air/get-tickets",
                    {
                        pnr,
                    }
                );
                if (response?.data?.statusCode && response?.data?.name) {
                    let errorText = response?.data?.name;
                    let newErrorText = errorText.replace("AirRuntimeError.", "");
                    this.$toast.warning(newErrorText);
                }
                console.log(response.data);

                // this.$router.push("/booking/flight");
                // this.loader = false;
            } catch (err) {
                let newErrorText = "Error found!";
                if (err?.response?.data?.statusCode && err?.response?.data?.name) {
                    let errorText = err?.response?.data?.name;
                    newErrorText = errorText.replace(
                        "AirFlightInfoRuntimeError.",
                        ""
                    );
                }
                if (err?.response?.status && err?.response?.status == 400 && err?.response?.data?.name) {
                    newErrorText = err?.response?.data?.name;
                }
                this.$toast.warning(newErrorText);
                this.$elog("error in api");
                this.$elog(err?.response);
            }
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
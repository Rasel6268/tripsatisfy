<template>
    <div class="booking-card">
        <div class="booking-card-header">
            <span v-if="ticketData?.booking?.pnr">Airline Pnr: {{ ticketData?.booking?.pnr }}</span>
            <span class="ticket-pax">Pax Details: {{ passengers?.total }} ( <b> {{ passengers?.names }} </b> )</span>
            <span class="confirm" v-if="ticketData?.booking?.pnr && ticketData?.ticket">
                <button><nuxt-link :to="'/flight/ticket?id=' + id" class="text-dark">View Ticket</nuxt-link></button>
            </span>
            <span
                v-if="ticketData?.booking?.pnr && !ticketData?.ticket && !bookingCancelStatus && !ticketData?.booking?.cancel && !cancelLoader"
                class="confirm">
                <!-- Button trigger modal -->
                <span v-if="remainingTime > 0"> Time Remaining: <b> {{ formatTime() }} </b> </span>
                <button style="max-width: 35px;" type="button" class="bg-danger text-white" @click="bookingCancel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg> </button>
                <button type="button" class="bg-warning" @click="ticketIssueModal" v-if="remainingTime > 0">
                    Ticket Issue <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg>
                </button>
                <button style="max-width: 35px;"><nuxt-link :to="'/flight/booking-details?id=' + id" class="text-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg></nuxt-link></button>

                <button class="bg-warning text-capitalize d-none">{{ flightData.status ?? 'Invalid' }}</button>
            </span>
            <span v-if="ticketData?.booking?.cancel || bookingCancelStatus" class="text-danger"> <svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle"
                    viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg> Booking has been cancelled. </span>
            <span v-if="ticketData?.ticekt?.cancel" class="text-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16"
                    height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg> Ticket has been cancelled. </span>
        </div>
        <div class="booking-card-body position-relative">
            <div class="flight-card text-center ticket-confirm-dialog" v-if="cancelLoader">
                <h3 class="mb-2">Booking cancellation in progress... </h3>
                <div class="text-center fw mt-2">
                    <img class="m-auto" src="/assets/images/preloader/1.gif" />
                </div>
            </div>

            <div class="flight-card text-center ticket-confirm-dialog" v-if="ticketConfirmDialog">
                <h3 class="mb-2">Do you want to issue tickets?</h3>
                <button @click="ticketIssue()" class="bg-success text-white px-2 rounded "> <svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-check-all" viewBox="0 0 16 16">
                        <path
                            d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                    </svg> Confirm </button>
                <button class="bg-warning text-white px-2 rounded" @click="ticketIssueModal"> Not Now </button>
                <div class="text-center fw mt-2" v-if="ticketLoader">
                    <img class="m-auto" src="/assets/images/preloader/1.gif" />
                    <h5 class="preloadewr-title">{{ progressText }} </h5>
                </div>
            </div>

            <div class="flight-card">
                <div class="row g-4">
                    <div class="col-lg-9 ps-0">
                        <div class="left-inner ps-4">
                            <div class="row g-4 pt-4 h-100 align-items-center" v-for="(data, directionIndex) of directions"
                                :key="directionIndex">
                                <div class="col-lg-5" v-if="data.segments[0]">
                                    <div class="airline-namepic">
                                        <figure class="flight-thumb">
                                            <img :src="airlineLogo(data.platingCarrier)" @error="imageUrlAlt" />
                                        </figure>
                                        <div class="name-box">
                                            <span class="name">
                                                {{ airlineName(data.platingCarrier + "") }}
                                            </span>
                                            <!-- <span class="pnr">Pnr: DOMFLY0808</span> -->
                                        </div>
                                    </div>
                                </div>
                                <!-- flight duration  -->
                                <div class="col-lg-7">
                                    <div class="flight-duration">
                                        <div class="top-row">
                                            <div class="left">
                                                <span>
                                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M1.25977 21.0069V18.6684H19.2598V21.0069H1.25977ZM3.10977 15.1607L0.259766 9.48993L1.80977 9.13916L3.55977 10.9515L8.35977 9.43147L4.30977 1.42224L6.25977 0.720703L13.1098 7.91147L18.1098 6.33301C18.6431 6.15763 19.1264 6.27455 19.5598 6.68378C19.9931 7.09301 20.2098 7.63865 20.2098 8.3207C20.2098 8.74942 20.0974 9.12942 19.8728 9.4607C19.6474 9.79198 19.3598 10.0161 19.0098 10.133L3.10977 15.1607Z"
                                                            fill="#4A5568" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="middle">
                                                <span class="stops" v-if="data.segments.length > 1">
                                                    {{ data.segments.length - 1 }} Stops
                                                </span>
                                                <span class="stops" v-else> Nonstop </span>
                                            </div>
                                            <div class="right">
                                                <span>
                                                    <svg width="19" height="23" viewBox="0 0 19 23" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M0.667969 22.9712V20.6328H18.668V22.9712H0.667969ZM16.518 17.0082L0.667969 11.8636V5.43278L2.16797 6.0174L2.86797 8.47278L7.66797 10.0512V0.755859L9.66797 1.34047L12.418 11.5712L17.418 13.2082C17.8013 13.3251 18.1056 13.5636 18.331 13.9237C18.5556 14.2846 18.668 14.6892 18.668 15.1374C18.668 15.7805 18.443 16.2969 17.993 16.6866C17.543 17.0764 17.0513 17.1836 16.518 17.0082Z"
                                                            fill="#4A5568" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="middle-row">
                                            <div class="left">
                                                <span class="location">
                                                    {{ data?.from }}
                                                </span>
                                            </div>
                                            <div class="middle">
                                                <div class="arrow-container">
                                                    <div class="arrow-line" v-if="data.segments.length > 1">
                                                        <div class="round" v-for="(
                                segment, segmentIndex
                              ) of data.segments.slice(1)" :key="segmentIndex" data-bs-toggle="tooltip"
                                                            data-bs-html="true" data-bs-placement="top"
                                                            :data-bs-title="[layoverAtStop(data.segments, segmentIndex + 1) + ' at ' + segment.from]">
                                                            <div class="content">
                                                                {{ segment.from }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="arrow-line" v-else></div>
                                                    <div class="arrow"></div>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <span class="location"> {{ data?.to }} </span>
                                            </div>
                                        </div>

                                        <div class="bottom-row">
                                            <div class="left">
                                                <span class="time">
                                                    {{
                                                        getTimeValue(data.segments[0]?.departure)
                                                    }}
                                                    <br />
                                                    <small class="small-text">
                                                        {{
                                                            getDateValue(data.segments[0]?.departure)
                                                        }}
                                                    </small>
                                                </span>
                                            </div>
                                            <div class="middle">
                                                <span class="stops">{{
                                                    totalFlightTime(data.segments)
                                                }}</span>
                                            </div>
                                            <div class="right">
                                                <span class="time">
                                                    {{
                                                        getTimeValue(
                                                            data.segments[data.segments.length - 1]?.arrival
                                                        )
                                                    }}
                                                    <br />
                                                    <small class="small-text">
                                                        {{
                                                            getDateValue(
                                                                data.segments[data.segments.length - 1]?.arrival
                                                            )
                                                        }}
                                                    </small>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <div class="buy-info">
                            <div class="top">
                                <span class="refand">Partially Refundable</span>
                                <div class="price">
                                    <span class="new">BDT {{ totalAmount.toLocaleString() }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "BookingSingleFlight",
    props: ["flightData", "id", "balance"],
    data() {
        return {
            ticketLoader: false,
            cancelLoader: false,
            ticketConfirmDialog: false,
            bookingCancelStatus: false,
            requestId: '',
            remainingTime: this.reservationTime,
            progressText: 'Ticket issue in progress',
        }
    },
    mounted() {
        this.rawJs();
        this.getrequestId();
        this.startTimer();
        console.log(this.passengers)

    },
    computed: {
        userInfo() {
            return {
                ...this.$store.state.userInfo,
            };
        },
        directions() {
            return this.flightData?.booking_data?.directions;
        },
        ticketData() {
            return this.flightData?.ticket_data;
        },
        latestTicketingTime() {
            if (this.flightData?.ticket_data?.booking?.fareQuotes) {
                let fareQuotes = this.flightData?.ticket_data?.booking?.fareQuotes;
                if (fareQuotes[0]?.pricingInfos) {
                    return fareQuotes[0]?.pricingInfos[0]?.timeToReprice;
                }
            }
            return undefined;
        },
        reservationTime() {
            const createdAt = this.ticketData?.booking?.createdAt;
            const time1_str = this.latestTicketingTime;
            const time2_str = this.directions[0].segments[0]?.departure;

            // Convert strings to Date objects in local time
            const createdAt_local = new Date(createdAt);
            const time1_local = new Date(time1_str);
            const time2_local = new Date(time2_str);

            // Convert local times to UTC
            const createdAt_local_utc = new Date(createdAt_local.getTime() + createdAt_local.getTimezoneOffset() * 60000);
            const time1_utc = new Date(time1_local.getTime() + time1_local.getTimezoneOffset() * 60000);
            const time2_utc = new Date(time2_local.getTime() + time2_local.getTimezoneOffset() * 60000);

            // Select the lowest time
            const lowestTime_utc = time1_utc < time2_utc ? time1_utc : time2_utc;

            // Subtract 1 hour
            lowestTime_utc.setHours(lowestTime_utc.getHours() - 1);

            // Calculate the time difference in minutes
            const timeDifference_minutes = Math.floor((lowestTime_utc - createdAt_local_utc) / (60 * 1000));

            // Determine whether to display hours or minutes
            let minutes;
            if (timeDifference_minutes >= 60) {
                const hours = Math.floor(timeDifference_minutes / 60);
                minutes = 60;
            } else {
                minutes = timeDifference_minutes;
            }
            // minutes in milliseconds
            return minutes * 60 * 1000;
        },
        passengers() {
            let total = this.flightData?.booking_data?.passengers?.length || '';
            let names = [];
            if (Array.isArray(this.flightData?.booking_data?.passengers)) {
                for (let passenger of this.flightData?.booking_data?.passengers) {
                    names.push(`${passenger.first_name}  ${passenger.last_name}`);
                }
            }
            return {
                total,
                names: names.join(",")
            }
        },
        totalAmount() {
            return this.flightData?.booking_data?.total_amount;
        }
    },

    methods: {
        startTimer() {
            setInterval(() => {
                this.calculateRemainingTime();
            }, 1000); // Update every second
        },
        calculateRemainingTime() {
            const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });
            const createdAt = new Date(this.ticketData?.booking?.createdAt).toLocaleString("en-US", { timeZone: "UTC" });
            const startTime = new Date(createdAt);
            const elapsedTime = new Date(now) - startTime;

            const remainingTime = Math.max(0, 60 * 60 * 1000 - elapsedTime); // Ensure remaining time doesn't go negative

            this.remainingTime = remainingTime;
        },
        formatTime() {
            const minutes = Math.floor(this.remainingTime / (60 * 1000));
            const seconds = Math.floor((this.remainingTime % (60 * 1000)) / 1000);

            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },



        getrequestId() {
            let requestId = localStorage.getItem('requestId');
            this.requestId = requestId;
        },
        ticketIssueModal() {
            this.ticketConfirmDialog = !this.ticketConfirmDialog;
        },

        rawJs() {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
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
        getTimeValue(timeString) {
            const datePortion = timeString.split("T")[0];
            const timePart = timeString.split("T")[1].split(".")[0];
            // Create a Date object from the time string
            const date = new Date(`${datePortion}T${timePart}`);

            // Get the hour and minute
            let hours = date.getHours();
            const minutes = date.getMinutes();

            // Format the time to include AM/PM
            let ampm = "AM";
            if (hours >= 12) {
                ampm = "PM";
                if (hours > 12) {
                    hours -= 12;
                }
            }
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        },
        getDateValue(timeString) {
            // Your time string
            const datePortion = timeString.split("T")[0];

            // Create a Date object from the time string
            const date = new Date(datePortion);
            // Get the year, month, and day
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are 0-based, so add 1 to get the correct month
            const day = date.getDate();

            return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

        },
        layoverAtStop(segments, index) {
            let firstTime = segments[index - 1]?.arrival;
            let lastTime = segments[index]?.departure;
            firstTime = new Date(firstTime).toUTCString();
            lastTime = new Date(lastTime).toUTCString();
            const startTime = this.$moment(firstTime);
            const endTime = this.$moment(lastTime);
            const minutesDiff = endTime.diff(startTime, "minutes");

            return `${this.minutesToTime(minutesDiff)} layover`;
        },
        flightTime(segment) {
            let firstTime = segment?.departure;
            let lastTime = segment?.arrival;
            firstTime = new Date(firstTime).toUTCString();
            lastTime = new Date(lastTime).toUTCString();
            const startTime = this.$moment(firstTime);
            const endTime = this.$moment(lastTime);
            const minutesDiff = endTime.diff(startTime, "minutes");

            return this.minutesToTime(minutesDiff);
        },
        totalFlightTime(segments) {
            let sLength = segments.length - 1;
            let firstTime = segments[0]?.departure;
            let lastTime = segments[sLength]?.arrival;
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

        //1.  Ticket Issue start point
        async ticketIssue() {
            this.progressText = 'Ticket issue in progress';
            if (this.userInfo.customer_type == 'B2B') {
                if (this.balance < this.totalAmount) {
                    this.$toast.warning("You have no sufficient balance.");
                    this.$router.push("/mybalance");
                    return;
                }
            }
            let pnr = this.ticketData?.booking?.pnr;
            let booking = this.ticketData?.booking;
            this.ticketLoader = true;
            try {
                const response = await this.$Api.post(
                    "/air/ticket-issue",
                    {
                        commission: {
                            type: 'Z',
                            value: 7,
                        },
                        fop: {
                            type: 'Cash',
                        },
                        pnr,
                        requestId: this.requestId
                    }
                );
                if (response?.data?.statusCode && response?.data?.name) {
                    let errorText = response?.data?.name;
                    let newErrorText = errorText.replace("AirRuntimeError.", "");
                    this.$toast.warning(newErrorText);
                    this.$router.push("/booking/flight");
                    this.ticketLoader = false;
                    this.ticketConfirmDialog = false;
                }
                if (response.data == true) {
                    this.progressText = 'Ticket confirmed';
                    //this.getBooking(pnr);
                    this.getTickets(pnr, booking);
                }
                //console.log(response.data);
            } catch (err) {
                if (err?.response?.data?.statusCode && err?.response?.data?.name) {
                    let errorText = err?.response?.data?.name;
                    let newErrorText = errorText.replace(
                        "AirFlightInfoRuntimeError.",
                        ""
                    );
                    this.$toast.warning(newErrorText);
                    this.$router.push("/booking/flight");
                    this.ticketLoader = false;
                    this.ticketConfirmDialog = false;
                }
                this.$elog("error in api");
                this.$elog(err?.response);
            }
        },

        //2. for getting all tickets
        async getTickets(pnr, booking) {
            this.progressText = 'Retrieving ticket data';
            try {
                const response = await this.$Api.post(
                    "/air/get-tickets",
                    {
                        pnr,
                        requestId: this.requestId
                    }
                );
                if (response?.data?.statusCode && response?.data?.name) {
                    let errorText = response?.data?.name;
                    let newErrorText = errorText.replace("AirRuntimeError.", "");
                    this.$toast.warning(newErrorText);
                    this.$router.push("/booking/flight");
                    this.ticketLoader = false;
                    this.ticketConfirmDialog = false;
                }
                localStorage.removeItem('requestId');
                this.storeTicketData({ booking, ticket: response.data });

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
                this.$router.push("/booking/flight");
                this.ticketLoader = false;
                this.ticketConfirmDialog = false;
            }
        },

        //3. For stort ticket data to existing booking by update
        storeTicketData(ticket_data) {
            let data = {
                ticket_data
            };
            this.$axios
                .patch(`/flight-booking/${this.id}`, data)
                .then((res) => {
                    this.$log(res.data);
                    if (res.status == 200) {
                        if (this.userInfo.customer_type == 'B2B') {
                            this.b2bFundDeduction();
                        } else {
                            this.sendTicket();
                        }
                    }
                })
                .catch((err) => {
                    this.$elog(err.response);
                });
        },

        //4. for sending ticket & invoice to email
        async sendTicket() {
            this.progressText = 'Sending ticket to your mail...';
            this.$axios.get(`/send-flight-titcket/${this.id}`)
                .then((res) => {
                    if (res.status == 200) {
                        this.$toast.success("Successfully ticket issued.");
                        this.$router.push("/booking/flight");
                        this.ticketLoader = false;
                        this.ticketConfirmDialog = false;
                    }
                })
                .catch((err) => {
                    this.$elog(err.response);
                });
        },
        // If B2B user, then this function will be call, this is for b2b fund deduction update
        async b2bFundDeduction() {
            let body = {
                "flight_booking_id": this.id,
                "pending_status": "success"
            }
            this.$axios
                .patch(`/customer-b2b-balance`, body)
                .then((res) => {
                    this.sendTicket();
                })
                .catch((err) => {
                    this.$elog(err);

                });
        },

        async bookingCancel() {
            this.cancelLoader = true;
            // Get current date and time
            const currentDate = new Date();
            // Format date and time as a string
            const formattedDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
            let pnr = this.ticketData?.booking?.pnr;
            // this.getTickets(pnr);
            // this.getBooking(pnr);
            try {
                let params = { pnr };

                const response = await this.$Api.post("/air/cancel-booking", params);
                if (response?.data?.statusCode && response?.data?.name) {
                    let errorText = response?.data?.name;
                    let newErrorText = errorText.replace("AirRuntimeError.", "");
                    this.$toast.warning(newErrorText);
                    this.$router.push("/booking/flight");
                    this.cancelLoader = false;
                }
                this.$axios
                    .patch(`/flight-booking/${this.id}`, {
                        ticket_data: {
                            booking: {
                                pnr,
                                cancel: formattedDate
                            }
                        }
                    })
                    .then((res) => {
                        this.$log(res.data);
                        if (res.status == 200) {
                            this.$toast.success("Booking Successfully Cancelled.");
                            this.$router.push("/booking/flight");
                            this.cancelLoader = false;
                            this.bookingCancelStatus = true;
                        }
                    })
                    .catch((err) => {
                        this.$elog(err.response);
                    });
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
                this.$router.push("/booking/flight");
                this.cancelLoader = false;
            }
        },

        // For getting booking data
        async getBooking(pnr) {
            this.progressText = 'Retrieving booking data';
            try {
                const response = await this.$Api.post(
                    "/air/get-booking",
                    {
                        pnr,
                        requestId: this.requestId
                    }
                );
                if (response?.data?.statusCode && response?.data?.name) {
                    let errorText = response?.data?.name;
                    let newErrorText = errorText.replace("AirRuntimeError.", "");
                    this.$toast.warning(newErrorText);
                    this.$router.push("/booking/flight");
                    this.loader = false;
                }
                console.log(response?.data)
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
                this.$router.push("/booking/flight");
                this.loader = false;
            }
        },

    }
};
</script>
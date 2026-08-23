<template>
    <!-- =================== CUSTOMER DETAILS START =========================== -->
    <section class="customer-details">
        <div class="go-container">
            <div class="customer-details-content">
                <!-- CUSTOMER DETAILS HEADER -->
                <div class="customer-details-header">
                    <h3 class="customer-details-title"> My Flight History </h3>
                </div>

                <!-- CUSTOMER DETAILS BODY -->

                <div class="customer-details-body">
                    <div class="row g-4">
                        <div class="col-lg-12">
                            <div class="details-container">
                                <!-- Passenger 1   -->
                                <div class="guestinfo-card">
                                    <div class="guestinfo-card-header">
                                        <h3 class="guestinfo-card-title">
                                            Search
                                        </h3>
                                    </div>
                                    <div class="guestinfo-card-body">
                                        <form @submit.prevent="getHistory()" enctype="multipart/form-data">
                                            <div class="row g-4">
                                                <!-- date of birth  -->
                                                <div class="col-lg-4">
                                                    <div class="input-box2">
                                                        <label for="start_date" class="input-label">Start Date
                                                            <span class="text-danger"> * </span> :
                                                        </label>
                                                        <date-picker id="start_date" class="input-field fullWidth"
                                                            placeholder="DD/MM/YYYY" format="dd/MM/yyyy"
                                                            v-model="start_date" @selected="start_date_error = false" />
                                                    </div>
                                                    <span class="text-danger small-text" v-if="start_date_error">
                                                        Start date can not be null!
                                                    </span>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="input-box2">
                                                        <label for="end_date" class="input-label">End Date
                                                            <span class="text-danger"> * </span> :
                                                        </label>
                                                        <date-picker id="end_date" class="input-field fullWidth"
                                                            placeholder="DD/MM/YYYY" format="dd/MM/yyyy"
                                                            v-model="end_date" @selected="end_date_error = false" />
                                                    </div>
                                                    <span class="text-danger small-text" v-if="end_date_error">
                                                        End date can not be null!
                                                    </span>
                                                </div>
                                                <div class="col-lg-2">
                                                    <span>
                                                        <button type="submit" class="download-btn">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                height="16" fill="currentColor" class="bi bi-search"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                                            </svg> Find</button>
                                                    </span>

                                                </div>

                                            </div>
                                        </form>

                                        <div class="row g-4" v-if="isSubmit">
                                            <div class="col-lg-12">
                                                <div v-if="loader">
                                                    <flight-loader />
                                                </div>
                                                <div v-else>
                                                    <div v-if="histories.length == 0">
                                                        <h4 class="text-center text-danger"> No Data Found! </h4>
                                                    </div>
                                                    <div class="table-responsive" v-else>
                                                        <div class="col-md-12">
                                                            <button @click="downloadHistoryPdf"
                                                                class="btn btn-success float-end mb-1">
                                                                <img v-if="pdfDownloadLoader" class="m-auto d-inline"
                                                                    src="/assets/images/preloader/circle-loader.gif"
                                                                    style="height:20px" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                    height="16" fill="currentColor"
                                                                    class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd"
                                                                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                                                                </svg> Download</button>
                                                        </div>
                                                        <table class="table table-bordered">
                                                            <thead>
                                                                <tr class="bg-primary text-white">
                                                                    <th scope="col">Date Time</th>
                                                                    <th scope="col">Booking ID</th>
                                                                    <th scope="col">PNR</th>
                                                                    <th scope="col">Ticket Number</th>
                                                                    <th scope="col">Passenger Name</th>
                                                                    <th scope="col">Passenger Type</th>
                                                                    <th scope="col">Base Fare</th>
                                                                    <th scope="col">Discount</th>
                                                                    <th scope="col">Tax</th>
                                                                    <th scope="col">AIT</th>
                                                                    <th scope="col">Total Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="(history, index) of histories" :key="index" :class="[history.totalPrice > 0 && 'border-bottom-solid']">
                                                                    <td>{{ dateTime(history.createdAt) }}</td>
                                                                    <td>{{ history.bookingId }}</td>
                                                                    <td>{{ history.pnr }}</td>
                                                                    <td>{{ history.ticketNumber }}</td>
                                                                    <td>{{ history.passengerName }}</td>
                                                                    <td>{{ history.passengerType }}</td>
                                                                    <td :class="[history.totalPrice > 0 && 'bg-eee']">{{ history.baseFare }}</td>
                                                                    <td :class="[history.totalPrice > 0 && 'bg-eee']">{{ history.discount }}</td>
                                                                    <td :class="[history.totalPrice > 0 && 'bg-eee']">{{ history.tax }}</td>
                                                                    <td :class="[history.totalPrice > 0 && 'bg-eee']">{{ history.ait }}</td>
                                                                    <td :class="[history.totalPrice > 0 && 'bg-eee']">{{ history.totalPrice }}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
        </div>
    </section>
    <!-- =================== CUSTOMER DETAILS END=========================== -->
</template>

<script>
import FlightLoader from '../../components/utils/FlightLoader.vue'
export default {
    components: { FlightLoader },
    middleware: "auth",
    name: "Flight-History",
    head() {
        return {
            title: "My Flight History",
            meta: [
                {
                    hid: "Description",
                    name: "description",
                    content: "Flight History",
                },
            ],
        };
    },
    data() {
        return {
            histories: [],
            start_date: '',
            end_date: '',
            new_start_date: '',
            new_end_date: '',
            start_date_error: false,
            end_date_error: false,
            loader: false,
            isSubmit: false,
            pdfDownloadLoader: false
        };
    },
    mounted() {
        window.setTimeout(() => {
            this.rawJsSelect();
        }, 300);

    },

    methods: {
        getHistory() {
            this.isSubmit = true;

            if (this.start_date == null || this.start_date == "") {
                this.start_date_error = true;
                this.isSubmit = false;
            }
            if (this.end_date == null || this.end_date == "") {
                this.end_date_error = true;
                this.isSubmit = false;
            }
            if (this.isSubmit) {
                this.new_start_date = this.$moment(
                    this.start_date,
                    "YYYY-MM-DD"
                ).format("YYYY-MM-DD");
                this.new_end_date = this.$moment(
                    this.end_date,
                    "YYYY-MM-DD"
                ).format("YYYY-MM-DD");
                let url = `/my-flight-history?start_date=${this.new_start_date}&end_date=${this.new_end_date}`;
                this.loader = true;
                this.$axios
                    .get(url)
                    .then((res) => {
                        this.$log(res.data);
                        this.histories = res.data;
                        this.loader = false;
                    })
                    .catch((err) => {
                        this.$elog(err.response.data);
                        this.loader = false;
                    });
            }


        },
        downloadHistoryPdf() {
            this.pdfDownloadLoader = true;
            let url = `/my-flight-history-pdf?start_date=${this.new_start_date}&end_date=${this.new_end_date}`;
            this.$axios({
                url: url,
                method: 'GET',
                responseType: 'blob', // Important to get the response as a Blob
            }).then((res) => {
                this.$log(res);
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);

                const a = document.createElement('a');
                a.href = pdfUrl;
                a.download = `flight-history`; // Set the desired file name here
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
        },
        rawJsSelect() {
            const selectWrapper = document.querySelectorAll(".select-wrapper");
            selectWrapper.forEach((select) => {
                select.addEventListener("click", function () {
                    this.querySelector(".select").classList.toggle("open");
                });
            });

            window.addEventListener("click", function (e) {
                const selectAll = document.querySelectorAll(".select");

                for (const select of selectAll) {
                    if (!select.contains(e.target)) {
                        select.classList.remove("open");
                    }
                }
            });
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });

        },
        // Write me a function for date time show
        dateTime(dateString) {
            const dateTime = new Date(dateString);

            const date = dateTime.toLocaleDateString();
            const time = dateTime.toLocaleTimeString();
            return `${date} ${time}`;
        }


    },
};
</script>
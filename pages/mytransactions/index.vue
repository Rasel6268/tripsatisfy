<template>
    <!-- =================== CUSTOMER DETAILS START =========================== -->
    <section class="customer-details">
        <div class="go-container">
            <div class="customer-details-content">
                <div class="row">
                    <div class="col-lg-4 offset-lg-8 col-md-6 offset-md-6">
                        <div class="alert alert-primary text-center" role="alert">
                            <h4> Current Balance: <br> <b> BDT {{ balance.toLocaleString() }} </b> </h4>
                        </div>
                    </div>
                </div>
                <!-- CUSTOMER DETAILS HEADER -->
                <div class="customer-details-header">
                    <h3 class="customer-details-title"> My Transactions </h3>
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
                                            Search Transactions
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

                                        <div class="row g-4">
                                            <div class="col-lg-12">
                                                <div v-if="loader">
                                                    <flight-loader />
                                                </div>
                                                <div v-else>
                                                    <div v-if="histories.length == 0">
                                                        <h4 class="text-center text-danger"> {{ noDataText }} </h4>
                                                    </div>
                                                    <div class="table-responsive" v-else>
                                                        <div class="col-md-12">
                                                            <!-- Conditionally render the text based on multiple pages -->
                                                            <span v-if="haveDefaultTransections && !multiplePages">Last 30 days
                                                                transactions:</span>
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
                                                                    <th scope="col">SL</th>
                                                                    <th scope="col">Date Time</th>
                                                                    <th scope="col">Invoice</th>
                                                                    <th scope="col">Booking ID</th>
                                                                    <th scope="col">PNR</th>
                                                                    <th scope="col">Ticket Number</th>
                                                                    <th scope="col">Description</th>
                                                                    <th scope="col">Credit</th>
                                                                    <th scope="col">Debit</th>
                                                                    <th scope="col">Running Balance</th>
                                                                    <th scope="col">Created By</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="(history, index) of paginatedHistories" :key="index"
                                                                    :class="[history.totalPrice > 0 && 'border-bottom-solid']">
                                                                    <td> {{ (currentPage - 1) * itemsPerPage + index + 1 }} </td>
                                                                    <td>{{ dateTime(history.created_at) }}</td>
                                                                    <td>{{ history?.invoice_number || '' }}</td>
                                                                    <td>{{ history?.booking_id || '' }}</td>
                                                                    <td>{{ history?.PNR || '' }}</td>
                                                                    <td>{{ (history?.ticket_numbers?.join(', \n') ?? '')
                                                                        }}</td>
                                                                    <td>{{ history?.note }}</td>
                                                                    <td
                                                                        :class="history.amount_type == 'added' && 'bg-success text-white'">
                                                                        {{ history.amount_type == 'added' &&
                                history.total_amount || '' }}</td>
                                                                    <td
                                                                        :class="history.amount_type == 'deduct' && 'bg-warning'">
                                                                        {{ history.amount_type == 'deduct' &&
                                                                        history.total_amount || '' }}</td>
                                                                    <td>{{ history?.running_balance }}</td>
                                                                    <td>{{ history?.created_by }}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!-- Conditionally render pagination based on the number of pages -->
                                                        <nav v-if="totalPages > 1">
                                                            <ul class="pagination">
                                                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="changePage(currentPage - 1)">Previous</a>
                                                                </li>
                                                                <li class="page-item" v-for="page in totalPages" :key="page"
                                                                    :class="{ active: currentPage === page }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="changePage(page)">{{ page }}</a>
                                                                </li>
                                                                <li class="page-item"
                                                                    :class="{ disabled: currentPage === totalPages }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="changePage(currentPage + 1)">Next</a>
                                                                </li>
                                                            </ul>
                                                        </nav>
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
    <!-- =================== CUSTOMER DETAILS END =========================== -->

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
            balance: 0,
            histories: [],
            start_date: '',
            currentPage: 1,
            itemsPerPage: 7,
            end_date: '',
            new_start_date: '',
            new_end_date: '',
            start_date_error: false,
            end_date_error: false,
            loader: false,
            isSubmit: false,
            pdfDownloadLoader: false,
            noDataText: 'No Data found!',
            haveDefaultTransections: false
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.histories.length / this.itemsPerPage)
        },
        paginatedHistories() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.histories.slice(start, end);
        },
        // Check if there are multiple pages
        multiplePages() {
            return this.totalPages > 1;
        }
    },
    mounted() {
        this.getBalance();
        this.getDefaultHistory();
        window.setTimeout(() => {
            this.rawJsSelect();
        }, 300);

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
        // Get last 30 days transactions history
        getDefaultHistory() {
            let url = `/my-balance-history`;
            this.loader = true;
            this.$axios
                .get(url)
                .then((res) => {
                    this.$log(res.data);
                    this.histories = res.data;
                    this.loader = false;
                    if (this.histories.length == 0) {
                        this.noDataText = 'No data found in last 30 days.';
                    } else {
                        this.haveDefaultTransections = true;
                    }
                })
                .catch((err) => {
                    this.$elog(err.response.data);
                    this.loader = false;
                });
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
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
                let url = `/my-balance-history?start_date=${this.new_start_date}&end_date=${this.new_end_date}`;
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
            let url = `/download-balance-history-pdf?start_date=${this.new_start_date}&end_date=${this.new_end_date}`;
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
            const date = new Date(dateString);
            // Extracting date parts
            const day = date.getUTCDate().toString().padStart(2, '0');
            const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
            const year = date.getUTCFullYear();

            // Extracting time parts
            let hours = date.getUTCHours();
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
            const formattedHours = hours.toString().padStart(2, '0');

            // Formatting the date and time
            return `${day}-${month}-${year} ${formattedHours}:${minutes} ${ampm}`;
        }


    },
};
</script>

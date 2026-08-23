<template>
  <div>
    <div class="flight-loader-wrapper" v-if="loader">
      <div class="flight-loader">
        <img src="/assets/images/preloader/loader.svg" alt="spinner">
        <h3 class="preloadewr-title">{{ progressText }}</h3>
      </div>
    </div>
    <MyBooking v-else />
  </div>
</template>

<script>
import MyBooking from "./index.vue";
export default {
  components: { MyBooking },
  data() {
    return {
      bookingData: {},
      progressText: 'Ticket booking in progress',
      loader: false,
      requestId: ''
    }
  },
  computed: {
    userData() {
      return {
        ...this.$store.state.userInfo,
      };
    },

  },
  mounted() {
    localStorage.removeItem("hotelCoupon");
    localStorage.removeItem("holidayCoupon");
    this.getQuery();
    this.getrequestId();
  },
  methods: {
    //get request id for trace from localstorage
    getrequestId() {
      let requestId = localStorage.getItem('requestId');
      this.requestId = requestId;
    },
    //1. First step of ticketing, here can get booking data from db
    async getQuery() {

      let query = this.$route.query;
      if (query?.booking_id) {
        this.loader = true;
        this.$axios
          .get(`/flight-booking/${query.booking_id}`)
          .then((res) => {
            //this.$log(res.data);
            if (res.data?.booking_data) {
              let segments = [];
              for (let dir of res.data?.booking_data?.directions) {
                segments = segments.concat(dir.segments);
              }
              let passengersData = [];
              res.data?.booking_data?.passengers.forEach((person, i) => {
                passengersData.push({
                  title: person.title,
                  lastName: person.last_name,
                  firstName: person.first_name,
                  passCountry: person.country_short_code || "BGD",
                  passNumber: person.passport_number,
                  passExpire: person.passport_expire,
                  birthDate: person.date_of_birth,
                  gender: person.gender,
                  ageCategory: person.ageCategory,
                });
              });

              const book = {
                segments,
                rule: "SIP",
                passengers: passengersData,
                phone: res.data?.booking_data?.primaryContact,
                allowWaitlist: true,
                requestId: this.requestId
              };
              this.bookingData = book;
              this.booking();

            }
          })
          .catch((err) => {
            this.$elog(err.response.data);

          });
      }
    },
    //2. This is second step to ticket booking 
    async booking() {
      let query = this.$route.query;
      try {
        const response = await this.$Api.post(
          "/air/book",
          this.bookingData
        );
        //this.$log(response.data[0].pnr)
        if (response?.data?.statusCode && response?.data?.name) {
          let errorText = response?.data?.name;
          let newErrorText = errorText.replace("AirRuntimeError.", "");
          this.$toast.warning(newErrorText);
          this.$router.push("/booking/flight");
          this.loader = false;
        }
        //console.log(response);
        // if b2b user & request only of reserve booking 
        if (query?.is_booking && query?.is_booking == 1) {
          let data = {
            ticket_data: {
              booking: response.data[0],
            }
          };
          let query = this.$route.query;
          // update booking data as reserved
          this.$axios
            .patch(`/flight-booking/${query.booking_id}`, data)
            .then((res) => {
              this.$log(res.data);
              if (res.status == 200) {
                this.$toast.success("Successfully Reserve Your Booking.");
                this.$router.push("/booking/flight");
                this.loader = false;
              }
            })
            .catch((err) => {
              this.$elog(err.response);
            });

        } else {

          this.ticketing(response.data[0].pnr, response.data[0]);
        }
        //this.$router.push("/booking/flight");
        //this.loader = false;
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
        this.loader = false;
      }
    },
    //3. ticket issue 
    async ticketing(pnr, booking) {
      this.progressText = 'Ticket issue in progress';
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
          this.loader = false;
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
          this.loader = false;
        }
        this.$elog("error in api");
        this.$elog(err?.response);
      }
    },

    //4. for getting all tickets
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
          this.loader = false;
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
        this.loader = false;
      }
    },

    //5. For stort ticket data to existing booking by update
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
            if (this.userData.customer_type == 'B2B') {
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

    //6. for sending ticket & invoice to email
    async sendTicket() {
      let query = this.$route.query;
      this.progressText = 'Sending ticket to your mail...';
      this.$axios.get(`/send-flight-titcket/${query.booking_id}`)
        .then((res) => {
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
    // If B2B user, then this function will be call, this is for b2b fund deduction update
    async b2bFundDeduction() {
      let query = this.$route.query;
      let body = {
        "flight_booking_id": query.booking_id,
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

    // Extra Function 
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
        this.getTickets(pnr, response.data[0]);

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

    // Extra Function
    // For getting single ticket data by ticket number
    async getTicket(ticketNumber, booking) {
      this.progressText = 'Retrieving ticket data';
      try {
        const response = await this.$Api.post(
          "/air/get-ticket",
          {
            ticketNumber,
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
        this.loader = false;
      }
    },

  },
}
</script>

<style></style>
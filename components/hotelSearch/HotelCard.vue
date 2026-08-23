<template>
    <div id="cart-bar" class="cart-bar">
        <div class="bg-danger w-100  position-relative">
            <button class="collase-btn" id="collase-btn" @click="buttonHandler" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <span v-if="collapsed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                        class="bi bi-chevron-double-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z" />
                        <path fill-rule="evenodd"
                            d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                    </svg>
                </span>
                <span v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                        class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                        <path fill-rule="evenodd"
                            d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </span>
                
            </button>
        </div>
        <div class="container collapse show" id="collapseExample">
            <div class="row">
                <div class="col-12">
                    <div class="rooms-selection-container">
                        <div class="rooms">
                            <div :class="['room', roomBox.room && 'selected']" v-for="(roomBox, rIndex) of rooms"
                                :key="rIndex">
                                <button class="delete" @click="deleteRoom(rIndex)">
                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="#fff"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.7124 11.8737L6.46981 7.63101L2.22717 11.8737L0.812954 10.4594L5.0556 6.2168L0.812954 1.97416L2.22717 0.559942L6.46981 4.80258L10.7124 0.559942L12.1267 1.97416L7.88402 6.2168L12.1267 10.4594L10.7124 11.8737Z"
                                            fill="#718096" />
                                    </svg>
                                </button>
                                <div v-if="!roomBox.room">Room {{ rIndex + 1 }}</div>
                                <div class="person-count"><span v-if="roomBox.person?.adt">{{ roomBox.person?.adt }}
                                        Adult<span v-if="roomBox.person?.child > 0">, {{ roomBox.person?.child }} Children
                                        </span> </span></div>
                                <div v-if="roomBox.room" class="hotel-name">{{ roomBox.room?.name }}</div>
                                <div v-if="roomBox.room" class="price">BDT {{ roomBox.room?.price?.toLocaleString() || '' }}
                                </div>
                            </div>

                        </div>

                        <div class="action">
                            <span>Total</span>
                            <!----><!---->
                            <span class="amount">
                                <span class="price-before-discount"> BDT {{ totalRoomPrice.regularPrice.toLocaleString() }}
                                </span>
                                <div class="main-price">BDT {{ totalRoomPrice.discountPrice.toLocaleString() }}</div>
                            </span>
                            <button @click="goTobooking" type="button" :disabled="roomIndex >= 0 && 'disabled'"
                                :class="['show-btn', roomIndex >= 0 && 'btn-disabled']">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HotelCard",
    data(){
        return {
            collapsed:false
        }
    
    },
    mounted() {
        this.getRooms();
        this.$store.dispatch('getLocalSelectedHotelRoom');
    },
    computed: {
        rooms() {
            return this.$store.state.hotelRoomSelect;
        },
        roomIndex() {
            return this.$store.getters.getCurrentRoom
        },
        totalRoomPrice() {
            return this.$store.getters.getTotalRoomPrice
        }
    },
    methods: {
        buttonHandler() {
            let divElement = document.getElementById('collase-btn');
            // Check if the div has a specific class
            if (divElement.classList.contains("collapsed")) {
               this.collapsed = true;
            } else {
                this.collapsed = false;
            }
        },
        goTobooking() {
            let isSubmit = true;
            for (let room of this.rooms) {
                if (!room?.room?.price) {
                    isSubmit = false;
                }
            }
            if (isSubmit) {
                if (!this.$auth.loggedIn) {
                    localStorage.setItem('previousPath', this.$route.fullPath)
                }
                localStorage.setItem('hotelSelectedRoom', JSON.stringify(this.rooms))
                this.$router.push('/hotel/booking');
            }

        },
        getRooms() {
            let rooms = [];
            if (this.$store.state.hotelSearch?.rooms) {
                for (let room of this.$store.state.hotelSearch?.rooms) {
                    rooms.push({
                        person: {
                            adt: room.adt,
                            child: room.child,
                        }
                    })
                }
            } else {
                rooms.push({
                    person: {
                        adt: 2,
                        child: 0
                    }
                })
            }
            this.$store.commit('hotelRoomSelect', rooms);
        },
        deleteRoom(index) {
            let rooms = [...this.$store.state.hotelRoomSelect];
            delete rooms[index].room;
            this.$store.commit('hotelRoomSelect', rooms);
        }
    }
}
</script>

<style></style>
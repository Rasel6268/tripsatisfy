<template>
  <div class="card-hotel">
    <vue-easy-lightbox
        escDisabled
        moveDisabled
        :visible="visible"
        :imgs="images"
        :index="index"
        @hide="handleHide"
    />
        <div class="row">
            <div class="col-lg-9">
            <div class="card-hotel-left-content">
                    <figure class="card-hotel-image cursor-pointer">
                        <img :src="mainImage.src" :alt="room.name" @click="openLightBox(mainImage.index)">
                    </figure>
                    <div class="nametag">
                        <div class="nametag-innner">
                            <h3 class="name">{{room.name}}</h3>
                            <div class="tags">
                                <ul class="tag-list">
                                    <li class="tag-list-item" v-for="(roomAmenity,rIndex) of room.amenities" :key="rIndex">
                                        <span class="icon">
                                            <img :src="roomAmenity.icon || iconUrlAlt" width="20px" height="20px" class="mt-1" alt="Icon" @error="iconUrlAlt" />        
                                        </span>
                                        <span class="text">{{roomAmenity.name}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
            </div>
            </div>
            <div class="col-lg-3">
                <div class="card-hotel-right-content">
                <p class="person">{{room.adult_capacity}} Adults <span v-if="room.child_capacity>0"> , {{room.child_capacity}} Child </span> </p>
                <p class="meal" v-if="room.has_breakfast"> Breakfast Included</p>
                <p class="refand"> <span v-if="!room.is_refundable"> Non - </span> Refundable</p>
                <button class="btn-off" v-if="room.discount_percentage>0">{{room.discount_percentage}}% OFF</button>
                <p class="price">
                    <del class="old">BDT  {{room.regular_price_per_night.toLocaleString() || ''}} </del>
                    <span class="new">BDT {{room.discount_price.toLocaleString() || ''}}/night</span>
                </p>
                <button v-if="roomIndex>=0" class="show-btn" @click="hotelRoomSelect">Choose Room {{parseInt(roomIndex)+1}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"SingleRoom",
    props:['room'],
    data(){
        return {
            visible: false,
            index: 0,
            images: [],
            mainImage:{
                index:0,
                src:"/assets/images/hotel/about-hotel.svg"
            }
        }
    },
    mounted(){
        this.imageRearrange();
    },
    computed:{
        roomImages(){
            return this.room?.room_images;
        },
        selectRooms(){
            return this.$store.state.hotelRoomSelect;
        },
        roomIndex(){
            return this.$store.getters.getCurrentRoom
        }
    },

    methods:{
        hotelRoomSelect(){
            let room = {
                price:this.room.regular_price_per_night,
                discount_price:this.room.discount_price,
                id:this.room.id,
                name:this.room.name,
                hotel:this.room.hotel
            };
            let selectRooms = [...this.selectRooms];
            selectRooms[this.roomIndex].room = room;
            //this.$log(selectRooms)
            this.$store.commit('hotelRoomSelect',selectRooms);
        },
        imageRearrange(){
            if(this.room?.room_images?.length > 0){
                let mainImage = {};
                for(let imgIndex in this.room?.room_images){
                    let image = this.room?.room_images[imgIndex];
                    if(image.is_main){
                        mainImage = {
                            index: parseInt(imgIndex),
                            src:image.image
                        }
                    }
                    this.images.push(image.image);
                }
                if(mainImage?.src){
                    this.mainImage = mainImage;
                }else{
                   this.mainImage = {
                        index:0,
                        src:this.room?.room_images[0].image
                    } 
                }

            }else{
                this.images.push("/assets/images/hotel/about-hotel.svg")
            }

        },
        openLightBox(i){
            this.visible = true;
            this.index = i;
        },
        handleHide() {
            this.visible = false
        },
        imageUrlAlt(event) {
            event.target.src = "/assets/images/hotel/about-hotel.svg";
        },
        iconUrlAlt(event){
            event.target.src = "/assets/images/default/heart.png";
        },
    }
}
</script>

<style>

</style>
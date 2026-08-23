<template>
    <div class="booking-tab">
        <div class="row gy-4"> 

            <!-- leaving going deparuire return -->
            <div class="col-12">
                <div class="row gy-4">
                    <div class="col-lg-4">
                        <div class="row gy-4 ">
                            <div class="col-12 pe-lg-1">
                                <div class="input-box rounded pe-lg-0">
                                    <label for="hotelCity" class="input-label">Enter city or Property</label>
                                    <div class="value-box">
                                        <input type="text" id="hotelCity" autocomplete="off" placeholder="City" class="input-field" v-model="keywords" @keyup="citySearch" @input="citySearch">
                                        <div class="dropdown-list">
                                            <div class="list-wrapper">
                                                <div class="list" v-for="cityData of allCity" :key="cityData.id" @mousedown="setCity(cityData)">
                                                    <div class="left">
                                                        <span class="small-name">{{cityData.name}}</span>
                                                        <span class="detail-name">{{cityData.country}}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <span class="full-name">{{country}}</span>
                                     <span class="text-danger full-name" v-if="errors.city"> City should not be empty! </span>
                                    

                                    <!-- dropdown  -->
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="row g-4">
                            <div class="col-lg-6 px-lg-0">
                                <div class="input-box left-box">
                                    <label for="hotelCheckin" class="input-label">Check-in Date</label>
                                    <date-picker
                                        id="hotelCheckin"
                                        class="input-field fullWidth"
                                        placeholder="DD/MM/YYYY"
                                        format="dd/MM/yyyy"
                                        v-model="checkInDate"
                                        @selected="checkInDateSelect"
                                        :disabledDates="disabledDates"
                                        :highlighted="highlighted"
                                     />
                                     <span class="text-danger small-text" v-if="errors.checkInDate"> Date should not be empty! </span>
                                </div>
                            </div>
                            <div class="col-lg-6 px-lg-0">
                                <div class="input-box right-box">
                                    <label for="hotelCheckout" class="input-label">Check-out Date</label>
                                    <date-picker
                                        id="hotelCheckout"
                                        class="input-field fullWidth"
                                        placeholder="DD/MM/YYYY"
                                        format="dd/MM/yyyy"
                                        v-model="checkOutDate"
                                        @selected="checkOutDateSelect"
                                        :disabledDates="disabledLastDates"
                                        :highlighted="highlighted"
                                     />
                                     <span class="text-danger small-text" v-if="errors.checkOutDate"> Date should not be empty! </span>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="row g-4">

                            <div class="col-lg-6 position-relative">
                                
                                <div :class="['input-box rounded guestroomdropdown', roomDropDown && 'bg-active']" @click="toggleGuestRoom">
                                    <label for="hotelRoom" class="input-label">Guests &amp; Room</label>
                                    <span> {{totalPerson()}} Persons </span>
                                    <span class="full-name">{{rooms.length}} Rooms</span> 

                                    
                                </div>
                                <div class="dropdown-item-content">
                                    <!-- selected  room -->
                                    <div class="rooms pt-2" v-for="(room,index) of rooms" :key="index">
                                        <div class="room" v-if="roomActive!=index" >
                                            <div class="left cursor-pointer" @click="setRoomActive(index)"> 
                                                <span class="room-number">Room {{index+1}}</span>
                                                <p><span class="adult">{{room.adt}} Adults</span> <span v-if="room.child > 0" class="child">, {{room.child}} Child</span></p>
                                            </div>
                                            <div class="right">
                                                <span v-if="rooms.length > 1" @click="removeRoom(index)">Remove</span>
                                            </div>
                                        </div>

                                        <div class="booking-room pt-1" v-else>
                                            <h4 class="booking-header">
                                            Room {{index+1}}
                                            <span v-if="rooms.length > 1" class="remove-room" @click="removeRoom(index)">Remove</span>
                                                </h4>
                                            <div class="booking-body ">
                                                <div class="counter-container">
                                                    <div class="single-counter">
                                                        <div class="top">
                                                                <div class="left">
                                                                    <span class="title">Adult</span>
                                                                    <span class="age">12+ Years</span>
                                                                </div>
                                                                <div class="right">
                                                                    <button @click="personDecrement('adt',index)">-</button>
                                                                    <span>{{room.adt}}</span>
                                                                    <button class="increament" @click="personIncrement('adt',index)">+</button>
                                                                </div> 
                                                        </div>
                                                        </div>
                                                    <div class="single-counter">
                                                        <div class="top">
                                                            <div class="left">
                                                                <span class="title">Child</span>
                                                                <span class="age">2-12 Years</span>
                                                            </div>
                                                            <div class="right">
                                                                <button @click="personDecrement('child',index)">-</button>
                                                                <span>{{room.child}}</span>
                                                                <button class="increament" @click="personIncrement('child',index)">+</button>
                                                            </div> 
                                                        </div>
                                                        <div class="bottom row">
                                                            <div class="col-md-6 pt-1" v-for="(age,i) of room.childAge" :key="i">
                                                                <div class="input-box2">
                                                                    <label class="input-label">Child {{i+1}} Age</label>
                                                                    <select class="input-field" v-model="room.childAge[i]">
                                                                        <option v-for="num of 12" :key="num" :value="num" :selected="age==num">{{num}}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- booking  -->
                                    

                                    <!-- another room -->
                                        <div class="another-buttons">
                                        <button class="another-btn" @click="addMoreRoom">
                                            <span class="icon">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.33301 9.66634V5.66634H0.333008V4.33301H4.33301V0.333008H5.66634V4.33301H9.66634V5.66634H5.66634V9.66634H4.33301Z" fill="#4A5568"/>
                                                </svg>   
                                            </span>
                                            <span>Add Another Room</span>
                                        </button>
                                        <button class="done" @click="toggleGuestRoom">Done</button>
                                        </div>
                                </div>
                                
                            </div>

                            <div class="col-lg-6">
                                <div class="btn-box">
                                    <button @click="hotelSearch" class="go-btn"> <span v-if="currentRoute=='/' || currentRoute=='/hotel'">Search Hotel</span> <span v-else> Modify Search </span> </button>
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
    name:"HotelTab",
    data(){
        return {
            keywords:"Cox's Bazar",
            city:"Cox's Bazar",
            country:'Bangladesh',
            checkInDate:'',
            checkOutDate:'',
            rooms:[
                {
                    adt: 2,
                    child: 0,
                    childAge:[],
                }
            ],
            roomActive:0,
            roomDropDown:false,
            errors:{
                city: false,
                checkInDate:false,
                checkOutDate:false
            },
            allCity:[],
            disabledDates: {
                to: new Date(Date.now() - 8640000)
            },
            disabledLastDates: {
                to: new Date(Date.now() - 8640000)
            },
            highlighted:{
                dates: [
                // your date
                new Date(Date.now())
                ]
            }
        }
    },
    mounted(){
        this.nextDay();
        this.queryToState();
    },
    computed:{
        currentRoute(){
            return this.$route.path;
        },
        
    },
    methods: {
        hotelSearch(){
            let queryString = '';
            let isSubmit = true; // flag for submission
             //city validation
             if(this.city == ''){
                isSubmit = false;
                this.errors.city = true;
             }else{
                queryString = `?city=${this.city}`;
             }
             // Country Validation
             if(this.country !== ''){
                queryString +=`&country=${this.country}`
             }
             // check in date validation
             if(this.checkInDate ==''){
                isSubmit = false;
                this.errors.checkInDate = true;
             }else{
                queryString += `&checkin=${this.$moment(this.checkInDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}`;
             }

              // check ou date validation
             if(this.checkOutDate ==''){
                isSubmit = false;
                this.errors.checkOutDate = true;
             }else{
                queryString += `&checkout=${this.$moment(this.checkOutDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}`;
             }

             // rooms validation
             let rooms = [];
             let ages = [];
             for(let room of this.rooms){
                rooms.push(`${room.adt}_${room.child}`)
                if(room.childAge.length>0){
                    ages.push(room.childAge.join('_'));
                }
                
             }
             queryString+=`&rooms=${rooms.join(',')}`;
             queryString+=`&child_age=${ages.join(',')}`;

            if(isSubmit){
                if(this.currentRoute == '/hotel/search'){
                    this.submitForSearch();
                }
                this.$router.push('/hotel/search'+queryString);
            } 
             
        },
        submitForSearch(){ 
            let rooms = [];
            if(this.rooms.length>0){
                for(let room of this.rooms){
                    rooms.push({
                        adt:room.adt,
                        child:room.child,
                        childAge: [...room.childAge]
                    });
                }
                
            }
            
            const data = {
                city:this.city,
                country:this.country,
                checkInDate: this.$moment(this.checkInDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                checkOutDate: this.$moment(this.checkOutDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
            }
            localStorage.setItem('hotelSearch',JSON.stringify(data));
            this.$store.commit('hotelSearch',{...data,rooms});
            this.$store.dispatch('getHotels')
        },
        citySearch(event){
            this.keywords = event.target.value;
            let queryString = `/cities?search=${this.keywords}`;
            this.$axios.get(queryString).then(res=>{
                this.allCity = res.data?.results || [];
            }).catch(err=>{
                this.$elog(err.response.data)
            })
        },
        setCity(data){
            this.city = data.name;
            this.country = data.country;
            this.keywords = data.name
        },
        addMoreRoom(){
            this.rooms.push({
                    adt: 2,
                    child: 0,
                    childAge:[],
                })
            this.roomActive++;
        },
        removeRoom(index){
            this.rooms.splice(index,1);
            if(this.roomActive>0){
                this.roomActive--;
            }
        },
        setRoomActive(index){
            this.roomActive = index;
        },
        personIncrement(type,index){
            if(type=='adt'){
                this.rooms[index].adt++;
            }else if(type=='child'){
                if(this.rooms[index].child<4){
                    this.rooms[index].child++;
                    this.rooms[index].childAge.push(2);
                }
            }
        },
        personDecrement(type,index){
            if(this.totalPerson() > 1){
                if(type=='adt'){
                    if(this.rooms[index].adt > 1){
                        this.rooms[index].adt--;
                    }
                }else if(type=='child'){
                    if(this.rooms[index].child > 0){
                        this.rooms[index].child--;
                        this.rooms[index].childAge.splice(-1);
                    } 
                }
            }
            
        },
        totalPerson(){
            let total = 0;
            for(let room of this.rooms){
                total+=room.adt;
                total+=room.child;
            }
            return total;
            
        },
        checkInDateSelect(date){
            window.setTimeout(()=>{
                this.disabledLastDates = {
                to: new Date( new Date(date) - 8640000),
                }
            },200);
            this.checkOutDate = "";
        },
       checkOutDateSelect(){
        
        this.errors.checkOutDate = false;
       },
       nextDay(){
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate())
            this.checkInDate = tomorrow
        },
        toggleGuestRoom() {
            let dropdown= document.querySelector('.dropdown-item-content')
            dropdown.classList.toggle('show');
           this.roomDropDown = !this.roomDropDown;
        },
        // Query string to convert state data
        queryToState(){
            let query = this.$route.query;
            let isSubmit = true;

            if(query.city){
                this.city = query.city;
                this.keywords = query.city;
            }else{
                isSubmit = false;
            }
            if(query.country){
                this.country = query.country;
            }else{
                isSubmit = false;
            }

            if(query.checkin){
                this.checkInDate = query.checkin;
            }else{
                isSubmit = false;
            }

            if(query.checkout){
                this.checkOutDate = query.checkout;
            }else{
                isSubmit = false;
            }

            if(query.rooms){
                let queryRooms = query.rooms.split(',');
                let rooms = [];

                if(queryRooms.length > 0){
                    let ages = [];
                    if(query.child_age){
                        let childAges = query.child_age.split(',');
                        if(childAges.length > 0){
                            for(let ageString of childAges){
                                ages.push(ageString.split('_'));
                            }
                        }
                    }
                    
                    let ageIndex = 0;
                    for(let room of queryRooms){
                        let p = room.split('_');
                        let childs =  parseInt(p[1]);
                        let childAge = [];
                        if(childs>0){
                            childAge = ages[ageIndex] || [];
                            ageIndex++;
                        }
                        rooms.push({
                            adt: parseInt(p[0]),
                            child: childs,
                            childAge,
                       });
                    }

                }else{
                    isSubmit = false;
                }

                this.rooms = [...rooms];
            }
            if(isSubmit){
                this.submitForSearch();
            }
        }
}
}
</script>

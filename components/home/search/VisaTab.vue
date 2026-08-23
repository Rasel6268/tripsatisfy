<template>
    <div class="booking-tab">
        <div class="row gy-4">
            <div class="col-lg-3  col-12 ">
                <div class="input-box rounded pe-lg-0" onclick="document.getElementById('country').focus(); return false;">
                    <label for="country" class="input-label">Country</label>
                    <div class="value-box">
                        <input type="text" id="country" placeholder="Enter Country" class="input-field" v-model="keywords" @keyup="countrySearch" autocomplete="off">
                            <!-- dropdown  start-->
                        <div class="dropdown-list">
                            <div class="list-wrapper">
                                <div class="list" v-for="cntry of allCountry" :key="cntry.id" @mousedown="setCountry(cntry)"> 
                                    {{cntry.name}} 
                                </div>
                            </div>
                        </div>
                            <!-- dropdown end -->
                    </div>
                    <span class="text-danger full-name" v-if="errors.country"> Empty field not allow! </span>

                    
                    
                </div>
            </div>
            <div class="col-lg-3 col-12 ">
                <div class="row g-4">
                    <div class="col-sm-6 px-lg-0">
                        <div class="input-box left-box">
                            <label for="dateofEntry" class="input-label">Date of Entry</label>
                            <date-picker
                                id="dateofEntry"
                                class="input-field"
                                placeholder="DD/MM/YYYY"
                                format="dd/MM/yyyy"
                                v-model="entryDate"
                                :disabledDates="disabledDates"
                                :highlighted="highlighted"
                                @selected="entryDateSelected"
                            />
                            <span class="text-danger small-text" v-if="errors.entryDate"> Date should not be empty! </span>
                        </div>
                    </div>
                    <div class="col-sm-6 px-lg-0">
                        <div class="input-box right-box">
                            <label for="hotelCheckout" class="input-label">Date of Exit</label>
                            <date-picker
                                id="dateofExit"
                                class="input-field"
                                placeholder="DD/MM/YYYY"
                                format="dd/MM/yyyy"
                                v-model="exitDate"
                                :disabledDates="disabledLastDates"
                                :highlighted="highlighted"
                                @selected="dateSelected"
                            />
                            <span class="text-danger small-text" v-if="errors.exitDate"> Date should not be empty! </span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col-lg-2 col-12">
                <div class="input-box rounded pe-lg-0" onclick="document.getElementById('nationality').focus(); return false;">
                    <label for="leaving" class="input-label">Nationality</label>
                    <div class="value-box">
                        <input type="text" id="nationality" placeholder="Enter Nationality" class="input-field" v-model="nationalityKeywords" @keyup="nationalitySearch" autocomplete="off">
                            <!-- dropdown  start-->
                        <div class="dropdown-list">
                            <div class="list-wrapper">
                                <div class="list" v-for="nation of nationalities" :key="nation.id" @mousedown="setNationality(nation)"> 
                                    {{nation.name}} 
                                </div>
                                
                            </div>
                        </div>
                            <!-- dropdown end -->
                    </div>
                    <span class="text-danger full-name" v-if="errors.nationality"> Empty field not allow! </span>

                    
                    
                </div>
            </div>   
            <div class="col-lg-2 col-12">
                <div class="input-box buttons rounded pe-lg-0 ">
                    <label for="travelar" class="input-label">Traveller</label>
                    <div class="value-box">
                        <span id="travelar"> {{traveller}} Persons </span>
                            <!-- dropdown  start-->
                        
                        <div class="incdec-buttons">
                            <button class="decrement" @click="travellerDecrement">-</button>
                            <button class="increament" @click="travellerIncrement">+</button>
                        </div>
                    </div>

                    
                    
                </div>
            </div>   
            <div class="col-lg-2 col-12">
                <div class="btn-box">
                    <button class="go-btn" @click="visaSearch">Search</button>
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
export default {
    name:"VisaTab",
    data(){
        return {
            keywords:'',
            nationalityKeywords:'',
            country:'',
            countryId:'',
            nationality:'',
            nationalityId:'',
            entryDate:'',
            exitDate:'',
            traveller:1,
            allCountry:[],
            nationalities:[],
            errors:{
                country: false,
                nationality:false,
                entryDate:false,
                exitDate:false,
                traveller:false,
            },
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
        visaSearch(){
            let queryString = '';
            let isSubmit = true; // flag for submission
             //country validation
             if(this.country == ''){
                isSubmit = false;
                this.errors.country = true;
             }else{
                queryString = `?country=${this.country}`;
             }
             // country Id validation
             if(this.countryId == ''){
                isSubmit = false;
                this.errors.country = true;
             }else{
                queryString += `&c_id=${this.countryId}`;
             }
             
             // nationality validation
             if(this.nationality == ''){
                isSubmit = false;
                this.errors.nationality = true;
             }else{
                queryString += `&nationality=${this.nationality}`;
             }
             // nationality Id validation
             if(this.nationalityId == ''){
                isSubmit = false;
                this.errors.nationality = true;
             }else{
                queryString += `&n_id=${this.nationalityId}`;
             }
             // entry date validation
             if(this.entryDate ==''){
                isSubmit = false;
                this.errors.entryDate = true;
             }else{
                queryString += `&entry=${this.$moment(this.entryDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}`;
             }
             // exit date validation
             if(this.exitDate ==''){
                isSubmit = false;
                this.errors.exitDate = true;
             }else{
                queryString += `&exit=${this.$moment(this.exitDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}`;
             }
             queryString += `&traveller=${this.traveller}`;
             
            if(isSubmit){
                 if(this.currentRoute == '/visa/search'){
                    this.submitForSearch();
                }
                this.$router.push('/visa/search'+queryString);
            } 
             
        },
        submitForSearch(){ 
            const data = {
                country:this.countryId,
                nationality:this.nationalityId,
                entryDate:this.entryDate,
                exitDate:this.exitDate,
                traveller:this.traveller,
            }
            this.$store.commit('visaSearch',data);
            this.$store.dispatch('getVisa')
        },
        countrySearch(event){
            this.keywords = event.target.value;
            let queryString = `/countries?search=${this.keywords}`;
            this.$axios.get(queryString).then(res=>{
                this.allCountry = res.data?.results || [];
               
            }).catch(err=>{
                this.$elog(err.response.status)
            })
        },
        setCountry(data){
            this.country = data.name;
            this.keywords = data.name;
            this.countryId = data.id;
            this.errors.country = false;
        },
        nationalitySearch(event){
        this.nationalityKeywords = event.target.value;
            let queryString = `/nationalities?search=${this.nationalityKeywords}`;
            this.$axios.get(queryString).then(res=>{
                this.nationalities = res.data?.results || [];
               
            }).catch(err=>{
                this.$elog(err.response.status)
            })
        },
        setNationality(data){
            this.nationality = data.name;
            this.nationalityKeywords = data.name;
            this.nationalityId = data.id;
            this.errors.nationality = false;
        },
        nextDay(){
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate())
            this.entryDate = tomorrow
        },
        travellerDecrement(){
            if(this.traveller > 1){
                this.traveller--;
            } 
        },
        travellerIncrement(){
            if(this.traveller < 30){
                this.traveller++;
            } 
        },
        entryDateSelected(date){
            window.setTimeout(()=>{
                this.disabledLastDates = {
                to: new Date( new Date(date) - 8640000),
                }
            },200);
            this.exitDate = "";
        },
        dateSelected(){
            this.errors.exitDate = false;
        },
        // Query string to convert state data
        queryToState(){
            let query = this.$route.query;
            let isSubmit = true;

            if(query.country){
                this.country = query.country;
                this.keywords = query.country;
            }else{
                isSubmit = false;
            }
            if(query.c_id){
                this.countryId = query.c_id;
            }else{
                isSubmit = false;
            }
            if(query.nationality){
                this.nationality = query.nationality;
                this.nationalityKeywords = query.nationality;
            }else{
                isSubmit = false;
            }
            if(query.n_id){
                this.nationalityId = query.n_id;
            }else{
                isSubmit = false;
            }
            if(query.entry){
                this.entryDate = query.entry;
            }else{
                isSubmit = false;
            }
            if(query.exit){
                this.exitDate = query.exit;
            }else{
                isSubmit = false;
            }
            if(query.traveller){
                this.traveller = query.traveller
            }else{
                isSubmit = false;
            }
            if(isSubmit){
                this.submitForSearch();
            }
        }
    }
}
</script>
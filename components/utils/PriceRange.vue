<template>
    <div>
        <div class="d-flex justify-content-between pb-4 mb-2">
            <span class="min-title">Minimum</span>
            <span class="min-title">Maximum</span>
        </div>
    <div class="track-container">
        <span class="range-value min"> 
            {{ minValue}} 
        </span>

        <span class="range-value max"> 
        {{ maxValue }}
        </span>
      <div class="track" ref="_vpcTrack"></div>
      <div class="track-highlight" ref="trackHighlight"></div>
      <button class="track-btn track1" ref="track1"></button>
      <button class="track-btn track2" ref="track2"></button>
    </div>
    </div>
</template>

<script>

export default {
  name: "PriceRange",

  props: ['options'],

  data() {
    return {
    
        minValue: 10,
        maxValue: 80,
      totalSteps: 0,
      percentPerStep: 1,
      trackWidth: null,
      isDragging: false,
      pos: {
        curTrack: null
      }
    
    }
  },
  computed:{
    min(){
        return  parseInt(this.options?.min || 1)
    },
    max(){
        return parseInt(this.options?.max || 100)
    },
    step(){
        return this.options?.step || 5 ;
    }

  },

  methods: {
    moveTrack(track, ev){
      
      let percentInPx = this.getPercentInPx();
      
      let trackX = Math.round(this.$refs._vpcTrack.getBoundingClientRect().left);
      let clientX = ev.clientX;
      let moveDiff = clientX-trackX;

      let moveInPct = moveDiff / percentInPx
      // this.$log(moveInPct)

      if(moveInPct<1 || moveInPct>100) return;
      let value = ( Math.round(moveInPct / this.percentPerStep) * this.step ) + this.min;
      if(track==='track1'){
        if(value >= (this.maxValue - this.step)){
            return;
        }else{
            if(this.minValue != value){
                this.minValue = value;
                this.returnRange()
            }
            
        } 
        
      }

      if(track==='track2'){
        if(value <= (this.minValue + this.step)){
             return;
        }else{
            if(this.maxValue != value){
                this.maxValue = value;
                this.returnRange()
            }
        }
        
      }
      
      this.$refs[track].style.left = moveInPct + '%';
      this.setTrackHightlight();
      // Data send to parent
        
    },
    returnRange(){
        this.$emit('rangeValue',{min: this.minValue, max: this.maxValue})
    },
    mousedown(ev, track){

      if(this.isDragging) return;
      this.isDragging = true;
      this.pos.curTrack = track;
    },

    touchstart(ev, track){
      this.mousedown(ev, track)
    },

    mouseup(ev, track){
      if(!this.isDragging) return;
      this.isDragging = false
    },

    touchend(ev, track){
      this.mouseup(ev, track)
    },

    mousemove(ev, track){
      if(!this.isDragging) return;      
      this.moveTrack(track, ev)
    },

    touchmove(ev, track){
      this.mousemove(ev.changedTouches[0], track)
    },

    valueToPercent(value){
      return ((value - this.min) / this.step) * this.percentPerStep
    },

    setTrackHightlight(){
      this.$refs.trackHighlight.style.left = this.valueToPercent(this.minValue) + '%'
      this.$refs.trackHighlight.style.width = (this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue)) + '%'
    },

    getPercentInPx(){
      let trackWidth = this.$refs._vpcTrack.offsetWidth;
      let oneStepInPx = trackWidth / this.totalSteps;
      // 1 percent in px
      let percentInPx = oneStepInPx / this.percentPerStep;
      
      return percentInPx;
    },

    setClickMove(ev){
      let track1Left = this.$refs.track1.getBoundingClientRect().left;
      let track2Left = this.$refs.track2.getBoundingClientRect().left;
      // this.$log('track1Left', track1Left)
      if(ev.clientX < track1Left){
        this.moveTrack('track1', ev)
      }else if((ev.clientX - track1Left) < (track2Left - ev.clientX) ){
        this.moveTrack('track1', ev)
      }else{
        this.moveTrack('track2', ev)
      }
    },

    defaultValueSet(){
        this.minValue = this.options?.minValue || this.options?.min ;
        this.maxValue = this.options?.maxValue || this.options?.max ;
    }
  },

  mounted() {
    this.defaultValueSet();
    // calc per step value
    this.totalSteps = (this.max - this.min) / this.step;

    // percent the track button to be moved on each step
    this.percentPerStep = 100 / this.totalSteps;
    // this.$log('percentPerStep', this.percentPerStep)

    // set track1 initilal
    document.querySelector('.track1').style.left = this.valueToPercent(this.minValue) + '%'
    // track2 initial position
    document.querySelector('.track2').style.left = this.valueToPercent(this.maxValue) + '%'
    // set initila track highlight
    this.setTrackHightlight()

    var self = this;

    ['mouseup', 'mousemove'].forEach( type => {
      document.body.addEventListener(type, (ev) => {
        // ev.preventDefault();
        if(self.isDragging && self.pos.curTrack){
          self[type](ev, self.pos.curTrack)
        }
      })
    });

    ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'].forEach( type => {
      document.querySelector('.track1').addEventListener(type, (ev) => {
        ev.stopPropagation();
        self[type](ev, 'track1')
      })

      document.querySelector('.track2').addEventListener(type, (ev) => {
        ev.stopPropagation();
        self[type](ev, 'track2')
      })
    })

    // on track clik
    // determine direction based on click proximity
    // determine percent to move based on track.clientX - click.clientX
    document.querySelector('.track').addEventListener('click', function(ev) {
      ev.stopPropagation();
      self.setClickMove(ev)
      
    })

    document.querySelector('.track-highlight').addEventListener('click', function(ev) {
      ev.stopPropagation();
      self.setClickMove(ev)
      
    })
  }
};
</script>

<style>

</style>

import Vue from 'vue'
import Datepicker from 'vuejs-datepicker'
Vue.component('date-picker', Datepicker);

import VueEasyLightbox from 'vue-easy-lightbox'
Vue.use(VueEasyLightbox);


import VueToastification from 'vue-toastification';
import 'vue-toastification/dist/index.css';
Vue.use(VueToastification);

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
Vue.component('VueSlider', VueSlider);

import GSigninButton from 'vue-google-signin-button'
Vue.use(GSigninButton)


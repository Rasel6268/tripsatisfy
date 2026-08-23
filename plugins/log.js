import Vue from 'vue'

// console log global handler
Vue.prototype.$log = (data) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(data)
    }
}
// Error log can be show in production mode
Vue.prototype.$elog = (data) => {
    console.log(data)
    /* if (process.env.NODE_ENV == 'production' && process.env.ERROR_CONSOLE) {
        console.log(data)
    } else {
        console.log(data)
    } */
}

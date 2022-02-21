import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import "./assets/css/tailwind.css"

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
// import {Vuespinners} from "@saeris/vue-spinners"

import {dollarFilter, percentegeFilter} from "./filters"

Vue.filter('dollar', dollarFilter)
Vue.filter('percentege', percentegeFilter)

Vue.use(Chartkick.use(Chart))
// Vue.use(Vuespinners)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

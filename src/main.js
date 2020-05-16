import Vue from 'vue'
import App from './App'
import loading from './components/loading/loading.vue'
import store from './store'
import http from './components/request/request'
Vue.config.productionTip = false
Vue.component('loading', loading)
Vue.prototype.$http = http
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()

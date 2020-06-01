import Vue from 'vue'
import App from './App'
import loading from './components/loading/loading.vue'
import store from './store'
import http from './components/request/request'
import mywater from './components/mywater/mywater.vue'
Vue.config.productionTip = false
Vue.component('loading', loading)
Vue.component('my-water', mywater)
Vue.prototype.$http = http
Vue.prototype.$store = store
function showLoading () {
  store.commit('request_show_loading');
}
function hideLoading () {
  store.commit('request_hide_loading');
}
Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();
App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()

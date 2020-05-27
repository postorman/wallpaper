import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
		/**
		 * 是否需要强制登录
		 */
    forcedLogin: false,
    hasLogin: false,
    userName: "",
    ip: 'http://wall.dreamnight.xyz',
    user: {},
    token: ""
  },
  getters: {
    getToken (state) {
      if (uni.getStorageSync("token")) {
        state.token = uni.getStorageSync("token")
 
      }
      return state.token
    },
  },
  mutations: {

    login (state, user) {
      state.user = user
      uni.setStorage({ key: 'user', data: user })
      uni.setStorage({ key: 'token', data: user.token })
      state.token = user.token
      console.log(state.token)
      state.hasLogin = true;
    },
    logout (state) {
      state.userName = "";
      state.hasLogin = false;
    }
  }
})

export default store

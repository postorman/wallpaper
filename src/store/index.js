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
    userName: '',
    ip: 'http://wall.dreamnight.xyz',
    user: {},
    token: ''
  },
  getters: {
    getToken (state) {
      if (uni.getStorageSync("TOKEN")) {
        state.token = uni.getStorageSync("TOKEN")
      }
      return state.token
    },
    getUser (state) {
      if (uni.getStorageSync("USER")) {
        state.user = uni.getStorageSync("USER")
      }
      return state.user
    },
  },
  mutations: {
    login (state, user) {
      state.user = user
      uni.setStorage({ key: 'USER', data: user })
      uni.setStorage({ key: 'TOKEN', data: user.token })
      state.token = user.token
      state.hasLogin = true;
    },
    logout (state) {
      state.userName = "";
      state.hasLogin = false;
    }
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
		/**
		 * 是否需要强制登录
		 */
    loading: false,
    forcedLogin: false,
    hasLogin: false,
    userName: '',
    ip: 'http://wall.dreamnight.xyz',
    user: {},
    token: '',
    screenWidth: ''
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
    getScreenWidth (state) {
      if (uni.getStorageSync("SCREENWIDTH")) {
        state.screenWidth = uni.getStorageSync("SCREENWIDTH")
      }
      return state.screenWidth
    },
  },
  mutations: {
    login (state, user) {
      state.user = user
      uni.setStorage({ key: 'USER', data: user })
      uni.setStorage({ key: 'TOKEN', data: user.token })
      state.token = user.token
      state.hasLogin = true
    },
    logout (state) {
      state.userName = "";
      state.hasLogin = false;
    },
    setScreenWidth (state, screenWidth) {
      state.screenWidth = screenWidth
      uni.setStorage({ key: 'SCREENWIDTH', data: screenWidth })
    },
    show_loading (state) {
      state.loading = true;
    },
    //隐藏请求加载动画
    hide_loading (state) {
      state.loading = false;
    }
  }
})

export default store

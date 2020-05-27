<template>
  <view class="content">
    <view v-if="hasLogin"
          class="hello">
      <view class="title">
        您好 {{userName}}，您已成功登录。
      </view>
      <view class="ul">
        <view>这是 uni-app 带登录模板的示例App首页。</view>
        <view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
      </view>
    </view>
    <view v-if="!hasLogin"
          class="hello">
      <view class="title">
        您好 游客。
      </view>
      <view class="ul">
        <view>这是 uni-app 带登录模板的示例App首页。</view>
        <view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  computed: mapState(['hasLogin', 'user']),
  onLoad () {
    if (!this.hasLogin) {
      uni.showModal({
        title: '未登录',
        content: '您未登录，需要登录后才能继续',
        /**
         * 如果需要强制登录，不显示取消按钮
         */
        showCancel: !this.forcedLogin,
        success: (res) => {
          if (res.confirm) {
            /**
             * 如果需要强制登录，使用reLaunch方式
             */
            if (this.forcedLogin) {
              uni.reLaunch({
                url: '../login/login'
              });
            } else {
              uni.navigateTo({
                url: '../login/login'
              });
            }
          }
        }
      });
    }
  },
  methods: {
    getType () {
      var that = this
      var token
      uni.getStorageSync({
        key: 'user',
        success: function (ress) {
          token = ress.data.token
          console.log(token)
        }

      })
      console.log(token)
      this.$http.httpTokenRequest({ method: 'GET', url: '/category/list', token: token }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          console.log(1);
          uni.showToast({
            icon: "success",
            title: "登陆成功",
          })
          that.$store.commit("login", res.data.data)
          uni.switchTab({
            url: "../main/main",
          })
        } else {
          uni.showToast({
            icon: "none",
            title: "登陆失败",
          })
        }
      }, error => { console.log(error); })
    }

  },
  mounted () {
    console.log(this.user)
    console.log(this.getType())
  }
}
</script>

<style>
.hello {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.title {
  color: #8f8f94;
  margin-top: 25px;
}

.ul {
  font-size: 15px;
  color: #8f8f94;
  margin-top: 25px;
}

.ul > view {
  line-height: 25px;
}
</style>

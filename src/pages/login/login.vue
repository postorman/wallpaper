<template>
  <view class="body">
    <view class="logo">
      <image src="~@/static/img/dreamwall-logo.png"></image>
    </view>
    <view class="main">
      <view class="login">
        <p class="login_title">
          登录
        </p>
      </view>
      <view class="form">
        <label class="login_input">
          <icon class="iconfont icon-yonghu"></icon>
          <input type="text"
                 v-model="iphone" />
        </label>
        <label class="login_input">
          <icon class="iconfont icon-mima"></icon>
          <input type="password"
                 v-model="password" />
        </label>
        <view class="register">还没有账号？ <navigator url="../reg/reg">立即注册</navigator>
        </view>
      </view>
      <view>
        <button class="login_button"
                @click="bindLogin()">登录</button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      password: "",
      iphone: "",
    };
  },
  computed: {

  },
  methods: {
    bindLogin () {
      var that = this
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      if (!/^1[3456789]\d{9}$/.test(this.iphone)) {
        uni.showToast({
          icon: "warn",
          title: "请输入正确手机号",
        });
        return;
      }
      if (this.password.length < 6) {
        uni.showToast({
          icon: "warn",
          title: "密码最短为 6 个字符",
        });
        return;
      }
      this.$http.httpRequest({ method: 'POST', url: '/login', data: { iphone: this.iphone, password: this.password } }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
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
    },
  },
  onReady () {
    // this.initPosition();
    // this.initProvider();
    // #ifdef MP-WEIXIN
    this.isDevtools = uni.getSystemInfoSync().platform === "devtools";

    // #endif
  },
};
</script>
<style lang="scss" scoped>
@import "@/static/icon/iconfont.css";
.body {
  width: 100vw;
}
.icon-mima {
  font-size: 70rpx;
}
.icon-yonghu {
  font-size: 70rpx;
}
.logo {
  margin: 20rpx auto;
  width: 500rpx;
  height: 500rpx;
}
.logo image {
  width: 100%;
  height: 100%;
}
.login {
  text-align: center;
  height: 20rpx;
}
.register {
  width: 100%;
  font-size: 30rpx;

  margin-bottom: 30rpx;
  text-align: center;
  display: flex;
  justify-content: center;
  navigator {
    color: #155ca6;
  }
}
.login_title {
  display: table;
  width: 100%;
  color: #e467b3;
  line-height: 40rpx;
  white-space: nowrap;
  border-spacing: 0.6rem 0;
  font-size: 50rpx;
}

.login_title::before,
.login_title::after {
  display: table-cell;
  content: "";
  width: 40%;
  background: linear-gradient(#d8d8d8, #d8d8d8) repeat-x center;
  background-size: 4rpx 4rpx;
}
.form {
  width: 70vw;
  margin: 0 auto;
}
.login_input {
  width: 70vw;
  display: flex;
  font-size: 40rpx;
  line-height: 40rpx;
  margin-top: 70rpx;

  align-items: center;
}

.login_input {
  input {
    width: 50vw;
    border: 1px solid #409eff;
    margin-left: 30rpx;
    padding: 10rpx;
    padding-left: 20rpx;
    border-radius: 20rpx;
    font-family: "Microsoft soft";
  }
}
.login_button {
  width: 75vw;
  height: 110rpx;
  background: #409eff;
  color: aliceblue;
}
</style>

<template>
  <div class="body">
    <div class="logo">
      <image src="/src/static/img/qq.png"></image>
    </div>
    <div class="main">
      <div class="login">
        <p class="login_title">
          登录
        </p>
      </div>
      <div class="form">
        <label class="login_input"><i class="iconfont icon-yonghu"></i><input type="text"
                 v-model="iphone" /></label>
        <label class="login_input"><i class="iconfont icon-mima"></i><input type="password"
                 v-model="password" /></label>
        <view class="register">还没有账号？ <navigator url="../reg/reg">立即注册</navigator>
        </view>
      </div>
      <div>
        <button class="login_button"
                @click="bindLogin()">登录</button>
      </div>
    </div>
  </div>
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
    // provider () {
    //   uni.getProvider({
    //     service: "oauth",
    //     success: function (res) {
    //       console.log(res);
    //       if (~res.provider.indexOf("qq")) {
    //         uni.login({
    //           provider: "qq",
    //           success: function (loginRes) {
    //             console.log(JSON.stringify(loginRes));
    //           },
    //         });
    //       }
    //       return res.provider;
    //     },
    //   });
    // },
  },
  methods: {
    bindLogin () {
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
      this.$http.httpRequest({        method: 'POST', url: '/login', data: {          iphone: this.iphone,
          password: this.password        }      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          uni.setStorage({
            key: 'user',
            data: res.data.data,
          })
          console.log(1);
          uni.showToast({
            icon: "success",
            title: "登陆成功",
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "登陆失败",
          });
        }
      }, error => { console.log(error); })
      uni.request({
        url: "/login", //仅为示例，并非真实接口地址。
        data: {
          iphone: this.iphone,
          password: this.password,
        },
        method: "POST",
        success: (res) => {
          console.log(res);
        },
      });
    },
    oauth (value) {
      uni.login({
        provider: value,
        success: (res) => {
          console.log(res);
          uni.getUserInfo({
            provider: value,
            success: (infoRes) => {
              console.log(infoRes);
              /**
               * 实际开发中，获取用户信息后，需要将信息上报至服务端。
               * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
               */
              this.toMain(infoRes.userInfo.nickName);
            },
            fail () {
              uni.showToast({
                icon: "none",
                title: "登陆失败",
              });
            },
          });
        },
        fail: (err) => {
          console.error("授权登录失败：" + JSON.stringify(err));
        },
      });
    },
    getUserInfo ({ detail }) {
      if (detail.userInfo) {
        this.toMain(detail.userInfo.nickName);
      } else {
        uni.showToast({
          icon: "none",
          title: "登陆失败",
        });
      }
    },
    toMain (userName) {
      this.login(userName);
      /**
       * 强制登录时使用reLaunch方式跳转过来
       * 返回首页也使用reLaunch方式
       */
      if (this.forcedLogin) {
        uni.reLaunch({
          url: "../main/main",
        });
      } else {
        uni.navigateBack();
      }
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
.main {
  margin-top: 70rpx;
}
i {
  font-size: 60rpx;
}
.icon-yonghu {
  font-size: 70rpx;
}
.logo {
  margin: 20rpx auto;
  background: coral;
  width: 400rpx;
  height: 400rpx;
}
.login {
  text-align: center;
  height: 20rpx;
}
.register {
  width: 100%;
  font-size: 30rpx;
  margin-top: 30rpx;
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

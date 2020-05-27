<template>
  <view class="body">
    <view class="main">
      <view class="register">
        <p class="register_title">
          注册
        </p>
      </view>
      <view class="form">
        <label for="">头&nbsp;&nbsp;&nbsp;像<image @click="chooseImage"
                 class="logo"
                 :src="form.headerUrl?form.headerUrl:'../../static/img/up-header.png'"></image>
        </label>
        <label class="register_input">手机号<input type="text"
                 v-model="form.iphone"></label>
        <label class="register_input">密&nbsp;&nbsp;&nbsp;码<input type="password"
                 v-model="form.password"></label>
        <label class="register_input">昵&nbsp;&nbsp;&nbsp;称<input type="text"
                 v-model="form.nickName"></label>
      </view>
      <view>
        <button class="register_button"
                @click="register">注&nbsp;&nbsp;&nbsp;册</button>
      </view>
    </view>
  </view>
</template>

<script>

export default {

  data () {
    return {
      form: {
        headerUrl: ""
      },

    }
  },
  computed: {
    ip () {
      return this.$store.state.ip
    }
  },
  methods: {
    chooseImage () {
      var that = this
      console.log(that.ip)
      uni.chooseImage({
        count: 1, //默认9
        success: function (res) {
          // const tempFile = res.tempFiles[0];
          const tempFilePath = res.tempFilePaths
          console.log(tempFilePath)

          uni.uploadFile({
            url: that.ip + '/upload/header', //仅为示例，非真实的接口地址
            filePath: tempFilePath[0],
            name: 'file',
            success: (res) => {
              var data = JSON.parse(res.data);
              if (data.code == 200) {
                uni.showToast({
                  title: '上传成功'
                })
                that.form.headerUrl = data.data
                console.log(that.headerUrl)
              } else {
                uni.showToast({
                  title: '上传失败'
                })
              }
            },
            fail: (res) => {
              console.log(res)
            }
          });
        }
      });
    },
    register () {
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      console.log(this.ip);
      if (!(/^1[3456789]\d{9}$/.test(this.form.iphone))) {
        uni.showToast({
          icon: 'none',
          title: '请输入正确手机号'
        });
        return;
      }
      if (this.form.password.length < 6) {
        uni.showToast({
          icon: 'none',
          title: '密码最短为 6 个字符'
        });
        return;
      }


      this.$http.httpRequest({ url: '/register', method: 'POST', data: this.form }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          uni.showToast({
            title: '注册成功'
          });
          uni.navigateBack({
            delta: 1
          });
        } else {
          uni.showToast({
            title: '注册失败'
          });
        }
      })
      // uni.request({
      //   url: this.ip + '/register',
      //   data: this.form,
      //   method: "POST",
      //   header: {
      //     "content-type": 'application/x-www-form-urlencoded'
      //   },
      //   success: (res) => {
      //     console.log(res);
      //     if (res.data.code === 200) {
      //       uni.showToast({
      //         title: '注册成功'
      //       });
      //       uni.navigateBack({
      //         delta: 1
      //       });
      //     } else {
      //       uni.showToast({
      //         title: '注册失败'
      //       });
      //     }


      //   }
      // })

    }
  },
  mounted () {
  }
}
</script>

<style>
.main {
  margin-top: 32rpx;
}
i {
  font-size: 60rpx;
}
.icon-yonghu {
  font-size: 70rpx;
}
.register {
  width: 100%;
  font-size: 40rpx;
  text-align: center;
}
.logo {
  margin-left: 60rpx;
  /* background: coral; */
  width: 350rpx;
  height: 350rpx;
}
.register {
  text-align: center;
  height: 20rpx;
}

.register_title {
  display: table;
  width: 100%;
  color: #e467b3;
  line-height: 40rpx;
  white-space: nowrap;
  border-spacing: 0.6rem 0;
  font-size: 50rpx;
}

.register_title::before,
.register_title::after {
  display: table-cell;
  content: "";
  width: 40%;
  background: linear-gradient(#d8d8d8, #d8d8d8) repeat-x center;
  background-size: 4rpx 4rpx;
}
.form {
  width: 80vw;
  margin: 0 auto;
  margin-top: 100rpx;
}
.register_input {
  width: 80vw;
  display: flex;
  font-size: 40rpx;
  line-height: 40rpx;
  margin: 50rpx auto;
  align-items: center;
}
.register_input input {
  width: 50vw;
  border: 1px solid #409eff;
  margin-left: 30rpx;
  padding: 10rpx;
  padding-left: 20rpx;
  border-radius: 20rpx;
  font-family: "Microsoft soft";
}

.register_button {
  width: 65vw;
  height: 110rpx;
  background: #409eff;
  color: aliceblue;
}
</style>

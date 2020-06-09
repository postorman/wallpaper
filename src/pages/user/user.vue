<template>
  <view class="content">
    <view class="user">
      <cover-image class="img"
                   @click="pause(user.headerUrl)"
                   @error="errorFunction($event)"
                   :src="user.headerUrl? user.headerUrl:'../../static/img/image-undfind.png'"></cover-image>
      <view>
        <view class="nick-name">
          {{user.nickName}}
        </view>
        <view class="iphone">
          {{user.iphone}}
        </view>
      </view>
      <view style="margin-left:30rpx">该模块待定</view>
    </view>
    <view>
      <navigator animation-type="pop-in"
                 animation-duration="300"
                 url="../../pagesIn/imageUp/imageUp">
        <view class="item">
          <icon class="iconfont icon-fabuxianxing"></icon>图片上传
        </view>
      </navigator>
      <navigator animation-type="pop-in"
                 animation-duration="300"
                 url="../../pagesIn/album/album">
        <view class="item">
          <icon class="iconfont icon-fabuxianxing"></icon>我的图库
        </view>
      </navigator>
      <view class="item">
        <icon class="iconfont icon-fabuxianxing"></icon>
        信息修改
      </view>
    </view>
    <view class="btn-row">
      <button v-if="!hasLogin"
              type="primary"
              class="primary"
              @tap="bindLogin">登录</button>
      <button v-if="hasLogin"
              type="default"
              @tap="bindLogout">退出登录</button>
    </view>
  </view>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapState(['user', 'forcedLogin'])
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapMutations(['logout']),
    bindLogin () {
      uni.navigateTo({
        url: '../login/login',
      });
    },
    pause (res) {
      uni.previewImage({
        current: this.res,
        urls: res,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function (data) {
            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function (err) {
            console.log(err.errMsg);
          }
        }
      });
    },
    bindLogout () {
      this.logout();
      /**
       * 如果需要强制登录跳转回登录页面
       */
      if (this.forcedLogin) {
        uni.reLaunch({
          url: '../login/login',
        });
      }
    },
    errorFunction () {
      this.user.headerUrl = '../../static/img/image-undfind.png'
    }
  }, mounted () {
    this.getUser()
  }
}
</script>
<style lang="scss">
.content .user {
  margin-top: 20rpx;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 10rpx;
  padding: 30rpx 50rpx;
  background: #fff;
  align-items: center;
  width: 80vw;
  .img {
    margin-right: 20rpx;
    height: 200rpx;
    width: 200rpx;
    border-radius: 20rpx;
  }
  .iphone {
    font-size: 24rpx;
    color: rgb(173, 166, 166);
    padding: 20rpx 0;
  }
  .nick-name {
    font-size: 48rpx;
    padding: 5rpx 0;
  }
}
.content .btn-row {
  width: 90%;
  margin-top: 50rpx;
  button {
    width: 100%;
    background: #155ca6;
    color: #fff;
    font-size: 48rpx;
  }
}
</style>
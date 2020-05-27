<template>
  <view id="scrollView">
    <view class="top">
      <scroll-view class="huadong"
                   scroll-x="true"
                   @scroll="scroll"
                   show-scrollbar="true"
                   :scroll-left="scrollLeft">
        <view v-for="(item,index) in type"
              :key="item.id"
              @tap="taps(index)">
          <view :class="currentTab == index ?'active':''"
                class="nav-item"> {{item.name}}</view>
        </view>
      </scroll-view>
    </view>
    <view class="waller">
      <swiper class="swiper"
              @change="change">
        <swiper-item>
          <view class="swiper-item uni-bg-red">A</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-green">B</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue">C</view>
        </swiper-item>
      </swiper>
      <view ref="col1">
        <view v-for="item in imgList1"
              :key="item.id"></view>
      </view>
      <view ref="col2">
        <view v-for="(item,index) in imgList2"
              :key="index"></view>
      </view>
    </view>
  </view>
</template>
<script>
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {
      isTop: 0,
      myScroll: '',
      type: [],
      navScrollLeft: 0,
      old: {},
      currentTab: '',
      screenWidth: '',
      scrollLeft: ''
    }
  },
  computed: mapState(['hasLogin', 'user']),
  onLoad () {
    var that = this
    uni.getSystemInfo({
      success (res) {
        console.log(res.brand) //手机牌子
        console.log(res.model) //手机型号
        that.screenWidth = res.screenWidth
        console.log(res.screenWidth) //屏幕宽度
        console.log(res.screenHeight) //屏幕高度
      }
    });
    if (!this.hasLogin) {
      uni.showModal({
        title: '未登录',
        content: '您未登录，需要登录后才能继续',
        /**
         * 如果需要强制登录，不显示取消按钮
         */
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
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > this.myScroll) {
      this.isTop = 1
    } else {
      this.isTop = 0
    }
  },
  methods: {
    taps (e) {
      this.currentTab = e;
    },
    change (e) {
      this.currentTab = e.detail.current
      this.scrollLeft = e.detail.current * this.screenWidth / 3
    },
    scroll: function () {
      // console.log(e)

      // var a = this.screenWidth / 3

      // this.currentTab = parseInt(e.detail.scrollLeft / a)
      // console.log(this.currentTab + "1111")
    },
    // selectCol () {
    //   var getHeight = (ref) => {
    //     return this.$refs[ref].offsetHeight
    //   }
    //   var height1 = getHeight('col1')
    //   var height2 = getHeight('col2')
    //   switch (Math.min(height1, height2)) {
    //     case height1:
    //       return 'dataList1'
    //       break
    //     case height2:
    //       return 'dataList2'
    //       break
    //   }
    // },
    getType () {
      var that = this
      this.$http.httpTokenRequest({ method: 'GET', url: '/category/list' }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          that.type = res.data.data
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
    this.getType()
    console.log('mounted 组件挂载完毕状态===============》');
    const query = uni.createSelectorQuery().in(this);
    query.select('#scrollView').boundingClientRect(data => {
      console.log("得到布局位置信息" + JSON.stringify(data));

      this.myScroll = data.top
    }).exec();
  }
}
</script>

<style lang="scss">
#scrollView {
  width: 100%;
}
.huadong {
  width: 100%;
  border-bottom: 1rpx solid #eeeeee;
  view {
    display: inline-block;
    width: 33.3vw;
    text-align: center;
  }
}
.top {
  line-height: 100rpx;
  width: 100%;
  overflow: hidden;
  padding: 20rpx;
  background: #fff;
  white-space: nowrap;
}
.nav-item.active {
  color: red;
}
.waller {
  display: flex;
  .swiper {
    width: 100vw;
  }
}
</style>

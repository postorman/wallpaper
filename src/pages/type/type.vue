<template>
  <view id="scrollView">
    <view class="top">
      <scroll-view class="huadong"
                   scroll-x="true"
                   @scroll="scroll"
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
      <swiper :style="{'height':swiperHeight+'px'}"
              :current="currentTab"
              @change="change">
        <swiper-item v-for="(item,index) in type"
                     :key="index">
          {{item.name}}
          {{item.total}}
          <my-water v-if="item.imageData"
                    :imgList="item.imageData"
                    @imgHeight="imgHeight"></my-water>
        </swiper-item>
      </swiper>
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
      scrollLeft: '',
      pageNo: 1,
      pageSize: 9,
      total: 0,
      swiperHeight: 500
    }
  },
  computed: mapState(['hasLogin', 'user']),
  onLoad () {
    this.getType()
    var that = this
    uni.getSystemInfo({
      success (res) {
        console.log(res.brand) //手机牌子
        console.log(res.model) //手机型号
        that.screenWidth = res.screenWidth
        that.$store.commit("setScreenWidth", res.screenWidth)
        console.log(res.screenWidth) //屏幕宽度
        console.log(res.screenHeight) //屏幕高度
      }
    });
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
    imgHeight (val) {
      console.log(val)
      if (this.swiperHeight < val) {
        this.swiperHeight = val
      }

    },
    getImage (type, i) {
      console.log(i)
      var that = this
      this.$http.httpTokenRequest({ method: 'POST', url: '/images/getNew/pageList', data: { 'categoryId': type, 'pageNo': that.pageNo, 'pageSize': that.pageSize } }).then(res => {
        if (res.data.code === 200) {
          that.$forceUpdate();
          that.type[i].imageData = res.data.data.records
          console.log(i, that.type[i].imageData)
          that.type[i].total = res.data.data.total

        } else if (res.data.code === 401) {
          uni.showToast({
            icon: "none",
            title: res.data.msg
          })
          setTimeout(function () {
            uni.navigateTo({
              url: '../login/login'
            })
          }, 1000)
        }
      })
    },
    taps (e) {
      this.currentTab = e;
    },
    change (e) {
      this.currentTab = e.detail.current
      // this.getImage(this.type[this.currentTab].id)
      this.scrollLeft = e.detail.current * this.screenWidth / 3
    },
    scroll: function () {
      // console.log(e)

      // var a = this.screenWidth / 3

      // this.currentTab = parseInt(e.detail.scrollLeft / a)
      // console.log(this.currentTab + "1111")
    },
    getType () {
      var that = this
      this.$http.httpTokenRequest({ method: 'GET', url: '/category/list' }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          that.type = res.data.data
          for (const i in that.type) {
            console.log(i)
            that.getImage(that.type[i].id, i)
          }
        } else {
          uni.showToast({
            icon: "none",
            title: "登陆失败"
          })
        }
      }, error => { console.log(error); })
    }
  },
  onShow () {

  },
  mounted () {
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
  background: #fff;
  white-space: nowrap;
}
.nav-item.active {
  color: red;
}
.waller {
  swiper {
  }
}
</style>

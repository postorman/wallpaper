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
                    :total="item.total"
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
      currentTab: 0,
      screenWidth: '',
      scrollLeft: '',
      pageNo: 1,
      pageSize: 6,
      total: 0,
      imageData: [],
      swiperHeight: 500,
      screenHeight: ''
    }
  },
  onReachBottom (e) {
    console.log(e + "触底", this.currentTab)
    if (this.type[this.currentTab].total !== this.type[this.currentTab].imageData.length) {
      this.pageNo++
      this.getImage(this.type[this.currentTab].id, this.currentTab, 1)
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
        that.screenHeight = res.screenHeight
        that.swiperHeight = res.screenHeight
        console.log(res.screenWidth) //屏幕宽度
        console.log(res.screenHeight) //屏幕高度
      }
    });
  },
  onPageScroll: function (e) {
    // console.log(e)
    if (e.scrollTop > this.myScroll) {
      this.isTop = 1
    } else {
      this.isTop = 0
    }
  },
  onShow () {

  },
  methods: {
    //未修改
    imgHeight (val) {
      console.log(val)
      if (val > 500) {
        this.swiperHeight = val
      } else {
        this.swiperHeight = this.screenHeight - 167
      }
    },
    getImage (type, i, more) {
      console.log(i, type)
      var that = this
      this.$http.httpTokenRequest({ method: 'POST', url: '/images/getNew/pageList', data: { 'categoryId': type, 'pageNo': that.pageNo, 'pageSize': that.pageSize } }).then(res => {
        if (res.data.code === 200) {
          var datas
          if (more == 0) {
            that.type[i].imageData = []
            that.$forceUpdate();
            datas = res.data.data.records
            console.log(datas)
            that.type[i].imageData = datas
            that.type[i].total = res.data.data.total
          } else {
            console.log(res.data.data.records)
            if (res.data.data.records.length > 0) {
              that.$forceUpdate();
              datas = that.type[i].imageData.concat(res.data.data.records)
              console.log(that.type)
              that.type[i].imageData = datas
              that.type[i].total = res.data.data.total
            } else {
              console.log("暂无更多数据")
            }

          }
        } else if (res.data.code === 401) {
          uni.showToast({
            icon: "none",
            title: res.data.msg
          })

        }
      })
    },
    taps (e) {
      console.log(e)
      this.currentTab = e;
    },
    change (e) {
      this.currentTab = e.detail.current
      // this.getImage(this.type[this.currentTab].id)
      this.pageNo = 1
      // if (!this.type[this.currentTab].imageData) {
      this.getImage(this.type[this.currentTab].id, this.currentTab, 0)
      // } else {    }
      setTimeout(() => {
        if (this.type[this.currentTab].imageData.length > 0) {
          this.pageNo = Math.ceil(this.type[this.currentTab].imageData.length / 6)
        }

      }, 1000);


      console.log(this.currentTab, this.type[this.currentTab])

      this.scrollLeft = e.detail.current * this.screenWidth / 4
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
          that.getImage(that.type[0].id, 0, 0)
        } else {
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
      }, error => { console.log(error); })
    }
  },
  mounted () {
    console.log('mounted 组件挂载完毕状态===============》');
    const query = uni.createSelectorQuery().in(this);
    query.select('#scrollView').boundingClientRect(data => {
      console.log("得到布局位置信息" + JSON.stringify(data));
      this.myScroll = data.top
      console.log("myScroll" + this.myScroll)
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
    width: 25vw;
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

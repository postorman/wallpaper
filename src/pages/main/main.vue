<template>
  <view class="content">
    <swiper class="swiper"
            indicator-dots="true"
            autoplay="true"
            interval="5000"
            duration="1500">

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
  </view>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {
      old: {
        scrollTop: 0,
        banner: ['../../static/img/image-undfind.png', '../../static/img/weixin.png', '../../static/img/image-undfind.png']
      }
    }
  },
  methods: {
    scroll: function (e) {
      console.log(e)
      this.old.scrollTop = e.detail.scrollTop
    },

  },
  computed: mapState(['forcedLogin', 'hasLogin', 'user']),
  mounted () {

  }
}
</script>

<style lang="scss">
.swiper {
  width: 100vw;
}
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

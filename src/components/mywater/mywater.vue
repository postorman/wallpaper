<template>
  <view>
    <view class="swiper-item">
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
export default {
  props: ["imgList"],
  data () {
    return {
      nowPage: 1,
      imgList2: [],
      imgList1: [],
      imgsArr: [],//数据列表
      over: false,//是否已经到底了
      lock: false,//请求锁
      rendering: false,//渲染中,防止渲染未完成高度获取不准确而导致可连续触发请求
      renderList: [],
    }
  }
  , methods: {
    selectCol () {
      var getHeight = (ref) => {
        return this.$refs[ref].offsetHeight
      }
      var height1 = getHeight('col1')
      var height2 = getHeight('col2')
      switch (Math.min(height1, height2)) {
        case height1:
          return 'dataList1'
          break
        case height2:
          return 'dataList2'
          break
      }
    },
  }

}
</script>

<style>
</style>
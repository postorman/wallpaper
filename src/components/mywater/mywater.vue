<template>
  <view>

    <scroll-view scroll-y="true"
                 :style="{'height':imgheight+'px'}"
                 class="water"
                 @scroll="scroll">
      <view v-if="imgList.length!==0"
            class="water">
        <view ref="col1"
              class="water-item">
          <view v-for="(item,index1) in imgList1"
                :key="index1">
            <image :src="item.url"
                   @load="onImageLoad"
                   @error="errorFunction($event,index1)"
                   mode="widthFix"></image>
            <view class="title">{{item.title}}</view>
          </view>
        </view>
        <view ref="col2"
              v-if="imgList2.length>0"
              :style="{'height':imgList2Height+total2*100+'px'}"
              class="water-item">
          <view v-for="(item,index2) in imgList2"
                :key="index2">
            <image :src="item.url"
                   @load="onImageLoad"
                   @error="errorFunction($event,index1)"
                   mode="widthFix"></image>
            <view class="title">{{item.title}}</view>
          </view>
        </view>
      </view>
      <view v-else>暂无数据</view>
    </scroll-view>
  </view>
</template>
<script>

export default {
  props: ["imgList"],
  data () {
    return {
      nowPage: 1,
      imgList2: [],
      imgList2Height: 0,
      imgList1: [],
      imgList1Height: 0,
      total1: 1,
      total2: 1,
      over: false,//是否已经到底了
      lock: false,//请求锁
      rendering: false,//渲染中,防止渲染未完成高度获取不准确而导致可连续触发请求
      renderList: [],
      screenWidth: 0,
      imageIndex: 0,
      imgheight: 0
    }
  },
  methods: {
    scroll () {

    },
    errorFunction (event, index) {
      console.log(event, index)
    },

    onImageLoad (e) {
      let divWidth = this.$store.getters.getScreenWidth / 2;			//显示的单栏宽度，我设为295rpx
      let oImgW = e.detail.width; //图片原始宽度
      let oImgH = e.detail.height; //图片原始高度
      let rImgH = divWidth * oImgH / oImgW;	//根据宽高比计算当前载入的图片的高度
      // if (rImgH > 600) {
      //   rImgH = 600;       //限制图片最高600rpx，可在css中添加 max-height:600rpx;
      // }

      if (this.imageIndex == 0) {
        this.imgList1Height += rImgH;	//第一张图片高度加到imgList1Height 
        this.imageIndex++;			//图片索引加1
        this.imgList2.push(this.imgList[this.imageIndex]);
        this.imgheight = this.imgList1Height + this.imgList1.length * 100	//添加第二张图片到imgList2数组，因为第一张已经初始化到左侧列表中
      } else {
        this.imageIndex++;		//图片索引加1
        if (this.imgList1Height > this.imgList2Height) {		//把图片的高度加到目前高度更低的栏中
          this.imgList2Height += rImgH;		//第二张图片高度加到imgList2Height 
        } else {
          this.imgList1Height += rImgH;
        }
        if (this.imageIndex < this.imgList.length) {				//根据目前的栏高，把下一张图片，push到低的那栏
          if (this.imgList1Height > this.imgList2Height) {
            this.imgList2.push(this.imgList[this.imageIndex]);
          } else {
            this.imgList1.push(this.imgList[this.imageIndex]);
          }
        } else {
          if (this.imgList1Height > this.imgList2Height) {
            console.log(this.imgList1Height, this.imgList2Height)
            this.$emit("imgHeight", this.imgList1Height + this.imgList1.length * 100)
            this.imgheight = this.imgList1Height + this.imgList1.length * 100
            console.log("imgList1HeightEnd")
          } else {
            console.log(this.imgList1Height, this.imgList2Height)
            this.$emit("imgHeight", this.imgList2Height + this.imgList2.length * 100)
            this.imgheight = this.imgList2Height + this.imgList2.length * 100
            console.log("imgList2HeightEnd")
          }
        }
      }
    },
    // selectCol (e) {
    //   // var getHeight = (ref) => {
    //   //   return this.$refs[ref].
    //   // }
    //   var height1 = getHeight('col1')
    //   var height2 = getHeight('col2')

    //   switch (Math.min(height1, height2)) {
    //     case height1:
    //       this.imgList1 = this.imgList1.concat(e)
    //       break
    //     case height2:
    //       this.imgList1 = this.imgList2.concat(e)
    //       break
    //   }
    // },
  },
  mounted () {
    var that = this
    console.log(this.imgList)
    if (this.imgList) {
      that.imgList1.push(this.imgList[0])
    }
  }
}
</script>

<style lang="scss">
.water {
  height: 100%;
  display: flex;
  justify-content: space-around;
  .water-item {
    width: 45vw;
    padding: 10rpx 0;
    > view {
      margin: 10rpx 0;
      border: 2px solid #eee;
    }
    image {
      width: 100%;
    }
    .title {
      height: 140rpx;
    }
  }
}
</style>
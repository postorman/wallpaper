<template>
  <view>
    <scroll-view scroll-y="true"
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
                   @tap="previewImage(item.url)"
                   @error="errorFunction($event,index1)"
                   mode="widthFix"></image>
            <view class="title">
              <view>{{item.title}}</view>
              <view>
                <icon @click="shoucang"
                      class="iconfont icon-shoucang"></icon>
              </view>
            </view>
          </view>
        </view>
        <view ref="col2"
              v-if="imgList2.length!==0"
              class="water-item">
          <view v-for="(item,index2) in imgList2"
                :key="index2">
            <image :src="item.url"
                   @load="onImageLoad"
                   @error="errorFunction2($event,index2)"
                   @tap="previewImage(item.url)"
                   mode="widthFix"></image>
            <view class="title">
              <view>{{item.title}}</view>
              <view>
                <icon @click="shoucang"
                      class="iconfont icon-shoucang"></icon>
              </view>
            </view>
          </view>
        </view>
        <view v-if="imgList2.length===0"
              class="water-item">
        </view>
      </view>
      <view v-else>暂无数据</view>
    </scroll-view>
    <view class="load-more"
          v-if="total!=0&&imgList.length!=total"
          @click="more">加载更多...</view>
    <view class="load-more"
          v-if="total===imgList.length&&total!==0"
          @click="more">暂无更多图片</view>
  </view>

</template>
<script>
export default {
  props: ["imgList", "total"],
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
      imgheight: 0,
      dta: []
    }
  },
  watch: {
    imgList (newVal, oldVal) {
      console.log(newVal, oldVal)
      if (newVal.length > 0) {
        if (newVal.length < oldVal.length) {
          //重新刷新了
          // this.imgList1Height = 0
          // this.imgList2Height = 0
          // this.imgList1 = []
          // this.imgList2 = []
          // this.imageIndex = 0
          // this.imgList1.push(this.imgList[this.imageIndex])
          this.imgList = oldVal
        } else {
          if (this.imgList1Height > this.imgList2Height) {
            this.imgList2.push(this.imgList[this.imageIndex])
          } else {
            this.imgList1.push(this.imgList[this.imageIndex])
          }
        }

      } else {
        console.log("没有数据了")
      }
    }
  },
  methods: {
    previewImage (image) {
      var imgArr = [];
      imgArr.push(image);
      //预览图片
      uni.previewImage({
        urls: imgArr,
        current: imgArr[0]
      });
    },
    scroll () {
    },
    errorFunction (event, index) {
      console.log(event, index)
      console.log(this.imgList1[index], this.imageIndex)
      this.imgList1[index].url = '../../static/img/image-undfind.png'
    },
    errorFunction2 (event, index) {
      console.log(event, index)
      console.log(this.imgList1[index], this.imageIndex)
      this.imgList2[index].url = '../../static/img/image-undfind.png'
    },
    onImageLoad (e) {
      let divWidth = this.$store.getters.getScreenWidth / 2;			//显示的单栏宽度，我设为295rpx
      let oImgW = e.detail.width; //图片原始宽度
      let oImgH = e.detail.height; //图片原始高度
      let rImgH = divWidth * oImgH / oImgW;	//根据宽高比计算当前载入的图片的高度
      if (this.imageIndex == 0) {
        this.imgList1Height += rImgH;	//第一张图片高度加到imgList1Height 
        this.imgheight = this.imgList1Height + this.imgList1.length * 70	//添加第二张图片到imgList2数组，因为第一张已经初始化到左侧列表中
        this.$emit("imgHeight", this.imgheight)
        if (this.imgList.length > 1) {
          this.imageIndex++;			//图片索引加1
          this.imgList2.push(this.imgList[this.imageIndex]);
        }
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
            this.$emit("imgHeight", this.imgList1Height + this.imgList1.length * 70) //70为title高度
            this.imgheight = this.imgList1Height + this.imgList1.length * 70
          } else {
            this.$emit("imgHeight", this.imgList2Height + this.imgList2.length * 70)
            this.imgheight = this.imgList2Height + this.imgList2.length * 70
          }
        }
      }
    },
  },
  mounted () {
    var that = this
    if (this.imgList) {
      that.imgList1.push(this.imgList[0])
    } else {
      this.$emit("imgHeight", 0)
    }
  }
}
</script>

<style lang="scss">
.load-more {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 40rpx;
  padding: 10rpx;
  text-align: center;
  background: rgb(238, 232, 232);
}
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
      icon {
        font-size: 60rpx;
      }
    }
  }
}
</style>
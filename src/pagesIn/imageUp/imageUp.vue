<template>
  <view class="content">
    <view>
      <view class="textarea">
        <view class="text-title">图片标题</view>
        <view class="text-note">
          <textarea @blur="bindTextAreaBlur"
                    placeholder="请输入标题" />
          </view>
        </view>
      <view class="item">
        <view class="">
          图片类别
        </view>
        <view >
          <picker mode="selector"
                  @change="bindPickerChange"
                  :value="name"
                  :range="type"
                  :range-key="'name'">
            <view class="picker-input">{{type[typeIndex].name}}</view>
          </picker>
        </view>
      </view>
      <view class="item">
        <view v-for=" (image,index) in imageList"
              :key="index">
          <cover-image class="img"
                       :src="image"
                       @tap="previewImage(index)"></cover-image>
        </view>
        <cover-image class="img"
                     src="../static/img/up-waller.png"
                     @click="upWaller"></cover-image>
      </view>
    </view>
    <view class="btn-bottom">
      <button @click="up">上传图片</button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      type: [],
      typeIndex: 0,
      imageList: [],
      title: ""
    }
  },
  computed: mapState(['ip']),
  methods: {
    bindTextAreaBlur (e) {
      this.title = e.detail.value
      console.log(e.detail.value)
    },
    bindPickerChange (e) {
      console.log('picker发送选择改变，携带值为', e.target)
      this.typeIndex = e.target.value
    },
    //图片预览
    previewImage: function (index) {
      uni.previewImage({
        current: index,
        urls: this.imageList
      })
    },
    getType () {
      var that = this
      this.$http.httpTokenRequest({ method: 'GET', url: '/category/list' }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          that.type = res.data.data
        } else {
          uni.showToast({
            icon: 'none',
            title: '登陆失败',
          })
        }
      }, error => { console.log(error); })
    },
    up () {
      console.log(this.title, this.imageList)
      var that = this
      if (!this.title) {
        uni.showToast({
          icon: 'none',
          title: '标题不能为空'
        })
        return false
      }
      if (!this.imageList) {
        uni.showToast({
          icon: 'none',
          title: '请上传图片'
        })
        return false
      }
      for (let i in this.imageList) {
        uni.uploadFile({
          url: that.ip + '/images/upload', //仅为示例，非真实的接口地址
          filePath: this.imageList[i],
          name: 'file',
          header: {
            token: uni.getStorageSync('TOKEN')
          },
          formData: {
            'categoryId': that.type[that.typeIndex].id,
            'title': this.title
          },
          success: (res) => {
            console.log(res)
            var data = JSON.parse(res.data);
            if (data.code == 200) {
              uni.showToast({
                title: res.msg
              })
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

    },
    upWaller () {
      var that = this
      console.log(that.ip)
      uni.chooseImage({
        success: function (res) {
          // const tempFile = res.tempFiles[0];
          console.log(res)
          const tempFilePath = res.tempFilePaths
          that.imageList = that.imageList.concat(res.tempFilePaths);
          console.log(tempFilePath)

        }
      });
    }
  }, mounted () {
    this.getType()
    console.log(this.type)
  }
}

</script>

<style lang="scss">
.img {
  margin-right: 20rpx;
  height: 250rpx;
  width: 250rpx;
  border-radius: 20rpx;
}
.picker-input {
  color: rgb(131, 131, 131);
}
.textarea {
  font-size: 36rpx;
  background: #fff;
  border: 1px solid #ddd;
  margin-top: 20rpx;
  border-radius: 10rpx;
  .text-title {
    padding: 10rpx;
    font-size: 48rpx;
  }
  .text-note {
    padding: 10rpx;
    textarea {
      width: 90%;
      height: 200rpx;
    }
  }
}
.btn-bottom {
  width: 100%;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
  button {
    width: 90%;
    background: #155ca6;
    color: #fff;
  }
}
</style>
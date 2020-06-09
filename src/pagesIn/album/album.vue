<template>
  <view class="content">
    <uni-popup ref="popup"
               type="dialog">
      <uni-popup-dialog type="input"
                        message="成功消息"
                        :duration="2000"
                        :before-close="true"
                        title="新建图库"
                        mode="input"
                        placeholder="图库名称"
                        @close="close"
                        @confirm="confirm"></uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="popup1"
               type="bottom"><button @click="delete1">删除</button><button @click="xiugai">更改</button></uni-popup>
    <view class="item"
          style="margin-top: 10px;">
      <view style="width:100vw"
            class="">
        图库
      </view>
    </view>
    <view class="album-main">
      <view v-if="folders"
            style="width:100vw">
        <view v-for=" (item,index) in folders"
              :key="index">
          <view class="album-li">
            <view>title1</view>
            <view>title1</view>
            <view @click="open1(item.id)">...</view>
          </view>
        </view>

      </view>
    </view>

    <view class="btn-bottom">
      <button @click="open">新建图库</button>
    </view>
  </view>
</template>

<script>
import { uniPopup } from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import { uniPopupDialog } from '@dcloudio/uni-ui/lib/uni-popup/uni-popup-dialog.vue'
import { mapState } from 'vuex'
export default {
  components: { uniPopup, uniPopupDialog },
  data () {
    return {
      type: [],
      typeIndex: 0,
      imageList: [],
      title: '',
      pageNo: 1,
      pageSize: 6,
      form: { folderName: '', status: 2, userId: '' },
      folders: [1],
      nowid: ''
    }
  },
  computed: mapState(['ip']),
  methods: {
    // xiugai (id) {
    // },
    open1 (id) {
      this.nowid = id
      this.$refs.popup1.open()
    },
    delete1 () {
      console.log(this.nowid)
      this.$http.httpTokenRequest({ method: 'GET', url: '/folder/delFolder/{' + this.nowid + '}' }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          uni.showToast({
            icon: 'success',
            title: res.data.data,
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      }, error => { console.log(error); })

    },
    /**
     * 点击取消按钮触发
     * @param {Object} done
     */
    close (done) {
      // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
      // ...
      done()
    },
    /**
     * 点击确认按钮触发
     * @param {Object} done
     * @param {Object} value
     */
    confirm (done, value) {
      // 输入框的值
      console.log(value)
      this.form.folderName = value
      this.form.userId = this.$store.getters.getUser.id
      console.log(this.form)
      this.createFolder()
      // TODO 做一些其他的事情，手动执行 done 才会关闭对话框
      // ...
      done()
    },
    open () {
      this.$refs.popup.open()
    },
    getFolders () {
      var that = this
      this.$http.httpTokenRequest({ method: 'GET', url: '/folder/getPersonFolders', data: { pageNo: this.pageNo, pageSize: this.pageSize, status: 2 } }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          that.type = res.data.data
        } else {
          uni.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      }, error => { console.log(error); })
    },
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
    createFolder () {
      this.$http.httpTokenRequest({ data: this.form, method: 'POST', url: '/folder/createFolder' }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          uni.showToast({
            icon: 'success',
            title: res.data.data,
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      }, error => { console.log(error); })
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
    this.getFolders()
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
.album-main {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  width: 80vw;
  padding: 30rpx 50rpx;
  background: #fff;
  font-size: 48rpx;
  border: 1px solid #ddd;
  border-radius: 10rpx;
}
.album-li {
  margin-top: 10rpx;

  height: 1/6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
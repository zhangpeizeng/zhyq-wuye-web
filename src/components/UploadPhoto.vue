<template>
  <div
    class="upload-photo-wrap"
    v-if="show"
  >
    <el-dialog
      title="上传照片"
      :before-close="onCloseDialog"
      :visible.sync="show"
      width="800px"
      :close-on-click-modal="false"
    >
      <div>
        <div style="margin-bottom:24px">
          <el-radio-group
            v-model="type"
            @change="changeType"
          >
            <el-radio-button :label="1">本地照片</el-radio-button>
            <el-radio-button :label="2">现场拍照</el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="type===1">
          <el-upload
            :headers="{Authorization:$store.getters.token}"
            :file-list="fileList"
            accept=".png,.jpg"
            :limit="1"
            action="/zhyq-admin/upload/uploadFile"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-success="onUploadSuccess"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="previewDialog" append-to-body>
            <img
              width="100%"
              :src="url"
              alt=""
            >
          </el-dialog>
          <el-alert
            show-icon
            :closable="false"
            title="建议上传： 200 * 200 尺寸图片，大小在 10M 以内"
            type="warning"
          />
        </div>
        <div v-show="type===2">
          <div
            class="flex"
            style="margin-bottom:24px"
          >
            <!--图片展示-->
            <video
              style="margin-right:24px"
              ref="video"
              width="320"
              height="240"
              autoplay
            ></video>
            <canvas
              v-if="showCanvas"
              ref="canvas"
              width="320"
              height="240"
            ></canvas>
          </div>
          <!--确认-->
          <el-button
            size="medium"
            type="primary"
            @click="callCamera"
          >开启摄像头</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="takePhoto"
          >拍照上传</el-button>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="medium"
          @click="onCloseDialog(1)"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this.show=>控制弹窗显示隐藏
// v-model=>双向绑定图片value
// this.type=>1-本地图片url 2-拍照base64
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      require: true
    },
    value: {
      type: String,
      default: '',
      require: true
    }
  },
  data () {
    return {
      previewDialog: false,
      type: 1,
      url: '',
      fileList: [],
      showCanvas: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 调用摄像头
    callCamera () {
      if (this.$refs.video && this.$refs.video.srcObject) {
        this.$message.warning('请勿重复开启摄像头')
        return
      }
      // H5调用电脑摄像头API
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then((success) => {
          // 摄像头开启成功
          this.$refs.video.srcObject = success
          // 实时拍照效果
          this.$refs.video.play()
        })
        .catch(() => {
          this.$message.warning('摄像头开启失败，请检查摄像头是否可用！')
        })
    },
    // 拍照
    takePhoto () {
      if (!this.$refs.video.srcObject) {
        this.$message.warning('请开启摄像头')
        return
      }
      const ctx = this.$refs.canvas.getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs.video, 0, 0, 320, 240)
      // 转base64格式、图片格式转换、图片质量压缩
      const imgBase64 = this.$refs.canvas
        .toDataURL('image/png', 0.7)
        .replace('data:image/png;base64,', '')
      this.uploadBase64(imgBase64)
      // 由字节转换为KB 判断大小
      // const str = imgBase64.replace('data:image/png;base64,', '')
      // const strLength = str.length
      // const fileLength = parseInt(strLength - (strLength / 8) * 2) // 图片尺寸  用于判断
      // const size = (fileLength / 1024).toFixed(2)
      // console.log(size) // 上传拍照信息  调用接口上传图片 .........
      // // 保存到本地
      // const ADOM = document.createElement('a')
      // ADOM.href = this.headImgSrc
      // ADOM.download = new Date().getTime() + '.png'
      // ADOM.click()
    },
    // 关闭摄像头
    closeCamera () {
      const stream = this.$refs.video.srcObject
      stream.getTracks().forEach((item) => {
        item.stop()
      })
      this.$refs.video.srcObject = null
    },
    changeType () {
      this.url = ''
      this.fileList = []
      const ctx = this.$refs.canvas
      const c = ctx.getContext('2d')
      c.clearRect(0, 0, ctx.width, ctx.height)
    },
    onCloseDialog (isOk) {
      if (isOk === 1) {
        if (!this.url) {
          this.$message.warning('请上传照片')
          return
        }
        this.$emit('change', this.url)
      }
      if (this.$refs.video && this.$refs.video.srcObject) {
        this.closeCamera()
      }
      this.url = ''
      this.fileList = []
      this.$emit('update:show', false)
    },
    onUploadSuccess (res, file) {
      this.url = res.responseData.url
    },
    onPreview (file) {
      this.previewDialog = true
    },
    async uploadBase64 (code) {
      var form = document.forms[0]
      var formData = new FormData(form)
      // 这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
      formData.append('file', convertBase64UrlToBlob(code), 'camera.png')
      // append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
      // 如果想base64转file后，给file命名，以一个固定的文件名上传，则可以使用
      // var formData = new FormData(form);   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
      // formData.append("file1",convertBase64UrlToBlob(frontFile.replace(/^data:image\/(png|jpg);base64,/,"")),"file1.png");  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
      const res = await this.$api.userApi.uploadBolb(formData)
      this.url = res.url
      function convertBase64UrlToBlob (urlData) {
        var bytes = window.atob(urlData) // 去掉url的头，并转换为byte
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], { type: 'image/png' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.upload-photo-wrap {
}
</style>

<template>
  <div class="door-white-edit">
    <el-page-header
      @back="$router.go(-1)"
      :content="isEdit?'修改人脸':'添加人脸'"
    >
    </el-page-header>
    <el-form
      ref="myForm"
      :model="query"
      :rules="rules"
      class="form-container"
      label-width="130px"
    >
      <div class="line-title">基本信息</div>
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input v-model="query.name" />
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="mobile"
      >
        <el-input v-model="query.mobile" />
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="idNumber"
      >
        <el-input v-model="query.idNumber" />
      </el-form-item>
      <div class="line-title">房屋信息</div>
      <el-form-item
        label="房间名称"
        prop="room"
      >
        <el-input v-model="query.room" />
      </el-form-item>
      <el-form-item
        label="详细地址"
        prop="address"
      >
        <el-input v-model="query.address" />
      </el-form-item>
      <el-form-item
        label="上传人脸"
        prop="faceUrl"
      >
        <el-image
          :src="query.faceUrl"
          v-if="query.faceUrl"
          :preview-src-list="[query.faceUrl]"
        />
        <div>
          <el-button
            icon="el-icon-upload"
            type="primary"
            size="medium"
            @click="showDialog=true"
          >
            {{ query.faceUrl?'重新上传':'上传人脸' }}
          </el-button>
        </div>
      </el-form-item>
      <!-- <el-form-item label="是否添加门禁卡">
        <el-switch
          v-model="query.accessEnable"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item> -->
      <el-form-item>
        <el-button
          icon="el-icon-back"
          @click="$router.go(-1)"
          size="medium"
        >
          返回
        </el-button>
        <el-button
          icon="el-icon-check"
          style="margin-left: 20px;"
          size="medium"
          type="primary"
          @click="submitForm('myForm')"
        >
          确认
        </el-button>
      </el-form-item>
    </el-form>
    <UploadPhoto
      v-model="query.faceUrl"
      :show.sync="showDialog"
    ></UploadPhoto>
  </div>
</template>

<script>
import UploadPhoto from '@/components/UploadPhoto'
export default {
  components: { UploadPhoto },
  data () {
    return {
      showDialog: false,
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        mobile: [{ required: true, message: '请输入联系方式' }],
        idNumber: [{ required: true, message: '请输入身份证号' }],
        room: [{ required: true, message: '请输入房间名称' }],
        address: [{ required: true, message: '请输入详细地址' }],
        faceUrl: [{ required: true, message: '请上传人脸图片' }]
      },
      id: undefined,
      isEdit: false,
      query: {
        name: '',
        mobile: '',
        idNumber: '',
        room: '',
        address: '',
        faceUrl: ''
        // accessEnable: 1
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.isEdit = true
      this.getDetail()
    }
  },
  methods: {
    async updateFace () {
      const res = await this.$api.doorApi.updateFace({
        ...this.query,
        id: this.id
      })
      if (res) {
        this.$message.success('修改成功~')
        this.$router.go(-1)
      }
    },
    async addFace () {
      const res = await this.$api.doorApi.addFace(this.query)
      if (res) {
        this.$message.success('添加成功~')
        this.$router.go(-1)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // update
            this.updateFace()
          } else {
            // new
            this.addFace()
          }
        } else {
          this.$message.error('请完善当前列表')
          return false
        }
      })
    },
    async getDetail () {
      const res = await this.$api.doorApi.getFaceDetail({ id: this.id })
      this.$set(this.query, 'name', res.name)
      this.$set(this.query, 'mobile', res.mobile)
      this.$set(this.query, 'idNumber', res.idNumber)
      this.$set(this.query, 'room', res.room)
      this.$set(this.query, 'address', res.address)
      this.$set(this.query, 'faceUrl', res.faceUrl)
      // this.$set(this.query, 'accessEnable', res.accessEnable)
    }
  }
}
</script>

<style scoped lang="scss">
.door-white-edit {
  width: 500px;
  margin-left: 40px;
}
.form-container {
  margin-top: 24px;
}
</style>

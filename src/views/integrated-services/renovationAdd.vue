<template>
  <div class="system-account-add">
    <el-page-header
      @back="$router.go(-1)"
      :content="title"
    >
    </el-page-header>
    <el-form
      ref="myForm"
      :model="query"
      class="form-container"
      label-width="130px"
    >
      <div class="line-title">房屋基础信息</div>
      <el-form-item
        label="房屋地址"
        prop="companyName"
      >
        {{ location }}
      </el-form-item>
      <el-form-item
        label="房屋类型"
        prop="companyName"
      >
        {{ roomType }}
      </el-form-item>
      <el-form-item
        label="房屋户型"
        prop="companyName"
      >
        未知
      </el-form-item>
      <el-form-item
        label="房屋面积"
        prop="companyName"
      >
        {{ buildArea }}㎡
      </el-form-item>
      <div class="line-title">装修信息</div>
      <el-form-item
        label="申请登记人"
        :required="true"
      >
        <el-input
          v-model="query.applicant"
        />
      </el-form-item>
      <el-form-item
        :required="true"
        label="预计装修日期"
      >
        <el-date-picker
          format="yyyy-MM-dd HH:mm:ss"
          :picker-options="expireTimeOption"
          v-model="contractExpiryTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="装修类型"
        :required="true"
      >
        <el-select
          v-model="query.decorateType"
          placeholder="请选择"
        >
          <el-option
            label="新房装修"
            value="1"
          />
          <el-option
            label="旧房改造"
            value="2"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="装修管理员"
        :required="true"
      >
        <el-input
          v-model="query.decorateManager"
        />
      </el-form-item>
      <el-form-item
        label="装修图纸"
        prop="companyImg"
      >
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
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="previewDialog">
          <img
            width="100%"
            :src="query.drawingUrl"
            alt=""
          >
        </el-dialog>
        <el-alert
          show-icon
          :closable="false"
          title="建议上传： 200 * 200 尺寸图片，大小在 10M 以内"
          type="warning"
        />
      </el-form-item>
      <el-form-item
        label="备注"
      >
        <el-input
          type="textarea"
          :rows="5"
          v-model="query.remark"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
      <div class="line-title">施工队负责人信息</div>
      <el-form-item
        :required="true"
        label="负责人身份证号"
      >
        <el-input
          v-model="query.bulidManagerIdcard"
        />
      </el-form-item>
      <el-form-item
        :required="true"
        label="负责人姓名"
      >
        <el-input
          v-model="query.bulidManager"
        />
      </el-form-item>
      <el-form-item
        label="负责人联系方式"
        :required="true"
      >
        <el-input
          v-model="query.bulidManagerPhone"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          icon="el-icon-back"
          @click="$router.go(-1)"
          size="mini"
        >
          返回
        </el-button>
        <el-button
          icon="el-icon-check"
          style="margin-left: 20px;"
          size="mini"
          type="primary"
          @click="submitForm('myForm')"
        >
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    getDictionaryValList
  } from '@/api/systemApi'

  export default {
    data () {
      return {
        expireTimeOption: {
          disabledDate (date) {
            // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return Date.now() - date.getTime() > 0
          }
        },
        title: '登记信息',
        fileList: [],
        roomTypeList: [],
        previewDialog: false,
        id: undefined,
        buildList: [],
        contractExpiryTime: null,
        query: {
          applicant: '', // 登记申请人
          decorateType: '', // 装修类型 1:新房装修；2:旧房改造
          startTime: '', // 装修开始时间
          endTime: '', // 装修结束时间
          decorateManager: '', // 装修管理员
          drawingUrl: '', // 装修图纸url
          remark: '', // 备注信息
          bulidManagerIdcard: '', // 施工负责人身份证
          bulidManager: '', // 施工负责人
          bulidManagerPhone: '', // 施工负责人电话
          roomId: ''
        },

        location: '',
        buildArea: '',
        roomType: ''
      }
    },
    created () {
      this.query.roomId = this.$route.query.roomId || ''
      this.location = this.$route.query.location || ''
      this.buildArea = this.$route.query.buildArea || ''
      this.roomType = this.$route.query.roomType || ''
      // this.getSelect()
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        this.title = '编辑装修信息'
        this.getDetail()
      }
      // //房间类型list
      // getDictionaryValList({typeCode: '5'}).then(res => {
      //   this.roomTypeList = res.data
      // })
    },
    methods: {
      /**
       * 建筑信息楼栋下拉框
       */
      getSelect () {
        this.$api.serviceApi.instanceRoomGetSelection({}).then(data => {
          this.buildList = this.getTreeData(data)
        })
      },
      getTreeData (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].children.length < 1) {
            // children若为空数组，则将children设为undefined
            data[i].children = undefined
          } else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].children)
          }
        }
        return data
      },
      submitForm () {
        if (!this.query.applicant) {
          this.$message.error('请输入申请登记人')
          return
        }
        if (!this.contractExpiryTime) {
          this.$message.error('请选择预计时间')
          return
        }
        if (!this.query.decorateType) {
          this.$message.error('请选择装修类型')
          return
        }
        if (!this.query.decorateManager) {
          this.$message.error('请输入装修管理员')
          return
        }
        if (!this.query.decorateManager) {
          this.$message.error('请输入负责人身份证')
          return
        }
        if (!this.query.bulidManager) {
          this.$message.error('请输入负责人姓名')
          return
        }
        if (!this.query.bulidManagerPhone) {
          this.$message.error('请输入负责人联系方式')
          return
        }
        this.query.startTime = this.contractExpiryTime[0]
        this.query.endTime = this.contractExpiryTime[1]
        if (!this.id) {
          this.$api.serviceApi.decorateRegisterInsert(this.query).then(res => {
            this.$router.go(-1)
          })
        } else {
          const params = { ...this.query }
          params.id = this.id
          this.$api.serviceApi.decorateRegisterUpdate(params).then(res => {
            this.$router.go(-1)
          })
        }
      },
      onUploadSuccess (res, file) {
        // this.$set(this.query, 'drawingUrl', res.responseData.url)
        this.query.drawingUrl = res.responseData.url
      },
      onPreview (file) {
        this.previewDialog = true
      },
      async getDetail () {
        this.$api.serviceApi.decorateRegisterGetDetail({ id: this.id }).then(res => {
          this.query.applicant = res.applicant
          this.query.decorateType = res.decorateType.toString()
          this.query.startTime = res.startTime
          this.query.endTime = res.endTime
          this.query.decorateManager = res.decorateManager
          this.query.drawingUrl = res.drawingUrl
          this.query.remark = res.remark
          this.query.bulidManagerIdcard = res.bulidManagerIdcard
          this.query.bulidManager = res.bulidManager
          this.query.bulidManagerPhone = res.bulidManagerPhone
          this.fileList.push({ url: res.drawingUrl })
          this.contractExpiryTime = [res.startTime, res.endTime]
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .system-account-add {
    width: 500px;
    margin-left: 40px;
  }

  .form-container {
    margin-top: 24px;

    .title {
      margin-bottom: 40px;
      font-weight: 600;
    }
  }
</style>

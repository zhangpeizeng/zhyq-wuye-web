<template>
  <div class="notice-add">
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
      <div class="line-title">基础信息</div>
      <el-form-item
        :required="true"
        label="公告标题"
      >
        <el-input
          placeholder="请输入不超过20个字的公告标题"
          v-model="query.title"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        :required="true"
        label="公告等级"
      >
        <el-select
          style="width: 100%"
          v-model="query.level"
          placeholder="请选择"
        >
          <el-option
            label="普通公告"
            value="0"
          />
          <el-option
            label="重要公告"
            value="1"
          />
          <el-option
            label="置顶公告"
            value="2"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :required="true"
        label="接收对象"
      >
        <el-radio v-model="query.receiver" label="1">物业员工</el-radio>
        <el-radio v-model="query.receiver" label="2">企业员工</el-radio>
        <el-radio v-model="query.receiver" label="3">企业法人</el-radio>
        <el-radio v-model="query.receiver" label="4">门户系统</el-radio>
        <el-radio v-model="query.receiver" label="5">所有</el-radio>

      </el-form-item>
      <el-form-item
        :required="true"
        label="大屏同步"
      >
        <el-radio v-model="query.syncScreen" label="1">是</el-radio>
        <el-radio v-model="query.syncScreen" label="0">否</el-radio>

      </el-form-item>
      <el-form-item
        :required="true"
        label="发送方式"
      >
        <el-radio v-model="query.publishMode" label="1">立即发送</el-radio>
        <el-radio v-model="query.publishMode" label="2">定时发送</el-radio>

      </el-form-item>
      <el-form-item
        :required="true"
        label="公告正文"
      >
        <tinymce
          v-model="query.content"
          :height="500"
          max-length="20"
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
  import Tinymce from '@/components/Tinymce'
  import {
    COMPANY_REGISTER_TYPES,
    COMPANY_TYPES,
    createAccount,
    updateAccount,
    getAccountDetail,
    getOrgList,
    getAllRoleList,
    formatTree
  } from '@/api/systemApi'

  export default {
    components: { Tinymce },
    data () {
      return {
        content: '',
        checkList: [],
        radio: '',
        expireTimeOption: {
          disabledDate (date) {
            // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return Date.now() - date.getTime() > 0
          }
        },
        title: '公告发布',
        orgOptions: [],
        registerTypeOptions: [...COMPANY_REGISTER_TYPES],
        typeOptions: [...COMPANY_TYPES],
        roleOptions: [],
        fileList: [],
        previewDialog: false,
        id: undefined,
        query: {
          title: '', // 标题
          level: '', // 等级
          receiver: '', // 接收人： 1:物业员工；2:企业员工；3：企业法人；4：；门户系统；5：所有
          syncScreen: '', // 是否同步大屏：0:不同步，1:同步
          publishMode: '', // 发布方式： 1：立即下发；2：定时发送
          content: ''// 内容
        }
      }
    },
    created () {
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        this.title = '编辑账号'
        this.getDetail()
      }
    },
    methods: {
      submitForm () {
        if (!this.query.title) {
          this.$message.error('请输入公告标题')
          return
        }
        if (!this.query.level) {
          this.$message.error('请选择公告等级')
          return
        }
        if (!this.query.receiver) {
          this.$message.error('请选择接收对象')
          return
        }
        if (!this.query.syncScreen) {
          this.$message.error('请选择是否大屏同步')
          return
        }
        if (!this.query.publishMode) {
          this.$message.error('请选择发送方式')
          return
        }
        if (!this.query.content) {
          this.$message.error('请输入公告正文')
          return
        }

        if (this.id) {
          const params = { ...this.query }
          params.id = this.id
          this.$api.serviceApi.announcementUpdate(params).then(res => {
            this.$router.go(-1)
            this.$message.success('编辑成功~')
          })
        } else {
          this.$api.serviceApi.announcementInsert(this.query).then(res => {
            this.$router.go(-1)
            this.$message.success('新增成功~')
          })
        }
      },
      onUploadSuccess (res, file) {
        this.$set(this.query, 'companyImg', res.responseData.url)
      },
      onPreview (file) {
        this.previewDialog = true
      },
      async getDetail () {
        this.$api.serviceApi.announcementGetDetail({ id: this.id }).then(res => {
          this.query.title = res.title
          this.query.level = res.level.toString()
          this.query.receiver = res.receiver.toString()
          this.query.syncScreen = res.syncScreen.toString()
          this.query.publishMode = res.publishMode.toString()
          this.query.content = res.content
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .notice-add {
    width: 1200px;
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

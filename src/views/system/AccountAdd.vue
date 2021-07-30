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
      :rules="rules"
      class="form-container"
      label-width="120px"
    >
      <div class="title">基础信息</div>
      <el-form-item
        label="企业图片"
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
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="previewDialog">
          <img
            width="100%"
            :src="query.companyImg"
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
        label="名称"
        prop="companyName"
      >
        <el-input v-model="query.companyName" />
      </el-form-item>
      <el-form-item label="法人">
        <el-input v-model="query.legalPerson" />
      </el-form-item>
      <el-form-item label="企业类型">
        <el-select
          v-model="query.companyType"
          placeholder="请选择企业类型"
        >
          <el-option
            v-for="(item, index) in typeOptions"
            :key="`center-${index}`"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="phoneNo"
      >
        <el-input v-model="query.phoneNo" />
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="query.idCard" />
      </el-form-item>
      <el-form-item
        label="注册地址类型"
        prop="registerAddressType"
      >
        <el-select
          v-model="query.registerAddressType"
          placeholder="请选择注册地址类型"
        >
          <el-option
            v-for="(item, index) in registerTypeOptions"
            :key="`center-${index}`"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="title">账号信息</div>
      <el-form-item
        label="账号"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
          maxlength="18"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="角色"
        prop="roleIds"
      >
        <el-select
          multiple
          v-model="query.roleIds"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in roleOptions"
            :key="`center-${index}`"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="账号服务期限"
        prop="contractExpiryTime"
      >
        <el-date-picker
          :picker-options="expireTimeOption"
          v-model="query.contractExpiryTime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="请选择"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="组织"
        prop="orgId"
      >
        <el-cascader
          clearable
          placeholder="请选择组织架构"
          v-model="query.orgId"
          :options="orgOptions"
          :props="{label:'orgName',children: 'childrens',value:'id',checkStrictly: true,emitPath:false}"
        ></el-cascader>
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
  data () {
    return {
      expireTimeOption: {
        disabledDate (date) {
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return Date.now() - date.getTime() > 0
        }
      },
      title: '创建账号',
      orgOptions: [],
      registerTypeOptions: [...COMPANY_REGISTER_TYPES],
      typeOptions: [...COMPANY_TYPES],
      roleOptions: [],
      fileList: [],
      previewDialog: false,
      rules: {
        companyImg: [{ required: true, message: '请上传企业图片' }],
        companyName: [{ required: true, message: '请输入企业名' }],
        phoneNo: [{ required: true, message: '请输入手机号' }],
        accountName: [
          { required: true, message: '请输入账号名' },
          {
            min: 5,
            max: 18,
            message: '长度在 5 到 18 个字符',
            trigger: 'blur'
          }
        ],
        roleIds: [{ type: 'array', required: true, message: '请选择角色' }],
        orgId: [{ required: true, message: '请选择组织' }],
        contractExpiryTime: [{ required: true, message: '请选择服务期限' }]
      },
      id: undefined,
      query: {
        companyName: '',
        phoneNo: '',
        legalPerson: '',
        companyType: '',
        idCard: '',
        registerAddressType: '',
        companyImg: '',
        accountName: '',
        roleIds: [],
        orgId: '',
        contractExpiryTime: ''
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.title = '编辑账号'
      this.getDetail()
    }
    this.getOrgList()
    this.getRoleList()
  },
  methods: {
    async updateAccount () {
      const res = await updateAccount({ ...this.query, id: this.id })
      if (res) {
        this.$message.success('修改成功~')
        this.$router.go(-1)
      }
    },
    async createAccount () {
      const res = await createAccount(this.query)
      if (res) {
        this.$message.success('添加成功~')
        this.$router.go(-1)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            // update
            this.updateAccount()
          } else {
            // new
            this.createAccount()
          }
        } else {
          this.$message.error('请完善当前列表')
          return false
        }
      })
    },
    onUploadSuccess (res, file) {
      this.$set(this.query, 'companyImg', res.responseData.url)
    },
    onPreview (file) {
      this.previewDialog = true
    },
    async getRoleList () {
      const res = await getAllRoleList({ roleSource: 1 })
      this.roleOptions = [...res]
    },
    async getOrgList () {
      const res = await getOrgList({ orgType: 1 })
      this.orgOptions = formatTree(res, 'id', 'parentOrgId', 'childrens')
    },
    async getDetail () {
      const res = await getAccountDetail({ id: this.id })
      this.$set(this.query, 'companyName', res.companyName)
      this.$set(this.query, 'phoneNo', res.phoneNo)
      this.$set(this.query, 'legalPerson', res.legalPerson)
      this.$set(this.query, 'companyType', res.companyType)
      this.$set(this.query, 'idCard', res.idCard)
      this.$set(this.query, 'registerAddressType', res.registerAddressType)
      this.$set(this.query, 'companyImg', res.companyImg)
      this.fileList.push({ url: res.companyImg })
      this.$set(this.query, 'accountName', res.accountName)
      this.$set(this.query, 'roleIds', res.roleIds)
      this.$set(this.query, 'orgId', res.orgId)
      this.$set(this.query, 'contractExpiryTime', res.contractExpiryTime)
      this.$set(this.query, 'accountId', res.accountId)
      this.id = res.id
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

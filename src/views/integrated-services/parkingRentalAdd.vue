<template>
  <div class="parking-rental-add">
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
      label-width="130px"
    >
      <div class="line-title">基本信息</div>
      <el-form-item
        label="所属园区"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="车位号"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="收费金额"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
          show-word-limit
        >
          <div slot="suffix">元</div>
        </el-input>
      </el-form-item>
      <el-form-item
        label="租赁方"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="车牌号码"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="车辆排量"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <div class="line-title">合同信息</div>
      <el-form-item
        label="合同编号"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="租户"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="签订日期"
        prop="accountName"
      >
        <el-date-picker
          v-model="query.accountName"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="法定代表"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>

      <el-form-item
        label="合同状态"
        prop="roleIds"
      >
        <el-select
          multiple
          v-model="query.roleIds"
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
        label="租期（月）"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="停租日期"
        prop="accountName"
      >
        <el-date-picker
          v-model="query.accountName"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="起租日期"
        prop="accountName"
      >
        <el-date-picker
          v-model="query.accountName"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="收费面积"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="保证金"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="中介费"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="是否收取租金"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="合同租金总额"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="每年组满递增"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        >
          <div slot="suffix">%</div>
        </el-input>
      </el-form-item>
      <el-form-item
        label="保证金说明"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
        />
      </el-form-item>
      <el-form-item
        label="上传附件"
        prop="accountName"
      >
        <el-upload
          class="upload-demo"
          :headers="{Authorization:$store.getters.token}"
          action="/zhyq-admin/upload/uploadFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="onUploadSuccessOne"
          :file-list="fileList">
          <el-button size="mini" type="primary">点击上传</el-button>
        </el-upload>
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
        title: '车位信息发布',
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
  .parking-rental-add {
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

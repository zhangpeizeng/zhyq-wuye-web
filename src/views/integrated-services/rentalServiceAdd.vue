<template>
  <div class="rental-add">
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
      <div class="line-title">主题信息</div>
      <el-form-item
        label="房屋类型"
        prop="companyName"
      >
        商业用房
      </el-form-item>
      <el-form-item
        label="房屋类型"
        prop="companyName"
      >
        商业用房
      </el-form-item>

      <el-form-item
        label="房屋面积"
        prop="companyName"
      >
        914㎡
      </el-form-item>
      <el-form-item
        label="房屋户型"
        prop="companyName"
      >
        未知
      </el-form-item>
      <div class="line-title">租赁信息内容</div>
      <el-form-item
        label="租赁类型"
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
        label="议价方式"
        prop="roleIds"
      >
        <el-select
          multiple
          v-model="query.roleIds"
          placeholder="请选择"
        >
          <el-option
            label="张三"
            value="1"
          />
          <el-option
            label="李四"
            value="2"
          />
          <!--          <el-option-->
          <!--            v-for="(item, index) in roleOptions"-->
          <!--            :key="`center-${index}`"-->
          <!--            :label="item.roleName"-->
          <!--            :value="item.id"-->
          <!--          />-->
        </el-select>
      </el-form-item>
      <el-form-item
        label="联系人称呼"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="accountName"
      >
        <el-input
          v-model="query.accountName"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        :required="true"
        label="信息描述"
      >
        <tinymce
          v-model="content"
          :height="500"
          max-length="20"
        />
      </el-form-item>
      <div class="line-title">图片信息</div>
      <el-form-item
        label="图片"
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
    components: {Tinymce},
    data() {
      return {
        expireTimeOption: {
          disabledDate(date) {
            // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return Date.now() - date.getTime() > 0
          }
        },
        title: '租赁信息发布',
        orgOptions: [],
        registerTypeOptions: [...COMPANY_REGISTER_TYPES],
        typeOptions: [...COMPANY_TYPES],
        roleOptions: [],
        fileList: [],
        previewDialog: false,
        rules: {
          companyImg: [{required: true, message: '请上传企业图片'}],
          companyName: [{required: true, message: '请输入企业名'}],
          phoneNo: [{required: true, message: '请输入手机号'}],
          accountName: [
            {required: true, message: '请输入账号名'},
            {
              min: 5,
              max: 18,
              message: '长度在 5 到 18 个字符',
              trigger: 'blur'
            }
          ],
          roleIds: [{type: 'array', required: true, message: '请选择角色'}],
          orgId: [{required: true, message: '请选择组织'}],
          contractExpiryTime: [{required: true, message: '请选择服务期限'}]
        },
        id: undefined,
        query: {
          content: '',
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
    created() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        this.title = '编辑账号'
        this.getDetail()
      }
      this.getOrgList()
      this.getRoleList()
    },
    methods: {
      async updateAccount() {
        const res = await updateAccount({...this.query, id: this.id})
        if (res) {
          this.$message.success('修改成功~')
          this.$router.go(-1)
        }
      },
      async createAccount() {
        const res = await createAccount(this.query)
        if (res) {
          this.$message.success('添加成功~')
          this.$router.go(-1)
        }
      },
      submitForm(formName) {
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
      onUploadSuccess(res, file) {
        this.$set(this.query, 'companyImg', res.responseData.url)
      },
      onPreview(file) {
        this.previewDialog = true
      },
      async getRoleList() {
        const res = await getAllRoleList({roleSource: 1})
        this.roleOptions = [...res]
      },
      async getOrgList() {
        const res = await getOrgList({orgType: 1})
        this.orgOptions = formatTree(res, 'id', 'parentOrgId', 'childrens')
      },
      async getDetail() {
        const res = await getAccountDetail({id: this.id})
        this.$set(this.query, 'companyName', res.companyName)
        this.$set(this.query, 'phoneNo', res.phoneNo)
        this.$set(this.query, 'legalPerson', res.legalPerson)
        this.$set(this.query, 'companyType', res.companyType)
        this.$set(this.query, 'idCard', res.idCard)
        this.$set(this.query, 'registerAddressType', res.registerAddressType)
        this.$set(this.query, 'companyImg', res.companyImg)
        this.fileList.push({url: res.companyImg})
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
  .rental-add {
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

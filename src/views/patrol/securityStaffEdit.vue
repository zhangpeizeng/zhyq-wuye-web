<template>
  <div class="staff-edit">
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
      <div class="line-title">保安信息</div>
      <el-form-item
        label="照片"
        prop="companyImg"
      >
        <el-image
          style="width: 100px; height: 100px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
          >
        </el-image>
      </el-form-item>
      <el-form-item
        label="姓名"
      >
        男三
      </el-form-item>
      <el-form-item
        label="性别"
      >
       男
      </el-form-item>
      <el-form-item
        label="证件号码"
      >
      1111
      </el-form-item>
      <el-form-item
        label="所属部门"
      >
        1111
      </el-form-item>
      <el-form-item
        label="联系电话"
      >
       1111
      </el-form-item>
      <el-form-item
        label="联系地址"
      >
       2222
      </el-form-item>
      <el-form-item
        label="描述"
      >
        1111
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
        title: '保安信息',
        id: undefined,
        query: {}
      }
    },
    created () {
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        this.title = '保安信息'
        this.getDetail()
      }
    },
    methods: {
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
  .staff-edit {
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

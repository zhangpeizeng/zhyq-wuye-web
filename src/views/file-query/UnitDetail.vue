<template>
  <div class="unit-detail">
    <el-page-header
      @back="$router.go(-1)"
      content="单位详情"
    >
    </el-page-header>
    <div class="pt20">
      <div class="line-title">
        基础信息
      </div>
      <div class="content">
        <el-row>
          <el-col :span="8"><div>单位名称: {{ info.companyName || '' }}</div></el-col>
          <el-col :span="8"><div>统一社会信用代码: {{ info.uscc || '' }}</div></el-col>
          <el-col :span="8"><div>治安管理单位: {{ info.securityManagementUnit || '' }}</div></el-col>
          <el-col :span="8"><div>经营方式: {{ info.businessType || '' }}</div></el-col>
          <el-col :span="8"><div>经济类型: {{ info.enterpriseCategoryName || '' }}</div></el-col>
          <el-col :span="8"><div>单位英文名称: {{ info.englishCompanyName || '' }}</div></el-col>
          <el-col :span="8"><div>单位英文缩写: {{ info.abbreviationsCompanyName || '' }}</div></el-col>
          <el-col :span="8"><div>行业类别: {{ info.industryCategoryName || '' }}</div></el-col>
          <el-col :span="8"><div>营业执照号: {{ info.registerNumber || '' }}</div></el-col>
          <el-col :span="8"><div>营业执照号有效期: {{ info.businessTermStart || '' }}</div></el-col>
          <el-col :span="8"><div>单位联系电话: {{ info.contactNumber || '' }}</div></el-col>
        </el-row>
      </div>
    </div>
    <div>
      <div class="line-title">
        经营关联房屋
      </div>
      <div class="content">
        <el-row :gutter="20">
          <el-col
            class="card"
            :span="7"
            v-for="(item, index) in info.roomLocationList"
            :key="index"
          >{{ item }}</el-col>
        </el-row>
      </div>
    </div>
    <div v-if="leaguePersonInfo !== null">
      <div class="line-title">
        负责人信息
      </div>
      <div class="content">
        <el-row>
          <el-col :span="8"><div>姓名: {{ info.leaguePersonInfo.name || '' }}</div></el-col>
          <el-col :span="8"><div>性别: {{ info.leaguePersonInfo.sexName || '' }}</div></el-col>
          <el-col :span="8"><div>证件类别: {{ info.leaguePersonInfo.idTypeName || '' }}</div></el-col>
          <el-col :span="8"><div>证件号码: {{ info.leaguePersonInfo.idNo || '' }}</div></el-col>
          <el-col :span="8"><div>国籍: {{ info.leaguePersonInfo.countryName || '' }}</div></el-col>
          <el-col :span="8"><div>联系电话: {{ info.leaguePersonInfo.phoneNo || '' }}</div></el-col>
          <el-col :span="8"><div>民族: {{ info.leaguePersonInfo.nationName || '' }}</div></el-col>
          <el-col :span="8"><div>出生日期: {{ info.leaguePersonInfo.birthDate || '' }}</div></el-col>
          <el-col :span="8"><div>籍贯: {{ info.leaguePersonInfo.nativePlaceAreaName || '' }}</div></el-col>
          <el-col :span="8"><div>人口登记类型: {{ info.leaguePersonInfo.populationRegisterTypeName || '' }}</div></el-col>
          <el-col :span="8"><div>政治面貌: {{ info.leaguePersonInfo.specialIdentityName || '' }}</div></el-col>
          <el-col :span="8"><div>婚姻状况: {{ info.leaguePersonInfo.maritalStatusName || '' }}</div></el-col>
          <!-- <el-col :span="8"><div>所在单位: {{ info.leaguePersonInfo.contactNumber || '' }}</div></el-col> -->
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import businessApi from '@/api/businessApi'
export default {
  data () {
    return {
      info: {}
    }
  },
  mounted () {
    this.getEnterpriseDetail()
  },
  methods: {
    getEnterpriseDetail () {
      const { id = '' } = this.$route.params
      businessApi.getEnterpriseDetail({ id: id }).then(res => {
        this.info = res
      })
    }
  }
}
</script>

<style  scoped lang="scss">
.unit-detail {
  .title {
    display: flex;
    align-items: center;
    .el-icon-caret-right {
      color: #197fff;
      font-size: 25px;
    }
  }
  .content {
    margin: 20px 0;
    width: 100%;
    padding: 20px;
    background-color: #F9F9F9;
    .el-col {
      margin-bottom: 10px;
    }
    .card {
      margin-top: 20px;
      margin-left: 20px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      border: 1px solid #BAD8FF;
      background-color: #F1F7FF;
    }
  }
}
</style>

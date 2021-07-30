<template>
  <div class="houses-detail">
    <el-page-header
      @back="$router.go(-1)"
      content="房屋详情"
    >
    </el-page-header>
    <div class="pt20">
      <div class="line-title">
        基础信息
      </div>
      <div class="content">
        <el-row>
          <el-col :span="8"><div>房屋地址: {{ info.location }}</div></el-col>
          <el-col :span="8"><div>房屋状态: {{ info.roomStatusName }}</div></el-col>
          <el-col :span="8"><div>使用状态: {{ info.usingStatusName }}</div></el-col>
          <el-col :span="8"><div>房屋类型: {{ info.roomTypeName }}</div></el-col>
          <el-col :span="8"><div>建筑面积: {{ info.buildArea }}㎡</div></el-col>
          <el-col :span="8"><div>重点房屋: {{ info.emphasisRoom }}</div></el-col>
          <el-col :span="8"><div>房屋类别: {{ info.roomCategoryName }}</div></el-col>
          <el-col :span="8"><div>房屋户型: {{ info.numberOfBedroom }}室{{ info.numberOfParlour }}厅{{ info.numberOfKitchen }}厨{{ info.numberOfToilet }}卫</div></el-col>
        </el-row>
      </div>
    </div>
    <div>
      <div class="line-title">
        房屋产权信息
      </div>
      <div class="content">
        <el-row>
          <el-col :span="20"><div>房屋产权证号: {{ info.propertyNo || '' }}</div></el-col>
        </el-row>
      </div>
    </div>
    <div v-if="info.houseTenantInfo !== null">
      <div class="line-title">
        承租人信息
      </div>
      <div class="content">
        <el-row>
          <el-col :span="8"><div>人员图片: {{}}</div></el-col>
          <el-col :span="8"><div>证件类型: {{ info.houseTenantInfo.idTypeName || '' }}</div></el-col>
          <el-col :span="8"><div>证件号码: {{ info.houseTenantInfo.idNo || '' }}</div></el-col>
          <el-col :span="8"><div>姓名: {{ info.houseTenantInfo.name || '' }}</div></el-col>
          <el-col :span="8"><div>性别: {{ info.houseTenantInfo.sexName || '' }}</div></el-col>
          <el-col :span="8"><div>联系电话: {{ info.houseTenantInfo.phoneNo || '' }}</div></el-col>
          <el-col :span="8"><div>国籍: {{ info.houseTenantInfo.countryName || '' }}</div></el-col>
          <el-col :span="8"><div>籍贯: {{ info.houseTenantInfo.nativePlaceAreaName || '' }}</div></el-col>
          <el-col :span="8"><div>人口登记类型: {{ info.houseTenantInfo.populationRegisterTypeName || '' }}</div></el-col>
          <el-col :span="8"><div>户口性质: {{ info.houseTenantInfo.householdNativeName || '' }}</div></el-col>
          <el-col :span="8"><div>户类型: {{ info.houseTenantInfo.householdTypeName || '' }}</div></el-col>
          <el-col :span="8"><div>户籍所在地: {{ info.houseTenantInfo.householdAddressName || '' }}</div></el-col>
          <el-col :span="8"><div>实际居住地: {{ info.houseTenantInfo.liveAddressName || '' }}</div></el-col>
        </el-row>
      </div>
    </div>
    <div v-if="info.enterprise !== null">
      <div class="line-title">
        单位信息
      </div>
      <div class="content">
        <el-row>
          <el-col :span="8"><div>单位名称: {{ info.enterprise.companyName || '' }}</div></el-col>
          <el-col :span="8"><div>统一社会信用代码: {{ info.enterprise.uscc || '' }}</div></el-col>
          <el-col :span="8"><div>治安管理单位: {{ info.enterprise.securityManagementUnit || '' }}</div></el-col>
          <el-col :span="8"><div>经营方式: {{ info.enterprise.businessType || '' }}</div></el-col>
          <el-col :span="8"><div>经济类型: {{ info.enterprise.enterpriseCategoryName || '' }}</div></el-col>
          <el-col :span="8"><div>单位英文名称: {{ info.enterprise.englishCompanyName || '' }}</div></el-col>
          <el-col :span="8"><div>单位英文缩写: {{ info.enterprise.abbreviationsCompanyName || '' }}</div></el-col>
          <el-col :span="8"><div>行业类别: {{ info.enterprise.industryCategoryName || '' }}</div></el-col>
          <el-col :span="8"><div>营业执照号: {{ info.enterprise.registerNumber || '' }}</div></el-col>
          <el-col :span="8"><div>营业执照号有效期: {{ info.enterprise.businessTermStart || '' }}</div></el-col>
          <el-col :span="8"><div>单位联系电话: {{ info.enterprise.contactNumber || '' }}</div></el-col>
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
    this.getRoomBindDetailById()
  },
  methods: {
    getRoomBindDetailById () {
      const { roomId = '' } = this.$route.params
      businessApi.getRoomBindDetailById({ roomId: roomId }).then(res => {
        this.info = res
      })
    }
  }
}
</script>

<style  scoped lang="scss">
.houses-detail {
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
  }
}
</style>

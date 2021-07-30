<template>
  <div class="rules-repair-order">
    <el-form
      ref="myForm"
      :model="query"
      class="form-container"
      label-width="140px"
    >
      <div class="line-title">物业费计价规则配置（计价规则：房屋面积 * 物业费单价 + 其他费用）</div>
      <el-form-item
        label="商业用房单价："
        prop="companyName"
      >
        <span>每平方&nbsp;</span>
        <el-input-number
          v-model="query.commercialRoomUnitPrice"
          :precision="2"
          :step="0.1"
          :min="0"
        ></el-input-number>
        <span>&nbsp;元/月</span>
        <span class="alert">请根据小区实际情况按房屋类型进行物业费单价配置，若小区不存在以下房屋类型，您可对不存在的房屋类型配置为：每平方0.00元/月</span>
      </el-form-item>
      <el-form-item
        label="其他费用："
        prop="companyName"
      >
        <el-input-number
          v-model="query.otherFees"
          :precision="2"
          :step="0.1"
          :min="0"
        ></el-input-number>
        <span>&nbsp;元/月</span>
        <span class="alert">请根据小区实际情况配置小区物业费内固定收取的其他费用，如小区公摊费用、垃圾清理费用等。若小区不存在此项费用的收取，您可直接配置为0.00元/月</span>
      </el-form-item>
      <el-form-item label="物业费计算范围：">
        <el-radio
          v-model="query.propertyFeeCalculationRange"
          :label="1"
        >已交房</el-radio>
        <el-radio
          v-model="query.propertyFeeCalculationRange"
          :label="2"
        >已登记</el-radio>
      </el-form-item>
      <div class="line-title">物业费账单账期配置</div>
      <el-form-item label="物业费计算范围：">
        <el-radio
          v-model="query.billingPeriod"
          :label="1"
        >1个月</el-radio>
        <el-radio
          v-model="query.billingPeriod"
          :label="2"
        >3个月</el-radio>
        <el-radio
          v-model="query.billingPeriod"
          :label="3"
        >6个月</el-radio>
        <el-radio
          v-model="query.billingPeriod"
          :label="4"
        >12个月</el-radio>
      </el-form-item>
      <el-form-item label="启用日期：">
        <el-date-picker
          :picker-options="expireTimeOption"
          v-model="query.enableDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="请选择"
        >
        </el-date-picker>
        <span class="alert">请准确配置账单的启用日期，当小区存在已出账的账单时则启用日期将无法配置</span>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-check"
          style="margin-left: 20px;"
          size="medium"
          type="primary"
          @click="submitForm('myForm')"
        >
          保存修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      expireTimeOption: {
        disabledDate (date) {
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return Date.now() - date.getTime() > 0
        }
      },
      query: {
        commercialRoomUnitPrice: 0,
        otherFees: 0,
        propertyFeeCalculationRange: 1,
        billingPeriod: 1,
        enableDate: ''
      }
    }
  },
  created () {
    this.getBillConfig()
  },
  methods: {
    async setBillConfig () {
      await this.$api.rulesApi.setBillConfig({ ...this.query })
          this.getBillConfig()
      this.$message.success('修改成功~')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setBillConfig()
        } else {
          this.$message.error('请完善当前列表')
          return false
        }
      })
    },
    async getBillConfig () {
      const res = await this.$api.rulesApi.getBillConfig()
      this.$set(this.query, 'commercialRoomUnitPrice', res.commercialRoomUnitPrice)
      this.$set(this.query, 'otherFees', res.otherFees)
      this.$set(this.query, 'propertyFeeCalculationRange', res.propertyFeeCalculationRange)
      this.$set(this.query, 'billingPeriod', res.billingPeriod)
      this.$set(this.query, 'enableDate', res.enableDate)
    }
  }
}
</script>

<style scoped lang="scss">
.rules-repair-order {
  margin-left: 40px;
}
.form-container {
  margin-top: 24px;
  .alert {
    margin-left: 24px;
    color: #999;
  }
}
</style>

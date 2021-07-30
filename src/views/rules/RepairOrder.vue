<template>
  <div class="rules-repair-order">
    <el-form
      ref="myForm"
      :model="query"
      class="form-container"
      label-width="100px"
    >
      <div class="line-title">工单工时费计费规则</div>
      <el-form-item
        label="工时单价"
        prop="companyName"
      >
        <el-input-number
          v-model="query.unitPrice"
          :min="10"
        ></el-input-number>
        <span>&nbsp;元/小时</span>
      </el-form-item>
      <div class="line-title">报修工单待确认提醒</div>
      <el-form-item label="提醒功能状态">
        <el-switch v-model="query.reminderStatus">
        </el-switch>
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
      query: {
        reminderStatus: undefined,
        unitPrice: 10
      }
    }
  },
  created () {
    this.getRepairOrderConfig()
  },
  methods: {
    async setRepairOrderConfig () {
      await this.$api.rulesApi.setRepairOrderConfig({ ...this.query })
      this.getRepairOrderConfig()
      this.$message.success('修改成功~')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setRepairOrderConfig()
        } else {
          this.$message.error('请完善当前列表')
          return false
        }
      })
    },
    async getRepairOrderConfig  () {
      const res = await this.$api.rulesApi.getRepairOrderConfig()
      this.$set(this.query, 'reminderStatus', res.reminderStatus)
      this.$set(this.query, 'unitPrice', res.unitPrice)
    }
  }
}
</script>

<style scoped lang="scss">
.rules-repair-order {
  width: 500px;
  margin-left: 40px;
}
.form-container {
  margin-top: 24px;
}
</style>

<template>
  <div class="rules-repair-order">
    <el-form
      ref="myForm"
      :model="query"
      class="form-container"
      label-width="100px"
    >
      <div class="line-title">访客到访验证配置</div>
      <el-form-item label="到访验证">
        <el-switch v-model="query.visitVerification">
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
        visitVerification: undefined
      }
    }
  },
  created () {
    this.getOtherConfig()
  },
  methods: {
    async setOtherConfig () {
      await this.$api.rulesApi.setOtherConfig({ ...this.query })
      this.getOtherConfig()
      this.$message.success('修改成功~')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setOtherConfig()
        } else {
          this.$message.error('请完善当前列表')
          return false
        }
      })
    },
    async getOtherConfig () {
      const res = await this.$api.rulesApi.getOtherConfig()
      this.$set(this.query, 'visitVerification', res.visitVerification)
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

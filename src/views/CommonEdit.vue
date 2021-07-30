<template>
  <div class="xxx-edit">
    <el-page-header
      @back="$router.go(-1)"
      content="编辑"
    >
    </el-page-header>
    <el-form
      ref="myForm"
      :model="query"
      :rules="rules"
      class="form-container"
      label-width="120px"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="query.username" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="query.name" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="query.email" />
      </el-form-item>
      <el-form-item
        label="所属研究中心"
        prop="center_id"
      >
        <el-select
          v-model="query.center_id"
          :disabled="isEdit"
          placeholder="请选择研究中心"
        >
          <el-option
            v-for="(item, index) in centerList"
            :key="`center-${index}`"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-back"
          @click="$router.go(-1)"
        >
          返回
        </el-button>
        <el-button
          icon="el-icon-check"
          style="margin-left: 20px;"
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
import { USER_ROLES } from '@/utils/variable'
export default {
  data () {
    return {
      centerList: [...USER_ROLES],
      query: {
        username: '',
        name: '',
        email: '',
        center_id: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        center_id: [{ required: true, message: '请选择研究中心' }]
      },
      id: undefined,
      isEdit: false
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.isEdit = true
      this.getAdminDetail(this.id)
    }
  },
  methods: {
    async getAdminDetail (id) {
      const res = await this.$api.adminDetail(id)
      if (res.data.center_id === 0) {
        res.data.center_id = ''
      }
      res.data.password = '********'
      this.query = res.data
    },
    async updateAdmin () {
      if (this.query.password === '********') {
        this.query.password = ''
      }
      await this.$api.adminEdit(this.id, this.form)
      this.$message.success('修改成功')
      this.$router.go(-1)
    },
    async addAdmin () {
      await this.$api.adminAdd(this.form)
      this.$message.success('添加成功')
      this.$router.go(-1)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            // update
            this.updateAdmin()
          } else {
            // new
            this.addAdmin()
          }
        } else {
          this.$message.error('请完善当前列表')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.xxx-edit {
  width: 500px;
  margin-left: 40px;
}
.form-container {
  margin-top: 24px;
}
</style>

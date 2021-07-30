<template>
  <div class="patrol-schedule-edit">
    <el-page-header
      @back="$router.go(-1)"
      :content="isEdit?'修改排班信息':'添加排班信息'"
    >
    </el-page-header>
    <el-form
      ref="myForm"
      :model="query"
      :rules="rules"
      class="form-container"
      label-width="160px"
    >
      <el-form-item
        label="排班名称"
        prop="scheduleName"
      >
        <el-input v-model="query.scheduleName" />
      </el-form-item>
      <el-form-item
        label="工作任务"
        prop="taskId"
      >

        <el-select
          v-model="query.taskId"
          placeholder="请选择"
        >
          <el-option
            v-for="(item,index) in taskOptions"
            :key="`task-${index}`"
            :label="item.taskName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="任务部门"
        prop="deptId"
      >
        <el-cascader
          @change="getDoerOptions"
          size="medium"
          clearable
          placeholder="请选择组织架构"
          v-model="query.deptId"
          :options="orgOptions"
          filterable
          :props="{label:'orgName',children: 'childrens',value:'id',checkStrictly: true,emitPath:false}"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        label="排班开始日期"
        prop="startDate"
      >
        <el-date-picker
          v-model="query.startDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="排班结束日期"
        placeholder="选择日期"
        prop="endDate"
      >
        <el-date-picker
          v-model="query.endDate"
          format="yyyy-MM-dd"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="执行人信息"
        prop="pmcPersonScheduleRelation"
      >
        <el-table
          stripe
          :data="query.pmcPersonScheduleRelation"
          style="width: 100%"
        >
          <el-table-column
            prop="personName"
            label="执行人"
          />
          <el-table-column
            prop="startTime"
            label="开始时间"
          />
          <el-table-column
            prop="endTime"
            label="结束时间"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="onDelDoer(scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div
          style="margin:12px 0"
          class="flex-end"
        >
          <el-button
            icon="el-icon-plus"
            style="margin-left: 20px;"
            type="success"
            size="mini"
            @click="showDialog = true"
          >
            添加执行人
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-back"
          @click="$router.go(-1)"
          size="medium"
        >
          返回
        </el-button>
        <el-button
          icon="el-icon-check"
          style="margin-left: 20px;"
          size="medium"
          type="primary"
          @click="submitForm('myForm')"
        >
          确认
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="添加执行人"
      @close="onCloseDialog"
      :visible.sync="showDialog"
      width="700px"
      :close-on-click-modal="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label require">执行人：</div>
          <div>
            <el-select
              v-model="add.personId"
              placeholder="请先选择部门"
            >
              <el-option
                v-for="(item,index) in doerOptions"
                :key="`doer-${index}`"
                :label="item.accountName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="flex">
          <div class="label require">开始时间：</div>
          <div>
            <el-time-picker
              v-model="add.startTime"
              format="HH:mm"
              value-format="HH:mm"
              range-separator="-"
              placeholder="请选择"
            >
            </el-time-picker>
          </div>
        </div>
        <div class="flex">
          <div class="label require">结束时间：</div>
          <div>
            <el-time-picker
              v-model="add.endTime"
              format="HH:mm"
              value-format="HH:mm"
              range-separator="-"
              placeholder="请选择"
            >
            </el-time-picker>
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="onAddDoer"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDialog: false,
      taskOptions: [],
      orgOptions: [],
      doerOptions: [],
      rules: {
        scheduleName: [{ required: true, message: '请输入排班名称' }],
        taskId: [{ required: true, message: '请选择任务名称' }],
        deptId: [{ required: true, message: '请选择任务部门' }],
        startDate: [{ required: true, message: '请选择排班开始日期' }],
        endDate: [{ required: true, message: '请选择排班结束日期' }],
        pmcPersonScheduleRelation: [
          { type: 'array', required: true, message: '请至少添加一个执行人' }
        ]
      },
      id: undefined,
      isEdit: false,
      query: {
        pmcPersonScheduleRelation: [],
        scheduleName: '',
        deptId: '',
        taskId: '',
        startDate: '',
        endDate: ''
      },
      add: {
        personName: '',
        personId: '',
        endTime: '',
        startTime: ''
      }
    }
  },
  created () {
    this.getTaskOptions()
    this.getOrgOptions()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.isEdit = true
      this.getDetail()
    }
  },
  methods: {
    onDelDoer (index) {
      this.query.pmcPersonScheduleRelation.splice(index, 1)
    },
    onAddDoer () {
      if (!this.add.personId || !this.add.endTime || !this.add.startTime) {
        this.$message.warning('请完善表单')
        return
      }
      if (
        Date.parse(`2021-01-01 ${this.add.endTime}`) -
          Date.parse(`2021-01-01 ${this.add.startTime}`) <=
        0
      ) {
        this.$message.warning('排班开始日期应早于排班结束日期')
        return
      }
      const name = this.doerOptions.find((item) => {
        return item.id === this.add.personId
      }).accountName
      this.$set(this.add, 'personName', name)
      this.query.pmcPersonScheduleRelation.push(this.add)
      this.showDialog = false
    },
    onCloseDialog () {
      this.add = {
        personName: '',
        personId: '',
        endTime: '',
        startTime: ''
      }
    },
    async updateSchedule () {
      const res = await this.$api.patrolApi.updateSchedule({
        ...this.query,
        id: this.id
      })
      if (res) {
        this.$message.success('修改成功~')
        this.$router.go(-1)
      }
    },
    async addSchedule () {
      const res = await this.$api.patrolApi.addSchedule(this.query)
      if (res) {
        this.$message.success('添加成功~')
        this.$router.go(-1)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // update
            this.updateSchedule()
          } else {
            // new
            this.addSchedule()
          }
        } else {
          this.$message.error('请完善当前列表')
          return false
        }
      })
    },

    async getDetail () {
      const res = await this.$api.patrolApi.getScheduleDetail({ id: this.id })
      this.$set(this.query, 'scheduleName', res.scheduleName)
      this.$set(this.query, 'deptId', res.deptId)
      this.$set(this.query, 'taskId', res.taskId)
      this.$set(this.query, 'startDate', res.startDate)
      this.$set(this.query, 'endDate', res.endDate)
      this.$set(
        this.query,
        'pmcPersonScheduleRelation',
        res.pmcPersonScheduleRelation
      )
      this.getDoerOptions()
    },
    async getTaskOptions () {
      const res = await this.$api.patrolApi.getTaskTableList({
        currentPage: 1,
        pageSize: 99999
      })
      this.taskOptions = [...res.data]
    },
    async getOrgOptions () {
      const res = await this.$api.userApi.getOrgList({ orgType: 1 })
      this.orgOptions = this.$api.userApi.formatTree(
        res,
        'id',
        'parentOrgId',
        'childrens'
      )
    },
    async getDoerOptions () {
      const res = await this.$api.userApi.getAccountList({
        orgId: this.query.deptId,
        currentPage: 1,
        pageSize: 99999
      })
      this.doerOptions = [...res.data]
    }
  }
}
</script>

<style scoped lang="scss">
.patrol-schedule-edit {
  width: 700px;
  margin-left: 40px;
}
.form-container {
  margin-top: 24px;
}
</style>

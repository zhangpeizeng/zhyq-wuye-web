<template>
  <div class="patrol-schedule-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-input
          v-model="query.scheduleName"
          size="medium"
          placeholder="请输入排班名称"
        ></el-input>
      </div>
      <div class="btn-wrap flex-between">
        <div>
          <el-button
            type="primary"
            @click="getList"
            size="medium"
            icon="el-icon-search"
          >查询</el-button>
          <el-button
            @click="onReset"
            size="medium"
            icon="el-icon-refresh"
          >重置</el-button>
        </div>
        <el-button
          type="success"
          @click="$router.push({name:'patroScheduleEdit'})"
          size="medium"
          icon="el-icon-plus"
        >新增</el-button>
      </div>
    </div>
    <div class="content-wrap">
      <el-table
        stripe
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="scheduleName"
          label="排班名称"
        />
        <el-table-column
          prop="taskName"
          label="工作任务"
        />
        <el-table-column
          prop="deptName"
          label="任务部门"
        />
        <el-table-column
          prop="address"
          label="执行周期"
        />
        <el-table-column
          prop="address"
          label="执行人1"
        />
        <el-table-column
          prop="address"
          label="执行时间"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="text"
              @click="onDel(scope.row.id)"
            >删除</el-button>
            <el-button
              type="text"
              size="medium"
              @click="$router.push({name:'patroScheduleEdit',query:{id:scope.row.id}})"
            >编辑</el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="table-empty">
            <img
              src="@/assets/empty.png"
              alt=""
            >
            <div class="text1">暂无数据</div>
            <div class="text2">没有搜到您想要的内容</div>
          </div>
        </template>
      </el-table>
      <el-pagination
        style="margin-top:24px"
        @size-change="getList"
        @current-change="getList"
        :current-page.sync="query.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total.sync="query.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      query: {
        scheduleName: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    onReset () {
      this.query = {
        scheduleName: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
    async getList () {
      const res = await this.$api.patrolApi.getScheduleList(this.query)
      this.list = [...res.data]
      this.query.total = +res.total
    },
    async onDel (id) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$api.patrolApi.delSchedule({ id })
          if (res) {
            this.$message.success('删除成功~')
            this.getList()
          }
        })
        .catch(() => {})
    }
  },
  mounted () {
    document.onkeydown = (e) => {
      if (
        e.keyCode === 13 &&
        document.body.getElementsByClassName('patrol-schedule-list')[0]
      ) {
        this.getList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.patrol-schedule-list {
  width: 100%;
}
</style>

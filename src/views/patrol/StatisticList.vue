<template>
  <div class="patrol-statistic-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-time-picker
          v-model="query.startTime"
          value-format="HH:mm:ss"
          placeholder="请选择开始时间"
        >
        </el-time-picker>
        <el-time-picker
          v-model="query.endTime"
          value-format="HH:mm:ss"
          placeholder="请选择结束时间"
        >
        </el-time-picker>
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
          prop="personName"
          label="巡检人员"
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
          prop="sceneText"
          label="巡检情况"
        />
        <el-table-column
          prop="bnormalNumber"
          label="异常事件数"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="80"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="$router.push({name:'patroStatisticDetail',query:{id:scope.row.id,person:scope.row.personId}})"
            >详情</el-button>
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
        :total.sync="total"
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
        startTime: '',
        endTime: '',
        currentPage: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    onReset () {
      this.query = {
        startTime: '',
        endTime: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    async getList () {
      if (
        Date.parse(`2020-01-01 ${this.query.startTime}`) -
          Date.parse(`2020-01-01 ${this.query.endTime}`) >
        0
      ) {
        this.$message.warning('开始时间应早于结束时间~')
        return
      }
      const res = await this.$api.patrolApi.getStatisticList(this.query)
      this.list = [...res.data]
      this.total = +res.total
    }
  },
  mounted () {
    document.onkeydown = (e) => {
      if (
        e.keyCode === 13 &&
        document.body.getElementsByClassName('patrol-statistic-list')[0]
      ) {
        this.getList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.patrol-statistic-list {
  width: 100%;
}
</style>

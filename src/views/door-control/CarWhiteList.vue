<template>
  <div class="door-carwhite-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-input
          v-model="query.code"
          size="medium"
          placeholder="请输入车牌号"
        ></el-input>
        <el-input
          size="medium"
          v-model="query.name"
          placeholder="请输入车主姓名"
        ></el-input>
        <el-select
          v-model="query.code"
          placeholder="请选择出入场区域"
        >
          <el-option
            label="是"
            :value="1"
          />
          <el-option
            label="否"
            :value="2"
          />
        </el-select>
        <el-select
          v-model="query.code"
          placeholder="请选择所属企业"
        >
          <el-option
            label="是"
            :value="1"
          />
          <el-option
            label="否"
            :value="2"
          />
        </el-select>
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
          prop="name"
          label="车牌号"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="车主姓名"
        />
        <el-table-column
          prop="createTime"
          label="所属企业"
        />
        <el-table-column
          prop="createTime"
          label="可出入区域"
        />
        <el-table-column
          prop="createTime"
          label="登记时间"
        />
        <el-table-column
          prop="createTime"
          label="车主电话"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="240"
        >
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="text"
            >删除</el-button>
            <el-button
              size="medium"
              type="text"
              @click="$router.push({name:'sysAccountAdd',query:{id:scope.row.id}})"
            >撤销</el-button>
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
  components: {},
  data () {
    return {
      list: [],
      query: {
        code: '',
        name: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    onReset () {
      this.query = {
        code: '',
        name: '',
        currentPage: 1,
        pageSize: 10,
        total: this.query.total
      }
    },
    async getList () {
      const res = await this.$api.rulesApi.getQrcodeList(this.query)
      this.list = [...res.data]
      this.query.total = +res.total
    }
  },
  mounted () {
    document.onkeydown = (e) => {
      if (
        e.keyCode === 13 &&
        document.body.getElementsByClassName('rules-qrcode-list')[0]
      ) {
        this.getList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.door-carwhite-list {
  width: 100%;
}
</style>

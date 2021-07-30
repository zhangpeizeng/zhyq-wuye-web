<template>
  <div class="rules-qrcode-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-input
          v-model="query.code"
          size="medium"
          placeholder="请输入编码"
        ></el-input>
        <el-input
          size="medium"
          v-model="query.name"
          placeholder="请输入名称"
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
          label="名称"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="下载人"
        />
        <el-table-column
          prop="createTime"
          label="下载时间"
        />
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
.rules-qrcode-list {
  width: 100%;
}
</style>

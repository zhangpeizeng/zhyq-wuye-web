<!--二维码管理列表-->
<template>
  <div class="qrcode-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-input
          size="medium"
          v-model="query.companyName"
          placeholder="请输入生成数量"
        ></el-input>
      </div>
      <div class="btn-wrap flex-between">
        <div>
          <el-button
            type="primary"
            @click="getList"
            size="medium"
            icon="el-icon-search"
          >生成
          </el-button>
          <!--          <el-button-->
          <!--            @click="onReset"-->
          <!--            size="medium"-->
          <!--            icon="el-icon-refresh"-->
          <!--          >重置</el-button>-->
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
          prop="idCard"
          label="文件名称"
        />

        <el-table-column
          prop="createTime"
          label="下载状态"
        />
        <el-table-column
          prop="creatorName"
          label="下载次数"
        />
        <el-table-column
          prop="remainingTime"
          label="创建时间"
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
        <el-table-column
          fixed="right"
          label="操作"
          width="240"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
            >下载
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click="onDel(scope.row.id)"
            >删除
            </el-button>
          </template>
        </el-table-column>
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

  import {
    getAccountList,
    delAccount,
    getOrgList,
    resetPwd,
    switchStatus,
    formatTree
  } from '@/api/systemApi'

  export default {
    components: {},
    data() {
      return {
        list: [],
        orgList: [],
        query: {
          companyName: '',
          legalPerson: '',
          accountName: '',
          orgId: '',
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    created() {
      this.getList()
      this.getOrgList()
    },
    methods: {
      onReset() {
        this.query = {
          companyName: '',
          legalPerson: '',
          accountName: '',
          orgId: '',
          currentPage: 1,
          pageSize: 10,
          total: this.query.total
        }
      },
      async getList() {
        const res = await getAccountList(this.query)
        this.query.total = +res.total
        this.list = res.data.map((item) => {
          item.statusName = {1: '正常', 2: '锁定'}[item.status]
          return item
        })
      },
      async getOrgList() {
        const res = await getOrgList({orgType: 1})
        this.orgList = formatTree(res, 'id', 'parentOrgId', 'childrens')
      },
      onDel(id) {
        this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            const res = await delAccount({id})
            if (res) {
              this.$message.success('删除成功~')
              this.getList()
            }
          })
          .catch(() => {
          })
      },
      async onResetPwd(id) {
        const res = await resetPwd({id})
        if (res) {
          this.$message.success('重置成功~')
        }
      },
      async onSwitch(id, status) {
        if (+status === 1) {
          status = 2
        } else {
          status = 1
        }
        const res = await switchStatus({id, status})
        if (res) {
          this.getList()
          this.$message.success('操作成功~')
        }
      }
    },
    mounted() {
      document.onkeydown = (e) => {
        if (
          e.keyCode === 13 &&
          document.body.getElementsByClassName('qrcode-list')[0]
        ) {
          this.getList()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .qrcode-list {
    width: 100%;
  }

</style>

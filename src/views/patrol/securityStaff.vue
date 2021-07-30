<!--保安信息列表-->
<template>
  <div class="staff-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-input
          size="medium"
          v-model="query.companyName"
          placeholder="请输入姓名"
        ></el-input>
        <el-input
          size="medium"
          v-model="query.companyName"
          placeholder="请输入电话"
        ></el-input>
      </div>
      <div class="btn-wrap flex-between">
        <div>
          <el-button
            type="primary"
            @click="getList"
            size="medium"
            icon="el-icon-search"
          >查询
          </el-button>
          <el-button
            @click="onReset"
            size="medium"
            icon="el-icon-refresh"
          >重置
          </el-button>
        </div>
        <el-button
          type="primary"
          @click="$router.push({name:'securityStaffEdit'})"
          size="medium"
          icon="el-icon-plus"
        >添加
        </el-button>
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
          label="姓名"
        />

        <el-table-column
          prop="createTime"
          label="性别"
        />
        <el-table-column
          prop="creatorName"
          label="电话"
        />
        <el-table-column
          prop="remainingTime"
          label="身份证号"
        />
        <el-table-column
          prop="remainingTime"
          label="地址"
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
              size="medium"
              type="text"
              @click="onDel(scope.row.id)"
            >删除
            </el-button>
            <el-button
              type="text"
              size="medium"
              @click="$router.push({name:'securityStaffEdit',query:{id:'11111'}})"
            >编辑
            </el-button>
            <el-button
              type="text"
              size="medium"
            >修改密码
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
          document.body.getElementsByClassName('staff-list')[0]
        ) {
          this.getList()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .staff-list {
    width: 100%;
  }

</style>

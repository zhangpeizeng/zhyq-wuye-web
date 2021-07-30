<!--租赁服务管理-->
<template>
  <div class="rental-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-select v-model="value1" placeholder="租售主题类型">
          <el-option label="楼宇" value="1"/>
          <el-option label="房屋" value="2"/>
          <el-option label="车位" value="3"/>
        </el-select>
        <el-select v-model="value1" placeholder="租售类型">
          <el-option label="出租" value="1"/>
          <el-option label="出售" value="2"/>
        </el-select>
        <el-select v-model="value1" placeholder="发布状态">
          <el-option label="已撤回" value="1"/>
          <el-option label="发布中" value="2"/>
        </el-select>
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
        <div>
          <el-button
            type="primary"
            @click="$router.push({name:'rentalServiceAdd'})"
            size="medium"
            icon="el-icon-plus"
          >信息发布
          </el-button>
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
          type="selection"
          width="55"/>
        <el-table-column
          prop="accountName"
          label="公告标题"
        />
        <el-table-column
          prop="companyName"
          label="公告等级"
        >
        </el-table-column>
        <el-table-column
          prop="legalPerson"
          label="状态"
        />
        <el-table-column
          prop="phoneNo"
          label="更新人"
          width="120"
        />
        <el-table-column
          prop="createTime"
          label="更新日期"
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
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="text"
              @click="onDel(scope.row.id)"
            >删除
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click="onResetPwd(scope.row.id)"
            >撤回
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click="$router.push({name:'sysAccountAdd',query:{id:scope.row.id}})"
            >编辑
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
        value1: '',
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
          document.body.getElementsByClassName('system-account-list')[0]
        ) {
          this.getList()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rental-list {
    width: 100%;
  }

</style>

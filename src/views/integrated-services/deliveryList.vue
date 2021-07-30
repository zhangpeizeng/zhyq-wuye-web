<!--交房管理-->
<template>
  <div class="system-account-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="value1" placeholder="交房结论">
          <el-option label="通过" value="1"/>
          <el-option label="不通过" value="2"/>
        </el-select>
        <el-cascader
          size="medium"
          clearable
          placeholder="房屋地址"
          v-model="query.orgId"
          :options="orgList"
          filterable
          :props="{label:'orgName',children: 'childrens',value:'id',checkStrictly: true,emitPath:false}"
        ></el-cascader>
        <el-select v-model="value1" placeholder="房屋类型">
          <el-option label="商业用房" value="1"/>
          <el-option label="仓库仓储" value="2"/>
          <el-option label="数据机房" value="3"/>
          <el-option label="商业住宅" value="4"/>
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
      </div>
    </div>
    <div class="content-wrap">
      <el-table
        stripe
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="accountName"
          label="账号名"
          width="220"
        />
        <el-table-column
          prop="companyName"
          label="企业名"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="legalPerson"
          label="法人"
          width="220"
        />
        <el-table-column
          prop="phoneNo"
          label="联系方式"
          width="120"
        />
        <el-table-column
          prop="idCard"
          label="身份证号"
          width="220"
        />
        <!-- <el-table-column
          prop="address"
          label="注册地址"
        /> -->
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="220"
        />
        <el-table-column
          prop="creatorName"
          label="创建人"
          width="180"
        />
        <el-table-column
          prop="role"
          label="角色"
        />
        <el-table-column
          prop="remainingTime"
          label="剩余时长"
          width="220"
        />
        <el-table-column
          prop="statusName"
          label="状态"
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
              @click="$router.push({name:'sysAccountDetail',query:{id:scope.row.id}})"
            >详情
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click="onSwitch(scope.row.id,scope.row.status)"
            >{{ +scope.row.status === 1?'锁定':'启用' }}
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click="$router.push({name:'sysAccountAdd',query:{id:scope.row.id}})"
            >编辑
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click="onResetPwd(scope.row.id)"
            >重置密码
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
  // TODO
  // DOM=>最外层按菜单声明唯一标识class，在mounted中添加回车事件
  // DOM=>class嵌套结构=>
  //                      .system-account-list{
  //                        .filter-wrap{
  //                          .form-wrap{}
  //                          .btn-wrap .flex-between{}
  //                        }
  //                        .content-wrap{}
  //                      }
  // 表单组件和按钮统一尺寸size="medium"
  // el-table中统一添加空样式
  // <template slot="empty">
  //         <div class="table-empty">
  //           <img
  //             src="@/assets/empty.png"
  //             alt=""
  //           >
  //           <div class="text1">暂无数据</div>
  //           <div class="text2">没有搜到您想要的内容</div>
  //         </div>
  // </template>
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
  .system-account-list {
    width: 100%;
  }

</style>

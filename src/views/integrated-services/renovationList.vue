<!--装修列表-->
<template>
  <div class="renovation-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-select v-model="query.decorateStatus" placeholder="请选择状态">
          <el-option label="进行中" value="1"></el-option>
          <el-option label="已验收" value="2"></el-option>
          <el-option label="已完工" value="3"></el-option>
          <el-option label="已终止" value="4"></el-option>
        </el-select>
        <el-cascader
          placeholder="请选择楼宇位置"
          v-model="query.buildInstanceId"
          :options="buildList"
          :props="{ checkStrictly: true,emitPath:false,}"
          :show-all-levels="false"
          clearable
          @keyup.enter.native="getList"
        ></el-cascader>
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
         type="index"
          width="70"
         label="序号"
        />
        <el-table-column
          prop="location"
          label="房屋地址"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="roomCode"
          label="房屋编号"
          width="220"
        />
        <el-table-column
          prop="buildArea"
          label="房屋面积"
          width="120"
        />
        <el-table-column
          prop="applicant"
          label="申请登记人"
          width="220"
        />
        <el-table-column
          prop="startTime"
          label="装修开始日期"
          width="220"
        />
        <el-table-column
          prop="endTime"
          label="装修结束日期"
          width="220"
        />
        <el-table-column
          prop="decorateManager"
          label="装修管理员"
          width="180"
        />
        <el-table-column
          prop="decorateStatus"
          label="装修状态"
        >
          <template slot-scope="scope">
           <span v-show="scope.row.decorateStatus==1">
             进行中
           </span>
            <span v-show="scope.row.decorateStatus==2">
             已验收
           </span>
            <span v-show="scope.row.decorateStatus==3">
             已完工
           </span>
            <span v-show="scope.row.decorateStatus==4">
             已终止
           </span>
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
        <el-table-column
          fixed="right"
          label="操作"
          width="140"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.id"
              size="medium"
              type="text"
              @click="$router.push({name:'renovationAdd',query:{id:scope.row.id,roomId:scope.row.roomId,location:scope.row.location,buildArea:scope.row.buildArea,roomType:scope.row.roomType}})"
            >编辑
            </el-button>
            <el-button
              v-else
              type="text"
              size="medium"
              @click="$router.push({name:'renovationAdd',query:{roomId:scope.row.roomId,location:scope.row.location,buildArea:scope.row.buildArea,roomType:scope.row.roomType}})"
            >装修登记
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
        list: [],
        buildList: [],
        query: {
          decorateStatus: '',
          buildInstanceId: '',
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    created() {
      this.getSelect()
      this.getList()
    },
    methods: {
      onReset() {
        this.query = {
          decorateStatus: '',
          buildInstanceId: '',
          currentPage: 1,
          pageSize: 10,
          total: this.query.total
        }
      },
      /**
       * 建筑信息楼栋下拉框
       */
      getSelect(){
        this.$api.serviceApi.instanceRoomGetSelection({}).then(data=>{
          this.buildList = this.getTreeData(data)
        })
      },
      getTreeData (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].children.length < 1) {
            // children若为空数组，则将children设为undefined
            data[i].children = undefined
          } else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].children)
          }
        }
        return data
      },
      async getList() {
        const res = await this.$api.serviceApi.decorateRegisterGetTableList(this.query)
        this.query.total = +res.total
        this.list = res.data
      },
      onDel(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            const res = await this.$api.serviceApi.decorateRegisterDelete({id})
            if (res) {
              this.$message.success('删除成功~')
              this.getList()
            }
          })
          .catch(() => {
          })
      },
    },
    mounted() {
      document.onkeydown = (e) => {
        if (
          e.keyCode === 13 &&
          document.body.getElementsByClassName('renovation-list')[0]
        ) {
          this.getList()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .renovation-list {
    width: 100%;
  }

</style>

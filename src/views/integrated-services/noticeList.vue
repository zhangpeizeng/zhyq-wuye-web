<!--公告发布-->
<template>
  <div class="notice-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-date-picker
          v-model="value1"
          format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="query.publishStatus" placeholder="发布状态">
          <el-option label="已发布" value="1"/>
          <el-option label="发布中" value="2"/>
          <el-option label="撤回" value="3"/>
        </el-select>
        <el-select v-model="query.level" placeholder="公告等级">
          <el-option label="普通公告" value="0"/>
          <el-option label="重要公告" value="1"/>
          <el-option label="置顶公告" value="3"/>
        </el-select>
        <el-input v-model="query.title" placeholder="请输入公告主题"/>
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
            @click="$router.push({name:'noticeAdd'})"
            size="medium"
            icon="el-icon-position"
          >发布公告
          </el-button>
          <el-button
            type="primary"
            @click="onClose"
            size="medium"
            icon="el-icon-document-delete"
          >批量撤回
          </el-button>
          <el-button
            type="primary"
            @click="onDelBatch"
            size="medium"
            icon="el-icon-delete"
          >批量删除
          </el-button>
        </div>

      </div>
    </div>
    <div class="content-wrap">
      <el-table
        stripe
        :data="list"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="title"
          label="公告标题"
        />
        <el-table-column
          prop="level"
          label="公告等级"
        >
          <template slot-scope="scope">
          <span v-show="scope.row.level===0">
            普通公告
          </span>
            <span v-show="scope.row.level===1">
            重要公告
          </span>
            <span v-show="scope.row.level===2">
            置顶公告
          </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="publishStatus"
          label="状态"
        >
        <template slot-scope="scope">
          <span v-show="scope.row.publishStatus===1">
            已发布
          </span>
          <span v-show="scope.row.publishStatus===2">
            发布中
          </span>
          <span v-show="scope.row.publishStatus===3">
            已撤回
          </span>
        </template>
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
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
              @click="$router.push({name:'noticeAdd',query:{id:scope.row.id}})"
            >编辑
            </el-button>
            <el-button
              size="medium"
              type="text"
              v-show="scope.row.publishStatus!==3"
              @click="onResetBack(scope.row.id)"
            >撤回
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
        value1: [],
        list: [],
        multipleSelection: [],
        orgList: [],
        query: {
          title:'',//标题
          level:'',//公告等级0:普通公告；1:重要公告; 2:置顶公告
          publishStatus:'',//发布状态 - 1：已发布；2：发布中（定时任务）；3:撤回
          startTime:'',//发布开始时间
          endTime:'',//发布结束时间
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      /**
       * 多选数据
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /**
       * 重置
       */

      onReset() {
        this.value1 = []
        this.query = {
          title:'',//标题
          level:'',//公告等级0:普通公告；1:重要公告; 2:置顶公告
          publishStatus:'',//发布状态 - 1：已发布；2：发布中（定时任务）；3:撤回
          startTime:'',//发布开始时间
          endTime:'',//发布结束时间
          currentPage: 1,
          pageSize: 10,
          total: this.query.total
        }
      },
      async getList() {
        if(this.value1.length>0){
          this.query.startTime = this.value1[0]
          this.query.endTime = this.value1[1]
        }
        const res = await this.$api.serviceApi.announcementGetTableList(this.query)
        this.query.total = +res.total
        this.list = res.data
      },
      /***
       * 批量关闭
       * @param id
       */
      onClose() {
        if(this.multipleSelection.length===0){
          this.$message.error('请至少选择一条数据~')
          return
        }
        this.$confirm('确撤回？')
          .then(_ => {
            let params = this.multipleSelection.map(item=>{
              return item.id
            })
            this.$api.serviceApi.announcementRecallbatch(params).then(res=>{
              this.getList()
              this.$message.success('关闭成功~')
            })
          })
          .catch(_ => {});
      },
      /***
       * 批量删除
       * @param id
       */
      onDelBatch() {
        if(this.multipleSelection.length===0){
          this.$message.error('请至少选择一条数据~')
          return
        }
        this.$confirm('确认删除？')
          .then(_ => {
            let params = this.multipleSelection.map(item=>{
              return item.id
            })
            this.$api.serviceApi.announcementDeletebatch(params).then(res=>{
              this.$message.success('删除成功~')
              this.getList()
            })
          })
          .catch(_ => {});
      },
      /***
       * 删除
       * @param id
       */
      onDel(id) {
        this.$confirm('确认删除？')
          .then(_ => {
            this.$api.serviceApi.announcementDelete({id:id}).then(res=>{
              this.$message.success('删除成功~')
              this.getList()
            })
          })
          .catch(_ => {});
      },
      /***
       * 撤回
       * @param id
       * @returns {Promise<void>}
       */
      async onResetBack(id) {
        this.$confirm('确认撤回？')
          .then(_ => {
            this.$api.serviceApi.announcementRecall({id:id}).then(res=>{
              this.$message.success('撤回成功~')
              this.getList()
            })
          })
          .catch(_ => {});
      },
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
  .notice-list {
    width: 100%;
  }

</style>

<!--巡检路线列表-->
<template>
  <div class="patrol-spot-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-input
          size="medium"
          v-model="query.lineName"
          placeholder="请输入路线名称"
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
          @click="showAddSpot=true"
          size="medium"
          type="primary"
          icon="el-icon-plus"
        >添加
        </el-button>
      </div>
    </div>
    <div class="content-wrap">
      <div style="width: 65%">
        <el-table
          ref="singleTable"
          stripe
          highlight-current-row
          :data="list"
          @selection-change="handleSelectionChange"
          @row-click="rowClick"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="lineName"
            label="路线名称"
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
                @click="getDetail(scope.row.id)"
                type="text"
                size="medium"
              >编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 33%">
        <el-table
          max-height="500"
          :data="listSpot"
          @selection-change="handleSelectionChange"
          style="width: 100%;box-shadow: -5px 0px 5px #eee;z-index: 99"
        >
          <el-table-column
            prop="pointName"
            label="任务园区巡检"
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
            width="90"
          >
            <template slot-scope="scope">
              <i   @click="relationDel(scope.row.id)" class="el-icon-circle-close iconClose1"></i>
<!--              <el-button-->
<!--                size="medium"-->
<!--                type="text"-->
<!--                @click="relationDel(scope.row.id)"-->
<!--              >删除-->
<!--              </el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
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
    <el-dialog
      :title="id?'编辑巡更路线':'添加巡更路线'"
      @close="onCloseDialog"
      :visible.sync="showAddSpot"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">路线名称：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.lineName"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">巡检点：</div>
          <div>
            <el-button
              @click="showAddLine=true"
              type="primary"
            >添加巡更点位
            </el-button>
            <div class="pt20">
              <span class="pr10" v-for="(item,index) in selectSpot" :key="index">{{ item }}</span>
            </div>
          </div>
        </div>

      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="insert"
          type="primary"
          size="mini"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="配置巡更点"
      :visible.sync="showAddLine"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div>
          <el-button
            @click="saveSpot"
            type="primary"
          >确认配置
          </el-button>
        </div>
        <div class="line-box">
          <!--          :filter-method="filterMethod"-->
          <el-transfer
            filterable
            filter-placeholder="请输入城市拼音"
            v-model="value"
            :titles="['剩余点位','巡更点位']"
            :data="data">
          </el-transfer>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    components: {},
    data () {
      return {
        id: '',
        data: null,
        value: [],
        list: [],
        listSpot: [],
        add: {
          lineName: ''
        },
        lineId: '',
        showAddSpot: false,
        showAddLine: false,
        query: {
          lineName: '',
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        allSpotList: [],
        selectSpot: [],
        multipleSelection: []
      }
    },
    created () {
      this.getList()
      this.data = this.generateData()
    },
    methods: {

      /**
       * 所有巡检点
       **/
      generateData () {
        const data = []
        let cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
        // let pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        this.$api.patrolApi.pmcPatrolPointGetAllPoint({ pointName: '' }).then(res => {
          this.allSpotList = [...res.data]
          cities = res.data
          cities.forEach((city, index) => {
            data.push({
              label: city.pointName,
              key: city.id
              // pinyin: pinyin[index]
            })
          })
          this.data = data
        })
      },

      /**
       * 弹框关闭操作
       **/
      onCloseDialog () {
        this.add.lineName = ''
        this.selectSpot = []
        this.value = []
        this.id = ''
      },

      /**
       * 详情
       **/
      getDetail (id) {
        this.id = id
        this.$api.patrolApi.pmcPatrolLineGetDetail({ id }).then(res => {
          this.showAddSpot = true
          this.add.lineName = res.lineName
          this.value = res.pmcPatrolPointList.map((item) => {
            return item.id
          })
          this.selectSpot = res.pmcPatrolPointList.map((item) => {
            return item.pointName
          })
        })
      },

      /**
       * 确认配置
       **/
      saveSpot () {
        this.selectSpot = []
        this.allSpotList.forEach((item) => {
          this.value.forEach((item1) => {
            if (item1 === item.id) {
              this.selectSpot.push(item.pointName)
            }
          })
        })
        this.showAddLine = false
        this.$forceUpdate()
      },

      /**
       * 选择数据
       **/
      handleSelectionChange (val) {
        this.multipleSelection = val
      },

      /**
       * 点击行
       **/
      rowClick (row, column, event) {
        console.log(row)
        this.listSpot = row.pmcPatrolPointList
        this.lineId = row.id
      },

      /**
       * 重置
       **/
      onReset () {
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

      /**
       * 列表
       **/
      async getList () {
        const res = await this.$api.patrolApi.pmcPatrolLineGetTableList(this.query)
        this.query.total = +res.total
        this.list = res.data
        this.lineId = res.data[0].id
        this.listSpot = res.data[0].pmcPatrolPointList
        this.setCurrent(this.list[0])
      },

      /**
       * 删除巡检路线中的巡检点
       **/
      relationDel (id) {
        this.$confirm('是否继续删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            const res = await this.$api.patrolApi.pmcPointLineRelationDelete({ pointId: id, lineId: this.lineId })
            if (res) {
              this.$message.success('删除成功~')
              this.getList()
            }
          })
          .catch(() => {
          })
      },

      /**
       * 选中行
       **/
      setCurrent (row) {
        this.$refs.singleTable.setCurrentRow(row)
      },

      /**
       * 批量删除
       **/
      batchDel () {
        if (this.multipleSelection.length === 0) {
          this.$message.error('请至少选择一项数据')
          return false
        }
        this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            const ids = this.multipleSelection.map((item) => {
              return item.id
            })
            const res = await this.$api.pmcPatrolLineDeletebatch(ids)
            if (res) {
              this.$message.success('删除成功~')
              await this.getList()
            }
          })
          .catch(() => {
          })
      },

      /**
       * 单个删除
       **/
       onDel (id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            const res = await this.$api.patrolApi.pmcPatrolLineDelete({ id })
            if (res.msgLevel==='success') {
              this.$message.success('删除成功~')
              this.getList()
            }
          })
          .catch(() => {
          })
      },

      /**
       * 新增/编辑
       **/
      insert () {
        if (!this.add.lineName) {
          this.$message.error('请输入路线名称')
          return
        }
        this.add.pointIds = this.value
        if (!this.add.pointIds || this.add.pointIds.length===0) {
          this.$message.error('请添加巡更点位')
          return
        }
        if (this.id) {
          const params = { ...this.add }
          params.id = this.id
          this.$api.patrolApi.pmcPatrolLineUpdate(params).then(res => {
            this.$message.success('编辑成功~')
            this.showAddSpot = false
            this.getList()
          })
        } else {
          this.$api.patrolApi.pmcPatrolLineInsert(this.add).then(res => {
            this.$message.success('新增成功~')
            this.showAddSpot = false
            this.getList()
          })
        }
      }
    },
    mounted () {
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
  .patrol-spot-list {
    width: 100%;
    .iconClose1{
      font-size: 15px;
    }
    .iconClose1:hover{
      color: red;
    }

    .content-wrap {
      display: flex;
    }

    .line-box {
      ::v-deep .el-input {
        width: 91%;
      }
    }

  }

</style>

<!--巡检路线列表-->
<template>
  <div class="patrol-spot-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-input
          size="medium"
          v-model="query.taskRequire"
          placeholder="请输入任务说明"
        ></el-input>
      </div>
      <div class="btn-wrap flex-between">
        <div>
          <el-button
            type="primary"
            @click="getList(find=true)"
            size="medium"
            icon="el-icon-search"
          >查询</el-button>
          <el-button
            @click="dialogChange(1)"
            size="medium"
            type="primary"
            icon="el-icon-plus"
          >添加</el-button>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <div style="margin-right: 20px;width: 65%">
        <el-table
          ref="singleTable"
          stripe
          highlight-current-row
          :data="list"
        >
          <el-table-column
            prop="taskName"
            label="任务名称"
          >
            <template slot-scope="scope">
              <div @click="taskClick(scope.row.id, scope.row.taskName)">{{ scope.row.taskName }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="taskRequire"
            label="任务说明"
          />
          <el-table-column
            label="任务类型"
          >
            <template slot-scope="props">
              <span>{{ typeOptions[props.row.taskType - 1].label }}</span>
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
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                size="medium"
                type="text"
                @click="onDel(scope.row.id)"
              >删除</el-button>
              <el-button
                @click="dialogChange(2, scope.row)"
                type="text"
                size="medium"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="task-right">
        <div>{{ taskName }}</div>
        <el-tree :data="taskList" :props="defaultProps"></el-tree>
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
    <div>
      <el-dialog
        :title="type === 1 ? '新增任务信息' : '编辑任务信息'"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <div class="dialog-wrap">
          <div class="flex">
            <div class="label">任务名称：</div>
            <div>
              <el-input
                placeholder="请输入"
                v-model="addTaskQuery.taskName"
              >
              </el-input>
            </div>
          </div>
          <div class="flex">
            <div class="label">任务说明：</div>
            <div>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入"
                v-model="addTaskQuery.taskRequire"
              >
              </el-input>
            </div>
          </div>
          <div class="flex">
            <div class="label">任务类型：</div>
            <div>
              <el-select v-model="addTaskQuery.taskType" placeholder="请选择">
                <el-option
                  v-for="(item, index) in typeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex">
            <div class="label">巡更路线：</div>
            <div>
              <el-button
                @click="showAddLine=true"
                type="primary"
              >配置巡更路线</el-button>
              <!-- <div class="pt20">
                <span class="pr10" v-for="(item,index) in selectSpot" :key="index">{{ item }}</span>
              </div> -->
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTask">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="配置巡更路线"
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
            >确认配置</el-button>
          </div>
          <div class="line-box">
            <el-transfer
              filterable
              filter-placeholder="请输入路线名称"
              v-model="taskIdlist"
              :titles="['全部路线','配置路线']"
              :data="allTableList">
            </el-transfer>
          </div>

        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        list: [],
        taskList: [],
        allTableList: [], // 全部的巡更线路
        taskIdlist: [], // 配置的巡更路线的ID
        addTaskQuery: {
          taskName: '',
          taskRequire: '',
          taskType: null,
          pmcPatrolLineList: [],
          id: null
        },
        filterMethod (query, item) {
          return item.label.indexOf(query) > -1
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        taskName: '',
        query: {
          taskRequire: '',
          taskName: '',
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        dialogVisible: false,
        type: 1,
        typeOptions: [
          { label: '工程类', value: 1 },
          { label: '消防类', value: 2 },
          { label: '安保类', value: 3 }
        ],
        showAddLine: false
      }
    },
    methods: {
      // 查询
      getList (find = false) {
        this.taskName = ''
        this.taskList = []
        !find && (this.query.taskRequire = '')
        this.$api.patrolApi.getTaskTableList(this.query).then(res => {
          this.list = res.data || []
          this.query.total = Number(res.total) || 0
          this.getLinesByTaskId(res.data[0].id, res.data[0].taskName)
        })
      },
      // 查巡逻路线
      getLinesByTaskId (id, name) {
        this.taskName = name
        const param = { taskId: id }
        this.$api.patrolApi.getLinesByTaskId(param).then(res => {
          const taskList = res.map(x => {
            const item = { label: x.lineName, children: [] }
            this.$api.patrolApi.getPointsByLineId({ lineId: x.id }).then(y => {
              y.map((z, i) => {
                item.children.push({ label: z.pointName })
              })
            })
            return item
          })
          this.taskList = taskList
        })
      },
      taskClick (id, name) {
        this.getLinesByTaskId(id, name)
      },
      dialogChange (type, row = {}) {
        const obj = {
          taskName: row.taskName || '',
          taskRequire: row.taskRequire || '',
          taskType: row.taskType || '',
          id: row.id || null
        }
        this.addTaskQuery = obj
        this.dialogVisible = true
        this.type = type
      },
      // 获取巡更路线
      getTableList () {
        this.$api.patrolApi.pmcPatrolLineGetTableList({ pageSize: 100 }).then(res => {
          const { data = [] } = res
          const list = []
          data.forEach(x => {
            list.push({
              label: x.lineName,
              key: x.id
            })
          })
          this.allTableList = list
        })
      },
      // 确认配置巡更路线button
      saveSpot () {
        this.showAddLine = false
        this.addTaskQuery.pmcPatrolLineList = this.taskIdlist.map(x => {
          const item = {}
          item.id = x
          return item
        })
      },
      // 确认新增任务信息
      addTask () {
        if (this.type === 1) {
          this.$api.patrolApi.pmcPatrolTaskInsert(this.addTaskQuery).then(res => {
            this.$message.success('新增成功~')
            this.dialogVisible = false
            this.getList()
          })
        } else {
          this.$api.patrolApi.updateTask(this.addTaskQuery).then(res => {
            this.$message.success('修改成功~')
            this.dialogVisible = false
            this.getList()
          })
        }
      },
      // 删除单条任务数据
      onDel (id) {
        this.$api.patrolApi.deleteTask({ id: id }).then(res => {
          res.msgLevel === 'success' && this.$message.success('删除成功') && this.getList()
        })
      }
    },
    mounted () {
      this.getList()
      this.getTableList()
      document.onkeydown = (e) => {
        if (
          e.keyCode === 13 &&
          document.body.getElementsByClassName('patrol-spot-list')[0]
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
    .content-wrap{
      display: flex;
      .task-right {
        overflow: auto;
        padding: 20px;
        width: 33%;
        border: 1px solid #999;
        height: 300px;
      }
    }
    .line-box{
      ::v-deep .el-input {
        width: 91%;
      }
    }

  }

</style>

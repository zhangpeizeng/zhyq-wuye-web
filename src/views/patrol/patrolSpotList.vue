<!--巡检点列表-->
<template>
  <div class="patrol-spot-list">
    <div class="filter-wrap">
      <div class="form-wrap">
        <el-input
          size="medium"
          v-model="query.pointName"
          placeholder="请输入检查点名称"
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
        <div>
          <el-button
            type="primary"
            @click="showAddSpot = true"
            size="medium"
            icon="el-icon-plus"
          >添加
          </el-button>
          <el-button
            type="primary"
            @click="batchDel"
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
          width="55">
        </el-table-column>
        <el-table-column
          prop="pointName"
          label="巡检点名称"
        />

        <el-table-column
          prop="pointLocation"
          label="地址"
        />
        <el-table-column
          prop="pointType"
          label="检查点类型"
        />
        <el-table-column
          prop="createTime"
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
              @click="getDetail(scope.row.id)"
              size="medium"
            >编辑
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click="onDel(scope.row.id)"
            >删除
            </el-button>
            <el-button
              type="text"
              size="medium"
              @click="payOrder(scope.row.id)"
            >生成二维码
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
    <el-dialog
      :title="id?'编辑巡检点':'新增巡检点'"
      @close="onCloseDialog"
      :visible.sync="showAddSpot"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">检查点名称</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.pointName"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">巡检场景</div>
          <div>
            <el-radio v-model="add.pointType" label="1">室内</el-radio>
            <el-radio v-model="add.pointType" label="2">室外</el-radio>
          </div>
        </div>
        <div class="flex">
          <div class="label">巡检位置</div>
          <div>
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入"
              v-model="add.pointLocation"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">巡检要求</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.patrolStandard"
            >
            </el-input>
          </div>
        </div>

      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="onAddSpot"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="320px"
      title="二维码"
      @close="closeCode"
      :visible.sync="innerVisible"
      append-to-body>
      <div class="paycode">
        <!-- 放置二维码的容器,需要给一个ref -->
        <div id="qrcode" ref="qrcode"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {
    resetPwd,
    switchStatus,
  } from '@/api/systemApi'
  import QRCode from 'qrcodejs2'

  export default {
    components: {},
    data() {
      return {
        id: '',
        qrcode: '',
        innerVisible: false,
        add: {
          departId: '',
          patrolStandard: '',
          pointLocation: '',
          pointName: '',
          pointType: '',
          qrCodePath: '',
        },
        multipleSelection: [],
        list: [],
        orgList: [],
        showAddSpot: false,
        query: {
          pointName: '',
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        ccc: 0,
        ddd: 0,
      }
    },
    created() {
      this.getList()
    },
    methods: {

      // 展示二维码
      payOrder(data) {
        this.innerVisible = true
        // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
        this.qrcode = 'https://yuchengkai.cn/docs/frontend/#typeof'
        // 使用$nextTick确保数据渲染
        this.$nextTick(() => {
          this.crateQrcode()
        })
      },
      // 生成二维码
      crateQrcode() {
        this.qr = new QRCode('qrcode', {
          width: 270,
          height: 270, // 高度
          text: this.qrcode // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
        // console.log(this.qrcode)
      },
      // 关闭弹框,清除已经生成的二维码
      closeCode() {
        this.$refs.qrcode.innerHTML = ''
      },
      /**
       * 选择数据
       **/
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /**
       * 重置
       **/
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

      /**
       * 详情
       **/
      getDetail(id) {
        this.id = id
        this.$api.patrolApi.pmcPatrolPointGetDetail({id}).then(res => {
          this.showAddSpot = true
          this.add.patrolStandard = res.patrolStandard
          this.add.pointLocation = res.pointLocation
          this.add.pointName = res.pointName
          this.add.pointType = res.pointType
        })
      },

      /**
       * 新增/编辑
       **/
      onAddSpot() {
        // add: {
        //   departId: '',
        //     patrolStandard: '',
        //     pointLocation: '',
        //     pointName: '',
        //     pointType: '',
        //     qrCodePath: '',
        // },
        if (!this.add.pointName) {
          this.$message.error('请输入检查点名称')
          return
        }
        if (!this.add.pointType) {
          this.$message.error('请选择巡检场景')
          return
        }
        if (!this.add.pointLocation) {
          this.$message.error('请输入巡检位置')
          return
        }
        if (!this.add.patrolStandard) {
          this.$message.error('请输入巡检要求')
          return
        }

        if (!this.add.pointName) {
          this.$message.error('请输入检查点名称')
          return
        }
        if (this.id) {
          let params = {...this.add}
          params.id = this.id
          this.$api.patrolApi.pmcPatrolPointUpdate(params).then(res => {
            this.$message.success('编辑成功~')
            this.showAddSpot = false
            this.getList();
          })
        } else {
          this.$api.patrolApi.pmcPatrolPointInsert(this.add).then(res => {
            this.$message.success('新增成功~')
            this.showAddSpot = false
            this.getList();
          })
        }

      },

      onCloseDialog() {
        this.id = ""
        this.add = {
          departId: '',
          patrolStandard: '',
          pointLocation: '',
          pointName: '',
          pointType: '',
          qrCodePath: '',
        }

      },
      async getList() {
        const res = await this.$api.patrolApi.pmcPatrolPointGetTableList(this.query)
        this.list = res.data
        this.query.total = +res.total
      },

      /**
       * 批量删除
       */
      batchDel() {
        if (this.multipleSelection.length === 0) {
          this.$message.error('请至少选择一项数据')
          return false
        }
        this.$confirm('是否继续删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let ids = this.multipleSelection.map((item) => {
              return item.id
            })
            const res = await this.$api.patrolApi.pmcPatrolPointDeletebatch(ids)
            if (res) {
              this.$message.success('删除成功~')
              this.getList()
            }
          })
          .catch(() => {
          })
      },

      /**
       * 删除
       */
      onDel(id) {
        this.$confirm('是否继续删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            const res = await this.$api.patrolApi.pmcPatrolPointDelete({id})
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
  }

</style>

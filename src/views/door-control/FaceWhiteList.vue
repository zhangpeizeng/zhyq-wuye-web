<template>
  <div class="door-white-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-input
          v-model="query.name"
          size="medium"
          placeholder="请输入姓名"
        ></el-input>
        <el-input
          size="medium"
          v-model="query.idNumber"
          placeholder="请输入身份证号"
        ></el-input>
        <el-select
          v-model="query.accessEnable"
          placeholder="是否授权"
        >
          <el-option
            label="是"
            :value="1"
          />
          <el-option
            label="否"
            :value="2"
          />
        </el-select>
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
        <el-button
          type="success"
          @click="$router.push({name:'doorFaceEdit'})"
          size="medium"
          icon="el-icon-plus"
        >新增</el-button>
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
          label="姓名"
        />
        <el-table-column
          prop="faceUrl"
          label="人脸照片"
        >
          <template slot-scope="scope">
            <el-image
              style="width:100px;height:100px"
              :src="scope.row.faceUrl"
              :preview-src-list="[scope.row.faceUrl]"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式"
        />
        <el-table-column
          prop="idNumber"
          label="身份证号"
        />
        <el-table-column
          prop="address"
          label="详细地址"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="text"
              @click="onDel(scope.row.id)"
            >删除</el-button>
            <el-button
              type="text"
              size="medium"
              @click="$router.push({name:'doorFaceEdit',query:{id:scope.row.id}})"
            >人脸配置</el-button>
            <!-- <el-button
              size="medium"
              type="text"
              @click="updateFace(scope.row.id,scope.row.status)"
            >{{ scope.row.status === 1?'停用':'启用' }}</el-button> -->
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
  data () {
    return {
      showDialog: false,
      list: [],
      query: {
        idNumber: '',
        name: '',
        accessEnable: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async updateFace (id, status) {
      status = status === 1 ? 2 : 1
      const res = await this.$api.doorApi.updateFace({ id, status })
      if (res) {
        this.$message.success('修改成功~')
        this.getList()
      }
    },
    onReset () {
      this.query = {
        idNumber: '',
        name: '',
        accessEnable: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
    async getList () {
      const res = await this.$api.doorApi.getFaceList(this.query)
      this.list = [...res.data]
      this.query.total = +res.total
    },
    async onDel (id) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$api.doorApi.delFace({ id })
          if (res) {
            this.$message.success('删除成功~')
            this.getList()
          }
        })
        .catch(() => {})
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
.door-white-list {
  &::v-deep .el-icon-circle-close {
    color: #fff;
  }
  width: 100%;
}
</style>

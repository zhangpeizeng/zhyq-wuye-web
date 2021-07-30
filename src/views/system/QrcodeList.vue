<template>
  <div class="system-qrcode-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-input
          v-model="query.code"
          placeholder="请输入编码"
        ></el-input>
        <el-input
          v-model="query.name"
          placeholder="请输入名称"
        ></el-input>
      </div>
      <div class="btn-wrap flex-between">
        <div>
          <el-button
            type="primary"
            @click="getList"
            size="mini"
          >查询</el-button>
          <el-button
            @click="onReset"
            size="mini"
          >重置</el-button>
        </div>
        <el-button
          type="primary"
          @click="showAddDialog = true"
          size="mini"
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
          prop="code"
          label="编码"
        />
        <el-table-column
          prop="name"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          prop="url"
          label="二维码图片"
        >
          <template slot-scope="scope">
            <el-image
              style="width:100px;height:100px"
              :src="scope.row.url"
              :preview-src-list="[scope.row.url]"
            />
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="onDel(scope.row.id)"
            >删除</el-button>
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
      title="新增"
      @close="onCloseDialog"
      :visible.sync="showAddDialog"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">编码：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.code"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">名称：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.name"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">描述：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.description"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">二维码图片：</div>
          <div>
            <el-upload
              :headers="{Authorization:$store.getters.token}"
              :file-list="fileList"
              accept=".png,.jpg"
              :limit="1"
              action="/zhyq-admin/upload/uploadFile"
              list-type="picture-card"
              :on-preview="onPreview"
              :on-success="onUploadSuccess"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog
              :visible.sync="previewDialog"
              append-to-body
            >
              <img
                width="100%"
                :src="add.url"
                alt=""
              >
            </el-dialog>
            <el-alert
              show-icon
              :closable="false"
              title="建议上传： 200 * 200 尺寸图片，大小在 10M 以内"
              type="warning"
            />
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          type="primary"
          @click="onAdd"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getQrcodeList, addQrcode, delQrcode } from '@/api/systemApi'
export default {
  components: {},
  data () {
    return {
      showAddDialog: false,
      previewDialog: false,
      fileList: [],
      list: [],
      query: {
        code: '',
        name: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      add: {
        url: '',
        code: '',
        name: '',
        description: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    onUploadSuccess (res, file) {
      this.$set(this.add, 'url', res.responseData.url)
    },
    onPreview (file) {
      this.previewDialog = true
    },
    async onAdd () {
      if (
        !this.add.url ||
        !this.add.code ||
        !this.add.name ||
        !this.add.description
      ) {
        this.$message.warning('请完善表单')
        return
      }
      const res = await addQrcode(this.add)
      if (res) {
        this.showAddDialog = false
        this.$message.success('添加成功~')
        this.getList()
      }
    },
    onCloseDialog () {
      this.add = {
        url: '',
        code: '',
        name: '',
        description: ''
      }
      this.fileList = []
    },
    onReset () {
      this.query = {
        code: '',
        name: '',
        currentPage: 1,
        pageSize: 10,
        total: this.query.total
      }
    },
    async getList () {
      const res = await getQrcodeList(this.query)
      this.list = [...res.data]
      this.query.total = +res.total
    },
    onDel (id) {
      this.$confirm('此操作将永久删除该二维码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delQrcode({ id })
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
        document.body.getElementsByClassName('system-qrcode-list')[0]
      ) {
        this.getList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.system-qrcode-list {
  &::v-deep .el-icon-circle-close {
    color: #fff;
  }
  width: 100%;
  .filter-wrap {
    .form-wrap {
      > div {
        width: 20%;
        margin-bottom: 24px;
        margin-right: 24px;
      }
    }
    .btn-wrap {
      margin-bottom: 24px;
    }
  }
  .content-wrap {
  }
  .dialog-wrap {
    > div {
      margin-bottom: 24px;
    }
    .label {
      width: 100px;
      margin-right: 40px;
      text-align: right;
      position: relative;
      &::before {
        content: "*";
        position: absolute;
        right: -5px;
        color: red;
      }
    }
  }
}
</style>

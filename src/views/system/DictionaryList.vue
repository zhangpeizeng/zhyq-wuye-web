<template>
  <div class="system-dictionary-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-input
          v-model="query.typeCode"
          placeholder="请输入字典编码"
        ></el-input>
        <el-input
          v-model="query.typeValue"
          placeholder="请输入字典名称"
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
          prop="typeCode"
          label="字典编码"
        />
        <el-table-column
          prop="typeValue"
          label="字典名称"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
        />
        <el-table-column
          prop="creatorName"
          label="创建人"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          prop="updatorName"
          label="修改人"
        />
        <el-table-column
          prop="updateTime"
          label="修改时间"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="onDel(scope.row.id)"
            >删除</el-button>
            <el-button
              size="mini"
              type="text"
              @click="$router.push({name:'sysDictionaryDetail',query:{code:scope.row.typeCode}})"
            >编辑字典值</el-button>
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
      title="新增字典类型"
      @close="onCloseDialog"
      :visible.sync="showAddDialog"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">字典编码：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.typeCode"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">字典名称：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.typeValue"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">备注：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.remark"
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
          @click="onAdd"
          size="mini"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDictionaryTypeList,
  addDictionaryType,
  delDictionaryType
} from '@/api/systemApi'
export default {
  components: {},
  data () {
    return {
      showAddDialog: false,
      list: [],
      query: {
        typeCode: '',
        typeValue: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      add: {
        typeCode: '',
        typeValue: '',
        remark: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async onAdd () {
      if (!this.add.typeCode) {
        this.$message.warning('请输入字典编码')
        return
      }
      if (!this.add.typeValue) {
        this.$message.warning('请输入字典名称')
        return
      }
      if (!this.add.remark) {
        this.$message.warning('请输入备注')
        return
      }
      const res = await addDictionaryType(this.add)
      if (res) {
        this.getList()
        this.$message.success('添加成功~')
        this.showAddDialog = false
      }
    },
    onCloseDialog () {
      this.add = { typeCode: '', typeValue: '', remark: '' }
    },
    onReset () {
      this.query = {
        typeCode: '',
        typeValue: '',
        currentPage: 1,
        pageSize: 10,
        total: this.query.total
      }
    },
    async getList () {
      const res = await getDictionaryTypeList(this.query)
      this.query.total = +res.total
      this.list = [...res.data]
    },
    onDel (id) {
      this.$confirm('此操作将永久删除该字典, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delDictionaryType({ id })
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
        document.body.getElementsByClassName('system-dictionary-list')[0]
      ) {
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.system-dictionary-list {
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

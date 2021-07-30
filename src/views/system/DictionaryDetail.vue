<template>
  <div class="system-dictionary-edit">
    <div class="flex-between">
      <div>
        <el-page-header
          @back="$router.go(-1)"
          content="编辑字典值"
        >
        </el-page-header>
      </div>
      <el-button
        type="primary"
        @click="showAddDialog = true"
        size="mini"
      >新增</el-button>
    </div>

    <el-table
      stripe
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
      />
      <el-table-column
        prop="contentCode"
        label="key"
      >
      </el-table-column>
      <el-table-column
        prop="contentValue"
        label="value"
      />
      <el-table-column
        prop="typeCode"
        label="父序号"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="80"
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
    <el-dialog
      title="添加值"
      @close="onCloseDialog"
      :visible.sync="showAddDialog"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">key：</div>
          <div>
            <el-input
              size="mini"
              v-model="add.contentCode"
            />
          </div>
        </div>
        <div class="flex">
          <div class="label">value：</div>
          <div>
            <el-input
              size="mini"
              v-model="add.contentValue"
            />
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
          @click="onAdd"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { USER_ROLES } from '@/utils/variable'
import {
  getDictionaryValList,
  addDictionaryVal,
  delDictionaryVal
} from '@/api/systemApi'
export default {
  data () {
    return {
      code: undefined,
      showAddDialog: false,
      list: [],
      centerList: [...USER_ROLES],
      query: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        typeCode: undefined
      },
      add: {
        contentCode: '',
        contentValue: '',
        typeCode: undefined
      }
    }
  },
  created () {
    this.code = this.$route.query.code
    this.$set(this.query, 'typeCode', this.code)
    this.$set(this.add, 'typeCode', this.code)
    this.getList()
  },
  methods: {
    onCloseDialog () {
      this.add = {
        contentCode: '',
        contentValue: '',
        typeCode: this.code
      }
    },
    async onAdd () {
      if (!this.add.contentCode) {
        this.$message.warning('请输入key')
        return
      }
      if (!this.add.contentValue) {
        this.$message.warning('请输入value')
        return
      }
      const res = await addDictionaryVal(this.add)
      if (res) {
        this.$message.success('添加成功~')
        this.getList()
        this.showAddDialog = false
      }
    },
    async getList () {
      const res = await getDictionaryValList(this.query)
      this.query.total = +res.total
      this.list = [...res.data]
    },
    onDel (id) {
      this.$confirm('此操作将永久删除该字典值, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delDictionaryVal({ id })
          if (res) {
            this.$message.success('删除成功~')
            this.getList()
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.system-dictionary-edit {
  width: 100%;
}
.title {
  margin: 24px;
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
</style>

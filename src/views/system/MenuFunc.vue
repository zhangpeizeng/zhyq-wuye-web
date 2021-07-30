<template>
  <div class="system-menu-func">
    <div class="flex-between">
      <div>
        <el-page-header
          @back="$router.go(-1)"
          content="功能列表"
        >
        </el-page-header>
      </div>
      <el-button
        icon="el-icon-plus"
        type="primary"
        @click="openDialog(false)"
        size="mini"
      >新增</el-button>
    </div>

    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-input
          v-model="query.functionCode"
          placeholder="请输入功能标识"
        ></el-input>
        <el-input
          v-model="query.functionName"
          placeholder="请输入功能名称"
        ></el-input>
        <el-select
          v-model="query.functionType"
          placeholder="请选择功能类型"
        >
          <el-option
            label="后台菜单"
            :value="1"
          />
          <el-option
            label="其他"
            :value="2"
          />
        </el-select>
      </div>
      <div class="btn-wrap">
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
    </div>
    <div class="content-wrap">
      <el-table
        stripe
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="functionCode"
          label="功能标识"
        />
        <el-table-column
          prop="functionName"
          label="功能名称"
        >
        </el-table-column>
        <el-table-column
          prop="functionUrl"
          label="功能路径"
        />
        <el-table-column
          prop="functionTypeValue"
          label="功能类型"
        />
        <el-table-column
          prop="ruleValue"
          label="访问规则"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openDialog(scope.row)"
              type="text"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="onDel(scope.row.id)"
              type="text"
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
      :title="isEdit?'编辑功能':'新增功能'"
      @close="onCloseDialog"
      :visible.sync="showDialog"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">功能标识：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.functionCode"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">功能名称：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.functionName"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">功能路径：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.functionUrl"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">功能类型：</div>
          <div>
            <el-select
              v-model="add.functionType"
              placeholder="请选择"
            >
              <el-option
                label="后台菜单"
                :value="1"
              />
              <el-option
                label="移动端菜单"
                :value="2"
              />
            </el-select>
          </div>
        </div>
        <div class="flex">
          <div class="label">访问规则：</div>
          <div>
            <el-select
              v-model="add.rule"
              placeholder="请选择"
            >
              <el-option
                label="公开访问"
                :value="1"
              />
              <el-option
                label="登陆后访问"
                :value="2"
              />
              <el-option
                label="登录并授权访问"
                :value="3"
              />
            </el-select>
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
          @click="onAddFunc"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getFuncList, delFunc, addFunc, editFunc } from '@/api/systemApi'
export default {
  components: {},
  data () {
    return {
      id: undefined,
      showDialog: false,
      list: [],
      query: {
        menuId: undefined,
        functionCode: '',
        functionName: '',
        functionType: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      add: {
        menuId: undefined,
        functionCode: '',
        functionName: '',
        functionUrl: '',
        functionType: 1,
        rule: 3
      },
      isEdit: false
    }
  },
  created () {
    this.id = this.$route.query.id
    this.$set(this.query, 'menuId', this.id)
    this.$set(this.add, 'menuId', this.id)
    this.getList()
  },
  methods: {
    openDialog (row) {
      this.showDialog = true
      if (row) {
        this.isEdit = true
        this.add.functionCode = row.functionCode
        this.add.functionName = row.functionName
        this.add.functionUrl = row.functionUrl
        this.add.functionType = row.functionType
        this.add.rule = row.rule
        this.add.id = row.id
      }
    },
    async onAddFunc () {
      if (!this.add.functionCode) {
        this.$message.error('请输入功能标识')
        return
      }
      if (!this.add.functionName) {
        this.$message.error('请输入功能名称')
        return
      }
      if (!this.add.functionUrl) {
        this.$message.error('请输入功能路径')
        return
      }
      if (this.isEdit) {
        const res = await editFunc(this.add)
        if (res) {
          this.getList()
          this.$message.success('添加成功~')
          this.showDialog = false
        }
        return
      }
      const res = await addFunc(this.add)
      if (res) {
        this.getList()
        this.$message.success('添加成功~')
        this.showDialog = false
      }
    },
    async getList () {
      const res = await getFuncList(this.query)
      this.query.total = +res.total
      this.list = res.data.map((item) => {
        item.functionTypeValue = { 1: '后台菜单', 2: '其他' }[
          item.functionType
        ]
        item.ruleValue = {
          1: '公开访问',
          2: '登陆后访问',
          3: '登陆后并授权访问'
        }[item.rule]
        return item
      })
    },
    onDel (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delFunc({ id })
          if (res) {
            this.$message.success('删除成功~')
            this.getList()
          }
        })
        .catch(() => {})
    },
    onCloseDialog () {
      this.add = {
        menuId: this.id,
        functionCode: '',
        functionName: '',
        functionUrl: '',
        functionType: 1,
        rule: 3
      }
      this.isEdit = false
    },
    onReset () {
      this.query = {
        menuId: undefined,
        functionCode: '',
        functionName: '',
        functionType: '',
        currentPage: 1,
        pageSize: 10,
        total: this.query.total
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.system-menu-func {
  width: 100%;
  .filter-wrap {
    margin-top: 24px;
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

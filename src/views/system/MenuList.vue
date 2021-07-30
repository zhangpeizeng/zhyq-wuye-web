<template>
  <div class="system-menu-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <!-- <el-input
          v-model="query.input2"
          placeholder="请输入菜单名称"
        ></el-input>
        <el-button
          type="primary"
          @click="getList"
        >查询</el-button> -->
        <el-button
          type="primary"
          @click="onOpenDialog(0)"
          size="mini"
        >添加一级菜单</el-button>
      </div>
    </div>
    <div class="content-wrap">
      <el-table
        row-key="id"
        :data="list"
        style="width: 100%"
        :tree-props="{children: 'subs'}"
      >
        <el-table-column
          prop="title"
          label="菜单名称"
        >
        </el-table-column>
        <el-table-column
          prop="menuTypeName"
          label="菜单类型"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="onOpenDialog(scope.row.id,true)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="onOpenDialog(scope.row.id)"
            >添加</el-button>
            <el-button
              size="mini"
              type="text"
              @click="onDel(scope.row.id)"
            >删除</el-button>
            <el-button
              size="mini"
              type="text"
              @click="$router.push({name:'sysMenuFunc',query:{id:scope.row.id}})"
              v-if="scope.row.subs.length === 0"
            >功能</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="isEdit?'编辑菜单':'新建菜单'"
      @close="onCloseDialog"
      :visible.sync="showAddDialog"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">菜单名称：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="query.menuName"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">菜单地址：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="query.menuUrl"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">菜单图标：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="query.menuIcon"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">是否隐藏菜单：</div>
          <div>
            <el-select
              v-model="query.isHidden"
              placeholder="请选择"
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
        </div>
        <div class="flex">
          <div class="label">访问规则：</div>
          <div>
            <el-select
              v-model="query.rule"
              placeholder="请选择"
            >
              <!-- <el-option
                label="登录后访问"
                :value="1"
              /> -->
              <el-option
                label="登录并授权访问"
                :value="2"
              />
            </el-select>
          </div>
        </div>
        <div class="flex">
          <div class="label">菜单类型：</div>
          <div>
            <el-select
              v-model="query.menuType"
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
          <div class="label">菜单序列(修改后请重新登录)：</div>
          <div>
            <el-input-number
              v-model="query.sort"
              :min="1"
            ></el-input-number>
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
  getMenuList,
  addMenuItem,
  delMenuItem,
  getMenuDetail,
  editMenu
} from '@/api/systemApi'
export default {
  components: {},
  data () {
    return {
      options: [...USER_ROLES],
      showAddDialog: false,
      isEdit: false,
      list: [],
      query: {
        menuName: '',
        menuUrl: '',
        menuIcon: 'icon-',
        parentMenuId: '',
        isHidden: 2,
        rule: 2,
        menuType: 1,
        sort: undefined
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async onOpenDialog (id, isEdit) {
      this.showAddDialog = true
      if (isEdit) {
        this.isEdit = true
        const res = await getMenuDetail({ id })
        this.query = {
          id: id,
          menuName: res.menuName,
          menuUrl: res.menuUrl,
          menuIcon: res.menuIcon,
          parentMenuId: res.parentMenuId,
          isHidden: res.isHidden,
          rule: res.rule,
          menuType: res.menuType,
          sort: +res.sort
        }
        return
      }
      if (id === 0) {
        this.$set(this.query, 'parentMenuId', '')
        return
      }
      this.$set(this.query, 'parentMenuId', id)
    },
    async onAdd () {
      if (!this.query.menuName || !this.query.menuUrl || !this.query.menuIcon) {
        this.$message.warning('请完善表单~')
        return
      }
      if (this.isEdit) {
        const res = await editMenu(this.query)
        if (res) {
          this.showAddDialog = false
          this.$message.success('修改成功~')
          this.getList()
        }
        return
      }
      const res = await addMenuItem(this.query)
      if (res) {
        this.showAddDialog = false
        this.$message.success('添加成功~')
        this.getList()
      }
    },
    onCloseDialog () {
      this.query = {
        menuName: '',
        menuUrl: '',
        menuIcon: 'icon-',
        parentMenuId: '',
        isHidden: 2,
        rule: 2,
        menuType: 1,
        sort: undefined
      }
      this.isEdit = false
    },
    async getList () {
      const res = await getMenuList()
      this.list = [...res]
    },
    onDel (id) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delMenuItem({ id })
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

<style lang="scss" scoped>
.system-menu-list {
  width: 100%;
  .filter-wrap {
    .form-wrap {
      > div {
        width: 20%;
        margin-right: 24px;
      }
    }
  }
  .content-wrap {
    margin-top: 40px;
  }
  .dialog-wrap {
    > div {
      margin-bottom: 12px;
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

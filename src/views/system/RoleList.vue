<template>
  <div class="system-role-list">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <el-input
          v-model="query.roleCode"
          placeholder="请输入角色编码"
        ></el-input>
        <el-input
          v-model="query.roleName"
          placeholder="请输入角色名称"
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
          @click="showAddRole=true"
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
          prop="roleCode"
          label="角色编码"
        />
        <el-table-column
          prop="roleName"
          label="角色名称"
        >
        </el-table-column>
        <el-table-column
          prop="roleType"
          label="角色类别"
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
          fixed="right"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onDel(scope.row.id)"
              type="text"
            >删除</el-button>
            <el-button
              size="mini"
              type="text"
              @click="openUpdatePermission(scope.row.id,1)"
            >菜单权限</el-button>
            <el-button
              size="mini"
              type="text"
              @click="openUpdatePermission(scope.row.id,2)"
            >数据权限</el-button>
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
      title="新增角色"
      @close="onCloseDialog"
      :visible.sync="showAddRole"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">角色编码：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.roleCode"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">角色名称：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.roleName"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">角色类别：</div>
          <div>
            <el-select
              v-model="add.roleType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
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
          @click="onAddRole"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改权限"
      @close="onCloseDialog"
      :visible.sync="showUpdatePermission"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex-center-y">
          <div>请选择权限范围：</div>
          <el-select
            v-if="updateType===2"
            v-model="dataType"
            placeholder="请选择权限范围"
          >
            <el-option
              label="全部数据权限"
              :value="1"
            />
            <el-option
              label="自定义数据权限"
              :value="2"
            />
            <el-option
              label="本部门数据权限"
              :value="3"
            />
            <el-option
              label="本部门及以下数据权限"
              :value="4"
            />
            <el-option
              label="仅本人数据权限"
              :value="5"
            />
          </el-select>
        </div>
        <div
          class="flex"
          v-if="dataType===2"
        >
          <div style="margin-right:12px">父子联动</div>
          <el-switch
            v-model="treeLink"
          >
          </el-switch>
        </div>
        <el-tree
          v-if="updateType===1 || dataType===2"
          :data="tree"
          show-checkbox
          :node-key="nodeKey"
          ref="tree"
          :check-strictly="!treeLink"
          highlight-current
          :props="defaultProps"
          :default-checked-keys="defaultChecked"
        >
        </el-tree>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="onUpdatePermission"
          size="mini"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  ROLE_TYPES,
  ROLE_TYPES_MAP,
  getRoleList,
  addRole,
  delRole,
  setMenuPermission,
  setDataPermission,
  getMenuPermissionList,
  getDataPermissionList
} from '@/api/systemApi'

export default {
  components: {},
  data () {
    return {
      treeLink: true, // 是否父子联动
      roleId: undefined,
      updateType: undefined, // dialog 1=>菜单 2=>数据
      dataType: 1, // 数据权限范围
      showAddRole: false,
      showUpdatePermission: false,
      list: [],
      options: [...ROLE_TYPES],
      query: {
        roleName: '',
        roleCode: '',
        roleSource: 1,
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      add: {
        roleCode: '',
        roleName: '',
        roleType: ''
      },
      tree: [],
      defaultChecked: [],
      defaultProps: {},
      nodeKey: ''
    }
  },
  created () {
    this.getList()
  },
  watch: {
    updateType (val) {
      if (val === 1) {
        this.defaultProps = {
          children: 'children',
          label: 'menuName'
        }
        this.nodeKey = 'menuId'
      } else {
        this.defaultProps = {
          children: 'childrens',
          label: 'orgName'
        }
        this.nodeKey = 'id'
      }
    }
  },
  methods: {
    async onAddRole () {
      if (!this.add.roleCode) {
        this.$message.error('请输入角色编码')
        return
      }
      if (!this.add.roleName) {
        this.$message.error('请输入角色名称')
        return
      }
      if (!this.add.roleType) {
        this.$message.error('请选择角色类别')
        return
      }
      const res = await addRole(this.add)
      if (res) {
        this.getList()
        this.$message.success('添加成功~')
        this.showAddRole = false
      }
    },
    onCloseDialog () {
      this.add = {
        roleCode: '',
        roleName: '',
        roleType: ''
      }
      this.tree = []
      this.defaultChecked = []
      this.updateType = undefined
      this.dataType = 1
    },
    async onUpdatePermission () {
      // 1=>菜单 2=>数据
      if (this.updateType === 1) {
        const a = this.$refs.tree
          .getCheckedNodes(false, true)
          .map((item) => item.menuId)
        const res = await setMenuPermission({ id: this.roleId, authed: a })
        if (res) {
          this.$message.success('修改成功~')
          this.showUpdatePermission = false
        }
      } else {
        let a = []
        if (this.dataType === 2) {
          a = this.$refs.tree
            .getCheckedNodes(false, false)
            .map((item) => item.id)
        }
        const res = await setDataPermission({
          id: this.roleId,
          authed: a,
          dataScope: this.dataType
        })
        if (res) {
          this.$message.success('修改成功~')
          this.showUpdatePermission = false
        }
      }
    },
    async openUpdatePermission (id, type) {
      this.roleId = id
      this.updateType = type
      if (type === 1) {
        const res = await getMenuPermissionList({ id })
        this.tree = res.treeData
        this.defaultChecked = res.authed
      } else {
        const res = await getDataPermissionList({ id })
        this.tree = res.orgs
        this.dataType = res.dataScope
        this.defaultChecked = res.authed
      }
      this.showUpdatePermission = true
    },
    onReset () {
      // 重置
      this.query = {
        roleName: '',
        roleCode: '',
        currentPage: 1,
        roleSource: 1,
        pageSize: 10,
        total: this.query.total
      }
    },
    async getList () {
      const res = await getRoleList(this.query)
      this.query.total = +res.total
      this.list = res.data.map((item) => {
        item.roleType = ROLE_TYPES_MAP[item.roleType]
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
          const res = await delRole({ id })
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
        document.body.getElementsByClassName('system-role-list')[0]
      ) {
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.system-role-list {
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

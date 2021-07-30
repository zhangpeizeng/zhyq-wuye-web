<template>
  <div class="system-org-list">
    <div class="filter-wrap flex-center-y">
      <div style="width:120px">输入组织名称检索：</div>
      <el-input
        style="width:260px"
        v-model.trim="orgName"
        placeholder="请输入组织名称"
        clearable
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
          @click="orgName=''"
          size="mini"
        >重置</el-button>
      </div>
      <el-button
        type="primary"
        size="mini"
        @click="onOpenDialog(0)"
      >添加一级组织</el-button>
    </div>
    <div class="content-wrap">
      <el-table
        row-key="id"
        :data="list"
        :tree-props="{children: 'childrens'}"
        style="width: 100%"
      >
        <el-table-column
          prop="orgName"
          label="组织名称"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="isEdit?'编辑组织':'新建组织'"
      @close="onCloseDialog"
      :visible.sync="showDialog"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrap">
        <div class="flex">
          <div class="label">组织机构名：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.orgName"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">组织机构编码：</div>
          <div>
            <el-input
              :disabled="isEdit"
              placeholder="请输入"
              v-model="add.orgCode"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">组织机构描述：</div>
          <div>
            <el-input
              placeholder="请输入"
              v-model="add.orgDescribe"
            >
            </el-input>
          </div>
        </div>
        <div class="flex">
          <div class="label">组织类型：</div>
          <div>
            <el-select
              v-model="add.orgType"
              placeholder="请选择"
            >
              <el-option
                label="企业级"
                :value="1"
              />
              <!-- <el-option
                label="非企业级"
                :value="2"
              /> -->
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
          @click="onAdd"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrgList,
  addOrg,
  delOrg,
  editOrg,
  getOrgDetail,
  formatTree
} from '@/api/systemApi'
export default {
  data () {
    return {
      title: '',
      isEdit: false,
      showDialog: false,
      list: [],
      orgName: '',
      add: {
        parentOrgId: '',
        orgName: '',
        orgCode: '',
        orgDescribe: '',
        orgType: 1
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async onAdd () {
      if (!this.add.orgName || !this.add.orgCode || !this.add.orgDescribe) {
        this.$message.warning('请完善表单~')
        return
      }
      if (this.isEdit) {
        const res = await editOrg(this.add)
        if (res) {
          this.showDialog = false
          this.$message.success('修改成功~')
          this.getList()
        }
        return
      }
      const res = await addOrg(this.add)
      if (res) {
        this.showDialog = false
        this.$message.success('添加成功~')
        this.getList()
      }
    },
    async onOpenDialog (id, isEdit) {
      this.showDialog = true
      if (isEdit) {
        this.isEdit = true
        const res = await getOrgDetail({ id })
        this.add = {
          id: id,
          orgName: res.orgName,
          orgCode: res.orgCode,
          orgDescribe: res.orgDescribe,
          orgType: res.orgType,
          parentOrgId: res.parentOrgId
        }
        return
      }
      if (id === 0) {
        this.$set(this.add, 'parentOrgId', '')
        return
      }
      this.$set(this.add, 'parentOrgId', id)
    },
    onCloseDialog () {
      this.add = {
        parentOrgId: '',
        orgName: '',
        orgCode: '',
        orgDescribe: '',
        orgType: 1
      }
      this.isEdit = false
    },
    onDel (id) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delOrg({ id })
          if (res) {
            this.$message.success('删除成功~')
            this.getList()
          }
        })
        .catch(() => {})
    },
    async getList () {
      const query = { orgType: 1, orgName: this.orgName }
      if (this.$store.getters.isAdmin) {
      } else {
        const id = this.$store.getters.userInfo.orgIds[0].id
        query.id = id
      }
      const res = await getOrgList(query)
      this.list = formatTree(res, 'id', 'parentOrgId', 'childrens')
    }
  },
  mounted () {
    document.onkeydown = (e) => {
      if (
        e.keyCode === 13 &&
        document.body.getElementsByClassName('system-org-list')[0]
      ) {
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.system-org-list {
  width: 100%;
  .filter-wrap {
    margin-bottom: 24px;
    > div {
      margin-right: 24px;
    }
  }
  .content-wrap {
    margin-top: 40px;
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

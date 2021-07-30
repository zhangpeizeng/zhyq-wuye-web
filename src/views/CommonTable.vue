<template>
  <div class="xxx-wrap">
    <div class="filter-wrap">
      <div class="form-wrap flex-wrap">
        <div class="item">
          <div class="label">企业名称：</div>
          <div class="form-item">
            <el-input
              v-model="query.input1"
              placeholder="请输入企业名称"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="label">企业法人：</div>
          <div class="form-item">
            <el-input
              v-model="query.input2"
              placeholder="请输入企业法人"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="label">账号：</div>
          <div class="form-item">
            <el-input
              v-model="query.input2"
              placeholder="请输入账号"
            ></el-input>
          </div>
        </div>

        <div class="item">
          <div class="label">日期：</div>
          <div class="form-item">
            <el-date-picker
              v-model="query.date"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              align="right"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <el-button
          type="primary"
          @click="getList"
        >查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </div>
    </div>
    <div class="content-wrap">
      <el-table
        stripe
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="名称"
        />
        <el-table-column
          prop="name"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="法人"
        />
        <el-table-column
          prop="address"
          label="创建人"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="500"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="onLook(scope.row)"
            >删除</el-button>
            <el-button size="mini">详情</el-button>
            <el-button
              size="mini"
              type="success"
              plain
            >启用</el-button>
            <el-button
              size="mini"
              type="success"
              plain
            >编辑</el-button>
            <el-button
              size="mini"
              type="success"
              plain
            >重置密码</el-button>
            <el-button
              size="mini"
              type="success"
              plain
            >修改角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:24px"
        @size-change="getList"
        @current-change="getList"
        :current-page.sync="query.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="query.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total.sync="query.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { USER_ROLES } from '@/utils/variable'
export default {
  components: {},
  data () {
    return {
      list: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      options: [...USER_ROLES],
      query: {
        input1: '',
        input2: '',
        date: [],
        select: '',
        currentPage: 1,
        pageSize: 10,
        total: 100
      }
    }
  },
  computed: {
    data () {
      return {
        a: this.query.input1
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    onLook () {
      const href = this.$router.resolve({
        name: `sysAccountDetail`,
        query: {
          id: 1
        }
      })
      window.open(href, '_blank')
      this.$router.push({ name: 'Edit' })
    },
    onReset () {
      // 重置
      this.query = {
        input1: '',
        input2: '',
        date: [],
        select: '',
        currentPage: 1,
        pageSize: 10,
        total: this.query.total
      }
    },
    async getList () {
      // 请求列表
      console.log(this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.xxx-wrap {
  width: 100%;
  .filter-wrap {
    .form-wrap {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        margin-right: 24px;
        .label {
          margin-right: 14px;
        }
        .form-item {
          flex: 1;
        }
      }
    }
    .btn-wrap {
      margin-bottom: 24px;
    }
  }
  .content-wrap {
  }
}
</style>

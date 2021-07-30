<template>
  <div class="system-account-detail">
    <div class="flex-between">
      <el-page-header
        @back="$router.go(-1)"
        content="查看详情"
      >
      </el-page-header>
      <div>数据更新时间：{{ info.updateTime || '-' }}</div>
    </div>
    <div class="content-wrap">
      <div class="base-info-wrap">
        <div
          style="margin:24px 0"
          class="f600"
        >基础信息</div>
        <div class="flex">
          <el-image
            fit="contain"
            style="width:200px;height:200px"
            :preview-src-list="[info.companyImg]"
            v-if="info.companyImg"
            :src="info.companyImg"
          ></el-image>
          <ul>
            <li>
              <div class="label">名称</div>
              <div class="value">{{ info.companyName }}</div>
            </li>
            <li>
              <div class="label">法人</div>
              <div class="value">{{ info.legalPerson }}</div>
            </li>
            <li>
              <div class="label">企业类型</div>
              <div class="value">{{ info.companyTypeName }}</div>
            </li>
            <li>
              <div class="label">联系方式</div>
              <div class="value">{{ info.phoneNo }}</div>
            </li>
            <li>
              <div class="label">身份证号</div>
              <div class="value">{{ info.idCard }}</div>
            </li>
            <li>
              <div class="label">注册地址类型</div>
              <div class="value">{{ info.registerAddressTypeName }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="account-info-wrap">
        <div
          style="margin:24px 0"
          class="f600"
        >账号信息</div>
        <ul class="flex-wrap">
          <li>
            <div class="label">账号</div>
            <div class="value">{{ info.accountName }}</div>
          </li>
          <li>
            <div class="label">账号状态</div>
            <div class="value">{{ info.status }}</div>
          </li>
          <li>
            <div class="label">创建日期</div>
            <div class="value">{{ info.createTime }}</div>
          </li>
          <li>
            <div class="label">创建人</div>
            <div class="value">{{ info.creatorName }}</div>
          </li>
          <li>
            <div class="label">账号角色</div>
            <div class="value">{{ info.roleValues }}</div>
          </li>
          <li>
            <div class="label">账号服务期限</div>
            <div class="value">{{ info.contractExpiryTime }}</div>
          </li>
          <li>
            <div class="label">剩余时长</div>
            <div class="value">{{ info.remainingTime }}</div>
          </li>
        </ul>
      </div>
      <div class="btn-wrap">
        <el-button
          icon="el-icon-edit"
          type="primary"
          @click="$router.push({name:'sysAccountAdd',query:{id:$route.query.id}})"
        >
          编辑
        </el-button>
        <!-- <el-button
          icon="el-icon-refresh"
          style="margin-left: 20px;"
          type="primary"
        >
          密码重置
        </el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAccountDetail,
  getAllRoleList
} from '@/api/systemApi'
export default {
  data () {
    return {
      info: {}
    }
  },
  async created () {
    await this.getRoleList()
    await this.getDetail()
  },
  methods: {
    async getDetail () {
      const res = await getAccountDetail({ id: this.$route.query.id })
      res.status = { 1: '正常', 2: '锁定' }[res.status]
      res.contractExpiryTime = res.contractExpiryTime.split(' ')[0]
      const roleValues = []
      res.roleIds.map((item) => {
        this.roleOptions.map((jtem) => {
          if (item === jtem.id) {
            roleValues.push(jtem.roleName)
          }
        })
      })
      res.roleValues = roleValues.join(',')
      this.info = res
    },
    async getRoleList () {
      const res = await getAllRoleList({ roleSource: 1 })
      this.roleOptions = [...res]
    }
  }
}
</script>

<style scoped lang="scss">
.system-account-detail {
  &::v-deep .el-icon-circle-close {
    color: #fff;
  }
  width: 100%;
  .content-wrap {
    margin-top: 24px;
    .base-info-wrap {
      ul {
        margin-left: 40px;
        li {
          display: flex;
          margin-bottom: 12px;
          .label {
            margin-right: 40px;
            width: 100px;
            font-size: 14px;
            text-align: right;
          }
        }
      }
    }
    .account-info-wrap {
      margin: 40px 0;
      ul {
        li {
          margin-right: 30px;
          margin-bottom: 20px;
          display: flex;
          .label {
            width: 100px;
            margin-right: 40px;
            text-align: right;
          }
          .value {
            width: 200px;
          }
        }
      }
    }
  }
}
</style>

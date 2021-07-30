<template>
  <div class="owner-register">
    <div>
      <div class="sub-title">业主信息登记业务办理支持对房屋/车位的业主信息进行新增及变更操作</div>
      <el-alert
        title="温馨提示：业主信息成功变更后，变更对象关联的租户、家属、委托人、车辆、单位等信息一并解绑"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
    </div>
    <div class="steps">
      <el-steps :active="active" align-center >
        <el-step>
          <div slot="title" class="steps-title">登记变更对象选择</div>
          <div slot="description" class="text">选择登记变更对象信息</div>
        </el-step>
        <el-step>
          <div slot="title" class="steps-title">登记变更对象核验</div>
          <div slot="description" class="text">核验登记变更对象信息</div>
        </el-step>
        <el-step>
          <div slot="title" class="steps-title">业主信息登记</div>
          <div slot="description" class="text">登记业主信息</div>
        </el-step>
        <el-step>
          <div slot="title" class="steps-title">登记完成</div>
          <div slot="description" class="text">业务办理成功</div>
        </el-step>
      </el-steps>
    </div>
    <register-first v-show="active === 1" @toSecondPage="toNext" :type="1" />
    <register-second v-show="active === 2" @toSecondPage="toNext" :roomId="roomId" :type="1" />
    <register-third
      v-show="active === 3"
      @toSecondPage="toNext"
      :roomId="roomId"
      :type="1"
      :titleList="titleList"
      :personType="personType"
      :roomObject="roomObject"
      :updateId="updateId"
      :ownerInfo="ownerInfo"
    />
    <register-fourth v-show="active === 4"></register-fourth>
    <template>
      <el-backtop target=".root-right" :bottom="100"></el-backtop>
    </template>
  </div>
</template>

<script>
import RegisterFirst from './component/RegisterFirst'
import RegisterSecond from './component/RegisterSecond'
import RegisterThird from './component/RegisterThird'
import RegisterFourth from './component/RegisterFourth'

export default {
  components: {
    RegisterFirst,
    RegisterSecond,
    RegisterThird,
    RegisterFourth
  },
  data () {
    return {
      active: 1,
      roomId: null,
      personType: 0,
      roomObject: {},
      titleList: [
        {
          personTitle: '业主信息',
          personInfo: '业主详细信息'
        },
        {
          personTitle: '法人基本信息',
          personInfo: '法人详细信息',
          unitTitle: '单位信息'
        }
      ],
      updateId: null,
      ownerInfo: null
    }
  },
  methods: {
    toNext ([e = 1, id = 0, personType = 0, roomObject = {}, updateId = null, ownerInfo = null]) {
      this.active = e
      id && (this.roomId = id)
      personType && (this.personType = personType)
      roomObject && (this.roomObject = roomObject)
      updateId && (this.updateId = updateId)
      ownerInfo && (this.ownerInfo = ownerInfo)
    }
  }
}
</script>

<style scoped lang="scss">
.owner-register {
  .sub-title {
    color: #999;
    margin-bottom: 10px;
  }
  .steps {
    padding: 48px 0;
    .text {
      color: #999;
    }
    .steps-title {
      color: #000;
    }
    &::v-deep .el-step__line {
      top: 18px;
    }
    &::v-deep .el-step__head.is-finish {
      .el-step__icon {
        color: #fff;
        background-color: #197fff;
        border: #197fff;
        width: 40px;
        height: 40px;
      }
    }
    &::v-deep .el-step__head.is-process {
      .el-step__icon {
        color: #999;
        background-color: #fff;
        border-color: #999999;
        width: 40px;
        height: 40px;
      }
    }
    &::v-deep .el-step__head.is-wait {
      .el-step__icon {
        color: #999;
        background-color: #fff;
        border-color: #999999;
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>

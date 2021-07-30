<template>
    <div class="owner-register">
      <div>
        <div class="sub-title">错误数据解绑办理支持对园区内现存的业主关系、租赁关系、产权委托关系、固定车辆绑定关系、经营单位非关系、单位员工关系进行解绑</div>
        <!-- <el-alert
          title="温馨提示：业主信息成功变更后，变更对象关联的租户、家属、委托人、车辆、单位等信息一并解绑"
          type="warning"
          show-icon
          :closable="false"
        >
        </el-alert> -->
      </div>
      <div class="steps">
        <el-steps :active="active" align-center >
          <el-step>
            <div slot="title" class="steps-title">错误数据解绑类型选择</div>
            <div slot="description" class="text">请选择解绑对象信息</div>
          </el-step>
          <el-step>
            <div slot="title" class="steps-title">{{objectTitle}}</div>
            <div slot="description" class="text">请选择解绑对象信息</div>
          </el-step>
          <el-step>
            <div slot="title" class="steps-title">解绑办理成功</div>
            <div slot="description" class="text"></div>
          </el-step>
        </el-steps>
      </div>
      <unbunding-first v-show="active === 1" @toSecondPage="toNext" />
      <unbunding-second v-show="active === 2" @toSecondPage="toNext" :roomId="roomId" :personType="personType"/>
      <register-third v-show="active === 3" @toSecondPage="toNext" />
      <template>
        <el-backtop target=".root-right" :bottom="100"></el-backtop>
      </template>
    </div>
  </template>
  
  <script>
  import UnbundingFirst from './component/UnbundingFirst'
  import UnbundingSecond from './component/UnbundingSecond'
  import RegisterThird from './component/RegisterThird'
  
  export default {
    components: {
      UnbundingFirst,
      UnbundingSecond,
      RegisterThird
    },
    data () {
      return {
        active: 1,
        objectTitle:'业主关系解绑',
        roomId: null,
        personType: 0,
        roomObject: {},
      }
    },
    methods: {
      toNext ([e = 1, id = 0, bundingType = 0,roomObject = {}]) {
        this.active = e
        id && (this.roomId = id)
        bundingType && (this.bundingType = bundingType)
        roomObject && (this.roomObject = roomObject)
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
  
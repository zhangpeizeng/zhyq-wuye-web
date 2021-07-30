<template>
  <div class="tenant-register">
    <div>
      <div class="sub-title">园区人员登记支持对园区内的家属、租户、小区内单位的员工进行登记</div>
      <!-- <el-alert
        title="温馨提示：业主信息成功变更后，变更对象关联的租户、家属、委托人、车辆、单位等信息一并解绑"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert> -->
    </div>
    <div class="steps">
      <el-steps :active="active" align-center>
        <el-step>
          <div slot="title" class="steps-title">园区人员登记选择</div>
          <div slot="description" class="text">请准确选择详细信息</div>
        </el-step>
        <el-step>
          <div slot="title" class="steps-title">登记对象产权信息核验</div>
          <div slot="description" class="text">请确认对象产权信息核验</div>
        </el-step>
        <el-step>
          <div slot="title" class="steps-title">信息登记</div>
          <div slot="description" class="text">承租人信息登记</div>
        </el-step>
        <el-step>
          <div slot="title" class="steps-title">登记完成</div>
          <div slot="description" class="text">业务办理成功</div>
        </el-step>
      </el-steps>
    </div>
    <register-first v-show="active === 1" @toSecondPage="toNext" :type="2" />
    <rent-second v-show="active === 2" @toSecondPage="toNext" :roomId="roomId" :type="2" />
    <register-third
      v-show="active === 3"
      @toSecondPage="toNext"
      :roomId="roomId"
      :type="2"
      :titleList="titleList"
      :personType="personType"
      :updateId="updateId"
      :roomObject="roomObject"
    />
    <register-fourth v-show="active === 4"></register-fourth>
    <template>
      <el-backtop target=".root-right" :bottom="100"></el-backtop>
    </template>
  </div>
</template>

<script>
import businessApi from '@/api/businessApi'
import RegisterFirst from './component/RegisterFirst'
import RentSecond from './component/RentSecond'
import RegisterThird from './component/RegisterThird'
import RegisterFourth from './component/RegisterFourth'
export default {
  components: {
    RegisterFirst,
    RentSecond,
    RegisterThird,
    RegisterFourth
  },
  data () {
    return {
      active: 1,
      roomId: null,
      titleList: [
        {
          personTitle: '承租人信息',
          personInfo: '承租人详细信息'
        },
        {
          personTitle: '法人基本信息',
          personInfo: '法人详细信息',
          unitTitle: '单位信息'
        }
      ],
      personType: 1,
      roomObject: {}
    }
  },
  created () {
    // this.queryBuildingList()
  },
  methods: {
    toNext ([e = 1, id = 0, type = 0, roomObject = {}, updateId = null]) {
      type && (this.personType = type)
      id && (this.roomId = id)
      this.roomObject = roomObject
      updateId && (this.updateId = updateId)
      this.active = e
    },
    async queryBuildingList () {
      const res = await businessApi.getBuildingList({})
      this.buildingList = res
    },
    // 查询单元
    async queryBuildingUnit (buildingId) {
      const res = await businessApi.getBuildingUnitList({ id: buildingId })
      this.unitList = res.instanceBuildingUnitList
      this.floorList = res.instanceBuildFloorList
    },
    async queryRoomList (floorId) {
      const res = await businessApi.getRoomList({ floorId: floorId })
      console.log(res)
      this.roomList = res
    },
    selectedBuildChange (val) {
      this.queryBuildingUnit(val)
    },
    selectedFloorChange (val) {
      this.queryRoomList(val)
    }
  }
}
</script>

<style scoped lang="scss">
.tenant-register {
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

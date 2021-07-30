<template>
  <div class="file-query-home">
    <!-- 查询对象的类型选择 -->
    <div class="line-title">查询对象类型选择</div>
    <div class="radio">
      <el-radio
        v-for="(item, index) in searchList"
        @change="typeChange"
        :key="index"
        v-model="show"
        :disabled="item.disable"
        :label="index + 1"
        border
      >
        {{ item.name }}
      </el-radio>
    </div>
    <div class="line-title find">请输入查询对象信息</div>
    <!-- 查询房屋 -->
    <div v-show="show === 1" class="banner" >
      <div>房屋地址：</div>
      <el-select v-model="buildValue" placeholder="选择楼栋" @change="selectedBuildChange">
        <el-option
          v-for="(item, index) in buildingList"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="unitValue" placeholder="选择单元">
        <el-option
          v-for="(item, index) in unitList"
          @click.native="selectedUnitChange(item.id, index)"
          :key="index"
          :label="item.unitName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="floorValue" placeholder="选择楼层" @change="selectedFloorChange">
        <el-option
          v-for="(item, index) in floorList"
          :key="index"
          :label="item.floorName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="roomValue" placeholder="选择房屋编号" @change="selectedRoomChange">
        <el-option
          v-for="(item, index) in roomList"
          :key="index"
          :label="item.roomCode"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <!-- 人员 -->
    <div v-show="show === 2" class="people-banner">
      <div class="people-banner-top">
        <div class="title">人员标识类型：</div>
        <div>
          <el-radio-group v-model="peopleType">
            <el-radio :label="1">联系电话</el-radio>
            <el-radio :label="2">证件号码</el-radio>
            <el-radio :label="3">人员姓名</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="people-banner-bottom">
        <div class="title">人员标识内容：</div>
        <div>
          <el-input v-model="inputValue" :placeholder="inputPlaceholder[peopleType - 1]"></el-input>
        </div>
      </div>
    </div>
    <!-- 单元 -->
    <div v-show="show === 3" class="unit-banner">
      <div class="unit-banner-top">
        <div class="title">单位标识类型：</div>
        <div>
          <el-radio-group v-model="unitType" @change="unitTypeChange">
            <el-radio :label="1">单位地址</el-radio>
            <el-radio :label="2">单位名称</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="unit-banner-bottom">
        <div class="title">单位标识内容：</div>
        <div v-show="unitType === 1">
          <el-select v-model="buildValue" placeholder="选择楼栋" style="marginRight:30px" @change="selectedBuildChange">
            <el-option
              v-for="(item, index) in buildingList"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="unitValue" placeholder="选择单元" style="marginRight:30px">
            <el-option
              v-for="(item, index) in unitList"
              @click.native="selectedUnitChange(item.id, index)"
              :key="index"
              :label="item.unitName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="floorValue" placeholder="选择楼层" style="marginRight:30px" @change="selectedFloorChange">
            <el-option
              v-for="(item, index) in floorList"
              :key="index"
              :label="item.floorName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="roomValue" placeholder="选择房屋编号" style="marginRight:30px" @change="selectedRoomChange">
            <el-option
              v-for="(item, index) in roomList"
              :key="index"
              :label="item.roomCode"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div v-show="unitType === 2" class="unit-banner-bottom-input">
          <el-input v-model="inputValue" placeholder="请输入单位名称"></el-input>
        </div>
      </div>
    </div>
    <!-- 车位 -->
    <div v-show="show === 4">
      <!-- 二期 -->
    </div>
    <!-- 机动车辆 -->
    <div v-show="show === 5">
      <!-- 二期 -->
    </div>
    <div class="button">
      <!-- <el-button type="primary" icon="el-icon-search" @click="$router.push({name:'housesDetail'})">查询</el-button> -->
      <!-- <el-button type="primary" icon="el-icon-search" @click="getRoomListInfo">查询</el-button> -->
      <el-button
        type="primary"
        @click="getRoomListInfo"
        size="medium"
        icon="el-icon-search"
      >查询</el-button>
      <el-button
        @click="onReset"
        size="medium"
        icon="el-icon-refresh"
      >重置</el-button>
    </div>
    <house-table :tableList="tableList" v-show="show === 1" />
    <unit-table :tableList="tableList" v-show="show === 3"></unit-table>
    <div>
      <el-pagination
        style="margin-top:24px"
        @current-change="getRoomListInfo"
        :current-page.sync="query.currentPage"
        :page-size.sync="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total.sync="query.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import businessApi from '@/api/businessApi'
import HouseTable from './component/HouseTable'
import UnitTable from './component/UnitTable'

export default {
  components: {
    HouseTable,
    UnitTable
  },
  data () {
    return {
      show: 1,
      searchList: [
        { name: '房屋', disable: false },
        { name: '人员', disable: true },
        { name: '单位', disable: false },
        { name: '车位', disable: true },
        { name: '机动车辆', disable: true }
      ],
      options: [{
        value: '选项1',
        label: '选项1'
      }],
      buildValue: '', // 选择楼栋数据
      unitValue: '', // 选择单元数据
      floorValue: '', // 选择楼层数据
      roomValue: '', // 选择房屋编号数据
      peopleType: 1, // 人员标识类型
      inputValue: '', // 人员内容输入
      inputPlaceholder: ['请输入联系电话', '请输入证件号码', '请输入姓名'],
      unitType: 1,
      buildingList: [],
      unitList: [],
      floorList: [],
      roomList: [],
      buildInstanceId: '',
      tableList: [],
      query: {
        buildInstanceId: '',
        id: '',
        companyName: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 选择不同的楼栋
    selectedBuildChange (val) {
      this.unitValue = ''
      this.floorValue = ''
      this.roomValue = ''
      this.buildInstanceId = val
      this.queryBuildingUnit(val)
    },
    // 查询楼栋
    queryBuildingList () {
      businessApi.getBuildingList().then(res => {
        this.buildingList = res || []
      })
    },
    // 选择不同的单元
    selectedUnitChange (val, i) {
      this.floorValue = ''
      this.roomValue = ''
      this.buildInstanceId = val
      this.floorList = this.unitList[i].instanceBuildFloorList
    },
    // 查询单元（暂时单元楼层一起返回，后期需要修改）
    queryBuildingUnit (buildingId) {
      businessApi.getBuildingUnitList({ id: buildingId }).then(res => {
        this.unitList = res.instanceBuildingUnitList || []
      })
    },
    // 选择楼层
    selectedFloorChange (val) {
      this.roomValue = ''
      this.buildInstanceId = val
      this.queryRoomList(val)
    },
    // 查询房间号
    queryRoomList (floorId) {
      businessApi.getRoomList({ floorId: floorId }).then(res => {
        this.roomList = res || []
      })
    },
    // 选择房间
    selectedRoomChange (val) {
      this.buildInstanceId = val
    },
    // 单位选择切换是清空输入信息
    unitTypeChange () {
      this.query.buildInstanceId = ''
      this.query.companyName = ''
      this.query.roomId = ''
      this.inputValue = ''
    },
    getRoomListInfo () {
      if (this.show === 1) { // 房间查询列表信息
        if (this.roomValue) {
          this.query.id = this.buildInstanceId
          this.query.buildInstanceId = ''
        } else {
          this.query.buildInstanceId = this.buildInstanceId
          this.query.id = ''
        }
        businessApi.getRoomListInfo(this.query).then(res => {
          this.tableList = res.data || []
          this.query.total = Number(res.total) || 0
        })
      } else { // 单位查询信息
        if (this.inputValue) {
          this.query.companyName = this.inputValue
          this.query.buildInstanceId = ''
          this.query.roomId = ''
        } else if (this.roomValue) {
          this.query.roomId = this.buildInstanceId
          this.query.buildInstanceId = ''
          this.query.companyName = ''
        } else {
          this.query.buildInstanceId = this.buildInstanceId
          this.query.companyName = ''
          this.query.roomId = ''
        }
        businessApi.queryEnterpriseInfoList(this.query).then(res => {
          this.tableList = res.data || []
          this.query.total = Number(res.total) || 0
        })
      }
    },
    typeChange () {
      this.getRoomListInfo()
    }
  },
  mounted () {
    this.queryBuildingList()
    this.getRoomListInfo()
  }
}
</script>

<style scoped lang="scss">
.file-query-home {
  .radio {
    &::v-deep .el-radio {
      width: 180px;
      margin-left: 0px;
      margin-top: 20px;
    }
  }
  .find {
    margin: 20px 0;
  }
  .banner {
    width: 100%;
    height: 120px;
    background-color: #f7faff;
    border: 1px solid #c7deff;
    display: flex;
    align-items: center;
    div {
      margin-left: 30px;
    }
  }
  .people-banner {
    width: 100%;
    height: 150px;
    background-color: #f7faff;
    border: 1px solid #c7deff;
    padding-left: 20px;
    padding-top: 10px;
    .people-banner-top {
      height: 60px;
      display: flex;
      align-items: center;
    }
    .people-banner-bottom {
      height: 60px;
      display: flex;
      align-items: center;
      &::v-deep .el-input__inner {
        width: 400px;
      }
    }
    .title {
      margin: 20px;
    }
  }
  .unit-banner {
    width: 100%;
    height: 150px;
    background-color: #f7faff;
    border: 1px solid #c7deff;
    padding-left: 20px;
    padding-top: 10px;
    .unit-banner-top {
      height: 60px;
      display: flex;
      align-items: center;
    }
    .unit-banner-bottom {
      height: 60px;
      display: flex;
      align-items: center;
      .unit-banner-bottom-input {
        &::v-deep .el-input__inner {
        width: 400px;
        }
      }
    }
    .title {
      margin: 20px;
    }
  }
  .button {
    display: flex;
    margin: 20px 0;

  }
}
</style>

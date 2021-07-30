<template>
    <div class="register-first">
      <div class="register-header">
        <div class="line-title">解绑类型选择</div>
        <div class="radio">
          <el-radio
            v-for="(item, index) in bundingBusinessType"
            :key="index"
            v-model="bundingType"
            :label="item.value"
            border
          >
            {{ item.name }}
          </el-radio>
        </div>
        <div class="line-title">请选择解绑对象信息</div>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="banner-shell">
          <div class="banner" >
            <div class="flex-center-y house-select">
              <div class="radio-title">登记对象：</div>
              <el-radio-group v-model="radio" class="radio-title" style="marginLeft:20px">
                <el-radio :label="1">房屋</el-radio>
                <el-radio :label="2" disabled>车位</el-radio>
              </el-radio-group>
            </div>
            <div v-show="radio === 1" class="flex-center-y house-select">
              <div class="el-title">房屋地址：</div>
              <!--  -->
              <el-form-item prop="buildId" class="el-select">
                <el-select v-model="ruleForm.buildId" placeholder="选择楼栋" @change="selectedBuildChange">
                  <el-option
                    v-for="(item, index) in buildingList"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--  -->
              <el-form-item prop="unitId" class="el-select">
                <el-select v-model="ruleForm.unitId" placeholder="选择单元" @change="selectedUnitChange">
                  <el-option
                    v-for="(item, index) in unitList"
                    :key="index"
                    :label="item.unitName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--  -->
              <el-form-item prop="floorId" class="el-select">
                <el-select v-model="ruleForm.floorId" placeholder="选择楼层" @change="selectedFloorChange">
                  <el-option
                    v-for="(item, index) in floorList"
                    :key="index"
                    :label="item.floorName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--  -->
              <el-form-item prop="roomId" class="el-select">
                <el-select v-model="ruleForm.roomId" placeholder="选择房屋编号">
                  <el-option
                    v-for="(item, index) in roomList"
                    :key="index"
                    :label="item.roomCode"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-show="radio === 2" class="flex-center-y house-select">
              <div>车位地址：</div>
            </div>
          </div>
        </div>
        <el-form-item class="button">
          <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import businessApi from '@/api/businessApi'
  export default {
    props: {
      type: Number
    },
    data () {
      return {
        radio: 1,
        bundingType: 1,
        searchList: ['租户', '企业'],
        buildingList: [],
        unitList: [],
        floorList: [],
        roomList: [],
        ruleForm: {
          buildId: '',
          unitId: '',
          floorId: '',
          roomId: ''
        },
        rules: {
          buildId: [
            { required: true, message: '请选择楼栋', trigger: 'change' }
          ],
          unitId: [
            { required: true, message: '请选择单元', trigger: 'change' }
          ],
          floorId: [
            { required: true, message: '请选择楼层', trigger: 'change' }
          ],
          roomId: [
            { required: true, message: '请选择房屋编号', trigger: 'change' }
          ]
        },
        bundingBusinessType: [
            {value:19,name:'业主关系解绑'},
            {value:11,name:'租赁关系解绑'},
            {value:13,name:'固定车辆解绑'},
            {value:14,name:'经营单位关系解绑'},
        ]
      }
    },
    mounted () {
      this.queryBuildingList()
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('toSecondPage', [2, this.ruleForm.roomId, this.bundingType])
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 查询楼栋
      async queryBuildingList () {
        const res = await businessApi.getBuildingList({})
        this.buildingList = res || []
      },
      // 查询单元（暂时单元楼层一起返回，后期需要修改）
      async queryBuildingUnit (buildingId) {
        const res = await businessApi.getBuildingUnitList({ id: buildingId })
        this.unitList = res.instanceBuildingUnitList || []
        /* this.floorList = res.instanceBuildFloorList || [] */
      },
      // 查询房间号
      async queryRoomList (floorId) {
        const res = await businessApi.getRoomList({ floorId: floorId })
        this.roomList = res || []
      },
      selectedBuildChange (val) {
        this.queryBuildingUnit(val)
        this.ruleForm.unitId = ''
      },
      selectedFloorChange (val) {
        this.ruleForm.roomId = ''
        this.queryRoomList(val)
      },
      selectedUnitChange(val) {
        this.ruleForm.floorId = ''
        const obj = this.unitList.filter(item=>{
          return item.id == val
        })
        this.floorList = obj[0]?obj[0].instanceBuildFloorList || [] : []
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .register-first {
    .register-header {
      padding-left: 20px;
      .radio {
        &::v-deep .el-radio {
          width: 180px;
          margin-left: 0px;
          margin-bottom: 20px;
        }
      }
    }
    .banner-shell {
      width: 100%;
      padding: 72px 62px;
      border: 1px solid #e9e9e9;
      .banner {
        width: 100%;
        height: 150px;
        background-color: #f7faff;
        border: 1px solid #c7deff;
        .house-select {
          .el-select {
            margin-left: 10px;
            margin-top: 13px;
          }
          .el-title {
            margin-left: 20px;
            margin-top: 5px;
          }
          .radio-title {
            margin-top: 30px;
            margin-left: 20px;
          }
        }
      }
    }
    .button {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 30px;
    }
  }
  </style>
  
<template>
  <div class="register-second">
    <div class="info">
      <div class="content">
        <div class="content-title">房屋[{{ roomObject.location }}]</div>
        <div class="content-info">请核验登记变更对象信息及核验相关申请登记人信息</div>
      </div>
    </div>
    <div class="line-title title">登记变更对象基础信息</div>
    <div class="info-second">
      <div class="content-bottom">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple"><span>房屋类别：</span> {{ roomObject.roomCategoryName }}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><span>房屋类型：</span> {{ roomObject.roomForUseName }}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><span>建筑面积：</span> {{ roomObject.buildArea }}㎡</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><span>交房状态：</span> {{ roomObject.roomStatusName }}</div></el-col>
        </el-row>
      </div>
      <div class="content-footer" v-if="!hideRegister">
        <el-radio v-model="radio" label="1">个人登记</el-radio>
        <el-radio v-model="radio" label="2">企业登记</el-radio>
      </div>
    </div>
    <div class="card" v-if="hideRegister">
      <div class="line-title">产权关联信息</div>
      <el-row :gutter="20">
        <el-col
          style="marginTop:20px"
          :span="8"
          v-for="(item, index) in ownerInfoList"
          :key="index"
        >
          <div class="owner-content">
            <img
              :src="item.headImgUrl || imgUrl"
              alt=""
            >
            <div class="owner-info">
              <div>房屋业主姓名：{{ item.name }}</div>
              <div>联系方式：{{ item.phoneNo }}</div>
              <div>证件号码：{{ item.idNo }}</div>
              <el-button size="mini" @click="deleteOwner(item)">删除业主</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8" v-if="!isUnit">
          <el-button class="button" @click="submitForm()" >
            <i class="el-icon-circle-plus-outline"></i>
            新增业主
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="register" v-if="!hideRegister">
      <img
        src="@/assets/box.png"
        alt=""
      >
      <div class="title">当前房屋为闲置状态可直接进行业主登记</div>
      <div>
        <el-button @click="toBack()">上一步</el-button>
        <el-button type="primary" @click="submitForm()">信息登记</el-button>
      </div>
    </div>
    <!-- 更新房屋业主信息div -->
    <div class="update" v-if="hideRegister">
      <div class="line-title">修改业主信息</div>
      <div class="radio">
        <el-radio
          v-for="(item, index) in ownerInfoList"
          :key="index"
          v-model="updateId"
          :label="item.id"
          @change="radioChange(item)"
        >
          {{ item.name }}
        </el-radio>
      </div>
      <div>
        <el-button @click="toBack()">上一步</el-button>
        <el-button type="primary" @click="updateForm()">确认修改</el-button>
      </div>
    </div>
    <el-dialog
      title="删除业主"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div style="paddingBottom:20px">业主：{{ modalInfo.name }}</div>
      <div style="paddingBottom:20px">登记电话：{{ modalInfo.phoneNo }}</div>
      <el-input v-model="deleteQuery.code" style="width:200px;marginRight:20px"></el-input>
      <el-button size="medium" type="primary" @click="sendCode(modalInfo.phoneNo, modalInfo.id)">获取验证码</el-button>
      <el-radio style="marginTop:20px" v-model="isAgree" label="1">我已阅读业主变更及删除服务条款</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toDelete">确认删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import businessApi from '@/api/businessApi'
export default {
  props: {
    roomId: String
  },
  watch: {
    roomId (newData, oldData) {
      this.getRoomDetail(newData)
    }
  },
  data () {
    return {
      radio: '1',
      imgUrl: require('@/assets/empty.png'),
      roomObject: {
        roomCategoryName: '',
        roomForUseName: '',
        buildArea: '',
        roomStatusName: '',
        location: ''
      },
      ownerInfoList: [],
      ownerInfo: {},
      hideRegister: false,
      dialogVisible: false,
      modalInfo: {},
      deleteQuery: {
        applicantId: '',
        code: '',
        id: '',
        ownerId: '',
        location: ''
      },
      isAgree: '0',
      updateId: null,
      tableId: '',
      isUnit: false // 房屋是否为企业
    }
  },
  methods: {
    // 返回上一步
    toBack () {
      this.$emit('toSecondPage', [1])
    },
    // 新增业主
    submitForm () {
      this.$emit('toSecondPage', [3, 0, Number(this.radio), this.roomObject, null, null])
    },
    // 选择业主
    radioChange (item = {}) {
      this.ownerInfo = item
      this.ownerInfo.contractNo = this.contractNo
    },
    // 修改业主信息
    updateForm () {
      this.isUnit && (this.radio = '2')
      !this.updateId && this.$message.error('请选择业主')
      this.$emit('toSecondPage', [3, 0, Number(this.radio), this.roomObject, this.updateId, this.ownerInfo])
    },
    getRoomDetail (id) {
      businessApi.getRoomDetail({ roomId: id }).then(res => {
        this.roomObject = res
        this.queryHouseOwnerList(id)
      })
    },
    queryHouseOwnerList (id) {
      businessApi.getHouseOwnerList({ instanceRoomId: id }).then(res => {
        if (res.houseOwnerTenantInfoList.length === 0) {
          this.hideRegister = false
        } else {
          this.hideRegister = true
          this.ownerInfoList = res.houseOwnerTenantInfoList
          this.contractNo = res.contractNo || ''
          this.tableId = res.id
          res.ownerType === 2 && (this.isUnit = true)
        }
      }).catch(e => {
        console.log(console.log(e, '>>>>>>>'))
      })
    },
    // 删除业主
    deleteOwner (item) {
      this.modalInfo = item
      this.deleteQuery.id = this.tableId
      this.deleteQuery.ownerId = item.id
      this.deleteQuery.location = this.roomObject.location
      this.dialogVisible = true
    },
    // 发送验证码
    sendCode (phoneNo = '', id = '') {
      const param = {
        phoneNo: phoneNo,
        id: id
      }
      businessApi.sendCode(param).then(res => {
        const { msgLevel = '' } = res
        if (msgLevel === 'success') {
          this.$message.success('发送成功')
        } else {
          this.$message.error('发送失败')
        }
      })
    },
    // 确认删除业主
    toDelete () {
      if (this.isAgree === '0') {
        this.$message.error('请勾选同意服务条款')
      } else if (this.deleteQuery.code === '') {
        this.$message.error('请输入手机验证码')
      } else {
        businessApi.deleteOwner(this.deleteQuery).then(res => {
          const { msgLevel = '' } = res
          if (msgLevel === 'success') {
            this.getRoomDetail(this.roomId)
            this.$message.success('删除成功')
            this.dialogVisible = false
          } else {
            this.$message.error('删除失败')
          }
        })
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.register-second {
  .info {
    width: 100%;
    height: 140px;
    padding: 20px 0;
    border-bottom: 1px dashed #999;
    .content {
      width: 100%;
      border: 1px solid #e9e9e9;
      height: 100px;
      background-color: #F9F9F7;
      .content-title {
        color: #333;
        font-size: 16px;
        font-weight: 700;
      }
      .content-info {
        color: #999;
      }
      div {
        margin-left: 20px;
        margin-top: 20px;
      }
    }
  }
  .info-second {
    width: 100%;
    height: 190px;
    padding: 20px 0;
    .content-bottom {
      width: 100%;
      border: 1px solid #e9e9e9;
      height: 100px;
      background-color: #F9F9F7;
      padding-left: 20px;
      .el-col {
        padding-top: 20px;
      }
      span {
        color: #666;
      }
    }
    .content-footer {
      margin-top: 20px;
    }
  }
  .title {
    margin: 20px 0 0 20px;
  }
  .register {
    text-align: center;
    padding: 30px 0;
    border-bottom: 1px dashed #999;
    .title {
      color: #999;
      font-size: 18px;
      margin: 20px 0;
    }
  }
  .card {
    margin-top: 20px;
    padding-left: 20px;
    .owner-content {
      width: 100%;
      height: 150px;
      background-color: #F1F7FF;
      border: 1px solid #A3CBFF;
      display: flex;
      img {
        padding: 10px;
        width: 130px;
        height: 130px;
      }
      .owner-info {
        div {
          padding: 8px;
          white-space: nowrap;
        }
      }
    }
    .button {
      margin-top: 30px;
      width: 130px;
      height: 130px;
      border: 1px solid #BBBBBB;
      background-color: #fff;
      margin-left: 50px;
    }
  }
  .update {
    padding-left: 20px;
    margin-top: 20px;
    .radio {
      padding: 30px;
      background-color: #F9F9F7;
      margin-bottom: 20px;
    }
  }
}
</style>

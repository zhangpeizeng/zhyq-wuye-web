<template>
    <div class="register-second">
      <div class="info">
        <div class="content">
          <div class="content-title">房屋[{{roomObject.location}}] <span>闲置</span></div>
          <div class="content-info">请核验登记变更对象信息及核验相关申请登记人信息</div>
        </div>
      </div>
      <el-form
      ref="unbundingData"
      :model="unbundingData"
      :rules="rules"
      label-width="140px">
      <div class="line-title title" v-if="!showAlert">选择申请办理人</div>
      <div class="info" v-if="!showAlert">
        <div class="radio">
          <el-radio
              v-for="(item, index) in ownerInfoList"
              :key="index"
              v-model="unbundingData.agentId"
              :label="item.id"
          >
          <div class="card" >
            <div class="owner-content" v-for="item in ownerInfoList">
              <img
                src="@/assets/empty.png"
                alt=""
              >
              <div class="owner-info">
                <div>房屋业主姓名：{{item.name}}</div>
                <div>联系方式：{{item.phoneNo}}</div>
                <div>证件号码：{{item.idNo}}</div>
              </div>
            </div>
          </div>
  
          </el-radio>
          
        </div>

      </div>
      <div class="line-title title" v-if="!showAlert">选择解绑业主</div>
      <div class="info" v-if="!showAlert">
        <div class="radio">
          <el-checkbox
              v-for="(item, index) in ownerInfoList"
              :key="index"
              v-model="unbundingData.ownerId"
              :label="item.id"
          >
          <div class="card" >
            <div class="owner-content" v-for="item in ownerInfoList">
              <img
                src="@/assets/empty.png"
                alt=""
              >
              <div class="owner-info">
                <div>房屋业主姓名：{{item.name}}</div>
                <div>联系方式：{{item.phoneNo}}</div>
                <div>证件号码：{{item.idNo}}</div>
              </div>
            </div>
          </div>
  
          </el-checkbox>
          
        </div>

      </div>
      <div class="line-title title" v-if="!showAlert">关联解绑原因</div>
      <div class="info" v-if="!showAlert">
        <div class="content">
          <el-form-item label="关联解绑原因">
            <el-input
              v-model="unbundingData.desc"
              placeholder="请输入"
              style="width:400px"
            />
          </el-form-item>
        </div>
      </div>
      <div class="line-title title" v-if="!showAlert">业务办理附件</div>
      <div class="info" v-if="!showAlert">
        
        <el-form-item
        label=""
      >
        <el-button
          type="primary"
          @click="showDialog=true"
          size="medium"
          icon="el-icon-plus"
        >上传</el-button>
        <UploadPhoto
          v-model="unbundingData.attachUrl"
          :show.sync="showDialog"
        ></UploadPhoto>
        <span>仅支持上传Png、jpg格式的图片附件，文件大小不超过10M，切最多上传10张附件信息</span>
      </el-form-item>
      </div>
      </el-form>
      <div class="register" >
        <img
          src="@/assets/box.png"
          alt=""
          v-if="showAlert"
        >
        <div class="title" v-if="showAlert">当前房屋为闲置状态无关系可以解绑</div>
        <div>
          <el-button @click="toBack()">上一步</el-button>
          <el-button type="primary" @click="submitForm()" v-if="!showAlert">提交</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import businessApi from '@/api/businessApi'
  export default {
    props: {
      roomId: String,
      bundingType: Number,
    },
    watch: {
      roomId (newData, oldData) {
        this.getRoomDetail(newData)
      }
    },
    data () {
      return {
        radio: '1',
        roomObject: {
          roomCategoryName: '',
          roomForUseName: '',
          buildArea: '',
          roomStatusName: '',
          location: '',
        },
        unbundingData: {},
        ownerInfoList: [],
        hideRegister: false,
        showAlert: false,
        showDialog: false,
      }
    },
    methods: {
      toBack () {
        this.$emit('toSecondPage', [1])
      },
      submitForm () {
        this.$emit('toSecondPage', [3,0, Number(this.radio),this.roomObject])
      },
      getRoomDetail (id) {
        businessApi.getRoomDetail({ roomId: id }).then(res => {
          console.log(res,"resresresresres")
          this.roomObject = res
          this.queryHouseOwnerList(id)
        })
      },
      queryHouseOwnerList(id) {
        businessApi.getHouseOwnerList({instanceRoomId: id}).then(res=> {
          if(res.houseOwnerTenantInfoList.length === 0) {
            //this.hideRegister = false
            this.showAlert = true
          } else {
            //this.hideRegister = true
            this.showAlert = false
            this.ownerInfoList = res.houseOwnerTenantInfoList
          }
  
        }).catch(e=>{
          console.log(console.log(e,">>>>>>>"))
  
        })
  
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
          span {
            display: inline-block;
            background: #197fff;
            padding: 4px 14px;
            color: #fff;
            border-radius: 1px;
            margin-left: 16px;
          }
        }
        .content-info {
          color: #999;
        }
        div {
          margin-left: 20px;
          margin-top: 20px;
        }
      }
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
        margin: 200px 0;
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
      padding-left: 20px;
      .owner-content {
        width: 380px;
        height: 100px;
        background-color: #F1F7FF;
        border: 1px solid #A3CBFF;
        display: flex;
        .owner-info {
          div {
            padding: 9px;
          }
        }
      }
    }
    .radio {
        &::v-deep .el-radio {
          width: 550px;
          height: 200px;
          margin-left: 0px;
          margin-bottom: 20px;
        }
      }
  }
  </style>
  
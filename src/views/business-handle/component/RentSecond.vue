<template>
  <div class="register-second">
    <div class="info">
      <div class="content">
        <div class="content-title">房屋[{{ roomObject.location }}]</div>
        <div class="content-info">请核验登记变更对象信息及核验相关申请登记人信息</div>
      </div>
    </div>
    <div class="line-title title">登记变更对象基础信息</div>
    <div class="info">
      <div class="content-bottom">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple"><span>房屋类别：</span> {{ roomObject.roomCategoryName }}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><span>房屋类型：</span> {{ roomObject.roomForUseName }}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><span>建筑面积：</span> {{ roomObject.buildArea }}㎡</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><span>交房状态：</span> {{ roomObject.roomStatusName }}</div></el-col>
        </el-row>
      </div>
    </div>
    <div class="card" v-if="isShowCard">
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
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 更新房屋业主信息div -->
    <div class="update">
      <div class="line-title">修改业主信息</div>
      <div class="radio">
        <el-radio
          v-for="(item, index) in ownerInfoList"
          :key="index"
          v-model="updateId"
          :label="item.id"
        >
          {{ item.name }}
        </el-radio>
      </div>
    </div>
    <div class="register">
      <div>
        <el-button @click="toBack()">上一步</el-button>
        <el-button type="primary" @click="submitForm()" :disabled="submitStatus">信息登记</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import businessApi from '@/api/businessApi'
export default {
  props: {
    roomId: {
      type: String,
      default: ''
    }
  },
  watch: {
    roomId (newData, oldData) {
      this.getRoomDetail(newData)
    }
  },
  data () {
    return {
      radio: '1',
      imgUrl: require('@/assets/empty.png'), // 直接在：src中写img字符串不好使，需要return require一下
      roomObject: {
        roomCategoryName: '',
        roomForUseName: '',
        buildArea: '',
        roomStatusName: '',
        location: ''
        // roomId: roomId
      },
      ownerInfoList: [],
      msg: this.$createElement,
      submitStatus: false,
      isShowCard: false,
      updateId: ''
    }
  },
  mounted () {
    this.getRoomDetail()
  },
  methods: {
    toBack () {
      this.$emit('toSecondPage', [1])
    },
    submitForm () {
      this.$emit('toSecondPage', [3, 0, 0, this.roomObject, this.updateId, null])
    },
    getRoomDetail (id) {
      businessApi.getRoomDetail({ roomId: id }).then(res => {
        this.roomObject = res
        console.log(res)
        this.queryHouseOwnerList(id)
      })
    },
    queryHouseOwnerList (id) {
      businessApi.getHouseOwnerList({ instanceRoomId: id }).then(res => {
        const { houseOwnerTenantInfoList: list } = res
        if (list.length === 0) {
          this.$notify({
            title: '请求结果',
            message: this.msg('i', { style: 'color: black' }, '当前房屋暂无业主信息，请先完成业主信息登记后再进行其他人员登记'),
            type: 'warning',
            duration: 0
          })
          this.submitStatus = true
        } else {
          this.isShowCard = true
          this.ownerInfoList = list
        }
        console.log(res, '<><><><><')
      }).catch(e => {
        console.log(console.log(e, '>>>>>>>'))
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
  }
  .title {
    margin: 20px 0 0 20px;
  }
  .register {
    text-align: center;
    padding: 30px 0;
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
          padding: 13px;
          white-space: nowrap;
        }
      }
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

<template>
  <div class="person-detail">
    <div class="header"></div>
    <div>
      <div class="line-title">
        个人基础信息
      </div>
      <div class="content">
        <el-row>
          <el-col :span="8"><div>房屋地址: 一号楼/2单元/201室</div></el-col>
          <el-col :span="8"><div>居住情况: 闲置</div></el-col>
          <el-col :span="8"><div>交房状态: 未交房</div></el-col>
          <el-col :span="8"><div>使用状态: 使用中</div></el-col>
          <el-col :span="8"><div>房屋类型: 商业用房</div></el-col>
          <el-col :span="8"><div>建筑面积: 140.00㎡</div></el-col>
          <el-col :span="8"><div>重点房屋: 否</div></el-col>
          <el-col :span="8"><div>房屋类别: 单元楼、公寓楼</div></el-col>
          <el-col :span="8"><div>房屋户型: -室-厅-厨-卫</div></el-col>
        </el-row>
      </div>
    </div>
    <div>
      <div class="line-title">
        关联房屋信息
      </div>
      <div class="content">
        info
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style  scoped lang="scss">
.person-detail {
  .header {
  }
  .title {
    display: flex;
    align-items: center;
    .el-icon-caret-right {
      color: #197fff;
      font-size: 25px;
    }
  }
  .content {
    margin: 20px 0;
    width: 100%;
    padding: 20px;
    background-color: #eef5f9;
    .el-col {
      margin-bottom: 10px;
    }
  }
}
</style>

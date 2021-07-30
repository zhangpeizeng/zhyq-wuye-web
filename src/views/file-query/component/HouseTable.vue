<template>
  <el-table
    :data="tableList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="location"
      label="房屋地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="roomTypeName"
      label="房屋类别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="propertyNo"
      label="产权证号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="houseTenantName"
      label="承租人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="enterpriseName"
      label="单位名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="rentStartTime"
      label="租赁开始时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="rentEndTime"
      label="租赁结束时间">
    </el-table-column>
    <template slot="empty">
      <div class="table-empty">
        <img
          src="@/assets/empty.png"
          alt=""
        >
        <div class="text1">暂无数据</div>
        <div class="text2">没有搜到您想要的内容</div>
      </div>
    </template>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row.id)" type="text" size="small">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      tableList: Array
    },
    methods: {
      handleClick (id) {
        this.$router.push({ name: 'housesDetail', params: { roomId: id } })
      }
    },

    data () {
      return {
      }
    }
  }
</script>

<style>

</style>

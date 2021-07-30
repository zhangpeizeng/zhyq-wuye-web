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
      prop="companyName"
      label="单位名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="enterpriseCategoryName"
      label="单位类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="uscc"
      label="统一信用代码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="industryCategoryName"
      label="行业类别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="leaguePerson"
      label="法人姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="contactNumber"
      label="联系电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="employeeNumber"
      label="在职人数"
      width="80">
    </el-table-column>
    <el-table-column
      prop="roomLocationList"
      label="关联房屋">
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
        this.$router.push({ name: 'unitDetail', params: { id: id } })
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

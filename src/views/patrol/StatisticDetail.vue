<template>
  <div class="patrol-statistic-detail">
    <el-page-header
      @back="$router.go(-1)"
      content="统计详情"
    >
    </el-page-header>
    <div class="content-wrap">
      <div class="base-info-wrap">
        <div class="line-title">排班名称：{{ name }}</div>
        <ul class="flex-wrap">
          <li
            v-for="(item, index) in baseInfo"
            :key="`info-${index}`"
          >
            <div class="label">{{ item.label }}：</div>
            <div class="flex1 hidden-ellipsis">{{ item.value||'-' }}</div>
          </li>
        </ul>
        <div
          v-for="(val,key, index) in list"
          :key="`line-${index}`"
        >
          <div class="line-title">巡更线路：{{ key }}</div>
          <el-table
            stripe
            :data="val"
            style="width: 100%"
          >
            <el-table-column
              prop="pointName"
              label="点位名称"
            />
            <el-table-column label="是否检查">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.ifCheck === 1?'是':'否' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="pointTime"
              label="检查时间"
            />
            <el-table-column label="是否具有异常情况">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.ifBnormal === 1?'是':'否' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sceneText"
              label="异常内容"
            />
            <el-table-column label="查看现场图像">
              <template slot-scope="scope">
                <el-image
                  style="width:100px;height:100px"
                  :src="scope.row.picUrl"
                  :preview-src-list="[scope.row.picUrl]"
                />
              </template>
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
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseInfo: [],
      list: [],
      name: undefined,
      id: undefined,
      personId: undefined
    }
  },
  created () {
    this.id = this.$route.query.id
    this.personId = this.$route.query.person
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const res = await this.$api.patrolApi.getStatisticDetail({
        id: this.id,
        personId: this.personId
      })
      this.name = res.scheduleName
      this.baseInfo.push({ label: '巡检人', value: res.personName })
      this.baseInfo.push({ label: '开始时间', value: res.startTime })
      this.baseInfo.push({ label: '结束时间', value: res.endTime })
      this.baseInfo.push({ label: '巡检情况', value: '' })
      this.list = { ...res.lineMap }
    }
  }
}
</script>

<style scoped lang="scss">
.patrol-statistic-detail {
  width: 100%;
  padding-left: 40px;
  .content-wrap {
    margin-top: 24px;
    ul {
      padding-right: 100px;
      margin-bottom: 14px;
      color: #242634;
      li {
        width: 33.33%;
        display: flex;
        margin-bottom: 18px;
        .label {
          margin-right: 4px;
          width: 120px;
          font-size: 14px;
          text-align: right;
        }
      }
    }
  }
}
</style>

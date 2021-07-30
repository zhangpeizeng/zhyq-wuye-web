<template>
  <div class="work-space flex" style="width: 100%">
    <div class="work-box" style="width: 70%;margin-right: 21px">
      <div class="space-title">
        当日巡更计划板
      </div>
      <div class="plan">
        <div class="block">
          <el-timeline>
            <el-timeline-item
              placement="top"
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :color="activity.color"
              :timestamp="activity.endTime">
            <div class="content">
              <div class="flex-between">
                <div>
                  <span style="padding-right:40px">{{activity.situation}}</span>
                  <span>责任人:{{activity.personName}}</span>
                </div>
                <div class="isBtn" @click="checkBtn(index,!activity.isBtn)">
                  {{activity.isBtn ? "收起":"展开"}}
                  <i v-show="!activity.isBtn" class="el-icon-arrow-down"></i>
                  <i v-show="activity.isBtn" class="el-icon-arrow-up"></i>
                </div>
              </div>
              <div class="pt20" v-show="activity.isBtn">
                <el-table
                  stripe
                  max-height="500"
                  :data="activity.pmcPatrolResults"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="pointName"
                    label="点位名称"
                  />
                  <el-table-column
                    prop="pointTime"
                    label="检查时间"
                  />
<!--                  <el-table-column-->
<!--                    prop="pointName"-->
<!--                    label="用时"-->
<!--                  />-->
                  <el-table-column
                    prop="pointName"
                    label="查看现场图像"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.picUrl" style="cursor: pointer" @click="onImg(scope.row.picUrl)">
                        <img style="width: 80px;height: 80px" :src="scope.row.picUrl" alt="">
                      </span>
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
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div style="width: 30%">
      <div class="work-box">
        <div class="space-title">当日巡更实时进度</div>
        <div class="progress-box">
          <div class="flex-between">
            <div>总任务数</div>
            <div style="color: #4E73DF;font-size: 22px;font-weight: 600">{{progressData.total}}</div>
          </div>
<!--          <div class="line-box">-->
<!--            <div class="line"></div>-->
<!--          </div>-->
          <el-progress style="margin-top: 15px;margin-bottom: 15px" :show-text="false" :stroke-width="15" :percentage="percentage" color="#73E58D"></el-progress>
          <div class="flex-between">
            <div>{{progressData.doPrecent*100}}%</div>
            <div>{{progressData.undoPrecent*100}}%</div>
          </div>
          <div class="pt20 flex" >
            <div>
              <span class="circle" style="background-color: #73E58D"></span>
              <span class="pl10"  style="padding-right: 20px">已完成任务</span>
              <span>{{progressData.do}}</span>
            </div>
            <div style="padding-left: 40px">
              <span class="circle" style="background-color:#0287F2"></span>
              <span class="pl10" style="padding-right: 20px">未开始任务</span>
              <span>{{progressData.undo}}</span>
            </div>
          </div>

        </div>
      </div>
      <div class="work-box">
        <div class="space-title">今日当班</div>
        <div class="duty-box">
          <div v-for="(item, index) in shortcutList"
               :key="`short-cut-${index}`">
            <div class="duty-title">{{item[0].deptName}}</div>
            <div class="flex-wrap">
              <ul class="flex-wrap">
                <li
                  @click="$router.push({path:'security-staff-edit',query:{id:item1.deptId}})"
                  v-for="(item1, index1) in item"
                  :key="`short-cuts-${index1}`"
                  class="clickable flex-center-y flex-column"
                >
                  <div class="icon flex-center">
                    <i
                      class="iconfont icon-renyuan"
                    ></i>
                  </div>
                  <div class="name">{{ item1.personName }}</div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <div class="work-box">
        <div class="space-title">快捷入口</div>
        <div class="flex entrance-box">
          <div class="item" @click="$router.push({path:'patrol-spot-list'})">
            <div class="item-box">
              <i
                class="iconfont icon-ico"
              ></i>
            </div>
            <div class="pt10">巡检二维码下载</div>
          </div>
          <div class="item"  @click="$router.push({path:'patrol-line-list'})">
            <div class="item-box">
              <i
                class="iconfont icon-xunjianluxian"
              ></i>
            </div>
            <div class="pt10">巡检路线查询</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="previewDialog" title="查看现场图像">
      <img
        width="100%"
        :src="imgUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "workSpace",
    data(){
      return{
        percentage:10,
        progressData:[],//巡更进度
        isBtn:true,
        imgUrl:'',
        previewDialog:false,
        tableList:[{pointName:"吴亦凡"}],
        shortcutList: [],//值班人员
        activities: [{
          color: '#5FCB9B',
          timestamp: '2018-04-12 20:46',
          icon: 'el-icon-check'
        }, {
          timestamp: '2018-04-03 20:46',
        }]
      }
    },
    created() {
      this.getDutyPerson()
      this.TaskProcess()
      this.taskDetail()
    },
    methods:{

      /**
       * 当天值班人员
       */
      getDutyPerson(){
        this.$api.patrolApi.dutyPersonToday().then(res=>{
          this.shortcutList = Object.values(res)
        })
      },

      /**
       * 巡更进度
       */
      TaskProcess(){
        this.$api.patrolApi.queryCurrentTaskProcess().then(res=>{
          this.progressData = res
          this.percentage = res.doPrecent * 100
        })

      },

      /**
       * 巡检任务列表
       */
      taskDetail(){
        this.$api.patrolApi.scheduleTaskDetail().then(res=>{
          this.activities = res.data
          this.activities.forEach((item,index)=>{
            item.isBtn = false
            if(item.flag===1){
              item.color = '#5FCB9B'
              item.icon = 'el-icon-check'
            }
          })
          console.log(this.activities)

        })
      },
      checkBtn(i,flag){
        this.activities[i].isBtn = flag
        this.$forceUpdate()
      },
      onImg(url){
        this.previewDialog = true
        this.imgUrl = url
      },
    }
  }
</script>

<style scoped lang="scss">
  .work-space{
    .work-box{
      margin-bottom:25px;
      background-color: #fff;
      box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 13%);
      border-radius: 8px;
    }
    .space-title{
        height: 50px;
        color: #6b7a9d;
        font-size: 14px;
        padding: 0 20px;
        background: #f8f9fc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        border-bottom: 1px solid #e3e6f0;
    }
    .progress-box{
      color: #5A5C71;
      padding: 15px 15px 30px 20px;
      .line-box{
        margin-top: 15px;
        margin-bottom: 15px;
        width: 100%;
        background-color: #0287F2;
        height: 14px;
        border-radius: 20px;
        .line{
          width: 20%;
          height: 100%;
          background-color: #73E58D;
          border-radius: 20px;
        }
      }
      ::v-deep .el-progress-bar__outer {
        height: 6px;
        border-radius: 100px;
        background-color: #0287F2;
        overflow: hidden;
        position: relative;
        vertical-align: middle;
      }
      .circle{
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 13px;
      }
    }
    .plan{
      .content{
        color: #858585;
        .isBtn{
          cursor: pointer;
          padding: 8px 15px;
          color: #ffffff;
          background: #5FCB9B;
          border-radius: 100px;
        }
      }
      padding: 25px;
      ::v-deep .el-timeline-item__node--normal {
        left: -10px;
        width: 30px;
        height: 30px;
      }
    }
    .duty-box{
      .duty-title{
        margin:20px 0 0 30px;
        display: inline-block;
        border-radius: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #5886FB;
        padding: 1px 4px;
        background-color: #E5F3FD;

      }
        ul {
          padding: 5px;
          height: calc(100% - 50px);
          overflow: auto;
          li {
            width: 131px;
            height: 131px;
            margin-right: 15px;
            &:hover {
              background-color: #f8f9fc;
            }
            .icon {
              width: 73px;
              height: 73px;
              background-color: #5886fb;
              color: #fff;
              border-radius: 4px;
              margin-top: 14px;
              i {
                font-size: 35px;
              }
            }
            .name {
              margin-top: 12px;
              color: #5a5c71;
            }
          }
        }
    }
    .entrance-box{
      justify-content: space-around;
      padding: 20px;
      .item{
        &:hover {
          cursor: pointer;
          background-color: #f8f9fc;
        }
        padding: 15px;
        width: 131px;
        height: 131px;
        text-align: center;
        .item-box{
          display: inline-block;
          width: 73px;
          height: 73px;
          background: #5886FB;
          border-radius: 4px;
          i{
            color: white;
            font-size: 34px;
            line-height: 70px;
          }
        }

      }
    }
  }

</style>
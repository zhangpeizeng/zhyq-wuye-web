<template>
  <div class="home-wrap">
    <ul class="flex-around card-list">
      <li
        v-for="(item, index) in cardList"
        :key="`card-${index}`"
      >
        <img
          :src="item.img"
          alt="err"
        >
        <div>
          <div class="name">{{ item.title }}</div>
          <div class="num">{{ item.num }}</div>
        </div>
      </li>
    </ul>
    <div class="flex-between second-wrap">
      <div class="shortcut">
        <div class="title">
          <div>快捷入口1111333333</div>
        </div>
        <ul class="flex-wrap">
          <li
            v-for="(item, index) in shortcutList"
            :key="`short-cut-${index}`"
            class=" flex-center-y flex-column"
          >
            <div
              v-if="item.router"
              class="icon flex-center clickable"
              @click="$router.push({name:item.router})"
            >
              <i
                class="iconfont"
                :class="item.icon"
              ></i>
            </div>
            <div
              v-else
              class="icon flex-center clickable"
              @click="$message.warning('暂未开放~')"
            >
              <i
                class="iconfont"
                :class="item.icon"
              ></i>
            </div>
            <div class="name">{{ item.title }}</div>
          </li>
        </ul>
      </div>
      <div class="todo">
        <div class="title">
          <div>待办事项</div>
        </div>
        <div style="overflow:auto;height:calc(100% - 50px)">
          <ul class="flex todo-count">
            <li
              class="flex-column flex-center-y"
              v-for="(item, index) in todoCount"
              :key="`todo-count${index}`"
              :class="item.class"
            >
              <div class="icon flex-center">
                <i
                  class="iconfont"
                  :class="item.icon"
                ></i>
              </div>
              <div class="num">{{ item.num }}</div>
              <div class="name">{{ item.name }}</div>
            </li>
          </ul>
          <ul class="todo-list flex-column">
            <li
              v-for="(item, index) in todoList"
              :key="`todo-list-${index}`"
              class="flex"
            >
              <div
                class="desc hidden-ellipsis flex1"
                :title="item.text"
              >{{ item.text }}</div>
              <div
                class="person hidden-ellipsis"
                :title="item.person_name"
              >责任人:{{ item.person_name }}</div>
              <div class="point">未查点:{{ item.number }}个</div>
              <div class="date">{{ item.pointTime }}</div>
            </li>
            <el-empty
              description="暂无待办事项"
              :image-size="120"
              v-if="todoList.length === 0"
            ></el-empty>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex-between chart-wrap">
      <div class="line-chart">
        <div class="title">
          <div>房屋租售情况</div>
          <div class="flex btn-wrap">
            <div
              class="btn"
              :class="{active:dateType===1}"
              @click="checkTime(1)"
            >日</div>
            <div
              class="btn"
              :class="{active:dateType===2}"
              @click="checkTime(2)"
            >月</div>
          </div>
        </div>
        <div style="padding-top: 20px">
          <homeLineChart :chart-data="lineData" />
        </div>
      </div>
      <div class="pie-chart">
        <div class="title">
          <div>物业缴费情况</div>
        </div>
        <div
          class="pie-box"
          style="padding-top: 20px"
        >
          <div style="width: 50%">
            <homePieChart :chart-data="firstData" />
          </div>
          <div style="width: 50%;text-align: center">
            <div class="des">
              <div>
                <span>停车缴费</span>
                <span>99.5%</span>
              </div>
              <div class="pt10">
                <span>物业服务</span>
                <span>98.58%</span>
              </div>
              <div class="pt10">
                <span>车位租赁</span>
                <span>97.6%</span>
              </div>
              <div class="pt10">
                <span>房屋租赁</span>
                <span>97%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeLineChart from './user/components/home-line-chart'
import homePieChart from './user/components/home-pie-chart'
const firstData = {
  expectedData: {
    subtext: '单位：kw',
    xData: ['电梯', '照明', '制冷', '普通动力', '水系统', '厨房', '其他'],
    yData: [2.0, 76.7, 7.0, 23.2, 25.6, 135.6, 135.6],
    yData2: [2.6, 5.9, 9.0, 26.4, 175.6, 70.7, 9.0]
  }
}
export default {
  components: { homeLineChart, homePieChart },
  data () {
    return {
      firstData,
      lineData: {},
      monthData: {},
      yearData: {},
      dateType: 1,
      // 顶部卡片
      cardList: [],
      // 快捷入口
      shortcutList: [
        {
          title: '公告发布',
          router: 'noticeList',
          icon: 'icon-page-gonggao'
        },
        {
          title: '装修登记',
          router: 'renovationList',
          icon: 'icon-zhuangxiu'
        },
        {
          title: '租售信息发布',
          router: '',
          icon: 'icon-zulinxinxi'
        },
        {
          title: '业主登记',
          router: 'ownerRegister',
          icon: 'icon-yezhu'
        },
        {
          title: '人员登记',
          router: 'tenantRegister',
          icon: 'icon-renyuan'
        },
        {
          title: '固定车辆登记',
          router: '',
          icon: 'icon-zichandengji'
        },
        {
          title: '月租车辆登记',
          router: '',
          icon: 'icon-zuche'
        },
        {
          title: '快递缴费',
          router: '',
          icon: 'icon-baoguo'
        },
        {
          title: '经营单位登记',
          router: '',
          icon: 'icon-danwei'
        },
        {
          title: '关联关系解除',
          router: '',
          icon: 'icon-guanlian'
        }
      ],
      // 待办统计
      todoCount: [
        {
          name: '待处理工程事项',
          num: 24,
          icon: 'icon-rili',
          class: 'blue'
        },
        {
          name: '待下发账单',
          num: 28,
          icon: 'icon-zhangdan',
          class: 'yellow'
        },
        {
          name: '待审核信息',
          num: 12,
          icon: 'icon-jihuashenhe',
          class: 'green'
        }
      ],
      // 待办列表
      todoList: []
    }
  },
  created () {
    this.homeQuery()
    this.getTodoInfo()
  },
  mounted () {},
  methods: {
    async getTodoInfo () {
      const res = await this.$api.userApi.getTodoInfo()
      this.todoList = [...res]
    },
    homeQuery () {
      this.$api.userApi.homepageQuery().then((res) => {
        this.cardList.push({
          title: '车辆登记（辆）',
          num: res.catCnt,
          img: require('@/assets/car.png')
        })
        this.cardList.push({
          title: '巡检点数（个）',
          num: res.patrolPoint,
          img: require('@/assets/dev_num.png')
        })
        this.cardList.push({
          title: '房屋售卖',
          num: res.houseOwnerCnt,
          img: require('@/assets/alarm.png')
        })
        this.cardList.push({
          title: '白名单人数',
          num: res.doorAccessWhiteListCnt,
          img: require('@/assets/people_num.png')
        })
        // 获取当前月份的天数
        const myDate = new Date()
        const dayNum = new Date(
          myDate.getYear(),
          myDate.getMonth() + 1,
          0
        ).getDate()
        // 给没有数据的 天 塞0
        for (let i = 1; i <= dayNum; i++) {
          if (!res.houseOwnerMonthCnt.hasOwnProperty(`${i}`)) {
            this.$set(res.houseOwnerMonthCnt, i, '0')
          }
          if (!res.houseTenantMonthCnt.hasOwnProperty(`${i}`)) {
            this.$set(res.houseTenantMonthCnt, i, '0')
          }
        }
        this.monthData = {
          xdata: Object.keys(res.houseOwnerMonthCnt),
          ydataOwner: Object.values(res.houseOwnerMonthCnt),
          ydataTenant: Object.values(res.houseTenantMonthCnt)
        }

        // 给没有数据的 月份 塞0
        for (let i = 1; i <= 12; i++) {
          if (!res.houseOwnerYearCnt.hasOwnProperty(`${i}`)) {
            this.$set(res.houseOwnerYearCnt, i, '0')
          }
          if (!res.houseTenantYearCnt.hasOwnProperty(`${i}`)) {
            this.$set(res.houseTenantYearCnt, i, '0')
          }
        }
        this.yearData = {
          xdata: Object.keys(res.houseOwnerYearCnt),
          ydataOwner: Object.values(res.houseOwnerYearCnt),
          ydataTenant: Object.values(res.houseTenantYearCnt)
        }
        this.lineData = { ...this.monthData }
      })
    },
    checkTime (i) {
      this.dateType = i
      this.lineData = i === 1 ? { ...this.monthData } : { ...this.yearData }
    }
  }
}
</script>

<style scoped lang="scss">
.home-wrap {
  .title {
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
    .btn-wrap {
      .active {
        background: #5886fb;
        color: #fff;
      }
      div {
        cursor: pointer;
        border-radius: 16px;
        background: #f0f0f0;
        border-radius: 16px;
        color: #6b7a9d;
        margin-left: 20px;
        border-radius: 16px;
        padding: 4px 14px;
      }
    }
  }
  .card-list {
    li {
      height: 160px;
      width: 24%;
      background-color: #fff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      padding: 33px;
      overflow: hidden;
      display: flex;
      img {
        width: 94px;
        height: 94px;
        margin-right: 40px;
      }
      .name {
        margin-top: 11px;
        color: #5a5c71;
        font-size: 14px;
        margin-bottom: 16px;
      }
      .num {
        font-weight: 600;
        font-size: 24px;
        color: #4e73df;
        width: 140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .second-wrap {
    margin: 21px 0;
    > div {
      height: 453px;
      background-color: #fff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
    }
    .shortcut {
      width: 65%;
      ul {
        padding: 47px 0 0 33px;
        height: calc(100% - 50px);
        overflow: auto;
        li {
          width: 131px;
          height: 131px;
          margin-bottom: 40px;
          margin-right: 43px;
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
    .todo {
      width: 34%;
      .todo-count {
        .blue {
          color: #4e73df;
          .icon {
            background-color: #edeffc;
          }
        }
        .yellow {
          .icon {
            background-color: #fef8e6;
          }
          color: #f1bc3b;
        }
        .green {
          .icon {
            background-color: #e8faf3;
          }
          color: #34c392;
        }
        li {
          position: relative;
          width: 33.333%;
          .icon {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            margin-top: 20px;
            margin-bottom: 8px;
            i {
              font-size: 24px;
            }
          }
          .num {
            font-size: 24px;
            margin-bottom: 6px;
          }
          .name {
            color: #5a5c71;
            font-size: 14px;
          }
          &:nth-child(2)::after {
            content: "";
            width: 1px;
            height: 96px;
            background-color: #e3e6f0;
            position: absolute;
            top: 28px;
            right: 0;
          }
          &:nth-child(2)::before {
            content: "";
            width: 1px;
            height: 96px;
            background-color: #e3e6f0;
            position: absolute;
            top: 28px;
            left: 0;
          }
        }
      }
      .todo-list {
        overflow: auto;
        margin-top: 26px;
        padding: 0 22px;
        li {
          width: 100%;
          margin-bottom: 24px;
          position: relative;
          padding-left: 15px;
          font-size: 14px;
          &::before {
            content: "";
            width: 9px;
            height: 9px;
            background: #4d80e7;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: calc((100% - 9px) / 2);
          }
          .desc {
            color: #5a5c71;
          }
          .person {
            color: #5a5c71;
            width: 90px;
            margin: 0 6px;
          }
          .point {
            color: #5a5c71;
            width: 80px;
            margin-right: 6px;
          }
          .date {
            width: 80px;
            color: #a2adb7;
          }
        }
      }
    }
  }
  .chart-wrap {
    margin: 21px 0;
    .pie-box {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .des {
      text-align: left;
      border-radius: 8px;
      background-color: #f4f7fe;
      display: inline-block;
      padding: 15px 3px;
      color: #5a5c71;
      .pt10 {
        padding-top: 10px;
      }
      span {
        padding: 10px 5px;
      }
    }
    > div {
      overflow: hidden;
      width: 49.5%;
      height: 480px;
      background-color: #fff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
    }
    .line-chart {
      width: 65%;
    }
    .pie-chart {
      width: 34%;
    }
  }
}
</style>

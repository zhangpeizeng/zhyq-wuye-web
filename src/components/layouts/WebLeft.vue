<template>
  <div class="left-nav-wrap">
    <SideBar :items="navList"></SideBar>
  </div>
</template>

<script>
import SideBar from '../sidebar/index.vue'
export default {
  components: { SideBar },
  data () {
    return {
      navList: [
        // path 为router-config 的 name
        { title: '首页', icon: 'icon-shouye2', path: 'home' },
        {
          title: '综合档案查询',
          icon: 'icon-dangan1',
          path: 'fileQuery',
          subs: []
        },
        {
          title: '综合业务办理',
          icon: 'icon-iconxw',
          path: 'businessHandle',
          subs: [
            { title: '业主信息登记', path: 'ownerRegister' },
            { title: '园区租户登记', path: 'tenantRegister' },
            { title: '错误数据解绑', path: 'businessUnbundling' },
            // 这个放在最后
            { title: '业务办理记录查询', path: 'businessHandleSearch' }
          ]
        },
        {
          title: '规则管理',
          icon: 'icon-jiankong22',
          path: 'rules',
          subs: [
            { title: '二维码生成记录', path: 'rulesQrcodeList' },
            { title: '报修工单管理', path: 'rulesRepairOrder' },
            { title: '物业费账单配置', path: 'rulesBillConfig' },
            { title: '其他配置', path: 'rulesOtherConfig' }
          ]
        },
        {
          title: '园区综合服务',
          icon: 'icon-yuanqu3',
          path: 'services',
          subs: [
            // { title: '交房记录', path: 'deliveryList' },
            // { title: '车位租赁', path: 'parkingRentalList' },
            { title: '装修管理', path: 'renovationList' },
            // { title: '房屋租赁', path: 'roomList' },
            // { title: '访客管理', path: 'visitorList' },
            { title: '公告发布', path: 'noticeList' }
            // { title: '租赁管理', path: 'rentalServiceList' }
          ]
        },
        {
          title: '巡更管理',
          icon: 'icon-xungeng',
          path: 'patrol',
          subs: [
            { title: '巡更工作台', path: 'workSpace' },
            // { title: '二维码管理', path: 'qrCodeList' },
            // { title: '保安信息', path: 'securityStaff' },
            { title: '巡检点', path: 'patrolSpotList' },
            { title: '巡检线路', path: 'patrolLineList' },
            { title: '排班管理', path: 'patroScheduleList' },
            { title: '任务管理', path: 'patrolTaskManagement' },
            { title: '巡更数据统计', path: 'patroStatisticList' }
          ]
        },
        {
          title: '门禁管理',
          icon: 'icon-menjin',
          path: 'door',
          subs: [
            { title: '门禁开卡', path: 'doorCardList' },
            { title: '门禁白名单', path: 'doorFaceWhiteList' },
            { title: '车辆白名单', path: 'doorCarWhiteList' }
          ]
        }
      ]
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped lang="scss">
.left-nav-wrap {
  background-color: #4065e0;
  width: 100%;
  height: 100%;
}
</style>

import BaseLayout from '@/components/layouts/BaseLayout.vue'
/**
 * 基础路由 不需要权限的都可以访问的路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/exception',
    name: 'exception',
    redirect: '/exception/403',
    meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "fail" */ '@/components/exception/403'),
        meta: { title: '403', permission: ['exception'] }
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "fail" */ '@/components/exception/404'),
        meta: { title: '404', permission: ['exception'] }
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "fail" */ '@/components/exception/500'),
        meta: { title: '500', permission: ['exception'] }
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/components/exception/404.vue')
  }
]
/**
 *  这里是页面路由 可以在meta中设置权限 控制不同的角色来显示不同的路由
 */
export const asyncRouterMap = [
  // meta => key:导航栏active全局样式
  {
    path: '/',
    name: 'Index',
    component: BaseLayout,
    redirect: '/home',
    children: [
      // 列表示例
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/CommonTable.vue')
      },
      // 编辑示例
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/CommonEdit.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '智慧园区后台管理系统-概览'
        }
      },

      // .....router config ↓

      // 系统管理=>账号管理=>列表
      {
        path: 'sys_account_list',
        name: 'sysAccountList',
        component: () => import('@/views/system/AccountList.vue'),
        meta: {
          title: '账号管理'
        }
      },
      // 系统管理=>账号管理=>详情
      {
        path: 'sys_account_detail',
        name: 'sysAccountDetail',
        component: () => import('@/views/system/AccountDetail.vue'),
        meta: {
          title: '账号详情'
        }
      },
      // 系统管理=>账号管理=>创建账号
      {
        path: 'sys_account_add',
        name: 'sysAccountAdd',
        component: () => import('@/views/system/AccountAdd.vue'),
        meta: {
          title: '账号管理'
        }
      },
      // 系统管理=>角色管理=>列表
      {
        path: 'sys_role_list',
        name: 'sysRoleList',
        component: () => import('@/views/system/RoleList.vue'),
        meta: {
          title: '角色管理'
        }
      },
      // 系统管理=>字典管理=>列表
      {
        path: 'sys_dictionary_list',
        name: 'sysDictionaryList',
        component: () => import('@/views/system/DictionaryList.vue'),
        meta: {
          keepAlive: true,
          title: '字典管理'
        }
      },
      // 系统管理=>字典管理=>编辑
      {
        path: 'sys_dictionary_detail',
        name: 'sysDictionaryDetail',
        component: () => import('@/views/system/DictionaryDetail.vue'),
        meta: {
          title: '字典管理'
        }
      },
      // 系统管理=>二维码管理
      {
        path: 'sys_qrcode_list',
        name: 'sysQrcodeList',
        component: () => import('@/views/system/QrcodeList.vue'),
        meta: {
          title: '二维码管理'
        }
      },
      // 系统管理=>菜单管理
      {
        path: 'sys_menu_list',
        name: 'sysMenuList',
        component: () => import('@/views/system/MenuList.vue'),
        meta: {
          keepAlive: true,
          title: '菜单管理'
        }
      },
      // 系统管理=>菜单管理=>功能列表
      {
        path: 'sys_menu_funct',
        name: 'sysMenuFunc',
        component: () => import('@/views/system/MenuFunc.vue'),
        meta: {
          title: '功能列表'
        }
      },
      // 系统管理=>组织管理
      {
        path: 'sys_org_list',
        name: 'sysOrgList',
        component: () => import('@/views/system/OrgList.vue'),
        meta: {
          title: '组织管理'
        }
      },
      // 综合档案查询
      {
        path: 'file_query',
        name: 'fileQuery',
        component: () => import('@/views/file-query/FileQueryHome.vue'),
        meta: {
          title: '小区综合档案查询( Cell comprehensive file query )'
        }
      },
      // 综合档案查询 =》 房屋查询详情
      {
        path: 'houses_detail',
        name: 'housesDetail',
        component: () => import('@/views/file-query/HousesDetail.vue'),
        meta: {
          title: '房屋查询详情'
        }
      },
      // 综合档案查询 =》 人员查询详情
      {
        path: 'person_detail',
        name: 'personDetail',
        component: () => import('@/views/file-query/PersonDetail.vue'),
        meta: {
          title: '人员查询详情'
        }
      },
      // 综合档案查询 =》 单位查询详情
      {
        path: 'unit_detail',
        name: 'unitDetail',
        component: () => import('@/views/file-query/UnitDetail.vue'),
        meta: {
          title: '单位查询详情'
        }
      },
      // 综合业务办理=》业主登记
      {
        path: 'owner_register',
        name: 'ownerRegister',
        component: () => import('@/views/business-handle/OwnerRegister.vue'),
        meta: {
          title: '业主信息登记'
        }
      },
      // 综合业务办理=》园区租户登记
      {
        path: 'tenant_register',
        name: 'tenantRegister',
        component: () => import('@/views/business-handle/TenantRegister.vue'),
        meta: {
          title: '园区租户登记（ District Staff Registration ）'
        }
      },
      // 综合业务办理=》错误数据解绑
      {
        path: 'business_unbundling',
        name: 'businessUnbundling',
        component: () => import('@/views/business-handle/BusinessUnbundling.vue'),
        meta: {
          title: '数据解绑（Error data unbinding）'
        }
      },
      // 综合业务办理=》业务办理记录查询
      {
        path: 'business_handle_search',
        name: 'businessHandleSearch',
        component: () => import('@/views/business-handle/BusinessHandleSearch.vue'),
        meta: {
          title: '业务办理记录查询( Inquiry of business handling records )'
        }
      },
      // 规则管理↓
      {
        path: 'rules_qrcode_list',
        name: 'rulesQrcodeList',
        component: () => import('@/views/rules/QrcodeList.vue'),
        meta: {
          title: '二维码下载记录'
        }
      },
      {
        path: 'rules_repair_order',
        name: 'rulesRepairOrder',
        component: () => import('@/views/rules/RepairOrder.vue'),
        meta: {
          title: '报修工单管理'
        }
      },
      {
        path: 'rules_bill_config',
        name: 'rulesBillConfig',
        component: () => import('@/views/rules/BillConfig.vue'),
        meta: {
          title: '物业费账单配置'
        }
      },
      {
        path: 'rules_other_config',
        name: 'rulesOtherConfig',
        component: () => import('@/views/rules/OtherConfig.vue'),
        meta: {
          title: '其他配置'
        }
      },
      // 综合园区服务=>交房记录
      {
        path: 'delivery_list',
        name: 'deliveryList',
        component: () => import('@/views/integrated-services/deliveryList.vue'),
        meta: {
          title: '交房记录'
        }
      },
      // 综合园区服务=>房屋租赁=>列表
      {
        path: 'room-list',
        name: 'roomList',
        component: () => import('@/views/integrated-services/roomList.vue'),
        meta: {
          title: '房屋租赁'
        }
      },
      // 综合园区服务=>房屋租赁=>发布
      {
        path: 'room-add',
        name: 'roomAdd',
        component: () => import('@/views/integrated-services/roomAdd.vue'),
        meta: {
          title: '房屋租赁信息发布'
        }
      },
      // 综合园区服务=>车位租赁=>列表
      {
        path: 'parking-rental-list',
        name: 'parkingRentalList',
        component: () => import('@/views/integrated-services/parkingRentalList.vue'),
        meta: {
          title: '车位租赁'
        }
      },
      // 综合园区服务=>车位租赁=>发布
      {
        path: 'parking-rental-add',
        name: 'parkingRentalAdd',
        component: () => import('@/views/integrated-services/parkingRentalAdd.vue'),
        meta: {
          title: '车位租赁'
        }
      },
      // 综合园区服务=>访客管理=>列表
      {
        path: 'visitor-list',
        name: 'visitorList',
        component: () => import('@/views/integrated-services/visitorList.vue'),
        meta: {
          title: '访客管理'
        }
      },
      // 综合园区服务=>装修管理=>列表
      {
        path: 'renovation-list',
        name: 'renovationList',
        component: () => import('@/views/integrated-services/renovationList.vue'),
        meta: {
          title: '装修管理'
        }
      },
      // 综合园区服务=>装修管理=>登记信息
      {
        path: 'renovation-add',
        name: 'renovationAdd',
        component: () => import('@/views/integrated-services/renovationAdd.vue'),
        meta: {
          title: '装修管理'
        }
      },
      // 综合园区服务=>公告发布=>列表
      {
        path: 'notice-list',
        name: 'noticeList',
        component: () => import('@/views/integrated-services/noticeList.vue'),
        meta: {
          title: '公告列表'
        }
      },
      // 综合园区服务=>公告发布=>新增
      {
        path: 'notice-add',
        name: 'noticeAdd',
        component: () => import('@/views/integrated-services/noticeAdd.vue'),
        meta: {
          title: '发布公告'
        }
      },
      // 综合园区服务=>租赁服务=>列表
      {
        path: 'rental-service-list',
        name: 'rentalServiceList',
        component: () => import('@/views/integrated-services/rentalServiceList.vue'),
        meta: {
          title: '租赁服务'
        }
      },
      // 综合园区服务=>租赁服务=>发布
      {
        path: 'rental-service-add',
        name: 'rentalServiceAdd',
        component: () => import('@/views/integrated-services/rentalServiceAdd.vue'),
        meta: {
          title: '租赁信息发布'
        }
      },
      // 巡更管理=>巡更管理=>巡更工作台
      {
        path: 'work-space',
        name: 'workSpace',
        component: () => import('@/views/patrol/workSpace.vue'),
        meta: {
          title: '巡更工作台'
        }
      },
      // 巡更管理=>巡更管理=>二维码管理
      {
        path: 'qr-code-list',
        name: 'qrCodeList',
        component: () => import('@/views/patrol/qrCodeList.vue'),
        meta: {
          title: '二维码管理'
        }
      },
      // 巡更管理=>巡更管理=>保安信息
      {
        path: 'security-staff',
        name: 'securityStaff',
        component: () => import('@/views/patrol/securityStaff.vue'),
        meta: {
          title: '保安信息'
        }
      },
      // 巡更管理=>巡更管理=>保安编辑
      {
        path: 'security-staff-edit',
        name: 'securityStaffEdit',
        component: () => import('@/views/patrol/securityStaffEdit.vue'),
        meta: {
          title: '保安信息编辑'
        }
      },
      // 巡更管理=>巡更点=>列表
      {
        path: 'patrol-spot-list',
        name: 'patrolSpotList',
        component: () => import('@/views/patrol/patrolSpotList.vue'),
        meta: {
          title: '巡更点'
        }
      },
      // 巡更管理=>巡更路线=>列表
      {
        path: 'patrol-line-list',
        name: 'patrolLineList',
        component: () => import('@/views/patrol/patrolLineList.vue'),
        meta: {
          title: '巡更路线'
        }
      },
      {
        path: 'patrol_schedule_list',
        name: 'patroScheduleList',
        component: () => import('@/views/patrol/ScheduleList.vue'),
        meta: {
          title: '排班管理'
        }
      },
      {
        path: 'patrol-task-management',
        name: 'patrolTaskManagement',
        component: () => import('@/views/patrol/TaskManagement.vue'),
        meta: {
          title: '任务管理'
        }
      },
      {
        path: 'patrol_schedule_edit',
        name: 'patroScheduleEdit',
        component: () => import('@/views/patrol/ScheduleEdit.vue'),
        meta: {
          title: '排班管理'
        }
      },
      {
        path: 'patrol_statistic_list',
        name: 'patroStatisticList',
        component: () => import('@/views/patrol/StatisticList.vue'),
        meta: {
          title: '巡更数据统计'
        }
      },
      {
        path: 'patrol_statistic_detail',
        name: 'patroStatisticDetail',
        component: () => import('@/views/patrol/StatisticDetail.vue'),
        meta: {
          title: '巡更数据统计'
        }
      },
      // 门禁管理
      {
        path: 'door_card_list',
        name: 'doorCardList',
        component: () => import('@/views/door-control/OpenCardList.vue'),
        meta: {
          title: '门禁开卡'
        }
      },
      {
        path: 'door_face_whitelist',
        name: 'doorFaceWhiteList',
        component: () => import('@/views/door-control/FaceWhiteList.vue'),
        meta: {
          title: '门禁白名单'
        }
      },
      {
        path: 'door_face_edit',
        name: 'doorFaceEdit',
        component: () => import('@/views/door-control/FaceEdit.vue'),
        meta: {
          title: '添加人脸'
        }
      },
      {
        path: 'door_car_whitelist',
        name: 'doorCarWhiteList',
        component: () => import('@/views/door-control/CarWhiteList.vue'),
        meta: {
          title: '车辆白名单'
        }
      }

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login'),
    meta: {
      notLogin: true
    }
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

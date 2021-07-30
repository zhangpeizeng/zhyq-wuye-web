import http from './request'

export default {
  // 业务办理查询
  businessHandlingSearch (data) {
    return http.post('/businessHandling/getTableList', data)
  },
  // 租户登记，获取建筑列表
  getBuildingList (params) {
    return http.get('/house/getBuildingList', { params })
  },
  // 通过建筑获取单元
  getBuildingUnitList (params) {
    return http.get('/house/getUnitAndFoorByBuildingId', { params })
  },
  // 通过楼层获取房间
  getRoomList (params) {
    return http.get('/house/getRoomListByFloorId', { params })
  },
  // 通过房间id获取
  getRoomDetail (params) {
    return http.get('/house/getRoomDetailById', { params })
  },
  // 查询房屋绑定业主列表
  getHouseOwnerList (params) {
    return http.get('/houseOwnerBind/getHouseOwnerList', { params })
  },
  // 绑定业主和房屋的关系
  insertOwner (data) {
    return http.post('/houseOwnerBind/insertOwner', data)
  },
  // 物业房屋列表查询接口
  getRoomListInfo (data) {
    return http.post('/house/getRoomList', data)
  },
  // 房屋详情查看接口
  getRoomBindDetailById (params) {
    return http.get('/house/getRoomBindDetailById', { params })
  },
  // 发送验证码
  sendCode (data) {
    return http.post('/SMSVerificationCode/send', data)
  },
  // 更新业主信息
  updateOwner (data) {
    return http.post('/houseOwnerBind/updateOwner', data)
  },
  // 删除业主信息
  deleteOwner (data) {
    return http.post('/houseOwnerBind/deleteOwner', data)
  },
  // 新增租户信息
  insertTenant (data) {
    return http.post('/houseTenantBind/insert', data)
  },
  // 单位列表信息查询
  queryEnterpriseInfoList (data) {
    return http.post('/enterprise/queryEnterpriseInfoList', data)
  },
  // 单位详细信息查询
  getEnterpriseDetail (params) {
    return http.get('/enterprise/getEnterpriseDetail', { params })
  }
}

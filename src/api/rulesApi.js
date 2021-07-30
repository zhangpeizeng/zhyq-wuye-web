import http from './request'

export default {
  // 其他配置
  getOtherConfig () {
    return http.get('/otherconfig/get')
  },
  setOtherConfig (data) {
    return http.post('/otherconfig/save', data)
  },
  // 二维码下载记录
  getQrcodeList (data) {
    return http.post('', data)
  },
  // 报修工单
  getRepairOrderConfig () {
    return http.get('/repairOrderManagementAndConfiguration/get')
  },
  setRepairOrderConfig (data) {
    return http.post('/repairOrderManagementAndConfiguration/save', data)
  },
  // 物业费账单
  getBillConfig () {
    return http.get('/propertybillallocation/get')
  },
  setBillConfig (data) {
    return http.post('/propertybillallocation/save', data)
  }
}

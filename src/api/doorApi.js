import http from './request'

export default {
  // 人脸列表
  getFaceList (data) {
    return http.post('/dooraccesswhitelist/getTableList', data)
  },
  // 新增人脸
  addFace (data) {
    return http.post('/dooraccesswhitelist/insert', data)
  },
  // 人脸详情
  getFaceDetail (params) {
    return http.get('/dooraccesswhitelist/getDetail', { params })
  },
  // 编辑人脸
  updateFace (data) {
    return http.post('/dooraccesswhitelist/update', data)
  },
  // 删除人脸
  delFace (params) {
    return http.get('/dooraccesswhitelist/delete', { params })
  }
}

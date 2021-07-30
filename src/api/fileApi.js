import http from './request'

export default {
  // 获取下拉列表数据
  getContentList (data) {
    return http.post('/dictionaryContent/getContentList', data)
  },
  getSelectList (data) {
    return http.post('/areaDistrict/selectList', data)
  }
}

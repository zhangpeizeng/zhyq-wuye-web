// 园区综合服务
import http from './request'

export default {
    /**
     * 装修管理
     *
     */
    // 装修管理-查询列表
    decorateRegisterGetTableList(data) {
        return http.post('/decorateRegister/getTableList', data)
    },
    // 装修管理-详情查询
    decorateRegisterGetDetail(data) {
        return http.post('/decorateRegister/getDetail', data)
    },
    // 装修管理-新增
    decorateRegisterInsert(data) {
        return http.post('/decorateRegister/insert', data)
    },
    // 装修管理-更新
    decorateRegisterUpdate(data) {
        return http.post('/decorateRegister/update', data)
    },
    // 装修管理-单条删除数据
    decorateRegisterDelete(params) {
        return http.get('/decorateRegister/delete', {params})
    },
    //房间位置
    instanceRoomGetSelection (params) {
        return http.get('/zhyq-admin/instanceRoom/getSelection', { params })
    },

    /**
     * 公告发布
     *
     */

    // 公告发布-单条删除数据
    announcementDelete(params) {
        return http.get('/announcement/delete', {params})
    },
    // 公告发布-批量删除数据
    announcementDeletebatch(data) {
        return http.post('/announcement/deletebatch', data)
    },
    // 公告发布-获取详细信息
    announcementGetDetail(params) {
        return http.get('/announcement/getDetail', {params})
    },
    // 公告发布-获取表格数据
    announcementGetTableList(data) {
        return http.post('/announcement/getTableList', data)
    },
    // 公告发布-新增数据
    announcementInsert(data) {
        return http.post('/announcement/insert', data)
    },
    // 公告发布-单条撤回数据
    announcementRecall(params) {
        return http.get('/announcement/recall', {params})
    },
    // 公告发布-批量撤回数据
    announcementRecallbatch(data) {
        return http.post('/announcement/recallbatch', data)
    },
    // 公告发布-更新数据
    announcementUpdate(data) {
        return http.post('/announcement/update', data)
    },

}


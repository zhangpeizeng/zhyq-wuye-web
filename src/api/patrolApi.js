// 巡更管理
import http from './request'

export default {
  /**
   * 巡更工作台
   *
   */

  // 巡更工作台-查询当天值班人员
  dutyPersonToday (params) {
    return http.get('/pmcPatrolSchedule/dutyPersonToday', { params })
  },
  // 巡更工作台-巡检任务列表
  scheduleTaskDetail (params) {
    return http.get('/pmcPatrolSchedule/scheduleTaskDetail', { params })
  },
  // 巡更工作台-巡更进度
  queryCurrentTaskProcess (params) {
    return http.get('/pmcPatrolSchedule/queryCurrentTaskProcess', { params })
  },
  /**
   * 巡检点
   *
   */
  // 巡检点-批量删除
  pmcPatrolPointDeletebatch (data) {
    return http.post('/pmcPatrolPoint/deletebatch', data)
  },
  // 巡检点-单条删除数据
  pmcPatrolPointDelete (params) {
    return http.get('/pmcPatrolPoint/delete', { params })
  },
  // 巡检点-获取详细信息
  pmcPatrolPointGetDetail (params) {
    return http.get('/pmcPatrolPoint/getDetail', { params })
  },
  // 巡检点-获取表格数据
  pmcPatrolPointGetTableList (data) {
    return http.post('/pmcPatrolPoint/getTableList', data)
  },
  // 巡检点-新增数据
  pmcPatrolPointInsert (data) {
    return http.post('/pmcPatrolPoint/insert', data)
  },
  // 巡检点-更新数据
  pmcPatrolPointUpdate (data) {
    return http.post('/pmcPatrolPoint/update', data)
  },
  // 巡检点-获取所有巡检点
  pmcPatrolPointGetAllPoint (params) {
    return http.get('/pmcPatrolPoint/getAllPoint', { params })
  },

  /**
   * 巡更线路
   *
   */

  // 巡更线路-新增数据
  pmcPatrolLineInsert (data) {
    return http.post('/pmcPatrolLine/insert', data)
  },
  // 巡更线路-更新数据
  pmcPatrolLineUpdate (data) {
    return http.post('/pmcPatrolLine/update', data)
  },
  // 巡更线路-获取详细信息
  pmcPatrolLineGetDetail (params) {
    return http.get('/pmcPatrolLine/getDetail', { params })
  },
  // 巡更线路-单挑删除数据
  pmcPatrolLineDelete (params) {
    return http.get('/pmcPatrolLine/delete', { params })
  },
  // 巡更线路-批量删除数据
  pmcPatrolLineDeletebatch (data) {
    return http.post('/pmcPatrolLine/deletebatch', data)
  },
  // 巡更线路-获取表格的数据
  pmcPatrolLineGetTableList (data) {
    return http.post('/pmcPatrolLine/getTableList', data)
  },
  // 巡更线路-删除巡检路线中的巡检点
  pmcPointLineRelationDelete (params) {
    return http.get('/pmcPointLineRelation/delete', { params })
  },

  // 排班管理-列表
  getScheduleList (data) {
    return http.post('/pmcPatrolSchedule/getTableList', data)
  },
  // 排班管理-删除
  delSchedule (params) {
    return http.get('/pmcPatrolSchedule/delete', { params })
  },
  // 排班管理-新增
  addSchedule (data) {
    return http.post('/pmcPatrolSchedule/insert', data)
  },
  // 排班管理-编辑
  updateSchedule (data) {
    return http.post('/pmcPatrolSchedule/update', data)
  },
  // 排班管理-详情
  getScheduleDetail (params) {
    return http.get('/pmcPatrolSchedule/getDetail', { params })
  },

  /**
   * 巡逻任务
   *
   */
  // 巡逻任务-查询
  getTaskTableList (data) {
    return http.post('/pmcPatrolTask/getTableList', data)
  },
  // 巡逻任务-查巡逻路线
  getLinesByTaskId (params) {
    return http.get('/pmcPatrolTask/getLinesByTaskId', { params })
  },
  // 巡逻任务-查巡逻点
  getPointsByLineId (params) {
    return http.get('/pmcPatrolTask/getPointsByLineId', { params })
  },
  // 巡逻任务-新增任务
  pmcPatrolTaskInsert (data) {
    return http.post('/pmcPatrolTask/insert', data)
  },
  // 删除单条任务
  deleteTask (params) {
    return http.get('/pmcPatrolTask/delete', { params })
  },
  // 巡更统计-列表
  getStatisticList (data) {
    return http.post('/pmcPatrolSchedule/queryScheduleSummary', data)
  },
  // 巡更统计-详情
  getStatisticDetail (params) {
    return http.get('/pmcPatrolSchedule/queryScheduleProcessDetail', { params })
  },
  // 任务管理编辑任务
  updateTask (data) {
    return http.post('/pmcPatrolTask/update', data)
  }
}

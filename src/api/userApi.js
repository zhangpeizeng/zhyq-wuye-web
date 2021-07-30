import http from './request'

export default {
  // 登录
  userLogin (data) {
    return http.post('/zhyq-auth/login/doLogin', data)
  },
  // 刷新token
  refreshToken (data) {
    return http.post('/zhyq-auth/login/refreshToken', data)
  },
  // 获取token
  getToken (data) {
    return http.get(`/zhyq-auth/sso/getTokenByTicket?ticket=${data}`)
  },
  // 首页数据统计
 homepageQuery (params) {
    return http.get(`/homepage/query`, { params })
  },
  // 首页待办
  getTodoInfo () {
    return http.get('/pmcPatrolSchedule/queryUndoTask')
  },
  // 上传
  uploadBolb (data) {
    return http.post('/zhyq-admin/upload/uploadFile', data)
  },
  // 组织树
  getOrgList (data) {
    if (data.orgType === 2) {
      const headers = {
        orgId: data.id
      }
      return http.post('/zhyq-admin/sysOrg/list', data, { headers })
    } else {
      return http.post('/zhyq-admin/sysOrg/list', data)
    }
  },
  // 获取组织下的人
  getAccountList (data) {
    return http.post('/zhyq-admin/sysAccount/getCompanyAccountTableList', data)
  },
  formatTree (data, id, parentId, children) {
    const config = {
      id: id || 'id',
      parentId: parentId || 'parentId',
      childrenList: children || 'children'
    }

    var childrenListMap = {}
    var nodeIds = {}
    var tree = []

    for (const d of data) {
      const parentId = d[config.parentId]
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = []
      }
      nodeIds[d[config.id]] = d
      childrenListMap[parentId].push(d)
    }

    for (const d of data) {
      const parentId = d[config.parentId]
      if (nodeIds[parentId] == null) {
        tree.push(d)
      }
    }

    for (const t of tree) {
      adaptToChildrenList(t)
    }

    function adaptToChildrenList (o) {
      if (childrenListMap[o[config.id]] !== null) {
        o[config.childrenList] = childrenListMap[o[config.id]]
      }
      if (o[config.childrenList]) {
        for (const c of o[config.childrenList]) {
          adaptToChildrenList(c)
        }
      }
    }
    return tree
  }
}

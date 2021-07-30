// 系统管理
import http from './request'

// 企业账号列表
export function getAccountList (data) {
  return http.post('/sysAccount/getCompanyAccountTableList', data)
}
// 企业账号详情
export function getAccountDetail (data) {
  return http.post('/sysAccount/getCompanyAccountDetail', data)
}
// 新增企业账号
export function createAccount (data) {
  return http.post('/sysAccount/insertCompanyAccount', data)
}
// 编辑企业账号
export function updateAccount (data) {
  return http.post('/sysAccount/updateCompanyAccount', data)
}
// 删除企业账号
export function delAccount (data) {
  return http.post('/sysAccount/deleteCompanyAccount', data)
}
// 重置密码
export function resetPwd (data) {
  return http.post('/sysAccount/resetPassword', data)
}
// 账号启用停用
export function switchStatus (data) {
  return http.post('/sysAccount/enbaleOrDisable', data)
}

// 根据code查询字典-下拉用
export function getAllDictionary (data) {
  return http.post('/dictionaryContent/getContentList', data)
}
// 字典类型列表
export function getDictionaryTypeList (data) {
  return http.post('/dictionaryType/getTableList', data)
}
// 新增字典类型
export function addDictionaryType (data) {
  return http.post('/dictionaryType/insert', data)
}
// 编辑字典类型
export function updateDictionaryType (data) {
  return http.post('/dictionaryType/update', data)
}
// 删除字典类型
export function delDictionaryType (params) {
  return http.get('/dictionaryType/delete', { params })
}
// 字典值列表
export function getDictionaryValList (data) {
  return http.post('/zhyq-admin/dictionaryContent/getTableList', data)
}
// 新增字典值
export function addDictionaryVal (data) {
  return http.post('/dictionaryContent/insert', data)
}
// 编辑字典值
export function updateDictionaryVal (data) {
  return http.post('/dictionaryContent/update', data)
}
// 删除字典值
export function delDictionaryVal (params) {
  return http.get('/dictionaryContent/delete', { params })
}

// 所有角色列表
export function getAllRoleList (data) {
  return http.post('/sysRole/getAllRoleList', data)
}
// 角色列表
export function getRoleList (data) {
  return http.post('/sysRole/getTableList', data)
}
// 新增角色
export function addRole (data) {
  return http.post('/sysRole/insert', data)
}
// 获取角色授权树-菜单
export function getMenuPermissionList (data) {
  return http.post('/sysMenu/getAuthTree', data)
}
// 获取角色授权树-数据
export function getDataPermissionList (data) {
  return http.post('/sysRoleOrg/getAuthDataTree', data)
}
// 角色授权-菜单
export function setMenuPermission (data) {
  return http.post('/sysRole/authed', data)
}
// 角色授权-数据
export function setDataPermission (data) {
  return http.post('/sysRole/authedData', data)
}
// 编辑角色
export function editRole (data) {
  return http.post('/sysRole/update', data)
}
// 删除角色
export function delRole (params) {
  return http.get('/sysRole/delete', { params })
}

// 二维码列表
export function getQrcodeList (data) {
  return http.post('/qrCode/getTableList', data)
}
// 新增二维码
export function addQrcode (data) {
  return http.post('/qrCode/insert', data)
}
// 删除二维码
export function delQrcode (params) {
  return http.get('/qrCode/delete', { params })
}
// 编辑二维码
export function editQrcode (data) {
  return http.post('/qrCode/update', data)
}

// 组织树
// export function getOrgList (data) {
//   return http.post('/sysOrg/getOrgsTree', data)
// }
export function getOrgList (data) {
  if (data.orgType === 2) {
    const headers = {
      orgId: data.id
    }
    return http.post('/sysOrg/list', data, { headers })
  } else {
    return http.post('/sysOrg/list', data)
  }
}
// 新增组织机构
export function insertSysOrg (data) {
  return http.post('/sysOrg/insert', data)
}
// 修改组织机构
export function updateSysOrg (data) {
  return http.post('/sysOrg/update', data)
}
// 删除组织机构
export function deleteSysOrg (params) {
  return http.get('/sysOrg/delete', { params })
}
// 组织机构详情
export function getDetailSysOrg (params) {
  return http.get('/sysOrg/getDetail', { params })
}
// 添加组织
export function addOrg (data) {
  return http.post('/sysOrg/insert', data)
}
// 删除组织
export function delOrg (params) {
  return http.get('/sysOrg/delete', { params })
}
// 修改组织
export function editOrg (data) {
  return http.post('/sysOrg/update', data)
}
// 组织详情
export function getOrgDetail (params) {
  return http.get('/sysOrg/getDetail', { params })
}
export function formatTree (data, id, parentId, children) {
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
export function getTreeData (data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].childrens.length < 1) {
      // children若为空数组，则将children设为undefined
      data[i].childrens = undefined
    } else {
      // children若不为空数组，则继续 递归调用 本方法
      this.getTreeData(data[i].childrens)
    }
  }
  return data
}
// 首页菜单树
export function getIndexMenuList () {
  return http.get('/sysMenu/getIndexMenu')
}
// 菜单列表
export function getMenuList () {
  return http.get('/sysMenu/getManagementMenu')
}
// 菜单详情
export function getMenuDetail (params) {
  return http.get('/sysMenu/getDetail', { params })
}
// 修改菜单
export function editMenu (data) {
  return http.post('/sysMenu/update', data)
}
// 添加菜单
export function addMenuItem (data) {
  return http.post('/sysMenu/insert', data)
}
// 删除菜单
export function delMenuItem (params) {
  return http.get('/sysMenu/delete', { params })
}
// 功能列表
export function getFuncList (data) {
  return http.post('/sysFunction/getTableList', data)
}
// 删除功能
export function delFunc (params) {
  return http.get('/sysFunction/delete', { params })
}
// 添加功能
export function addFunc (data) {
  return http.post('/sysFunction/insert', data)
}
// 修改功能
export function editFunc (data) {
  return http.post('/sysFunction/update', data)
}
// 添加功能
export function sysAccountUploadUserAccount (data) {
  return http.post('/sysAccount/uploadUserAccount', data)
}

// 字典
// 企业类型
export const COMPANY_TYPES = [
  { label: '合资企业', value: 'joint_venture' },
  { label: '独资企业', value: 'sole_proprietorship' }
]
export const COMPANY_TYPES_MAP = {
  joint_venture: '合资企业',
  sole_proprietorship: '独资企业'
}
export const COMPANY_REGISTER_TYPES = [
  { label: '园区', value: 'park' },
  { label: '企业', value: 'company' },
  { label: '物业', value: 'property' },
  { label: '运营', value: 'operation' },
  { label: '招商', value: 'merchants' }
]
export const COMPANY_REGISTER_TYPES_MAP = {
  park: '园区',
  company: '企业',
  property: '物业',
  operation: '运行',
  merchants: '招商'
}
// 角色类别
export const ROLE_TYPES = [
  { label: '组织', value: 1 },
  { label: '个人', value: 2 },
  { label: '企业', value: 3 },
  { label: '运营', value: 4 }
]
export const ROLE_TYPES_MAP = {
  1: '组织',
  2: '个人',
  3: '企业',
  4: '运营'
}

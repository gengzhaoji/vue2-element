import axios, { download } from '@/utils/axios'

// 查询角色列表
export const listRole = (data) => axios({ url: '/system/role/list', data })

// 查询角色详细
export const getRole = (roleId) => axios({ url: '/system/role/' + roleId })

// 新增角色
export const addRole = (data) => axios({ url: '/system/role', method: 'post', data })

// 修改角色
export const updateRole = (data) => axios({ url: '/system/role', method: 'put', data })

// 角色数据权限
export const dataScope = (data) => axios({ url: '/system/role/dataScope', method: 'put', data })

// 角色状态修改
export const changeRoleStatus = (roleId, status) => {
  const data = {
    roleId,
    status
  }
  return axios({
    url: '/system/role/changeStatus',
    method: 'put',
    data
  })
}

// 删除角色
export const delRole = (roleId) => axios({ url: '/system/role/' + roleId, method: 'delete' })

// 导出功能
export const Export = (data) => download('/system/role/export', data, '角色管理.xlsx')
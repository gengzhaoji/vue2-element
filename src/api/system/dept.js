import axios from '@/utils/axios'

// 查询部门列表
export const listDept = (data) => axios({ url: '/system/dept/list', data })

// 查询部门列表（排除节点）
export const listDeptExcludeChild = (deptId) => axios({ url: '/system/dept/list/exclude/' + deptId })

// 查询部门详细
export const getDept = (deptId) => axios({ url: '/system/dept/' + deptId })

// 查询部门下拉树结构
export const treeselect = (data) => axios({ url: '/system/dept/treeselect', data })

// 根据角色ID查询部门树结构
export const roleDeptTreeselect = (roleId) => axios({ url: '/system/dept/roleDeptTreeselect/' + roleId })

// 新增部门
export const addDept = (data) => axios({ url: '/system/dept', method: 'post', data })

// 修改部门
export const updateDept = (data) => axios({ url: '/system/dept', method: 'put', data })

// 删除部门
export const delDept = (deptId) => axios({ url: '/system/dept/' + deptId, method: 'delete' })
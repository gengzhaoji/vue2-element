import axios from '@/utils/axios'

// 查询菜单列表
export const listMenu = (data) => axios({ url: '/system/menu/list', data })

// 查询菜单详细
export const getMenu = (menuId) => axios({ url: '/system/menu/' + menuId })

// 查询菜单下拉树结构
export const treeselect = () => axios({ url: '/system/menu/treeselect' })

// 根据角色ID查询菜单下拉树结构
export const roleMenuTreeselect = (roleId) => axios({ url: '/system/menu/roleMenuTreeselect/' + roleId, })

// 新增菜单
export const addMenu = (data) => axios({ url: '/system/menu', method: 'post', data })

// 修改菜单
export const updateMenu = (data) => axios({ url: '/system/menu', method: 'put', data })

// 删除菜单
export const delMenu = (menuId) => axios({ url: '/system/menu/' + menuId, method: 'delete' })

// 获取路由
export const getRouters = () => axios({ url: '/system/menu/getRouters' })
import axios, { download } from '@/utils/axios'

// 查询字典类型列表
export const listType = (data) => axios({ url: '/system/dict/type/list', data })

// 查询字典类型详细
export const getType = (dictId) => axios({ url: '/system/dict/type/' + dictId })

// 新增字典类型
export const addType = (data) => axios({ url: '/system/dict/type', method: 'post', data })

// 修改字典类型
export const updateType = (data) => axios({ url: '/system/dict/type', method: 'put', data })

// 删除字典类型
export const delType = (dictId) => axios({ url: '/system/dict/type/' + dictId, method: 'delete' })

// 清理参数缓存
export const clearCache = () => axios({ url: '/system/dict/type/clearCache', method: 'delete' })

// 获取字典选择框列表
export const optionselect = () => axios({ url: '/system/dict/type/optionselect' })

// 导出功能
export const Export = (data) => download('/system/dict/type/export', data, '字典管理.xlsx')

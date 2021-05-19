import axios, { download } from '@/utils/axios'

// 查询字典数据列表
export const listData = (data) => axios({ url: '/system/dict/data/list', data })

// 查询字典数据详细
export const getData = (dictCode) => axios({ url: '/system/dict/data/' + dictCode, })

// 根据字典类型查询字典数据信息
export const getDicts = (dictType) => axios({ url: '/system/dict/data/type/' + dictType, })

// 新增字典数据
export const addData = (data) => axios({ url: '/system/dict/data', method: 'post', data })

// 修改字典数据
export const updateData = (data) => axios({ url: '/system/dict/data', method: 'put', data })

// 删除字典数据
export const delData = (dictCode) => axios({ url: '/system/dict/data/' + dictCode, method: 'delete' })

// 导出功能
export const Export = (data) => download('/system/dict/data/export', data, '字典数据管理.xlsx')
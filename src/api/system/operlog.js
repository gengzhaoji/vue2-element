import axios, { download } from '@/utils/axios'

// 查询操作日志列表
export const list = (data) => axios({ url: '/system/operlog/list', method: 'get', data })

// 删除操作日志
export const delOperlog = (operId) => axios({ url: '/system/operlog/' + operId, method: 'delete' })

// 清空操作日志
export const cleanOperlog = () => axios({ url: '/system/operlog/clean', method: 'delete' })

// 导出操作日志
export const Export = (data) => download('/system/operlog/export', data, '操作日志.xlsx')

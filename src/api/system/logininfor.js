import axios, { download } from '@/utils/axios'

// 查询登录日志列表
export const list = (data) => axios({ url: '/system/logininfor/list', data })

// 删除登录日志
export const delLogininfor = (infoId) => axios({ url: '/system/logininfor/' + infoId, method: 'delete' })

// 清空登录日志
export const cleanLogininfor = () => axios({ url: '/system/logininfor/clean', method: 'delete' })

// 导出登录日志
export const Export = (data) => download('/system/logininfor/export', data, '登录日志.xlsx')

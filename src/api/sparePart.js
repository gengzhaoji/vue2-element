import axios, { download } from '@/utils/axios'
/**
 * 新增信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const Insert = (data) => axios({ method: 'post', data, url: '/equipment/parts' })

/**
 * 修改信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const Updata = (data) => axios({ method: 'put', data, url: '/equipment/parts' })

/**
 * 获取详细信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const Details = (data) => axios({ url: '/equipment/parts/' + data })

/**
 * 删除
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const Delete = (data) => axios({ method: 'delete', url: '/equipment/parts/' + data })

/**
 * 导出列表
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const Export = (data) => download('/equipment/parts/export', data, '备件备品.xlsx')

/**
 * 查询列表
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const List = (data) => axios({ data, url: '/equipment/parts/list' })



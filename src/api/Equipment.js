import axios, { download } from '@/utils/axios'
/**
 * 新增设备信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const equipmentInsert = (data) => axios({ method: 'post', data, url: '/equipment/info' })

/**
 * 修改设备信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const equipmentUpdata = (data) => axios({ method: 'put', data, url: '/equipment/info' })

/**
 * 获取设备信息详细信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const equipmentDetails = (data) => axios({ url: '/equipment/info/' + data })

/**
 * 删除设备信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const equipmentDelete = (data) => axios({ method: 'delete', url: '/equipment/info/' + data })

/**
 * 导出设备信息列表
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const equipmentExport = (data) => download('/equipment/info/export', data, '设备信息.xlsx')

/**
 * /info/getEqptNames 获取所有设备中的设备名称列表
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const equipmentEqptNames = (data) => axios({ data, url: '/equipment/info/getEqptNames' })

/**
 * 查询设备信息列表
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const equipmentList = (data) => axios({ data, url: '/equipment/info/list' })



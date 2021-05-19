import axios, { download } from '@utils/axios'

/**
 * 新增信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const faultInsert = (data) => axios({ method: 'post', data, url: '/equipment/fault' })

/**
 * 修改信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const faultUpdata = (data) => axios({ method: 'put', data, url: '/equipment/fault' })

/**
 * 获取详细信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const faultDetails = (data) => axios({ url: '/equipment/fault/' + data })

/**
 * 删除信息
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const faultDelete = (data) => axios({ method: 'delete', url: '/equipment/fault/' + data })

/**
 * 导出信息列表
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const faultExport = (data) => download('/equipment/fault/export', data, `故障报修.xlsx`)

/**
 * 查询信息列表
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const faultList = (data) => axios({ data, url: '/equipment/fault/list' })

/**
 * 维修下单接口
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const faultrepairtask = (data) => axios({ method: 'post', data, url: '/equipment/faultrepairtask' })



/**
 * 维修任务部分
 */
/**
* 维修任务列表查询
* @param {object} [data] 发送键值对数据
* @returns {promise}
*/
export const taskList = (data) => axios({ data, url: '/equipment/faultrepairtask/list' })
/**
 * 维修任务删除
 * @param {string} data  记录id
 * @returns 
 */
export const taskDelete = (data) => axios({ method: 'delete', url: '/equipment/faultrepairtask/' + data })
/**
 * 知识库查询
 * @param {object} data 发送键值对数据
 * @returns 
 */
export const repositoryList = (data) => axios({ url: "/equipment/repository/list", data })
/**
 * 备件库查询
 * @param {object} data 
 * @returns 
 */
export const spareList = (data) => axios({ url: '/equipment/parts/list', data })
/**
 * 修改故障维修信息
 * @param {object} data 发送键值对数据
 * @returns 
 */
export const taskUpdata = (data) => axios({ method: 'put', data, url: '/equipment/faultrepairtask/fault' })
/**
 * 查询维修信息详情
 * @param {string} data id
 * @returns
 */
export const taskDetail = (data) => axios({ url: `/equipment/faultrepairtask/${data}` })
/**
 * 审批功能
 * @param {object} data 
 * @returns 
 */
export const taskapprove = (data) => axios({ method: 'put', data, url: `/equipment/faultrepairtask/approve` })
/**
 * 执行维修功能
 * @param {object} data 
 * @returns 
 */
export const taskrepair = (data) => axios({ method: 'put', data, url: '/equipment/faultrepairtask/repair' })
/**
 * 验收功能
 * @param {object} data 
 * @returns 
 */
export const taskcheck = (data) => axios({ method: 'put', data, url: "/equipment/faultrepairtask/check" })
/**
 * 维修记录导出功能
 * @param {string} data 维修任务id
 * @returns 
 */
export const taskExport = (data) => download(`/equipment/faultrepairtask/exportData/${data}`, '', `故障报修详情.xls`)



/**
 * 维修记录部分
 */
/**
 * 维修记录列表查询
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export const repairedList = (data) => axios({ data, url: '/equipment/faultrepairtask/repaired/list' })
/**
 * 维修记录删除
 * @param {string} data  记录id
 * @returns 
 */
export const repairedDelete = (data) => axios({ method: 'delete', url: `/equipment/faultrepairtask/delete/${data}`})
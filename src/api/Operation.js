import axios, { download } from '@/utils/axios'

/**
 * 润滑标准管理部分逻辑
 */
// 查询设备部位润滑标准列表
export const listLubstandard = (data) => axios({ url: '/equipment/lubstandard/list', data })

// 查询设备部位润滑标准详细
export const getLubstandard = (standardId) => axios({ url: '/equipment/lubstandard/' + standardId })

// 新增设备部位润滑标准
export const addLubstandard = (data) => axios({ url: '/equipment/lubstandard', method: 'post', data })

// 修改设备部位润滑标准
export const updateLubstandard = (data) => axios({ url: '/equipment/lubstandard', method: 'put', data })

// 删除设备部位润滑标准
export const delLubstandard = (standardId) => axios({ url: '/equipment/lubstandard/' + standardId, method: 'delete' })

// 查询设备型号下拉树结构
export const specificationModel_treeselect = () => axios({ url: '/equipment/lubstandard/treeselect' })

// 得到设备型号下拉树结构中第一个设备型号
export const treeselectFirst = () => axios({ url: '/equipment/lubstandard/treeselectFirst' })

// 查询当前设备型号下的所有润滑部位
export const getLubStandardSite = (specificationModel) => axios({ url: '/equipment/lubstandard/getLubStandardSite/' + specificationModel })

// 查询导入润滑作业指导书
export const lubstandardfileList = () => axios({ url: '/equipment/lubstandardfile/list'})


/**
 * 润滑计划管理部分逻辑
 */
export const PlanList = (data) => axios({ url: '/equipment/lubplan/list', data })

export const PlanDelete = (data) => axios({ url: '/equipment/lubplan/' + data, method: 'delete' })

export const PlanUpdata = (data) => axios({ url: '/equipment/lubplan', method: 'put', data })

export const PlanInsert = (data) => axios({ url: '/equipment/lubplan', method: 'post', data })

export const PlanDetails = (data) => axios({ url: '/equipment/lubplan/' + data })

// 查询设备名称下拉树结构
export const eqptNameTree = () => axios({ url: '/equipment/lubplan/treeselect' })

// 查询润滑部位下拉树结构
export const lubricationSiteTreeselect = (data) => axios({ url: '/equipment/lubplan/lubricationSiteTreeselect/' + data })

// 计划状态修改
export const changePlanStatus = (planId, planStatus) => axios({ url: '/equipment/lubplan', method: 'put', data: { planId, planStatus } })

// 查询当前设备下的所有润滑部位
export const getLubplanStandard = (eqptId) => axios({ url: '/equipment/lubplan/getLubplanStandard/' + eqptId })


/**
 * 
 * 润滑计划执行
 */
// 查询润滑执行列表
export const listLubrecord = (data) => axios({ url: '/equipment/lubrecord/list', data })

// 查询润滑执行详细
export const getLubrecord = (recordId) => axios({ url: '/equipment/lubrecord/' + recordId, method: 'get' })

// 新增润滑执行
export const addLubrecord = (data) => axios({ url: '/equipment/lubrecord', method: 'post', data })

// 修改润滑执行
export const updateLubrecord = (data) => axios({ url: '/equipment/lubrecord', method: 'put', data })

// 删除润滑执行
export const delLubrecord = (recordId) => axios({ url: '/equipment/lubrecord/' + recordId, method: 'delete' })

// 导出润滑执行  
export const ExportLubrecord = (data) => download('/equipment/lubrecord/export', data, '润滑执行.xlsx')



/**
 * 润滑计划执行记录
 */
export const recordList = (data) => axios({ url: '/equipment/lubrecorded/list', data })

export const recordedDel = (data) => axios({ url: '/equipment/lubrecorded/' + data, method: 'delete' })

export const recordedDetail = (data) => axios({ url: '/equipment/lubrecorded/' + data })

export const recordedExport = (data) => download('/equipment/lubrecorded/export', data, '润滑计划执行记录.xlsx')

// 获取润滑油品列表
export const partsList = (spareType) => axios({ url: '/equipment/parts/treeselect', data: { spareType: spareType } })


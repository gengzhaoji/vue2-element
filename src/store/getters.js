const getters = {
  size: state => state.user.size,
  user: state => state.user.user,
  remark: state => state.user.remark,
  token: state => state.user.token,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  permissions: state => state.user.permissions,
  /**
   * 生成菜单部分
   */
  menu: state => state.menu.menu,
  menuList: state => state.menu.menuList,
  /**
   * 
   * @param {全局超过两处的共用数据} state 
   * @returns 
   */
  // 设备型号树
  specificationModel: state => state.com.specificationModel,
  // 下拉框设备型号树
  specificationModelSelect: state => {
    const data = state.com.specificationModel;
    if (data.length > 0) {
      return data[0].children || [];
    }
  },
  // 设备状态
  eqptStatusList: state => state.com.eqptStatusList,
  // 设备类型
  eqptTypeList: state => state.com.eqptTypeList,
  // 用户名称
  nameList: state => state.com.nameList,
  // 部门名称
  deptList: state => state.com.deptList,
  // 额定寿命单位
  eqptLifetimeUnit: state => state.com.eqptLifetimeUnit,
  // 故障类型
  malfunctionTypeList: state => state.com.malfunctionTypeList,
  // 润滑方式
  eqpt_lub_method: state => state.com.eqpt_lub_method,
  // 润滑周期单位
  eqpt_lub_cycle_unit: state => state.com.eqpt_lub_cycle_unit,
  // 润滑油品
  oilId: state => state.com.oilId,
  // 是否提醒
  eqpt_lub_plan_remind: state => state.com.eqpt_lub_plan_remind,
  // 计划状态
  eqpt_lub_plan_status: state => state.com.eqpt_lub_plan_status,
  // 验收状态
  eqpt_lub_exe_status: state => state.com.eqpt_lub_exe_status,
  // 验收状态
  checkStatus: state => state.com.checkStatus,
  // 设备名称
  eqptNameTree: state => state.com.eqptNameTree,
  // 故障来源
  faultSources: state => state.com.faultSources,
  // 故障报修状态
  faultStatus: state => state.com.faultStatus,
  // 删除标志
  delFlag: state => state.com.delFlag,
  // 任务状态
  taskStatus: state => state.com.taskStatus,
  // 审批状态
  approveStatus: state => state.com.approveStatus,
  // 验收结果
  checkStatusList: state => state.com.checkStatusList,
  // 维修状态
  repairStatus: state => state.com.repairStatus,
  // 维修级别
  repairLevel: state => state.com.repairLevel,
  // 维修类别
  repairType: state => state.com.repairType,
  // 紧急程度
  urgentLevel: state => state.com.urgentLevel,
  // 维修原因
  repairReason: state => state.com.repairReason,
  // 是否停机
  downtimeFlag: state => state.com.downtimeFlag,
  // 停机时长单位
  downtimeLengthUnit: state => state.com.downtimeLengthUnit,
  // 备件库分类
  spareType: state => state.com.spareType,
  // 点检类型
  spotcheckType: state => state.com.spotcheckType,
  // 点检周期单位
  spotcheckCycleUnit: state => state.com.spotcheckCycleUnit,
  // 点检状态
  spotcheckStatus: state => state.com.spotcheckStatus,
  // 点检任务状态
  spotcheckTaskStatus: state => state.com.spotcheckTaskStatus,
  // 任务下发状态
  taskPublishStatus: state => state.com.taskPublishStatus,
  // 任务执行（检测结果）
  checkResult: state => state.com.checkResult,
  /**
   * 检修部分
   */
  // 计划类型
  ohTypeList: state => state.com.ohTypeList,
  // 计划状态
  ohStatusList: state => state.com.ohStatusList,
  // 检修级别
  ohLevelList: state => state.com.ohLevelList,
  // 检修持续时间单位
  ohLengthUnitList: state => state.com.ohLengthUnitList,
  // 生产技术中心审核结果
  scjszxReviewStatusList: state => state.com.scjszxReviewStatusList,
  // 供销部审核结果
  gxbReviewStatusList: state => state.com.gxbReviewStatusList,
  // 执行结果
  executionStatusList: state => state.com.executionStatusList,
  // 检修审批结果
  planApproveStatus: state => state.com.planApproveStatus,
  // 检修作业单状态
  workStatusList: state => state.com.workStatusList,
  // 检修验收结果
  planCheckStatus: state => state.com.planCheckStatus,
  /**
   * 巡检部分
   */
  // 巡检任务是否执行
  patrolTaskStatusList: state => state.com.patrolTaskStatusList,
  // 班次巡检状态
  PatrolStatusList: state => state.com.PatrolStatusList,
}
export default getters

import { treeselect } from "@/api/system/dept";
import { userNameTreeselect } from "@/api/system/user";
import { getDicts } from "@/api/system/dict/data";
import { specificationModel_treeselect } from "@api/Operation";
import { eqptNameTree, partsList } from "@api/Operation";

export default {
    state: {
        // 设备型号树
        specificationModel: [],
        // 用户名称
        nameList: [],
        // 部门名称
        deptList: [],
        // 设备类型
        eqptTypeList: [],
        // 设备状态
        eqptStatusList: [],
        // 额定寿命单位
        eqptLifetimeUnit: [],
        // 故障类型
        malfunctionTypeList: [],
        // 润滑方式
        eqpt_lub_method: [],
        // 润滑周期单位
        eqpt_lub_cycle_unit: [],
        // 润滑油品
        oilId: [],
        // 是否提醒
        eqpt_lub_plan_remind: [],
        // 计划状态
        eqpt_lub_plan_status: [],
        // 验收状态
        eqpt_lub_exe_status: [],
        // 验收状态
        checkStatus: [],
        // 设备名称
        eqptNameTree: [],
        // 故障来源
        faultSources: [
            {
                dictLabel: '点检上报',
                dictValue: '1'
            }, {
                dictLabel: '巡检上报',
                dictValue: '2'
            }, {
                dictLabel: 'wincc',
                dictValue: '3'
            }, {
                dictLabel: '手动添加',
                dictValue: '4'
            }
        ],
        // 故障报修状态
        faultStatus: [
            {
                dictLabel: '未报修',
                dictValue: '1'
            }, {
                dictLabel: '已报修',
                dictValue: '2'
            }
        ],
        // 删除标志
        delFlag: [
            {
                dictLabel: '未删除',
                dictValue: '1'
            }, {
                dictLabel: '已删除',
                dictValue: '2'
            }
        ],
        // 任务状态
        taskStatus: [{
            dictLabel: '待审批',
            dictValue: '1'
        }, {
            dictLabel: '审批未通过',
            dictValue: '2'
        }, {
            dictLabel: '待维修',
            dictValue: '3'
        }, {
            dictLabel: '维修中',
            dictValue: '4'
        }, {
            dictLabel: '待验收',
            dictValue: '5'
        }, {
            dictLabel: '验收未通过',
            dictValue: '6'
        }, {
            dictLabel: '验收通过',
            dictValue: '7'
        }],
        // 审批状态
        approveStatus: [{
            dictLabel: '待审批',
            dictValue: '1'
        }, {
            dictLabel: '审批通过',
            dictValue: '2'
        }, {
            dictLabel: '审批未通过',
            dictValue: '3'
        }],
        // 验收结果
        checkStatusList: [{
            dictLabel: '待验收',
            dictValue: '1'
        }, {
            dictLabel: '验收通过',
            dictValue: '2'
        }, {
            dictLabel: '验收未通过',
            dictValue: '3'
        }],
        // 维修状态
        repairStatus: [{
            dictLabel: '待维修',
            dictValue: '1'
        }, {
            dictLabel: '维修中',
            dictValue: '2'
        }, {
            dictLabel: '已维修',
            dictValue: '3'
        }],
        // 维修级别
        repairLevel: [{
            dictLabel: '大修',
            dictValue: '1'
        }, {
            dictLabel: '中修',
            dictValue: '2'
        }, {
            dictLabel: '小修',
            dictValue: '3'
        }],
        // 维修类别
        repairType: [{
            dictLabel: '常见故障',
            dictValue: '1'
        }, {
            dictLabel: '突发性故障',
            dictValue: '2'
        }, {
            dictLabel: '小修',
            dictValue: '3'
        }],
        // 紧急程度
        urgentLevel: [{
            dictLabel: '紧急',
            dictValue: '1'
        }, {
            dictLabel: '高',
            dictValue: '2'
        }, {
            dictLabel: '中',
            dictValue: '3'
        }, {
            dictLabel: '低',
            dictValue: '4'
        }],
        // 维修原因
        repairReason: [{
            dictLabel: '自然磨损',
            dictValue: '1'
        }, {
            dictLabel: '违章操作',
            dictValue: '2'
        }, {
            dictLabel: '配件质量差',
            dictValue: '3'
        }, {
            dictLabel: '维护保养不到位',
            dictValue: '4'
        }, {
            dictLabel: '其他',
            dictValue: '5'
        }],
        // 是否停机
        downtimeFlag: [{
            dictLabel: '停机',
            dictValue: '1'
        }, {
            dictLabel: '开机',
            dictValue: '2'
        }],
        // 停机时长单位
        downtimeLengthUnit: [{
            dictLabel: '分钟',
            dictValue: '1'
        }, {
            dictLabel: '小时',
            dictValue: '2'
        }, {
            dictLabel: '天',
            dictValue: '3'
        }],
        // 备件库分类
        spareType: [{
            dictLabel: '备件',
            dictValue: '1'
        }, {
            dictLabel: '材料',
            dictValue: '2'
        }, {
            dictLabel: '低值易耗',
            dictValue: '3'
        }],
        // 点检类型
        spotcheckType: [{
            dictLabel: '日检',
            dictValue: '1'
        }, {
            dictLabel: '专检',
            dictValue: '2'
        }, {
            dictLabel: '精检',
            dictValue: '3'
        }],
        // 点检周期单位
        spotcheckCycleUnit: [{
            dictLabel: '分钟',
            dictValue: '1'
        }, {
            dictLabel: '小时',
            dictValue: '2'
        }, {
            dictLabel: '班',
            dictValue: '3'
        }, {
            dictLabel: '天',
            dictValue: '4'
        }, {
            dictLabel: '周',
            dictValue: '5'
        }, {
            dictLabel: '月',
            dictValue: '6'
        }, {
            dictLabel: '年',
            dictValue: '7'
        }],
        // 点检状态
        spotcheckStatus: [{
            dictLabel: '运转中点检',
            dictValue: '1'
        }, {
            dictLabel: '停止中点检',
            dictValue: '2'
        }],
        // 点检任务状态
        spotcheckTaskStatus: [{
            dictLabel: '已执行',
            dictValue: '1'
        }, {
            dictLabel: '未执行',
            dictValue: '2'
        }],
        // 任务下发状态
        taskPublishStatus: [{
            dictLabel: '未下发',
            dictValue: '1'
        }, {
            dictLabel: '已下发',
            dictValue: '2'
        }],
        // 任务执行（检测结果）
        checkResult: [{
            dictLabel: '正常',
            dictValue: '1'
        }, {
            dictLabel: '异常',
            dictValue: '2'
        }],
        // 检修计划类型
        ohTypeList: [{
            dictLabel: '周计划',
            dictValue: '1'
        }, {
            dictLabel: '月计划',
            dictValue: '2'
        }, {
            dictLabel: '年计划',
            dictValue: '3'
        }],
        // 计划状态
        ohStatusList: [{
            dictLabel: '计划中',
            dictValue: '1'
        }, {
            dictLabel: '待审核',
            dictValue: '2'
        }, {
            dictLabel: '审核未通过',
            dictValue: '3'
        }, {
            dictLabel: '待审批',
            dictValue: '4'
        }, {
            dictLabel: '审批未通过',
            dictValue: '5'
        }, {
            dictLabel: '待执行',
            dictValue: '6'
        }, {
            dictLabel: '执行中',
            dictValue: '7'
        }, {
            dictLabel: '已完成',
            dictValue: '8'
        }],
        // 检修级别
        ohLevelList: [{
            dictLabel: '一级检修',
            dictValue: '1'
        }, {
            dictLabel: '二级检修',
            dictValue: '2'
        }, {
            dictLabel: '三级检修',
            dictValue: '3'
        }, {
            dictLabel: '无',
            dictValue: '4'
        }],
        // 检修持续时间单位
        ohLengthUnitList: [{
            dictLabel: '分钟',
            dictValue: '1'
        }, {
            dictLabel: '小时',
            dictValue: '2'
        }, {
            dictLabel: '天',
            dictValue: '3'
        }],
        // 生产技术中心审核结果
        scjszxReviewStatusList: [{
            dictLabel: '审核通过',
            dictValue: '2'
        }, {
            dictLabel: '审核未通过',
            dictValue: '3'
        }],
        // 供销部审核结果
        gxbReviewStatusList: [{
            dictLabel: '审核通过',
            dictValue: '2'
        }, {
            dictLabel: '审核未通过',
            dictValue: '3'
        }],
        // 检修审批结果
        planApproveStatus: [{
            dictLabel: '审批通过',
            dictValue: '2'
        }, {
            dictLabel: '审批未通过',
            dictValue: '3'
        }],
        // 检修作业单状态
        workStatusList: [{
            dictLabel: '制定中',
            dictValue: '1'
        }, {
            dictLabel: '待审批',
            dictValue: '2'
        }, {
            dictLabel: '审批未通过',
            dictValue: '3'
        }, {
            dictLabel: '待执行',
            dictValue: '4'
        }, {
            dictLabel: '待验收',
            dictValue: '5'
        }, {
            dictLabel: '验收通过',
            dictValue: '6'
        }, {
            dictLabel: '验收未通过',
            dictValue: '7'
        }],
        // 检修验收结果
        planCheckStatus: [{
            dictLabel: '验收通过',
            dictValue: '2'
        }, {
            dictLabel: '验收未通过',
            dictValue: '3'
        }],
        // 执行结果
        executionStatusList: [{
            dictLabel: '待执行',
            dictValue: '1'
        }, {
            dictLabel: '执行中',
            dictValue: '2'
        }, {
            dictLabel: '已完成',
            dictValue: '3'
        }],
        // 巡检任务是否执行
        patrolTaskStatusList: [{
            dictLabel: '未执行',
            dictValue: '1'
        }, {
            dictLabel: '已执行',
            dictValue: '2'
        }],
        // 班次巡检状态
        PatrolStatusList: [{
            dictLabel: '正常',
            dictValue: '1'
        }, {
            dictLabel: '不正常',
            dictValue: '2'
        }, {
            dictLabel: '已修好',
            dictValue: '3'
        }],
    },

    mutations: {
        SET_specificationModel: (state, item) => {
            state.specificationModel = item
        },
        SET_nameList: (state, item) => {
            state.nameList = item
        },
        SET_deptList: (state, item) => {
            state.deptList = item
        },
        SET_eqptTypeList: (state, item) => {
            state.eqptTypeList = item
        },
        SET_eqptStatusList: (state, item) => {
            state.eqptStatusList = item
        },
        SET_eqptLifetimeUnit: (state, item) => {
            state.eqptLifetimeUnit = item
        },
        SET_malfunctionTypeList: (state, item) => {
            state.malfunctionTypeList = item
        },
        SET_eqpt_lub_method: (state, item) => {
            state.eqpt_lub_method = item
        },
        SET_eqpt_lub_cycle_unit: (state, item) => {
            state.eqpt_lub_cycle_unit = item
        },
        SET_oilId: (state, item) => {
            state.oilId = item
        },
        SET_eqpt_lub_plan_remind: (state, item) => {
            state.eqpt_lub_plan_remind = item
        },
        SET_eqpt_lub_plan_status: (state, item) => {
            state.eqpt_lub_plan_status = item
        },
        SET_eqpt_lub_exe_status: (state, item) => {
            state.eqpt_lub_exe_status = item
        },
        SET_eqptNameTree: (state, item) => {
            state.eqptNameTree = item
        },
        SET_checkStatus: (state, item) => {
            state.checkStatus = item
        }
    },

    actions: {
        // 获取设备型号树
        GetspecificationModel({ commit, state }, query = false) {
            return new Promise((resolve, reject) => {
                if (state.specificationModel.length > 0 && !query) {
                    resolve(state.specificationModel);
                } else {
                    specificationModel_treeselect().then(res => {
                        commit('SET_specificationModel', res.data);
                        resolve(state.specificationModel);
                    }).catch(err => {
                        reject(err)
                    });
                }
            })
        },
        // 获取用户列表
        GetnameList({ commit, state }, deptId, query = false) {
            return new Promise((resolve, reject) => {
                if (state.nameList.length > 0 && !query) {
                    resolve(state.nameList);
                } else {
                    userNameTreeselect({ deptId }).then(res => {
                        commit('SET_nameList', res.data);
                        resolve(state.nameList);
                    }).catch(err => {
                        reject(err)
                    });
                }
            })
        },
        // 获取部门树
        GetdeptList({ commit, state }, deptId, query = false) {
            return new Promise((resolve, reject) => {
                if (state.deptList.length > 0 && !query) {
                    resolve(state.deptList);
                } else {
                    treeselect({ deptId }).then(res => {
                        commit('SET_deptList', res.data);
                        resolve(state.deptList);
                    }).catch(err => {
                        reject(err)
                    });
                }
            })
        },
        // 获取设备类型
        GeteqptTypeList({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.eqptTypeList.length > 0) {
                    resolve(state.eqptTypeList);
                } else {
                    getDicts("equipment-type").then(res => {
                        commit('SET_eqptTypeList', res.data);
                        resolve(state.eqptTypeList);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        // 获取设备状态
        GeteqptStatusList({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.eqptStatusList.length > 0) {
                    resolve(state.eqptStatusList);
                } else {
                    getDicts("equipment_status").then(res => {
                        commit('SET_eqptStatusList', res.data);
                        resolve(state.eqptStatusList);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        // 获取设备寿命单位字典
        GeteqptLifetimeUnit({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.eqptLifetimeUnit.length > 0) {
                    resolve(state.eqptLifetimeUnit);
                } else {
                    getDicts("equipment_lifetime_unit").then(res => {
                        commit('SET_eqptLifetimeUnit', res.data);
                        resolve(state.eqptLifetimeUnit);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        // 获取故障类型
        GetmalfunctionTypeList({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.malfunctionTypeList.length > 0) {
                    resolve(state.malfunctionTypeList);
                } else {
                    getDicts("malfunction_type").then(res => {
                        commit('SET_malfunctionTypeList', res.data);
                        resolve(state.malfunctionTypeList);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        // 获取润滑方式
        Geteqpt_lub_method({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.eqpt_lub_method.length > 0) {
                    resolve(state.eqpt_lub_method);
                } else {
                    getDicts("eqpt_lub_method").then(res => {
                        commit('SET_eqpt_lub_method', res.data);
                        resolve(state.eqpt_lub_method);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        // 获取润滑周期单位
        Geteqpt_lub_cycle_unit({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.eqpt_lub_cycle_unit.length > 0) {
                    resolve(state.eqpt_lub_cycle_unit);
                } else {
                    getDicts("eqpt_lub_cycle_unit").then(res => {
                        commit('SET_eqpt_lub_cycle_unit', res.data);
                        resolve(state.eqpt_lub_cycle_unit);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        // （润滑-润滑油品使用）
        GetoilId({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                if (state.oilId.length > 0) {
                    resolve(state.oilId);
                } else {
                    partsList(data).then(res => {
                        const data = res.data.map(item => ({
                            dictLabel: item.label,
                            dictValue: item.id
                        }))
                        commit('SET_oilId', data);
                        resolve(state.oilId);
                    }).catch(err => {
                        reject(err)
                    });
                }
            })
        },
        // 是否提醒
        Geteqpt_lub_plan_remind({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.eqpt_lub_plan_remind.length > 0) {
                    resolve(state.eqpt_lub_plan_remind);
                } else {
                    getDicts("eqpt_lub_plan_remind").then(res => {
                        commit('SET_eqpt_lub_plan_remind', res.data);
                        resolve(state.eqpt_lub_plan_remind);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        //  计划状态
        Geteqpt_lub_plan_status({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.eqpt_lub_plan_status.length > 0) {
                    resolve(state.eqpt_lub_plan_status);
                } else {
                    getDicts("eqpt_lub_plan_status").then(res => {
                        commit('SET_eqpt_lub_plan_status', res.data);
                        resolve(state.eqpt_lub_plan_status);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        // 执行状态
        Geteqpt_lub_exe_status({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.eqpt_lub_exe_status.length > 0) {
                    resolve(state.eqpt_lub_exe_status);
                } else {
                    getDicts("eqpt_lub_exe_status").then(res => {
                        commit('SET_eqpt_lub_exe_status', res.data);
                        resolve(state.eqpt_lub_exe_status);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            })
        },
        // 设备名称
        GeteqptNameTree({ commit, state }, query = false) {
            return new Promise((resolve, reject) => {
                if (state.eqptNameTree.length > 0 && !query) {
                    resolve(state.eqptNameTree);
                } else {
                    eqptNameTree().then(res => {
                        commit('SET_eqptNameTree', res.data);
                        resolve(state.eqptNameTree);
                    }).catch(err => {
                        reject(err)
                    });
                }
            })
        },
        // 验收状态
        GetcheckStatus({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.checkStatus.length > 0) {
                    resolve(state.checkStatus);
                } else {
                    getDicts('eqpt_lub_exe_record_status').then(res => {
                        commit('SET_checkStatus', res.data);
                        resolve(state.checkStatus);
                    }).catch(err => {
                        reject(err)
                    });
                }
            })
        }
    }
}

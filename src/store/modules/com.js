import { getDept } from '@/api/public';
import { treeDchildren } from '@u/tree';

// 部门树形数据  用户数据  人员数据
const comData = ['deptTree'],
    state = {},
    mutations = {};
comData.forEach((item) => {
    state[item] = [];
    mutations[`SET${item}`] = (state, data) => {
        state[item] = data;
    };
});

export default {
    state: {
        ...state,
    },
    mutations: {
        ...mutations,
    },

    actions: {
        // 获取部门树
        GETdeptTree({ commit, state }, deptId) {
            return new Promise((resolve, reject) => {
                if (state.deptTree.length > 0) {
                    resolve(state.deptTree);
                } else {
                    getDept({ deptId })
                        .then((res) => {
                            commit('SETdeptTree', treeDchildren(res.data));
                            resolve(state.deptTree);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            });
        },
    },
};

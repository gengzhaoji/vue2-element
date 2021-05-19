import { listMenu } from "@/api/system/menu";
import { listToTree } from "@utils/convert";
import store from '@/store'

export default {
    state: {
        menu: [],
        menuList: [],
    },
    mutations: {
        SET_MENU: (state, item) => {
            state.menu = item;
        },
        SET_MENUList: (state, item) => {
            state.menuList = item;
        }
    },
    actions: {
        // 生成路由
        GetlistMenu({ commit }) {
            return new Promise(resolve => {
                // 向后端请求路由数据
                listMenu().then(res => {
                    const filterData = [];
                    /**
                     * 过滤掉系统管理的树形分支
                     */
                    let filterChildrenData = filterChildren(res.data, res.data.find(item => item.menuName === '系统管理').menuId);

                    res.data.forEach(item => {
                        if (item.children && !item.children.length) {
                            delete item.children;
                        }
                        // 菜单显示和正常状态
                        if (item.visible == '0' && item.status == '0' && item.menuType == "C") {
                            // 超级管理员账号
                            if (store.getters.user.userId === 1) {
                                filterData.push({
                                    id: item.path,
                                    menuId: item.menuId,
                                    text: item.menuName,
                                    icon: item.icon,
                                    route: item.path,
                                    parentId: item.parentId,
                                    parentName: item.parentName,
                                    orderNum: item.orderNum
                                });
                            } else {
                                if (!filterChildrenData.includes(item.menuId)) {
                                    filterData.push({
                                        id: item.path,
                                        menuId: item.menuId,
                                        text: item.menuName,
                                        icon: item.icon,
                                        route: item.path,
                                        parentId: item.parentId,
                                        parentName: item.parentName,
                                        orderNum: item.orderNum
                                    });
                                }
                            }
                        }
                    })
                    commit('SET_MENU', listToTree(filterData, 0, 0, {
                        id: "menuId",
                        order: "orderNum",
                        path: "keyPath"
                    }));
                    commit('SET_MENUList', res.data);
                    resolve(res.data);
                })
            })
        }
    }
}

// 过滤出该菜单id下的所有子类
function filterChildren(List, id) {
    let temp = [id];
    List.forEach(item => {
        if ([item.parentId].includes(id)) {
            temp.push(...filterChildren(List, item.menuId));
        }
    })
    return temp;
}

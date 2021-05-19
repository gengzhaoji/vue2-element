/**
 * 路由初始化
 * @module router/index
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '@/views/layout'

// 公共路由
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/Equipment',
        children: [
            {
                path: "Equipment",
                name: "Equipment",
                meta: {
                    title: '设备信息管理',
                    keepAlive: true
                },
                component: () => import('@/views/Equipment/index'),
            }, {
                path: "Equipment-Add",
                name: "Equipment-Add",
                meta: {
                    title: '设备信息管理'
                },
                component: () => import('@/views/Equipment/add')
            }, {
                path: "sparePart",
                name: "sparePart",
                meta: {
                    keepAlive: true,
                    title: '备件信息管理',
                },
                component: () => import('@/views/sparePart/index')
            }, {

                path: "sparePart-Add",
                name: "sparePart-Add",
                meta: {
                    title: '备件信息管理',
                },
                component: () => import('@/views/sparePart/add')
            }, {
                path: "DataAnalysis",
                name: "DataAnalysis",
                meta: {
                    title: '数据分析',
                },
                component: () => import('@/views/DataAnalysis/index')
            }, {
                path: "monitoring",
                name: "monitoring",
                component: () => import('@/views/monitoring/index'),
                meta: {
                    title: '设备监控'
                },
            }
        ]
    }, {
        path: "/login",
        name: "/login",
        meta: {
            title: '登陆'
        },
        component: () => import('@/extension/login')
    }, {
        path: "/403",
        name: "/403",
        meta: {
            title: '403页面'
        },
        component: () => import('@/extension/exception/xdh-403')
    }, {
        path: "/500",
        name: "/500",
        meta: {
            title: '500页面'
        },
        component: () => import('@/extension/exception/xdh-500')
    }, {
        path: "*",
        name: "*",
        meta: {
            title: '404页面'
        },
        component: () => import('@/extension/exception/xdh-404')
    }
]

export default new Router({
    // mode: 'history', 
    scrollBehavior(to, from, savedPosition) {
        // 保存到 meta 中，备用
        to.meta.savedPosition = savedPosition;
        if (savedPosition) {
            return { x: 0, y: 0 };
        }
        return {};
    },
    routes: constantRoutes
})


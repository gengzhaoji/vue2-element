import axios, { download } from '@/utils/axios'

// 查询岗位列表
export const listPost = (data) => axios({ url: '/system/post/list', data })

// 查询岗位详细
export const getPost = (postId) => axios({ url: '/system/post/' + postId })

// 新增岗位
export const addPost = (data) => axios({ url: '/system/post', method: 'post', data })

// 修改岗位
export const updatePost = (data) => axios({ url: '/system/post', method: 'put', data })


// 删除岗位
export const delPost = (postId) => axios({ url: '/system/post/' + postId, method: 'delete' })

// 导出岗位
export const Export = (data) => download('/system/post/export', data, '岗位管理.xlsx')


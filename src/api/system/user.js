import axios, { download } from '@/utils/axios'
import { praseStrEmpty } from '@/utils/util'

// 查询用户列表
export const listUser = (data) => axios({ url: '/system/user/list', data })

// 查询用户详细
export const getUser = (userId) => axios({ url: `/system/user/${praseStrEmpty(userId)}` })

// 新增用户
export const addUser = (data) => axios({ url: '/system/user', method: 'post', data })

// 修改用户
export const updateUser = (data) => axios({ url: '/system/user', method: 'put', data })

// 删除用户
export const delUser = (userId) => axios({ url: `/system/user/${praseStrEmpty(userId)}`, method: 'delete' })

// 用户密码重置
export const resetUserPwd = (userId, password) => {
  const data = {
    userId,
    password
  }
  return axios({
    url: '/system/user/resetPwd',
    method: 'put',
    data
  })
}

// 用户状态修改
export const changeUserStatus = (userId, status) => {
  const data = {
    userId,
    status
  }
  return axios({
    url: '/system/user/changeStatus',
    method: 'put',
    data
  })
}

// 查询用户个人信息
export const getUserProfile = () => axios({ url: '/system/user/profile' })

// 修改用户个人信息
export const updateUserProfile = (data) => axios({ url: '/system/user/profile', method: 'put', data })

// 用户密码重置
export const updateUserPwd = (oldPassword, newPassword) => {
  const data = {
    oldPassword,
    newPassword
  }
  return axios({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export const uploadAvatar = (data) => axios({ url: '/system/user/profile/avatar', method: 'post', data })

// 查询部门下拉树结构
export const userNameTreeselect = (data) => axios({ url: '/system/user/treeselect', data })

// 导出功能
export const Export = (data) => download('/system/user/export', data, '用户管理.xlsx')



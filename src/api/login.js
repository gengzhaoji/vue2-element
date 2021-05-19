import axios from '@/utils/axios'

// 登录方法
export const login = (data) => axios({ url: '/auth/login', method: 'post', data })

// 刷新方法
export const refreshToken = () => axios({ url: '/auth/refresh', method: 'post' })

// 获取用户详细信息
export const getInfo = () => axios({ url: '/system/user/getInfo' })

// 退出方法
export const logout = () => axios({ url: '/auth/logout', method: 'delete' })

// 获取验证码
export const getCodeImg = () => axios({ url: '/code' })

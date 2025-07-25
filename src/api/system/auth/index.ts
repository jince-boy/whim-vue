import { request, RequestMethod } from '@/utils/http'
import type { CaptchaResult, LoginResult } from '@/api/system/auth/type.ts'

/**
 * 登录
 * @param data 登录参数
 */
export const login = (data: object) => {
  return request<LoginResult>('/api/system/auth/login', RequestMethod.POST, { data })
}
/**
 * 退出登录
 */
export const logout = () => {
  return request('/api/system/auth/logout', RequestMethod.POST)
}
/**
 * 获取验证码
 */
export const getCaptcha = () => {
  return request<CaptchaResult>('/api/system/auth/captcha', RequestMethod.GET)
}

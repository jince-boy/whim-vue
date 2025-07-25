import { request, RequestMethod } from '@/utils/http'
import type { UserInfoResult } from '@/api/system/user/type.ts'

export const getUserInfo = () => {
  return request<UserInfoResult>('/api/system/user/getInfo', RequestMethod.GET)
}

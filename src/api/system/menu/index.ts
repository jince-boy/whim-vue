import { request, RequestMethod } from '@/utils/http'
import type { MenuItem } from '@/api/system/menu/type.ts'

export const fetchMenuList = (params?: object) => {
  return request<MenuItem[]>('/api/system/menu/list', RequestMethod.GET, { params })
}

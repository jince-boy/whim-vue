import { request, RequestMethod } from '@/utils/http'
import type { MenuItem } from '@/api/system/menu/type.ts'

export const fetchMenuList = (params?: object) => {
  return request<MenuItem[]>('/api/system/menu/list', RequestMethod.GET, { params })
}

export const fetchMenuDetail = (params: object) => {
  return request('/api/system/menu/detail', RequestMethod.GET, { params })
}

export const insertMenu = (data: object) => {
  return request('/api/system/menu/add', RequestMethod.POST, { data })
}

export const updateMenu = (data: object) => {
  return request('/api/system/menu/update', RequestMethod.PUT, { data })
}

export const deleteMenu = (params: object) => {
  return request('/api/system/menu/delete', RequestMethod.DELETE, { params })
}

import { downloadFile, request, RequestMethod } from '@/utils/http'
import type { LoginLogPageResult, OperLogPageResult } from '@/api/system/log/type.ts'

export const fetchLoginLogPage = (params: object) => {
  return request<LoginLogPageResult>('/api/system/loginLog/page', RequestMethod.GET, { params })
}

export const exportLoginLog = () => {
  return downloadFile('/api/system/loginLog/export')
}

export const deleteLoginLog = (params: object) => {
  return request('/api/system/loginLog/delete', RequestMethod.DELETE, { params })
}

export const cleanLoginLog = () => {
  return request('/api/system/loginLog/clean', RequestMethod.DELETE)
}

export const fetchOperLogPage = (params: object) => {
  return request<OperLogPageResult>('/api/system/operLog/page', RequestMethod.GET, { params })
}

export const exportOperLog = () => {
  return downloadFile('/api/system/operLog/export')
}

export const deleteOperLog = (params: object) => {
  return request('/api/system/operLog/delete', RequestMethod.DELETE, { params })
}

export const cleanOperLog = () => {
  return request('/api/system/operLog/clean', RequestMethod.DELETE)
}

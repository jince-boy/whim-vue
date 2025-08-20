import { request, downloadFile, RequestMethod } from '@/utils/http'
import type {
  DictDataPageResult,
  DictDataResult,
  DictTypePageResult,
  DictTypeResult,
} from '@/api/system/dict/type.ts'

export const fetchDictTypePage = (params: object) => {
  return request<DictTypePageResult>('/api/system/dictType/page', RequestMethod.GET, { params })
}

export const fetchDictTypeDetail = (params: object) => {
  return request<DictTypeResult>('/api/system/dictType/detail', RequestMethod.GET, { params })
}

export const insertDictType = (data: object) => {
  return request('/api/system/dictType/add', RequestMethod.POST, { data })
}

export const updateDictType = (data: object) => {
  return request('/api/system/dictType/update', RequestMethod.PUT, { data })
}

export const deleteDictType = (params: object) => {
  return request('/api/system/dictType/delete', RequestMethod.DELETE, { params })
}

export const resetDictCache = () => {
  return request('/api/system/dictType/reset', RequestMethod.DELETE)
}

export const exportDictType = () => {
  return downloadFile('/api/system/dictType/export')
}

export const fetchDictDataPage = (params: object) => {
  return request<DictDataPageResult>('/api/system/dictData/page', RequestMethod.GET, { params })
}

export const fetchDictDataDetail = (params: object) => {
  return request<DictDataResult>('/api/system/dictData/detail', RequestMethod.GET, { params })
}

export const insertDictData = (data: object) => {
  return request('/api/system/dictData/add', RequestMethod.POST, { data })
}

export const updateDictData = (data: object) => {
  return request('/api/system/dictData/update', RequestMethod.PUT, { data })
}

export const deleteDictData = (params: object) => {
  return request('/api/system/dictData/delete', RequestMethod.DELETE, { params })
}

export const fetchDictDataListByDictType = (params: string) => {
  return request<DictDataResult[]>('/api/system/dictData/type/' + params, RequestMethod.GET)
}

export const exportDictData = (params: object) => {
  return downloadFile('/api/system/dictData/export', null, { params })
}

import { request, RequestMethod } from '@/utils/http'
import type { DictTypePageResult } from '@/api/system/dict/type.ts'

export const fetchDictTypePage = (data: object) => {
  return request<DictTypePageResult>('/api/system/dictType/page', RequestMethod.GET, { data })
}

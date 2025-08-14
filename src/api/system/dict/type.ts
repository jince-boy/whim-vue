export interface DictTypeResult {
  id: number | string
  name: string
  type: string
  status: number
  remark: string
  createTime: string
}
export interface DictTypePageResult {
  currentPage: number
  data: DictTypeResult[]
  pages: number
  size: number
  total: number
}
export interface DictDataResult {
  id: number | string
  dictType: string
  label: string
  value: string
  listClass: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
  sort: number
  remark: string
  createTime: string
}

export interface DictDataPageResult {
  currentPage: number
  data: DictDataResult[]
  pages: number
  size: number
  total: number
}

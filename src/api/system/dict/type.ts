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

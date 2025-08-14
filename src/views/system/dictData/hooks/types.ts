export type TagType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface DictData {
  id: number | string
  dictType: string
  label: string
  value: string
  listClass: TagType
  sort: number
  remark: string
}

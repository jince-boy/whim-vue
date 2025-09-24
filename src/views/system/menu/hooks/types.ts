export interface Menu {
  id: string
  name: string
  title: string
  parentId: string
  type: number
  path: string
  queryParam: string
  component: string
  keepAlive: 0 | 1
  sort: number
  code: string
  visible: 0 | 1
  status: 0 | 1
  icon: string
  redirect: string
  remark: string
}

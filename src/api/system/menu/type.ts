export interface MenuItem {
  id: string
  name: string
  title: string
  parentId: string
  type: number
  path: string
  code: string
  sort: number
  queryParam: string
  component: string
  icon: string
  keepAlive: 0 | 1
  visible: 0 | 1
  redirect: string
  remark: string
  children?: MenuItem[]
}

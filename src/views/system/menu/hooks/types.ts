export interface MenuItem {
  id: string
  name: string
  title: string
  parentId: string
  path: string
  type: number
  code: string
  sort: number
  queryParam: object
  component: string
  icon: string
  keepAlive: 0 | 1
  visible: 0 | 1
  redirect: string
  remark: string
  children?: MenuItem[]
}

export interface Menu {
  id: string
  name: string
  title: string
  parentId: string
  type: number
  path: string
  queryParam: object
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

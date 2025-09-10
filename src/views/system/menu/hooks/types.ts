export interface MenuItem {
  id: number | string
  name: string
  title: string
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

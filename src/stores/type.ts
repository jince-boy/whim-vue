export interface MenuItem {
  name: string
  title: string
  path: string
  queryParam: object
  component: string
  icon: string
  keepAlive: 0 | 1
  visible: 0 | 1
  redirect: string
  remark: string
  children?: MenuItem[]
}

// 定义 TabState 的类型
export interface TabState {
  title: string
  path: string
  name: string
  icon: string
  closeable: boolean
  focused?: boolean;
}

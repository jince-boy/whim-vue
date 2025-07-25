export interface UserInfoResult {
  user: User | null
  permissionCode: string[]
  roleCode: string[]
  menus: MenuItem[]
}

export interface Role {
  id: number
  name: string
  code: string
  dataScope: number
  description: string
  status: number
  remark: string
}

export interface User {
  id: number
  deptId: number
  username: string
  avatar: string | null
  name: string
  email: string
  phone: string
  gender: number
  status: number
  remark: string
  roles: Role[]
}

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

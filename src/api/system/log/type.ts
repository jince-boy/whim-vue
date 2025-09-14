export interface LoginLogResult {
  id: string
  username: string
  browser: string
  os: string
  deviceType: string
  loginLocation: string
  ipAddress: string
  status: number
  remark: string
  loginTime: string
}

export interface LoginLogPageResult {
  currentPage: number
  data: LoginLogResult[]
  pages: number
  size: number
  total: number
}

export interface OperLogResult {
  id: string
  title: string
  logType: number
  methodName: string
  requestMethod: string
  operName: string
  operIp: string
  requestUrl: string
  requestParam: string
  responseParam: string
  status: number
  errorMessage: string
  operTime: string
  costTime: number
}
export interface OperLogPageResult {
  currentPage: number
  data: OperLogResult[]
  pages: number
  size: number
  total: number
}

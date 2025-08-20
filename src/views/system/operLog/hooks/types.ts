export interface OperLog {
  id: number | string
  title: string
  logType: number
  methodName: string
  requestMethod: string
  operName: string
  operIp: string
  operLocation:string
  requestUrl: string
  requestParam: string
  responseParam: string
  status: number
  errorMessage: string
  operTime: string
  costTime: number
}

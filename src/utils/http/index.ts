import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { ApiResponse } from '@/utils/http/type.ts'

const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000,
})

/**
 * 请求拦截器
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 401 && response.data.status === false) {
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const request = <T>(
  url: string,
  method: RequestMethod = RequestMethod.GET,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  const finalConfig: AxiosRequestConfig = {
    url,
    method,
    ...config,
  }
  return axiosInstance(finalConfig) as Promise<ApiResponse<T>>
}

export default axiosInstance

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { ApiResponse } from '@/utils/http/type.ts'
import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth.ts'

const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000,
})

/**
 * 请求拦截器
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 优先从 localStorage 取，再从 sessionStorage 取
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
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
    if (response.data.code === 401) {
      window['$message'].warning('登录已过期，请重新登录')
      useAuthStore().logout()
      const redirect = window.location.pathname + window.location.search
      router.replace({
        path: '/login',
        query: {
          redirect: encodeURIComponent(redirect),
        },
      })
      return Promise.reject(response.data)
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

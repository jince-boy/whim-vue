import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { ApiResponse } from '@/utils/http/type.ts'
import { saveAs } from 'file-saver'
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
    if (response.config.responseType === 'blob') {
      return response // blob 类型直接返回完整响应
    }
    if (response.data.code === 401) {
      window['$message'].warning(response.data.message)
      useAuthStore().logout()
      const redirect = window.location.pathname + window.location.search
      router.replace({
        path: '/login',
        query: {
          redirect: encodeURIComponent(redirect),
        },
      })
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
/**
 * 下载文件
 * @param url 文件请求地址
 * @param fileName 保存的文件名
 * @param config 可选的 Axios 配置
 */
export const downloadFile = async (
  url: string,
  fileName?: string | null,
  config?: AxiosRequestConfig,
): Promise<void> => {
  try {
    const response = await axiosInstance({
      url,
      method: 'GET',
      responseType: 'blob', // 关键：将响应处理为 Blob
      ...config,
    })
    if (!fileName) {
      const disposition = response.headers['content-disposition']
      if (disposition) {
        const match = disposition.match(/filename\*=UTF-8''(.+)|filename="(.+)"/i)
        if (match) {
          fileName = decodeURIComponent(match[1] || match[2])
        }
      }
    }
    // 如果还是没有文件名，默认给一个名字
    if (!fileName) {
      fileName = `download-${new Date().getTime()}`
    }
    // 使用 file-saver 保存文件
    saveAs(response.data, fileName)
  } catch (error) {
    console.error('文件下载失败', error)
    return Promise.reject(error)
  }
}
export default axiosInstance

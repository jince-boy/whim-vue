import { defineStore } from 'pinia'
import { usePermissionStore } from '@/stores/modules/permission.ts'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || null
    return {
      token,
    }
  },
  getters: {
    getToken: (state) => state.token,
    isLogin: (state) => {
      return !!state.token
    },
  },
  actions: {
    login(token: string, rememberMe: boolean = false) {
      this.token = token
      if (rememberMe) {
        localStorage.setItem('token', token)
        sessionStorage.removeItem('token')
      } else {
        sessionStorage.setItem('token', token)
        localStorage.removeItem('token')
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      usePermissionStore().resetRouter()
    },
  },
})

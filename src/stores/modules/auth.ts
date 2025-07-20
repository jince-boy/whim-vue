import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return {
      token,
    }
  },
  getters: {
    getToken: (state) => state.token,
    isLogin: (state) => !!state.token,
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
    },
  },
})

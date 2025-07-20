import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth.ts'

router.beforeEach(async (to, from) => {
  document.title = to.meta.title as string
  if (useAuthStore().isLogin) {
    if (to.path === '/login') {
      return '/'
    }
    return true
  } else {
    if (to.meta.requiresAuth) {
      // todo 不需要登录的白名单
      return {
        path: '/login',
        // 保存我们所在的位置，以便以后再来
        query: { redirect: encodeURIComponent(to.fullPath || '/') },
      }
    } else {
      return true
    }
  }
})

router.afterEach(() => {})

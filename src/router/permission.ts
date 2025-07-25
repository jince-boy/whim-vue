import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth.ts'
import { useUserStore } from '@/stores/modules/user.ts'
import { usePermissionStore } from '@/stores/modules/permission.ts'
import systemSetting from '@/config/SystemSetting.ts'

// 不需要登录的白名单
const whiteList = ['/login']
router.beforeEach(async (to) => {
  window['$loadingBar'].start()
  document.title = `${systemSetting.title}-${to.meta.title}`
  if (useAuthStore().isLogin) {
    if (to.path === '/login') {
      return '/'
    } else {
      if (!useUserStore().hasUserInfo) {
        await useUserStore().getUserInfo()
        usePermissionStore().generateRoutes(useUserStore().menus)
        usePermissionStore().getDynamicRoutes.forEach((route) => {
          router.addRoute('home', route)
        })
        return to.fullPath
      }
      return true
    }
  } else {
    if (whiteList.includes(to.path)) {
      return true
    } else {
      return {
        path: '/login',
        // 保存我们所在的位置，以便以后再来
        query: { redirect: encodeURIComponent(to.fullPath || '/') },
      }
    }
  }
})

router.afterEach(() => {
  window['$loadingBar'].finish()
})

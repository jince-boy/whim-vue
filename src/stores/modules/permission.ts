import { defineStore } from 'pinia'
import type { MenuItem } from '@/stores/type.ts'
import type { RouteRecordRaw } from 'vue-router'
import router, { constantRouter } from '@/router'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'

const modules = import.meta.glob('@/views/**/*.vue')
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    dynamicRoutes: [] as RouteRecordRaw[],
  }),
  getters: {
    getDynamicRoutes(state): RouteRecordRaw[] {
      return state.dynamicRoutes
    },
  },
  actions: {
    /**
     * 生成动态路由
     * @param menus
     */
    generateRoutes(menus: MenuItem[]) {
      // 内部递归方法，真正构建路由
      const buildRoutes = (menus: MenuItem[]): RouteRecordRaw[] => {
        const result: RouteRecordRaw[] = []
        menus.forEach((menu) => {
          const route: RouteRecordRaw = {
            path: menu.path,
            name: menu.name,
            meta: {
              title: menu.title,
              keepAlive: menu.keepAlive !== 0,
              isMenu: menu.visible == 0,
            },
            children: [],
          }
          if (menu.component) {
            route.component = modules[`/src/views/${menu.component}.vue`]
          } else {
            route.redirect = 'no-found'
          }
          if (menu.children && menu.children.length > 0) {
            route.children = buildRoutes(menu.children)
          }
          result.push(route)
        })
        return result
      }

      // 外层调用：生成并赋值
      this.dynamicRoutes = buildRoutes(menus)
    },
    /**
     * 重置路由
     */
    resetRouter() {
      // 递归删除路由的方法
      const removeRoutes = (routes: RouteRecordRaw[]) => {
        routes.forEach((route) => {
          if (route.name && typeof route.name === 'string') {
            router.removeRoute(route.name)
          }
          if (route.children && route.children.length > 0) {
            removeRoutes(route.children)
          }
        })
      }
      // 删除当前记录的动态路由
      removeRoutes(this.dynamicRoutes)
      // 清空动态路由记录
      this.dynamicRoutes = []
    },
  },
})

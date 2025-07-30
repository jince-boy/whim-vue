import type { MenuItem } from '@/stores/type.ts'
import type { RouteRecordRaw } from 'vue-router'
import router, { constantRouter } from '@/router'
import { RouterLink } from 'vue-router'
import { NIcon, type MenuOption } from 'naive-ui'
import createIcon from '@/components/icon/icon.ts'

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
              icon: menu.icon,
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
    /**
     * 生成菜单
     */
    generateMenus() {
      const joinPaths = (base: string, path: string): string => {
        if (path.startsWith('/')) return path
        if (base.endsWith('/')) return base + path
        return `${base}/${path}`
      }
      const buildMenus = (routes: RouteRecordRaw[], basePath = ''): MenuOption[] => {
        const result: MenuOption[] = []
        for (const route of routes) {
          const fullPath = joinPaths(basePath, route.path)
          const meta = route.meta || {}
          const title = meta.title || '未命名'
          const isMenu = meta.isMenu === true
          const hasChildren = Array.isArray(route.children) && route.children.length > 0
          const hasComponent = !!route.component
          const key = typeof route.name === 'string' ? route.name : fullPath
          const icon = meta.icon
            ? () => h(NIcon, null, { default: createIcon(meta.icon as string, 16) }) // 直接使用 createIcon 返回的函数
            : undefined

          if (isMenu) {
            if (hasChildren) {
              const childrenMenu = buildMenus(route.children!, fullPath)
              if (childrenMenu.length > 0) {
                result.push({
                  label: title,
                  key,
                  icon,
                  children: childrenMenu,
                })
              } else if (hasComponent) {
                result.push({
                  label: () => h(RouterLink, { to: fullPath }, { default: () => title }),
                  key,
                  icon,
                })
              }
            } else if (hasComponent) {
              result.push({
                label: () => h(RouterLink, { to: fullPath }, { default: () => title }),
                key,
                icon,
              })
            }
          } else if (hasChildren) {
            // 非菜单但有子路由，继续递归
            result.push(...buildMenus(route.children!, fullPath))
          }
        }

        return result
      }
      return [...buildMenus(constantRouter), ...buildMenus(this.dynamicRoutes)]
    },
  },
})

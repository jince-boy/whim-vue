import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/utils/route/type.ts'
import router, { constantRouter } from '@/router'

const modules = import.meta.glob('@/views/**/*.vue')

export function generateRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  menus.forEach((menu) => {
    const route: RouteRecordRaw = {
      path: menu.path,
      name: menu.name,
      meta: {
        title: menu.title,
        keepAlive: menu.keepAlive !== 0,
      },
      children: [],
    }
    // 设置组件（如果有）
    if (menu.component) {
      route.component = modules[`/src/views/${menu.component}.vue`]
    } else {
      // 如果没有 component，就跳转到 not-found
      route.redirect = 'no-found'
    }
    // 递归处理 children
    if (menu.children && menu.children.length > 0) {
      route.children = generateRoutes(menu.children)
    }
    result.push(route)
  })
  return result
}

export function resetRouter() {
  // 收集所有静态路由的 name（包括嵌套子路由）
  const constantRouteNames = new Set<string>()
  // 递归函数来收集所有路由 name
  const collectRouteNames = (routes: RouteRecordRaw[]) => {
    routes.forEach((route) => {
      if (route.name && typeof route.name === 'string') {
        constantRouteNames.add(route.name)
      }
      if (route.children && route.children.length > 0) {
        collectRouteNames(route.children)
      }
    })
  }
  // 从静态路由开始收集
  collectRouteNames(constantRouter)
  // 获取当前所有路由
  const currentRoutes = router.getRoutes()
  // 遍历所有路由，删除非静态路由
  currentRoutes.forEach((route) => {
    if (route.name && !constantRouteNames.has(route.name as string)) {
      router.removeRoute(route.name)
    }
  })
}



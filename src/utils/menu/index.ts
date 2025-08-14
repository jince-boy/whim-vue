import { type RouteRecordRaw, RouterLink } from 'vue-router'
import { type MenuOption, NIcon } from 'naive-ui'
import { useIcon } from '@/components/icon/useIcon.ts'

export type SafeMenuOption = Omit<MenuOption, 'children'> & {
  name?: string
  path?: string
  children?: SafeMenuOption[]
}

const { createIcon } = useIcon()
/**
 * 路径拼接
 * @param base
 * @param path
 */
export const joinPaths = (base: string, path: string): string => {
  if (path.startsWith('/')) return path
  if (base.endsWith('/')) return base + path
  return `${base}/${path}`
}
/**
 * 构建菜单
 * @param routes
 * @param basePath
 */
export const buildMenus = (routes: RouteRecordRaw[], basePath = ''): SafeMenuOption[] => {
  const result: SafeMenuOption[] = []
  for (const route of routes) {
    const fullPath = joinPaths(basePath, route.path)
    const meta = route.meta || {}
    const title = meta.title || '未命名'
    const isMenu = meta.isMenu
    const isShow = meta.isShow ?? true
    const hasChildren = Array.isArray(route.children) && route.children.length > 0
    const hasComponent = !!route.component
    const key = typeof route.name === 'string' ? route.name : fullPath
    const icon = meta.icon
      ? () => h(NIcon, null, { default: createIcon(meta.icon as string) }) // 直接使用 createIcon 返回的函数
      : undefined

    if (isMenu) {
      if (hasChildren) {
        const childrenMenu = buildMenus(route.children!, fullPath)
        if (childrenMenu.length > 0) {
          result.push({
            label: title,
            key,
            icon,
            show: isShow,
            children: childrenMenu,
            name: title,
            path: '',
          })
        } else if (hasComponent) {
          result.push({
            label: () => h(RouterLink, { to: fullPath }, { default: () => title }),
            key,
            icon,
            show: isShow,
            name: title,
            path: fullPath,
          })
        }
      } else if (hasComponent) {
        result.push({
          label: () => h(RouterLink, { to: fullPath }, { default: () => title }),
          key,
          icon,
          show: isShow,
          name: title,
          path: fullPath,
        })
      }
    } else if (hasChildren) {
      // 非菜单但有子路由，继续递归
      result.push(...buildMenus(route.children!, fullPath))
    }
  }

  return result
}

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('@/views/**/*.vue')
const Layout = () => import('@/layout/index.vue')

export const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: modules[`/src/views/welcome/index.vue`],
        name: 'index',
        meta: {
          title: '首页',
          isMenu: true,
          icon: 'home',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: modules['/src/views/login/index.vue'],
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: modules['/src/views/error/404.vue'],
    meta: {
      title: '404',
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
})
export default router

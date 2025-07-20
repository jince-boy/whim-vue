import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('../views/**/*.vue')
const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'welcome',
    component: modules['../views/welcome/index.vue'],
    meta: {
      title: '欢迎',
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: modules['../views/login/index.vue'],
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
})
export default router

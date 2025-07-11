import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";

const constantRouter: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'welcome',
        component: () => import('@/views/welcome/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
]
export const router = createRouter({
    history: createWebHistory(),
    routes: constantRouter
})

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Demo',
    name: 'Demo',
    component: () => import('@/views/Demo/index.vue')
  },
  {
    path: '/Todo',
    name: 'Todo',
    component: () => import('@/views/Todo/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

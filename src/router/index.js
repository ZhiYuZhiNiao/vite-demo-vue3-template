import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import TestDrag from '@/views/TestDrag/index.vue'

/** @type {import('vue-router').RouteRecordRaw} */
const routes = [
  { path: '/', component: Home },
  { path: '/TestDrag', component: TestDrag }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

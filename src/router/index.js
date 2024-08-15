import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import TestDrag from '@/views/TestDrag/index.vue'
import TestForm from '@/views/TestGetSet/index.vue'

/** @type {import('vue-router').RouteRecordRaw} */
const routes = [
  { path: '/', component: Home },
  { path: '/TestDrag', component: TestDrag },
  { path: '/TestForm', component: TestForm },
  { path: '/TestGetSet', component: TestForm }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

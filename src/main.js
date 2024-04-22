import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus' // 全局注册
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register' // 引入 svg 插件, 这一步不能忘记 !!!

const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).use(ElementPlus).mount('#app')

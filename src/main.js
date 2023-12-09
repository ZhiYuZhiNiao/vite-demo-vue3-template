import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register' // 引入 svg 插件, 这一步不能忘记 !!!

const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).mount('#app')

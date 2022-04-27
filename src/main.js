// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import Router from './routers/Router'

const app = createApp(App)
app.use(Router)
app.use(ElementPlus)

app.mount('#app')

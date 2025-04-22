import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// echarts
import echarts from './utils/echarts'


import App from './App.vue'
import router from './router'

const app = createApp(App)


app.provide('$echarts', echarts) // vue3采用provide, inject方式使用

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')

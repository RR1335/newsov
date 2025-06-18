import './assets/main.scss'

import { createApp } from 'vue'
import router from './router/index.js'
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn';
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();


app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')
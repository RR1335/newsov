import { createRouter,createWebHistory } from 'vue-router'

// 导入 vue 组件
import LoginVue from "@/views/login.vue"
import LayoutVue from "@/views/layout.vue"

// 定义路由
const routes = [
    {path: "/login", component: LoginVue},
    {path: "/", component: LayoutVue},
]

// 创建路由
const router = createRouter(
    {
            history : createWebHistory(),
            routes : routes
    }
)

export default router
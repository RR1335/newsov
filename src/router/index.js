import { createRouter,createWebHistory } from 'vue-router'

// 导入 vue 组件
import LoginVue from "@/views/login.vue"
import LayoutVue from "@/views/layout.vue"
import ArticleCategory from "@/views/article/ArticleCategory.vue";
import ArticleManage from "@/views/article/ArticleManage.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import UserAvatar from "@/views/user/UserAvatar.vue";
import UserResetPassword from "@/views/user/UserResetPassword.vue";

// 定义路由
const routes = [
    {path: "/login", component: LoginVue},
    {path: "/", component: LayoutVue, children: [
            {path: "/article/category", component: ArticleCategory},
            {path: "/article/manage", component: ArticleManage},
            {paht: "/user/userInfo", component: UserInfo},
            {path: "/user/avatar", component: UserAvatar},
            {path: "/user/resetPassword", component: UserResetPassword}
        ]},
]

// 创建路由
const router = createRouter(
    {
            history : createWebHistory(),
            routes : routes
    }
)

export default router
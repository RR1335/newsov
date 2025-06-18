import axios from "axios";

import { ElMessage } from "element-plus";
import { useTokenStore } from "@/stores/token.js";
// import { useRouter } from "vue-router";
// const router = useRouter();

import router from "@/router";   // 正确的导入方式

const preURL = '/api'
const inst = axios.create({baseURL: preURL});

inst.interceptors.request.use(function (config) {
    // Do something before request is sent

    // console.log("status ",config.status);  // status  undefined
    const tokenStore = useTokenStore()
    if (tokenStore.token) {
        config.headers.Authorization = tokenStore.token;
    }

    return config;
}, function (error) {
    // Do something with request error

    Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.status === 200 && response.data.code === 0) {
        return response;
    }

    if(error.response.status === 401) {
        ElMessage.error('请登录；再访问该页面。');

        router.push('/login');
    }else {
        ElMessage.error('response js 服务异常');
    }

    ElMessage.error(response.data.message ? response.data.message : 'response js 服务器异常');
    return Promise.reject(error);

}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // if(error.response.status === 401) {
    //     ElMessage.error('请登录；再访问该页面。');
    //     router.push('/login');
    // }else {
    //     ElMessage.error('response js 服务异常');
    // }

    router.push("/login");

    ElMessage.error(response.data.message ? response.data.message : 'response js 服务器异常');
    return Promise.reject(error);
});

export default inst


/* Google 给的案例
import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
  // ... 你的配置
});

// 响应拦截器
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 检查是否为 401 错误
    if (error.response && error.response.status === 401) {
      try {
        // 检查是否有 refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // 尝试使用 refresh token 获取新的 access token
          const { data } = await axios.post('/api/refresh-token', { refreshToken });
          const newAccessToken = data.accessToken;

          // 更新本地存储的 access token
          localStorage.setItem('accessToken', newAccessToken);

          // 更新请求头
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // 重新发送原始请求
          return instance(originalRequest);
        } else {
          // 没有 refresh token，重定向到登录页面
          // 例如:  window.location.href = '/login';
          // 或使用 vue-router  this.$router.push('/login');
          return Promise.reject(error); // 或者处理登录逻辑
        }
      } catch (refreshError) {
        // refresh token 失败，重定向到登录页面
        // 例如: window.location.href = '/login';
        // 或使用 vue-router this.$router.push('/login');
        return Promise.reject(refreshError); // 或者处理登录逻辑
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
*/
import axios from "axios";

import { ElMessage } from "element-plus";
import { useTokenStore } from "@/stores/token.js";
// import { useRouter } from "vue-router";
// const router = useRouter();



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

import router from "@/router";   // 正确的导入方式
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.status === 200 && response.data.code === 0) {
        return response;
    }

    ElMessage.error(response.data.message ? response.data.message : 'response js 服务器异常');
    return Promise.reject(error);

}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if(error.response.status === 401) {
        ElMessage.error('请登录；再访问该页面。');
        router.push('/login');
    }else {
        ElMessage.error('response js 服务异常');
    }

    ElMessage.error(response.data.message ? response.data.message : 'response js 服务器异常');
    return Promise.reject(error);
});

export default inst

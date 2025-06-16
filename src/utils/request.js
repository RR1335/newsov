import axios from 'axios';

import {ElMessage} from "element-plus";

// const preUrl = 'http://localhost:8080';
const preUrl = '/api';
const instance = axios.create({preUrl});

instance.interceptors.request.use(
    result=>{
        if(result.status === 200 && result.status !== 1){
            alert(result.data.msg || "request js 请求错误");
            Promise.reject(rejection)
        }
        console.log("request - " + result.data);
        if (result.data.code === 0){
            return Promise.resolve(result.data);
        }

        console.log("request  result.data.code - " + result.data.code);

        // alert(result.data.msg ? result.data.msg : 'request js 服务器异常');
        ElMessage.error(result.data.msg ? result.data.msg : 'request js 服务器异常');
        return Promise.reject(result.data);
    },

    error=>{
        alert(' request js 服务异常，请稍后重试。')
        return Promise.reject(error); // 异步状态处理
    }
)

export default instance;
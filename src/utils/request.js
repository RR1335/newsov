import axios from 'axios';

const preUrl = 'http://localhost:8080';
const instance = axios.create(preUrl);

instance.interceptors.request.use(
    result=>{
        return result.data;
    },

    error=>{
        alert('服务异常，请稍后重试。')
        return Promise.reject(error); // 异步状态处理
    }
)

export default instance;

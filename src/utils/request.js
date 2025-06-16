import axios from "axios";

import { ElMessage } from "element-plus";

const preURL = '/api'
const inst = axios.create({baseURL: preURL});

inst.interceptors.request.use(function (config) {
    // Do something before request is sent

    // console.log("status ",config.status);  // status  undefined

    return config;
}, function (error) {
    // Do something with request error
    ElMessage.error(result.data.msg ? result.data.msg : 'request js 服务器异常');
    return Promise.reject(error);
});

export default inst

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
    ElMessage.error(result.data.message ? result.data.message : 'request js 服务器异常');
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response);
    // console.log(response.status);
    // console.log(response.data.code);
    // console.log(response.data.message);
    if (response.status === 200 && response.data.code === 0) {
        return response;
    }
    ElMessage.error(response.data.message ? response.data.message : 'response js 服务器异常');
    return Promise.reject(error);

}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    ElMessage.error(response.data.message ? response.data.message : 'response js 服务器异常');
    return Promise.reject(error);
});

export default inst

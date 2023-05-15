import axios from 'axios'
import { ElMessage } from 'element-plus';
import router from '../router';
import QS from 'qs'

//dev开发，prod上线
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL

// 请求拦截
axios.interceptors.request.use(
    function (config: any) {
        if (config.url != '/api/verifyToken') {
            config.headers.Authorization = localStorage.getItem('token') || '-1'
        }
        // 在发送请求之前进行操作
        // config.headers.common['Content-Encoding'] = 'gzip'
        return config;
    },
    function (error) {
        // 对请求错误进行操作
        ElMessage.error('请求错误')
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(function (response: any) {
    if (response.status === 205) {
        router.push({ path: '/prison' })
    }
    // if (response.status === 201) {
    //     ElMessage.error("信息获取失败！");
    // }

    response.headers['Content-Encoding'] = 'gzip';
    return Promise.resolve(response);

})



/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params?: any) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url: string, params?: any) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
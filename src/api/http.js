/* eslint-disable */
import axios from 'axios';
import { Message } from 'element-ui';
import CONFIG from '@/config/baseURL'

axios.defaults.timeout = 10000;
axios.defaults.baseURL = CONFIG.api;

// const token = sessionStorage.getItem('token')
// axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://yangming.natapp1.cc/'
// axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

//http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        const user = sessionStorage.getItem('user')
        config.headers = {
            'Content-Type': 'application/json'
        }
        if (token) {
            config.headers['token'] = token
            config.headers['user'] = user
        }
        return config
    },
    error => {
        return Promise.reject(err)
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.headers.user_token) {
            sessionStorage.setItem('token', response.headers.user_token)
        }
        if (response.data.statuscode == 412) {
            window.vm.$router.push({
                path: "/login",
                querry: { redirect: window.vm.$router.currentRoute.fullPath } //从哪个页面跳转
            })
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
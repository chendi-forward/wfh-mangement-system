import  axios from 'axios'
import store from '../store'
import router from '../router'
import * as types from '../store/types'

// axios 配置
axios.defaults.timeout = 30000

axios.defaults.baseURL = ''

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    switch (response.data.status) {
      case 401: // 未授权
        store.commit(types.LOGOUT)
        router.replace({
          path: 'login',
          query: { redirect: router.currentRoute.fullPath }
        })
        break
      case 403:
        return Promise.reject(`无权限操作${response.msg}`)
      case 404:
        return Promise.reject(`请求资源不存在${response.msg}`)
      case 500:
        return Promise.reject(`服务器错误${response.msg}`)
      default:
        return response
    }
  }
)

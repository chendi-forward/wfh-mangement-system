import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'

Vue.use(Router)

/*
*  基础路由， 不涉及权限的路由
* */

let baseRoute = [
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/componentTest',
    name: '测试组件',
    component: (resolve) => require(['./views/componentTest.vue'], resolve)
  },
  {
    path: '/401',
    name: '无权访问',
    component: (resolve) => require(['./views/401.vue'], resolve)
  },
  {
    path: '/404',
    name: '找不到页面',
    component: (resolve) => require(['./views/404.vue'], resolve)
  }
]

let createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: baseRoute
})

let router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

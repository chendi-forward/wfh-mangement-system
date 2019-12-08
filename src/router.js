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
    path: '/401',
    name: '无权访问',
    component: () => import(/* webpackChunkName: "401" */ './views/401.vue')
  },
  {
    path: '/404',
    name: '找不到页面',
    component: () => import(/* webpackChunkName: "404" */ './views/404.vue')
  }
]

let createRouter = () => new Router({
  // mode: 'history',
  /* eslint-disable */
  base: process.env.BASE_URL,
  /* eslint-enable */
  routes: baseRoute
})

let router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

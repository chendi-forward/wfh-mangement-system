import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/yjck',
      name: 'yjck',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "yjck" */ './views/Yjck.vue')
    },
    {
      path: '/nryy-spgl',
      name: 'nryy-spgl',
      component: () => import(/* webpackChunkName: "nryyspgl" */ './views/Nryy/Spgl.vue')
    },
    {
      path: '/nryy-zngb',
      name: 'nryy-zngb',
      component: () => import(/* webpackChunkName: "nryyzngb" */ './views/Nryy/Zngb.vue')
    },
    {
      path: '/nryy-fxy',
      name: 'nryy-fxy',
      component: () => import(/* webpackChunkName: "nryyfxy" */ './views/Nryy/Fxy.vue')
    },
    {
      path: '/nryy-qtym',
      name: 'nryy-qtym',
      component: () => import(/* webpackChunkName: "nryyqtym" */ './views/Nryy/Qtym.vue')
    },
    {
      path: '/yhgl',
      name: 'yhgl',
      component: () => import(/* webpackChunkName: "yhgl" */ './views/Yhgl.vue')
    },
    {
      path: '/qxgl',
      name: 'qxgl',
      component: () => import(/* webpackChunkName: "qxgl" */ './views/Qxgl.vue')
    },
    {
      path: '/shgl',
      name: 'shgl',
      component: () => import(/* webpackChunkName: "shgl" */ './views/Shgl.vue')
    },
    {
      path: '/hyjf',
      name: 'hyjf',
      component: () => import(/* webpackChunkName: "hyjf" */ './views/Hyjf.vue')
    },
    {
      path: '/yxmk',
      name: 'yxmk',
      component: () => import(/* webpackChunkName: "yxmk" */ './views/Yxmk.vue')
    },
    {
      path: '/sjk',
      name: 'sjk',
      component: () => import(/* webpackChunkName: "sjk" */ './views/Sjk.vue')
    },
    {
      path: '/kjmk',
      name: 'kjmk',
      component: () => import(/* webpackChunkName: "kjmk" */ './views/Kjmk.vue')
    }
  ]
})

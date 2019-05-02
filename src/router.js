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
      component: () => import(/* webpackChunkName: "yjck" */ './views/Yjck')
    },
    {
      path: '/nryy-spgl',
      name: 'nryy-spgl',
      component: () => import(/* webpackChunkName: "nryyspgl" */ './views/Nryy/Spgl')
    },
    {
      path: '/nryy-zngb',
      name: 'nryy-zngb',
      component: () => import(/* webpackChunkName: "nryyzngb" */ './views/Nryy/Zngb')
    },
    {
      path: '/nryy-fxy',
      name: 'nryy-fxy',
      component: () => import(/* webpackChunkName: "nryyfxy" */ './views/Nryy/Fxy')
    },
    {
      path: '/nryy-qtym',
      name: 'nryy-qtym',
      component: () => import(/* webpackChunkName: "nryyqtym" */ './views/Nryy/Qtym')
    },
    {
      path: '/yhgl',
      name: 'yhgl',
      component: () => import(/* webpackChunkName: "yhgl" */ './views/Yhgl')
    },
    {
      path: '/qxgl',
      name: 'qxgl',
      component: () => import(/* webpackChunkName: "qxgl" */ './views/Qxgl')
    },
    {
      path: '/shgl',
      name: 'shgl',
      component: () => import(/* webpackChunkName: "shgl" */ './views/Shgl')
    },
    {
      path: '/hyjf',
      name: 'hyjf',
      component: () => import(/* webpackChunkName: "hyjf" */ './views/Hyjf')
    },
    {
      path: '/yxmk',
      name: 'yxmk',
      component: () => import(/* webpackChunkName: "yxmk" */ './views/Yxmk')
    },
    {
      path: '/sjk',
      name: 'sjk',
      component: () => import(/* webpackChunkName: "sjk" */ './views/Sjk')
    },
    {
      path: '/kjmk',
      name: 'kjmk',
      component: () => import(/* webpackChunkName: "kjmk" */ './views/Kjmk')
    }
  ]
})

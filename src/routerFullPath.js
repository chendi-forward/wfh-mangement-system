/* 预加载引入 */
import Home from './views/Home'

/*
*  非公共路由， 涉及权限的路由
* */
export default [{
  path: '/',
  name: 'home',
  component: Home,
  children: [
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
      path: '/nryy-gzsm',
      name: 'nryy-gzsm',
      component: () => import(/* webpackChunkName: "nryyqtym" */ './views/Nryy/Gzsm')
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
}]

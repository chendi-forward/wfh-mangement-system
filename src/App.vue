<!--项目页面顶级出口-->
<template>
  <div id="app">
    <router-view @login-direct="loginDirect"></router-view>
    <!--加载条-->
    <!--<vue-progress-bar></vue-progress-bar>-->
  </div>
</template>

<script>
import {deepcopy} from './commons/util'
import allRoutes from './routerFullPath'
import {resetRouter} from './router'
// 公共页面白面单
const whiteLink = ['/login', '/404', '/401', '/componentTest']
export default {
  name: 'App',
  data () {
    return {
      searchVal: ''
    }
  },
  created () {
    if (!whiteLink.includes(this.$router.currentRoute.path)) this.signIn()
  },
  methods: {
    getRoutes (userPermissions, base) {
      let routeHash = {}
      if (Array.isArray(userPermissions)) {
        /*
        * params Like this:
        * [{
        *   id: "2c9180895e13261e015e13469b7e0000",
        *   name: "概览",
        *   parentId: "2c9180895e13261e015e13469b7e0000",
        *   link: "indexs"
        * }]
        */
        userPermissions.forEach(item => {
          routeHash[(base || '') + '/' + item.link] = true
        })
      }
      return routeHash
    },
    extendRoutes (routePermission, base) {
      // Filtering local routes, get actual routing
      let actualRouter = []
      let findLocalRoute = function (array, base) {
        let replyResult = []
        array.forEach(route => {
          let pathKey = (base ? base + '/' : '') + route.path
          if (routePermission[pathKey]) {
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, route.path)
            }
            replyResult.push(route)
          }
        })
        actualRouter = actualRouter.concat(replyResult)
      }
      findLocalRoute(allRoutes[0].children, base)
      // If the user does not have any routing authority
      /* if (!actualRouter || !actualRouter.length) {
         // clear token, refresh page will jump to login screen.
         util.session('token', '')
         // Interface hints
         return document.body.innerHTML = ('<h1>账号访问受限，请联系系统管理员！</h1>')
       }*/
      actualRouter.map(e => {
        // Copy 'children' to 'meta' for rendering menu.(This step is optional.)
        if (e.children) {
          if (!e.meta) e.meta = {}
          e.meta.children = e.children
        }
        // Add Per-Route Guard
        // To prevent manual access to ultra vires routing after switching accounts
        e.beforeEnter = (to, from, next) => {
          if (routePermission[to.path]) {
            next()
          } else {
            next('/401')
          }
        }
      })
      // resetRouter
      resetRouter()
      // Add actual routing to application
      let originPath = deepcopy(allRoutes)
      originPath[0].children = actualRouter
      this.$router.addRoutes(originPath.concat([{
        path: '*',
        redirect: '/404'
      }]))
      // Save information for rendering menu.(This step is optional.)
      this.$root.menuData = actualRouter
    },
    signIn (callback) {
      let jwtToken = sessionStorage.getItem('token')
      if (!jwtToken) {
        return this.$router.push({
          path: '/login',
          query: {from: this.$router.currentRoute.path}
        })
      }
      // 获取可进入权限目录
      // this.axios.get('/api/menus', {
      //   params: {
      //     userPermissionId: sessionStorage.userPermissionId
      //   }
      // })
      // .then((res) => {
      //   let userPermissions = res.data.data
      //   // Save information, if it is used elsewhere.
      //   this.$root.userData = userPermissions
      //   /*
      //   * Get routePermission form user permissions
      //   * Like this:
      //   * { "route1": true, "route2": true, ... }
      //   */
      //   let routePermission = this.getRoutes(userPermissions, '/page')
      //   /*
      //   * Adding routing privileges to users
      //   */
      //   this.extendRoutes(routePermission, '/page')
      //   typeof callback === 'function' && callback()
      // })
      // 可以访问的路由在这里定义
      let userPermissions = [
        {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '业绩查看',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'yjck'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '内容运营-商品管理',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'nryy-spgl'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '内容运营-站内广播',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'nryy-zngb'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '内容运营-发现页',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'nryy-fxy'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '内容运营-规则说明',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'nryy-gzsm'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '用户管理',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'yhgl'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '权限管理',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'qxgl'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '售后管理-订单列表',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'shgl-ddlb'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '售后管理-退款管理',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'shgl-tkgl'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '售后管理-订单详情',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'shgl-ddxq'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '会员积分-时间设置',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'hyjf-sjsz'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '会员积分-会员返利',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'hyjf-hyfl'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '会员积分-积分设置',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'hyjf-jfsz'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '营销模块',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'yxmk'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '数据库',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'sjk'
        }, {
          id: '2c9180895e13261e015e13469b7e0000',
          name: '会计模块',
          parentId: '2c9180895e13261e015e13469b7e0000',
          link: 'kjmk'
        }
      ]
      this.$root.userData = userPermissions
      let routePermission = this.getRoutes(userPermissions)
      this.extendRoutes(routePermission)
      typeof callback === 'function' && callback()
    },
    loginDirect (newPath) {
      /*
      * Monitor login events
      * Will trigger the events in views/login.vue
      */
      this.signIn(() => {
        this.$router.replace({path: newPath || '/yjck'})
      })
    }
  }
}
</script>

<style lang="less">
  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>

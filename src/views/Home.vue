<template>
  <div id="app">
    <el-container>
      <el-aside width="220px">
        <el-header class="logo-header">WFH</el-header>
        <div class="nav-menu">
          <el-menu
            router
            :default-active="activeIndex"
            class="el-menu-vertical-demo">
            <div v-for='menu in menus' :key="menu.name">
              <div class="nav-menu__title">{{menu.name}}</div>
              <div v-for="subM in menu.children" :key='subM.name'>
                <template v-if="subM.children">
                  <el-submenu :index="subM.path">
                    <template slot="title">
                      <i :class="subM.icon"></i>
                      <span>{{subM.name}}</span>
                    </template>
                    <el-menu-item v-for="subSM in subM.children" :key='subSM.name' :index="subSM.path">{{subSM.name}}</el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="subM.path">
                    <i :class="subM.icon"></i>
                    <span slot="title">{{subM.name}}</span>
                  </el-menu-item>
                </template>
              </div>
            </div>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header class="main-header">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, i) in breadcrumbs" :key="i">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-input
            class="main-header__search"
            placeholder="搜索..."
            size="medium"
            v-model="searchVal">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="main-header__user">
            <div class="user-box__name">
              <span>{{timeStr[currentTime]}}，</span>
              <span>{{user}}</span>
            </div>
            <div class="user-box__logout">
              <span>退出</span>&nbsp;&nbsp;
              <span class="el-icon-switch-button" @click="logout"></span>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="main-content">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'App',
    data () {
      let menus = [
        {
          name: '主页',
          children: [
            {
              id: '1',
              name: '业绩查看',
              path: 'yjck',
              icon: 'el-icon-setting'
            },
            {
              id: '2',
              name: '内容运营',
              path: 'nryy',
              icon: 'el-icon-location',
              children: [
                {
                  name: '商品管理',
                  path: 'nryy-spgl'
                },
                {
                  name: '站内广播',
                  path: 'nryy-zngb'
                },
                {
                  name: '发现页',
                  path: 'nryy-fxy'
                },
                {
                  name: '规则说明',
                  path: 'nryy-gzsm'
                }
              ]
            },
            {
              id: '3',
              name: '用户管理',
              path: 'yhgl',
              icon: 'el-icon-menu'
            },
            {
              id: '4',
              name: '权限管理',
              path: 'qxgl',
              icon: 'el-icon-menu'
            },
            {
              id: '5',
              name: '售后管理',
              path: 'shgl',
              icon: 'el-icon-menu',
              children: [
                {
                  name: '订单列表',
                  path: 'shgl-ddlb'
                },
                {
                  name: '退款管理',
                  path: 'shgl-tkgl'
                },
                {
                  name: '评价管理',
                  path: 'shgl-pjgl'
                }
              ],
              childrenNoMenu: [ //无菜单路由
                {
                  name: '订单详情',
                  path: 'shgl-ddxq'
                }
              ]
            }
          ]
        },
        {
          name: '设置',
          children: [
            {
              id: '6',
              name: '会员积分',
              path: 'hyjf',
              icon: 'el-icon-setting',
              children: [
                {
                  name: '时间设置',
                  path: 'hyjf-sjsz'
                },
                {
                  name: '会员返利',
                  path: 'hyjf-hyfl'
                },
                {
                  name: '积分设置',
                  path: 'hyjf-jfsz'
                }
              ]
            },
            {
              id: '7',
              name: '营销模块',
              path: 'yxmk',
              icon: 'el-icon-menu',
              children: [
                {
                  name: '活动表管理',
                  path: 'yxmk-hdbgl'
                },
                {
                  name: '优惠券管理',
                  path: 'yxmk-yhqgl'
                },
                {
                  name: '消息中心',
                  path: 'yxmk-xxzx'
                }
              ]
            },
            {
              id: '8',
              name: '会计模块',
              path: 'kjmk',
              icon: 'el-icon-menu'
            }
          ]
        }
      ]
      return {
        user: sessionStorage.getItem('user'),
        searchVal: '',
        timeStr: {
          am: '上午好',
          pm: '下午好'
        },
        currentTime: moment().format('a'),
        activeIndex: 'yjck',
        breadcrumbs: [menus[0], menus[0].children[0]],
        menus
      }
    },
    watch: {
      '$route' () {
        this.initBreadcrumbs()
        this.menuChange()
      }
    },
    methods: {
      initBreadcrumbs () {
        this.menus.forEach(menu => {
          menu.children.forEach(subM => {
            if (subM.path === this.$route.name) {
              this.activeIndex = this.$route.name
              this.breadcrumbs = [menu, subM]
            }
            if (subM.children) {
              subM.children.forEach(subSM => {
                if (subSM.path === this.$route.name) {
                  this.activeIndex = this.$route.name
                  this.breadcrumbs = [menu, subM, subSM]
                }
              })
            }
            if (subM.childrenNoMenu) {
              subM.childrenNoMenu.forEach(subSM => {
                if (subSM.path === this.$route.name) {
                  this.activeIndex = subM.children[0].path // 无菜单路由菜单激活样式设置给第一个子菜单
                  this.breadcrumbs = [menu, subM, subSM]
                }
              })
            }
          })
        })
      },
      logout () {
        localStorage.clear()
        sessionStorage.clear()
        this.$router.push({path: '/login'})
      },
      // 菜单
      menuChange () {
        let role = sessionStorage.getItem('role')
        var roleArr = role.split('')
        if (sessionStorage.getItem('id') == 1) {
          roleArr.push("3")
          roleArr.push("4")
        }
        this.menus.forEach((item) => {
          item.children = item.children.filter((data) => {
            return roleArr.includes(data.id)
          })
        })
      }
    },
    created () {
      this.initBreadcrumbs()
    },
    mounted () {
      setTimeout(() => {
        this.menuChange()
      })
    }
  }
</script>

<style lang="less">
.el-header, .el-footer {
  background-color: #FF4B57;
  text-align: center;
  height: 80px !important;
  line-height: 80px;
}

.logo-header {
  font-size: 25px;
  color: #fff;
}

.el-aside {
  /*background-color: #fff;*/
  color: #333;
  text-align: center;
  line-height: 200px;
}

.nav-menu::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px;/*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.nav-menu::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0, 0, 0, 0.2);
}

.nav-menu::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.nav-menu {
  height: calc(~'100% - 80px');
  overflow-y: scroll;
  .nav-menu__title {
    text-align: start;
    padding: 0 20px 20px;
    padding-top: 15px;
    color: #999;
    line-height: 26px;
    font-weight: normal;
    font-size: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.el-menu {
  .el-submenu {
    &.is-active {
      color: #fff;
    }
    // .el-submenu__title {
    //   color: #fff;
    // }
  }
  .el-submenu__title:hover {
    background: #2c3e50;
    color: #fff;
  }
  .el-menu-item:hover {
    background: #2c3e50;
    color: #fff;
  }
  .el-submenu__title {
    height: 44px;
    line-height: 44px;
  }
  .el-menu-item {
    height: 44px;
    line-height: 44px;
    .is-active {
      color: #fff;
    }
  }
  .el-menu-item:focus {
    background: #363F51;
    color: #fff;
  }
  .is-active {
    background: #363F51;
    color: #fff !important;
    .el-submenu__title {
      color: #fff;
    }
    .el-submenu__title:focus {
      background: #363F51;
      color: #fff;
    }
  }
}

.el-button--small {
  padding: 8px 15px;
}

.el-time-spinner__item {
  text-align: center;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: #fff;
  .el-breadcrumb {
    display: flex;
    align-items: center;
    .el-breadcrumb__separator {
      color: #000;
    }
  }
  .main-header__search {
    width: 200px;
    margin-left: 200px;
  }
  .main-header__user {
    display: flex;
    align-items: center;
    .user-box__name {
      margin-right: 35px;
    }
    .el-icon-switch-button {
      cursor: pointer;
    }
  }
}

.el-main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px;/*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.el-main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0, 0, 0, 0.2);
}

.el-main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 30px;
}

.el-container {
  height: 100%;
  &:nth-child(5),
  &:nth-child(6) {
    .el-aside {
      line-height: 260px;
    }
  }
  &:nth-child(7) {
    .el-aside {
      line-height: 320px;
    }
  }
}

.tag-dialog {
  padding: 30px;
  .el-dialog__header,
  .el-dialog__body {
    padding-left: 50px;
    padding-right: 50px;
  }
  .tag--title {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .save-tag {
    display: flex;
    justify-content: center;
  }
  .add-tag {
    margin-bottom: 15px;
    .add-tag--content {
      display: flex;
      .el-input__inner {
        margin-right: 20px;
      }
    }
  }
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

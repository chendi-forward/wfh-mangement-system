<template>
  <div id="app">
    <el-container>
      <el-aside width="250px">
        <el-header class="logo-header">WFH</el-header>
        <div class="nav-menu">
          <el-menu
            router
            default-active="yjck"
            class="el-menu-vertical-demo">
            <div v-for='menu in menus' :key="menu.name">
              <div class="nav-menu__title">{{menu.name}}</div>
              <div v-for="subM in menu.children" :key='subM.name'>
                <template v-if="subM.children">
                  <el-submenu index="subM.path">
                    <template slot="title">
                      <i :class="subM.icon"></i>
                      <span>{{subM.name}}</span>
                    </template>
                    <el-menu-item v-for="subSM in subM.children" :key='subSM.name' :index="subSM.path" @click="select(menu, subM, subSM)">{{subSM.name}}</el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="subM.path" @click="select(menu, subM)">
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
              <span>早上好，</span>
              <span>admin</span>
            </div>
            <div class="user-box__logout">
              <span>退出</span>
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
  let menus = [
    {
      name: '主页',
      children: [
        {
          name: '业绩查看',
          path: 'yjck',
          icon: 'el-icon-setting'
        },
        {
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
          name: '用户管理',
          path: 'yhgl',
          icon: 'el-icon-menu'
        },
        {
          name: '权限管理',
          path: 'qxgl',
          icon: 'el-icon-menu'
        },
        {
          name: '售后管理',
          path: 'shgl',
          icon: 'el-icon-menu'
        }
      ]
    },
    {
      name: '设置',
      children: [
        {
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
          name: '营销模块',
          path: 'yxmk',
          icon: 'el-icon-menu'
        },
        {
          name: '数据库',
          path: 'sjk',
          icon: 'el-icon-menu'
        },
        {
          name: '会计模块',
          path: 'kjmk',
          icon: 'el-icon-menu'
        }
      ]
    }
  ]
  export default {
    name: 'App',
    data () {
    return {
        searchVal: '',
        breadcrumbs: [menus[0], menus[0].children[0]],
        menus
      }
    },
    methods: {
      select (menu, subM, subSM) {
        this.breadcrumbs = arguments
      }
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

.main-content {
  width: 100%;
  height: 100%;
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

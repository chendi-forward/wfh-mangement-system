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
            <div class="nav-menu__title">主页</div>
            <el-menu-item index="yjck">
              <i class="el-icon-setting"></i>
              <span slot="title">业绩查看</span>
            </el-menu-item>
            <el-submenu index="nryy">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>内容运营</span>
              </template>
              <el-menu-item index="nryy-spgl">商品管理</el-menu-item>
              <el-menu-item index="nryy-zngb">站内广播</el-menu-item>
              <el-menu-item index="nryy-fxy">发现页</el-menu-item>
              <el-menu-item index="nryy-gzsm">规则说明</el-menu-item>
            </el-submenu>
            <el-menu-item index="yhgl">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="qxgl">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
            <el-menu-item index="shgl">
              <i class="el-icon-menu"></i>
              <span slot="title">售后管理</span>
            </el-menu-item>
            <div class="nav-menu__title">设置</div>
            <el-submenu index="hyjf">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>会员积分</span>
              </template>
              <el-menu-item index="hyjf-sjsz">时间设置</el-menu-item>
              <el-menu-item index="hyjf-hyfl">会员返利</el-menu-item>
              <el-menu-item index="hyjf-jfsz">积分设置</el-menu-item>
            </el-submenu>
            <el-menu-item index="yxmk">
              <i class="el-icon-menu"></i>
              <span slot="title">营销模块</span>
            </el-menu-item>
            <el-menu-item index="sjk">
              <i class="el-icon-menu"></i>
              <span slot="title">数据库</span>
            </el-menu-item>
            <el-menu-item index="kjmk">
              <i class="el-icon-menu"></i>
              <span slot="title">会计模块</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header class="main-header">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
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
  export default {
    name: 'App',
    data () {
    return {
        searchVal: ''
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

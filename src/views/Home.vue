<template>
  <div id="app">
    <el-container>
      <el-aside width="250px">
        <el-header height="80px" class="system-name">WFH</el-header>
        <div class="nav-menu scrollbar-hidden">
          <el-menu
            router
            class="nav-menu--box scrollbar-hidden"
            default-active="yjck">
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
              <el-menu-item index="nryy-qtym">其他页面</el-menu-item>
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
            <el-menu-item index="hyjf">
              <i class="el-icon-setting"></i>
              <span slot="title">会员积分</span>
            </el-menu-item>
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
        <el-header height="80px" class="main-header">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="flex-spacer"></div>
          <el-input
            class="main-header__search"
            placeholder="搜索..."
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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 80px;
  }

  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow: hidden;
  }

  .system-name {
    background-color: #ff4b57;
    color: #fff;
    font-size: 25px;
  }

  .nav-menu {
    height: calc(100% - 80px);
    .nav-menu--box {
      height: 100%;
      overflow: auto;
    }
    .nav-menu__title {
      text-align: start;
      margin-top: 43px;
      padding: 10px 20px;
      color: #999;
      line-height: 26px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .el-menu-item,
    .el-submenu__title {
      font-size: 18px;
    }
    .el-submenu .el-menu-item {
      padding-left: 50px !important;
      font-size: 16px;
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
      margin-right: 20px;
    }
    .main-header__user {
      display: flex;
      align-items: center;
      .user-box__name {
        margin-right: 35px;
        span {
          font-size: 20px;
        }
      }
      .user-box__logout {
        // ..
      }
    }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
    text-align: center;
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

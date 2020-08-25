<template>
  <div class="login">
    <div class="web-name">WFH后台管理系统</div>
    <el-form class="login-form">
      <el-input v-model="userForm.account" placeholder="用户名" @keyup.enter.native="submitUser"  prefix-icon="el-icon-user"></el-input>
      <el-input v-model="userForm.password" placeholder="密码" @keyup.enter.native="submitUser"  type="password" show-password prefix-icon="el-icon-lock"></el-input>
      <el-button type="danger" @click="submitUser" class="login-btn">登陆</el-button>
    </el-form>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped></style>

<template>
  <div class="login">
    <div class="web-name">WFH后台管理系统</div>
    <div class="login-form">
      <el-input v-model="userForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
      <el-input v-model="userForm.password" placeholder="密码" type="password" show-password prefix-icon="el-icon-lock"></el-input>
      <el-button type="danger" @click="submitUser" class="login-btn">登陆</el-button>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped></style>

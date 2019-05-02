<template>
  <div>
    <input v-model="userForm.username">
    <input type="password" v-model="userForm.password">
    <button @click="submitUser">确定</button>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>

</style>

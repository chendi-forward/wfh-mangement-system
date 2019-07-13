<template>
  <div class="text-or-input">
    <el-input v-model="inputData" :placeholder="holder" v-show='showInput' @change='change'></el-input>
    <span v-show='!showInput'>{{textData}}</span>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.less" lang="less">

</style>

<template>
  <div class="kjmk">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="流水数据" name="account-list"></el-tab-pane>
      <el-tab-pane label="佣金钱包" name="commission-wallet"></el-tab-pane>
    </el-tabs>
    <component :is="activeComponent"></component>
  </div>
</template>

<style src="./style.less" lang="less" scoped></style>
<script src="./script.js"></script>

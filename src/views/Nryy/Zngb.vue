<template>
  <div class="zngb">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="实时下单" name="live-charge"></el-tab-pane>
      <el-tab-pane label="会员晋级" name="vip-promote"></el-tab-pane>
      <el-tab-pane label="新手注册" name="newer-logon"></el-tab-pane>
    </el-tabs>
    <component :is="activeComponent"></component>
  </div>
</template>

<script>
  import LiveCharge from './ZngbComponents/LiveCharge'
  import VipPromote from './ZngbComponents/VipPromote'
  import NewerLogon from './ZngbComponents/NewerLogon'
  export default {
    name: 'zngb',
    data () {
      return {
        activeName: 'live-charge',
        components: {
          'live-charge': LiveCharge,
          'vip-promote': VipPromote,
          'newer-logon': NewerLogon
        }
      }
    },
    computed: {
      activeComponent () {
        return this.components[this.activeName]
      }
    }
  }
</script>

<style lang='less' scoped>
  .el-tabs--border-card {
    box-shadow: none;
  }
  .zngb {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="less">
  .zngb .el-tabs {
    // height: 60px;
    border: none;
    .el-tabs__header  {
      height: 60px;
      line-height: 60px;
      border-bottom: none;
      .el-tabs__nav {
        .is-active {
          border: none;
          background: #FF4B57;
          border-radius: 6px 6px 0 0;
          color: #fff;
        }
      }
    }
    .el-tabs__item {
      height: 60px;
      line-height: 60px;
      width: 170px;
      color: #363F51;
      text-align: center;
    }
    .el-tabs__content {
      // height: ;
      padding: 0;
      .el-tab-pane {
        height: 100%;
        overflow: hidden;
      }
    }
  }
</style>

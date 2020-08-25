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

<template>
  <div class="commission-list">
    <sub-nav v-model="selected" :sub-list='subList'></sub-nav>
    <component :is="selected"></component>
  </div>
</template>

<script>
  import subNav from 'COMPONENTS/SubNav_comp'
  import fltq from './CommissionWalletComs/Fltq'
  import txsh from './CommissionWalletComs/Txsh'
  export default {
    name: 'commission-wallet',
    components: {
      'sub-nav': subNav
    },
    data () {
      return {
        selected: txsh,
        subList: [
          {name: '提现审核列表', component: txsh},
          {name: '返利提取流水', component: fltq}
        ]
      }
    }
  }
</script>

<style lang='less'>
</style>

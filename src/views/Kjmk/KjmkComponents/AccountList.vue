<template>
  <div class="account-list">
    <sub-nav v-model="selected" :sub-list='subList'></sub-nav>
    <component :is="selected"></component>
  </div>
</template>

<script>
  import subNav from 'COMPONENTS/SubNav_comp'
  // import fhwu from './AccountListComponents/Fhwl'
  import srlsz from './AccountListComponents/Srlsz'
  import zclsz from './AccountListComponents/Zclsz'
  import kplsz from './AccountListComponents/Kplsz'
  export default {
    name: 'account-list',
    components: {
      'sub-nav': subNav
    },
    data () {
      return {
        selected: srlsz,
        subList: [
          // {name: '发货物流', component: fhwu},
          {name: '收入流水账', component: srlsz},
          {name: '支出流水账', component: zclsz},
          {name: '开票流水账', component: kplsz}
        ]
      }
    }
  }
</script>

<style lang="less">
  .account-list__item {
    margin-top: 10px;
    .account-list__item--head {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 25px;
      margin-bottom: 10px;
      white-space: nowrap;
    }
  }
</style>

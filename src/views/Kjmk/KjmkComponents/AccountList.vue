<template>
  <div class="account-list">
    <sub-nav v-model="selected" :sub-list='subList'></sub-nav>
    <component :is="selected"></component>
  </div>
</template>

<script>
  import subNav from './SubNav_comp'
  import fhwu from './AccountListComponents/Fhwl'
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
        selected: fhwu,
        subList: [
          {name: '发货物流', component: fhwu},
          {name: '收入流水账', component: srlsz},
          {name: '支出流水账', component: zclsz},
          {name: '开票流水账', component: kplsz}
        ]
      }
    }
  }
</script>

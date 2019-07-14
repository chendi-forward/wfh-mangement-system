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
  .commission-list {
    .ssxd-body {
      margin-bottom: 13px;
    }
    .ssxd-form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .ssxd-form-item {
        line-height: 40px;
        .ssxd-form--label {
          font-size: 15px;
          margin-right: 20px;
        }
        .ssxd-form--radio {
          margin-right: 90px;
        }
        .ssxd-form--input {
          width: 190px;
        }
        .ssxd-form--btn {
          display: inline-block;
          float: right;
        }
      }
    }
    .ssxd-table {
      // ..
    }
    .page-wrap {
      display: flex;
    }
  }
</style>

<template>
    <!-- 确认退款 -->
    <div class="tags-box">
        <p><span>订单编号:</span> {{data.ddbh}}</p>
        <p><span>退款账号:</span> {{data.tkzh}}</p>
        <p><span>退款金额:</span> {{data.tkje}}(元)</p>
    </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => {
            return {
                ddbh: '1654966632',
                tkzh: '5621654623',
                tkje: 400
            }
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
    .tags-box {
        padding-left: 200px !important;
    }
</style>

<template>
<!-- 新建退款 -->
  <div class="tags-box">
    <div class="tag-box">
        <span class="header-title">订单编号:</span>
        <el-input
        placeholder="请输入单号..."
        v-model="data.ddbh">
        </el-input>
    </div>
    <div class="tag-box">
        <span class="header-title">订单状态:</span>
        <el-select v-model="data.orderStatus" @change='orderChange' placeholder="请选择">
        <el-option
            v-for="(item, index) in data.orderOptions"
            :key="index"
            :label="item.label"
            :value="item.value">
        </el-option>
        </el-select>
    </div>
    <div class="tag-box">
        <span class="header-title">物流公司:</span>
        <el-select v-model="data.selectKey" @change='selectChange' placeholder="请选择">
        <el-option
            v-for="(item, index) in data.options"
            :key="index"
            :label="item.label"
            :value="item.value">
        </el-option>
        </el-select>
    </div>
    <div class="tag-box">
        <span class="header-title">退运单号:</span>
        <el-input
        placeholder="请输入单号..."
        v-model="data.tydh">
        </el-input>
    </div>
    <div class="tag-box">
        <span class="header-title">退款账户:</span>
        <el-input
        placeholder="请输入微信交易号..."
        v-model="data.wxid">
        </el-input>
        （原路返回）
    </div>
    <div class="tag-box">
        <span class="header-title">退款金额:</span>
        <el-input
        placeholder="请输入金额..."
        v-model="data.money">
        </el-input>
        （单位：元）
    </div>
    </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => {
            return {
                ddbh: '',
                tydh: '',
                wxid: '',
                money: '',
                orderStatus: '1',
                selectKey: '1',
                orderOptions: [{
                    value: '1',
                    label: '未付款'
                }, {
                    value: '2',
                    label: '已付款'
                }, {
                    value: '3',
                    label: '已发货'
                }],
                options: [{
                    value: '1',
                    label: '顺丰速运'
                }, {
                    value: '2',
                    label: '圆通快递'
                }, {
                    value: '3',
                    label: '申通快递'
                }]
            }
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
        orderChange () {},
        selectChange () {}
    }
  }
</script>

<style lang="less" scoped>

</style>

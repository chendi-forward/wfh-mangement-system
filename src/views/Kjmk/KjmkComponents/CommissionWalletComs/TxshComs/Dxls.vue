<template>
  <div class="ssxd-body">
    <el-table class="ssxd-table" ref="multipleTable" :data="data" tooltip-effect="dark" max-height="300" stripe style="width: 100%">
      <el-table-column label="日期" align='center' width="150">
        <template slot-scope="scope">{{ scope.row.r_time }}</template>
      </el-table-column>
      <el-table-column align='center' label="商品名称">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.goods_title }}</span></template>
      </el-table-column>
      <el-table-column align='center' label="数量">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.goods_count }}</span></template>
      </el-table-column>
      <el-table-column align='center' label="订单金额">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.pay_price }}</span></template>
      </el-table-column>
      <el-table-column label="总返利额" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.rebate_money }}</span></template>
      </el-table-column>
      <el-table-column label="基础返利额" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.base_rebate }}</span></template>
      </el-table-column>
      <el-table-column label="优惠券返利额" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.coupon_rebate }}</span></template>
      </el-table-column>
      <el-table-column label="活动返利额" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.active_rebate }}</span></template>
      </el-table-column>
    </el-table>
    <div class="ssxd-count">
      <span class="ssxd-count--title">订单金额总数：</span><span>{{this.orderCount}}元</span>
      <span class="ssxd-count--title">获得返利总数：</span><span>{{this.flCount}}元</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fltq',
  props: ['data'],
  data() {
    return {
      orderCount: 0,
      flCount: 0
    }
  },
  created() {
    this.data.forEach(item => {
      this.orderCount += item.pay_price*100
      this.flCount += item.rebate_money*100
    })
    this.orderCount = this.orderCount / 100
    this.flCount = this.flCount / 100
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .ssxd-body {
    margin-bottom: unset;
  }
  .ssxd-count {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    font-weight: bold;
    text-align: end;
    .ssxd-count--title {
      margin-left: 20px;
      color: #ff4b57;
    }
  }
</style>

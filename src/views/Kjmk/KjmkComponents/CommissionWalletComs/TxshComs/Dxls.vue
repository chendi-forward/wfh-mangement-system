<template>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        max-height="300"
        stripe
        style="width: 100%">
        <el-table-column
          label="日期"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.r_time }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="商品名称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.goods_title }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="数量">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.goods_count }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="订单金额">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.pay_price }}</span></template>
        </el-table-column>
        <el-table-column
          label="总返利额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.rebate_money }}</span></template>
        </el-table-column>
        <el-table-column
          label="基础返利额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.base_rebate }}</span></template>
        </el-table-column>
        <el-table-column
          label="优惠券返利额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.coupon_rebate }}</span></template>
        </el-table-column>
        <el-table-column
          label="活动返利额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.active_rebate }}</span></template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: 'fltq',
    props: ['data'],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

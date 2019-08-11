<template>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        max-height="300"
        stripe
        style="width: 100%">
        <el-table-column
          label="日期"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="商品名称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.goodsname }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="数量">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.count }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="订单金额">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.ddje }}</span></template>
        </el-table-column>
        <el-table-column
          label="总返利额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.zfle }}</span></template>
        </el-table-column>
        <el-table-column
          label="基础返利额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.jcfle }}</span></template>
        </el-table-column>
        <el-table-column
          label="优惠券返利额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.yhjfle }}</span></template>
        </el-table-column>
        <el-table-column
          label="优惠券返利额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.hdfle }}</span></template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: 'fltq',
    data () {
      return {
        tableData: [
          {date: '2019-03-22 09:20', goodsname: '奶茶系列蛋白粉', count: '20', ddje: 3000, zfle: 300, jcfle: 300, yhjfle: 300, hdfle: 300},
          {date: '2019-03-22 09:20', goodsname: '奶茶系列蛋白粉', count: '20', ddje: 3000, zfle: 300, jcfle: 300, yhjfle: 300, hdfle: 300},
          {date: '2019-03-22 09:20', goodsname: '奶茶系列蛋白粉', count: '20', ddje: 3000, zfle: 300, jcfle: 300, yhjfle: 300, hdfle: 300},
          {date: '2019-03-22 09:20', goodsname: '奶茶系列蛋白粉', count: '20', ddje: 3000, zfle: 300, jcfle: 300, yhjfle: 300, hdfle: 300},
          {date: '2019-03-22 09:20', goodsname: '奶茶系列蛋白粉', count: '20', ddje: 3000, zfle: 300, jcfle: 300, yhjfle: 300, hdfle: 300},
          {date: '2019-03-22 09:20', goodsname: '奶茶系列蛋白粉', count: '20', ddje: 3000, zfle: 300, jcfle: 300, yhjfle: 300, hdfle: 300}
        ]
      }
    },
    methods: {
    }
  }
</script>

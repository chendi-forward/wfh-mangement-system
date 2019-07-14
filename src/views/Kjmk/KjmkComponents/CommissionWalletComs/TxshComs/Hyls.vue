<template>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        stripe
        style="width: 100%">
        <el-table-column
          label="积分结算日期"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="积分兑换返利">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.jfdhfl }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="分享">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.fx }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="成功邀请">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.cgyq }}</span></template>
        </el-table-column>
        <el-table-column
          label="登陆奖励"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.dljl }}</span></template>
        </el-table-column>
        <el-table-column
          label="代销"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.dx }}</span></template>
        </el-table-column>
        <el-table-column
          label="评论奖励"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.pljl }}</span></template>
        </el-table-column>
        <el-table-column
          label="实名认证"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.smrz }}</span></template>
        </el-table-column>
        <el-table-column
          label="补偿奖励"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.bcjl }}</span></template>
        </el-table-column>
        <el-table-column
          label="月销售排名积分将"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.yxspmjfj }}</span></template>
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
          {date: '2019-03-22 09:20', jfdhfl: 300, fx: 300, cgyq: 20, dljl: 20, dx: 3000, pljl: 300, smrz: '完成', bcjl: 300, yxspmjfj: 300},
          {date: '2019-03-22 09:20', jfdhfl: 300, fx: 300, cgyq: 20, dljl: 20, dx: 3000, pljl: 300, smrz: '完成', bcjl: 300, yxspmjfj: 300},
          {date: '2019-03-22 09:20', jfdhfl: 300, fx: 300, cgyq: 20, dljl: 20, dx: 3000, pljl: 300, smrz: '完成', bcjl: 300, yxspmjfj: 300},
          {date: '2019-03-22 09:20', jfdhfl: 300, fx: 300, cgyq: 20, dljl: 20, dx: 3000, pljl: 300, smrz: '完成', bcjl: 300, yxspmjfj: 300}
        ]
      }
    },
    methods: {
    }
  }
</script>

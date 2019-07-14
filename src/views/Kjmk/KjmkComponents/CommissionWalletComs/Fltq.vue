<template>
<!-- 返利提取流水 -->
  <div class='fltq-list'>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="下单时间"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="提现流水号">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.txlsh }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="用户ID">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.userid }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="昵称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
        </el-table-column>
        <el-table-column
          label="订单金额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.money }}</span></template>
        </el-table-column>
        <el-table-column
          label="支出类别"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.expensetype }}</span></template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini">批量删除</el-button>
        <el-button size="mini" class="success-btn" @click="createFn">导出</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="400">
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from 'COMPONENTS/Pagination'
  export default {
    name: 'fltq',
    components: {
      'my-pagination': Pagination
    },
    data () {
      return {
        tableData: [
          {date: '2019-03-22 09:20', txlsh: '18855862290', userid: 'WFH0...', nickname: 'WFH0...', money: 2000, expensetype: '提现'},
          {date: '2019-03-22 09:20', txlsh: '18855862290', userid: 'WFH0...', nickname: 'WFH0...', money: 2000, expensetype: '提现'},
          {date: '2019-03-22 09:20', txlsh: '18855862290', userid: 'WFH0...', nickname: 'WFH0...', money: 2000, expensetype: '提现'},
          {date: '2019-03-22 09:20', txlsh: '18855862290', userid: 'WFH0...', nickname: 'WFH0...', money: 2000, expensetype: '提现'}
        ]
      }
    },
    methods: {
      handleSelectionChange () {},
      editHandle () {},
      createFn () {},
      handleSizeChange () {},
      handleCurrentChange () {},
      submit () {}
    }
  }
</script>

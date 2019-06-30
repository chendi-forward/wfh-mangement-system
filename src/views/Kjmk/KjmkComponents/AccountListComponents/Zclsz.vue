<template>
  <div class="account-list__item">
    <div class="account-list__item--body">
      <el-table
        class="zcls-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
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
          min-width="120"
          label="支出流水号">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.expenseNum }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          min-width="100"
          label="用户ID">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.userId }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          min-width="100"
          label="昵称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          min-width="120"
          label="订单金额">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.orderMoney }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="类别"
          min-width="80">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.classify }}</span></template>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="80">
          <button class="con-icon" @cell-click='editHandle(row)'>
            <i class="el-icon-edit"></i>
          </button>
        </el-table-column>
      </el-table>
    </div>
    <div class="account-list__item--footer">
      <div class="selectAll-wrap">
        <el-checkbox v-model="isAllSelect">全选</el-checkbox>
        <el-button size="mini" class="success-btn" @click="exportFn">导出</el-button>
        <el-button size="mini" @click="deleteMany">批量删除</el-button>
      </div>
      <div class="page-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <el-button size="mini" class="success-btn" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'account-list-zcls',
    data () {
      return {
        tableData: [
          {
            date: '2019-01-02 15:20:11',
            expenseNum: '111111212121',
            userId: '9fasdfe',
            nickname: '隔壁老王',
            orderMoney: '10000',
            classify: '提现'
          },
          {
            date: '2019-01-02 15:20:11',
            expenseNum: '111111212121',
            userId: '9fasdfe',
            nickname: '隔壁老王',
            orderMoney: '10000',
            classify: '提现'
          }
        ],
        isAllSelect: false,
        currentPage: 1,
        total: 100
      }
    },
    methods: {
      editHandle (item) {
        // ..
      },
      handleSelectionChange () {
        // ..
      },
      exportFn () {
        // ..
      },
      deleteMany () {
        // ..
      },
      handleSizeChange () {
        // ..
      },
      handleCurrentChange () {
        // ..
      },
      submit () {
        // ..
      }
    }
  }
</script>

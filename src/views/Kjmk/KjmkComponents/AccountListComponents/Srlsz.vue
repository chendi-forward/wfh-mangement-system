<template>
  <div class="account-list__item">
    <div class="account-list__item--head">
      <div>
        <span>快速搜索：</span>
        <el-input
          class="kpls-table__input"
          placeholder="请输入用户ID/发票票号..."
          prefix-icon="el-icon-search"
          v-model="searchVal">
        </el-input>
        <el-button size="mini" class="success-btn" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="account-list__item--body">
      <el-table
        class="srls-table"
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
          label="收入流水号">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.incomeNum }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          min-width="120"
          label="订单编号">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.orderNum }}</span></template>
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
          min-width="120"
          label="订单返利">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.orderRebate }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="实际收入"
          min-width="120">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.realIncome }}</span></template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'account-list-zcls',
    data () {
      return {
        searchVal: '',
        tableData: [
          {
            date: '2019-01-02 15:20:11',
            incomeNum: '111111212121',
            orderNum: '1111111111',
            userId: '9fasdfe',
            nickname: '隔壁老王',
            orderMoney: '10000',
            orderRebate: '1000',
            realIncome: '1000'
          },
          {
            date: '2019-01-02 15:20:11',
            incomeNum: '111111212121',
            orderNum: '1111111111',
            userId: '9fasdfe',
            nickname: '隔壁老王',
            orderMoney: '10000',
            orderRebate: '1000',
            realIncome: '1000'
          }
        ],
        isAllSelect: false,
        currentPage: 1,
        total: 100
      }
    },
    methods: {
      search () {},
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

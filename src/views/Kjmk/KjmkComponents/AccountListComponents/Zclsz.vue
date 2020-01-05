<template>
  <div class="account-list__item">
    <div class="account-list__item--head">
      <div>
        <span>快速搜索：</span>
        <el-input
          class="kpls-table__input"
          placeholder="请输入用户ID/发票票号..."
          prefix-icon="el-icon-search"
          v-model="searchVal"
        >
        </el-input>
        <el-button
          size="small"
          plain
          @click="search"
        >搜索</el-button>
      </div>
    </div>
    <div class="account-list__item--body">
      <el-table
        class="zcls-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="下单时间"
          align='center'
          prop="date"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align='center'
          min-width="120"
          prop="expenseNum"
          label="支出流水号"
        >
        </el-table-column>
        <el-table-column
          align='center'
          min-width="100"
          prop="userId"
          label="用户ID"
        >
        </el-table-column>
        <el-table-column
          align='center'
          min-width="100"
          prop="nickname"
          label="昵称"
        >
        </el-table-column>
        <el-table-column
          align='center'
          min-width="120"
          prop="orderMoney"
          label="订单金额"
        >
        </el-table-column>
        <el-table-column
          align='center'
          label="类别"
          prop="classify"
          min-width="80"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button
          size="small"
          @click="exportFn"
        >导出</el-button>
        <el-button
          size="small"
          type="danger"
          @click="deleteMany"
        >批量删除</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="total"
        >
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'COMPONENTS/Pagination'

export default {
  name: 'account-list-zcls',
  components: {
    'my-pagination': Pagination
  },
  data() {
    return {
      searchVal: '',
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
    search() {},
    editHandle(item) {
      // ..
    },
    handleSelectionChange() {
      // ..
    },
    exportFn() {
      // ..
    },
    deleteMany() {
      // ..
    },
    handleSizeChange() {
      // ..
    },
    handleCurrentChange() {
      // ..
    },
    submit() {
      // ..
    }
  }
}
</script>

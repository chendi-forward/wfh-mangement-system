<template>
  <div class="account-list__item">
    <div class="account-list__item--head">
      <div>
        <span>快速搜索：</span>
        <el-input class="kpls-table__input" placeholder="请输入用户ID/发票票号..." prefix-icon="el-icon-search" v-model="searchVal">
        </el-input>
        <el-button size="small" plain @click="search">搜索</el-button>
      </div>
    </div>
    <div class="account-list__item--body">
      <el-table class="srls-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="下单时间" align='center' width="150" prop="order_time">
        </el-table-column>
        <el-table-column align='center' min-width="120" label="收入流水号" prop="turnover_id">
        </el-table-column>
        <el-table-column align='center' min-width="120" label="订单编号" prop="order_id">
        </el-table-column>
        <el-table-column align='center' min-width="100" label="用户ID" prop="user_id">
        </el-table-column>
        <el-table-column align='center' min-width="100" label="昵称" prop="nickname">
        </el-table-column>
        <el-table-column align='center' min-width="120" label="订单金额" prop="pay_money">
        </el-table-column>
        <el-table-column align='center' min-width="120" label="订单返利" prop="rebate_money">
        </el-table-column>
        <el-table-column align='center' label="实际收入" min-width="120" prop="real_money">
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="small" @click="exportFn">导出</el-button>
        <!-- <el-button size="small" type="danger" @click="deleteMany">批量删除</el-button> -->
      </div>
      <div class="page-wrap">
        <my-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total">
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'COMPONENTS/Pagination'
import { tableToExcel } from 'COMMONS/util.js'

export default {
  name: 'account-list-zcls',
  components: {
    'my-pagination': Pagination
  },
  data() {
    return {
      searchVal: '',
      tableData: [],
      isAllSelect: false,
      currentPage: 1,
      pageCount: 10,
      total: 0,
      multipleSelection: [] // 勾选的项
    }
  },
  created() {
    this.getData()
  },
  methods: {
    search() {
      this.currentPage = 1
      this.getData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    exportFn() {
      let map = [
        { name: 'order_time', value: '下单时间' },
        { name: 'turnover_id', value: '收入流水号' },
        { name: 'order_id', value: '订单编号' },
        { name: 'user_id', value: '用户ID' },
        { name: 'nickname', value: '昵称' },
        { name: 'pay_money', value: '订单金额' },
        { name: 'rebate_money', value: '订单返利' },
        { name: 'real_money', value: '实际收入' }
      ]
      this.$get('/accountant/turnover', {
        search: this.searchVal,
        type_info: 'in',
        page_count: 10000,
        current_page: 1
      }).then(res => {
        tableToExcel({
          name: '收入流水账.xlsx',
          data: res.data.data_list,
          map
        })
      })
    },
    deleteMany() {
      if (!this.multipleSelection.length) return
      let ids = this.multipleSelection.map(item => item.turnover_id)
      this.handleDelete(ids)
    },
    handleDelete(ids) {
      this.$confirm(`确定要删除吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.deleteData(ids)
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
    },
    deleteData(ids) {
      let params = {
        turnover_id: ids
      }
      this.$post('/accountant/delete_turnover', params)
        .then(res => {
          this.getData()
        })
        .catch(err => {
          this.$message({
            type: 'warning',
            message: '请求出错!'
          })
        })
    },
    handleSizeChange(val) {
      this.current_page = 1
      this.pageCount = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    getData() {
      return this.$get('/accountant/turnover', {
        search: this.searchVal,
        type_info: 'in',
        page_count: this.pageCount,
        current_page: this.currentPage
      }).then(res => {
        this.tableData = res.data.data_list
        this.total = res.data.count
        return this.tableData
      })
    }
  }
}
</script>

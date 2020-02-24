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
          <template slot-scope="scope">{{ scope.row.add_time }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="提现流水号">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.turnover_id }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="用户ID">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.user_id }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="昵称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
        </el-table-column>
        <el-table-column
          label="订单金额"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.amount }}</span></template>
        </el-table-column>
        <el-table-column
          label="支出类别"
          align='center'>
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.type }}</span></template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <!-- <el-button size="small" type="danger">批量删除</el-button> -->
        <el-button size="small" @click="tableToExcel">导出</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="total">
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from 'COMPONENTS/Pagination'
  import {brokerageTurnoverList} from 'API/Kjmk'
  import {tableToExcel} from 'COMMONS/util.js'
  export default {
    name: 'fltq',
    components: {
      'my-pagination': Pagination
    },
    data () {
      return {
        page_count: 10,
        current_page: 1,
        total: 0,
        tableData: [],
        selectList: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        brokerageTurnoverList({
          page_count: this.page_count,
          current_page: this.current_page
        }).then(res => {
          this.total = res.data.count
          this.tableData = res.data.data_list
        })
      },
      handleSelectionChange (v) {
        this.selectList = v
      },
      editHandle () {},
      handleSizeChange (v) {
        this.page_count = v
      },
      handleCurrentChange (v) {
        this.current_page = v
      },
      submit () {},
      tableToExcel(){
        let data = this.tableData
        if (this.selectList.length) {
          data = this.selectList
        }
        let map = [
          {name: 'add_time', value: '下单时间'},
          {name: 'turnover_id', value: '提现流水号'},
          {name: 'user_id', value: '用户ID'},
          {name: 'nickname', value: '昵称'},
          {name: 'amount', value: '订单金额'},
          {name: 'type', value: '支出类别'}
        ]
        tableToExcel({
          name: "返利提取流水.xlsx",
          data,
          map
        })
      }
    }
  }
</script>

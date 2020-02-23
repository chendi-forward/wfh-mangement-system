<template>
<!-- 提现审核列表 -->
  <div class='txsh-list'>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        @expand-change="expandChange"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="用户ID"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.user_id }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="昵称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="申请时间">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.add_time }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="提现金额">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.amount }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="状态">
          <template slot-scope="scope"><span class='text-overflow'>{{ map[scope.row.state] }}</span></template>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="submit(scope.row.cash_id, 1)">通过</el-button>
            <el-button size="mini" @click="submit(scope.row.cash_id, 2)">驳回</el-button>
          </template>
        </el-table-column>
        <el-table-column
          type="expand"
          align='center'>
          <template slot-scope="scope">
            <sub-nav v-model="selected" :sub-list='subList' class="not-border" @input="tabChange"></sub-nav>
            <component :is="selected" :data='scope.row.expand'></component>
          </template>
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
  import subNav from 'COMPONENTS/SubNav_comp'
  import dxls from './TxshComs/Dxls'
  import tjls from './TxshComs/Tjls'
  import hyls from './TxshComs/Hyls'
  import {cashWithdrawalList,cashWithdrawalDetail, auditCashWithdrawal} from 'API/Kjmk'
  import {tableToExcel} from 'COMMONS/util.js'
  export default {
    name: 'txsh',
    components: {
      'sub-nav': subNav,
      'my-pagination': Pagination
    },
    data () {
      return {
        page_count: 10,
        current_page: 1,
        map: ['未审核', '通过', '驳回'],
        total: 1,
        tableData: [{
        "add_time": "2020-02-21 23:36:24",
        "amount": 1400.0,
        "cash_id": 5,
        "nickname": "likamoer",
        "user_id": 'WFH70312768'
      }],
        selected: dxls,
        current_expand: null,
        subList: [
          {name: '代销流水', component: dxls, type: '代销'},
          {name: '推荐流水', component: tjls, type: '推荐'},
          {name: '活跃流水', component: hyls, type: '活跃'}
        ]
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        cashWithdrawalList({
          page_count: this.page_count,
          current_page: this.current_page
        }).then(res => {
          this.total = res.data.count
          this.tableData = res.data.data_list.map(item => {
            return Object.assign(item, {state: this.map[item.state]})
          })
        })
      },
      expandChange (row, v) {
        this.current_expand = row
        cashWithdrawalDetail({
          type: '代销',
          cash_id: row.cash_id
        }).then(res => {
          row.expand = res.data
        })
      },
      tabChange (v, index) {
        cashWithdrawalDetail({
          cash_id: this.current_expand.cash_id,
          type: this.subList[index].type
        }).then(res => {
          this.current_expand.expand = res.data
        })
      },
      handleSelectionChange () {},
      editHandle () {},
      handleSizeChange (v) {
        this.page_count = v
      },
      handleCurrentChange (v) {
        this.current_page = v
      },
      submit (cash_id, state) {
        auditCashWithdrawal({
          cash_id,
          state  // 1: 通过  2: 驳回
        })
      },
      tableToExcel(){
        let map = [
          {name: 'add_time', value: '申请时间'},
          {name: 'user_id', value: '用户ID'},
          {name: 'nickname', value: '昵称'},
          {name: 'amount', value: '提现金额'},
          {name: 'state', value: '状态'}
        ]
        tableToExcel({
          name: "提现审核列表.xlsx",
          data: this.tableData,
          map
        })
      }
    }
  }
</script>

<style lang='less'>
</style>

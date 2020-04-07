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
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.state }}</span></template>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="submit(scope.row.cash_id, 1)" :disabled="scope.row.state!='未审核'">通过</el-button>
            <el-button size="mini" @click="submit(scope.row.cash_id, 2)" :disabled="scope.row.state!='未审核'">驳回</el-button>
          </template>
        </el-table-column>
        <el-table-column
          type="expand"
          align='center'>
          <template slot-scope="scope">
            <sub-nav v-model="scope.row.selected" :sub-list='subList' class="not-border" @input="tabChange($event,scope.row)"></sub-nav>
            <component :is="scope.row.selected" :data='scope.row.expand' v-if="comshow"></component>
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
        comshow: false,
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
        selectList: [],
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
            item.selected = dxls
            return Object.assign(item, {state: this.map[item.state]})
          })
        })
      },
      expandChange (row, v) {
        this.comshow = false
        cashWithdrawalDetail({
          type: '代销',
          cash_id: row.cash_id
        }).then(res => {
          row.expand = res.data
          this.comshow = true
        })
      },
      tabChange (v, listItem) {
        this.comshow = false
        cashWithdrawalDetail({
          cash_id: listItem.cash_id,
          type: this.subList[v.selectedItem].type
        }).then(res => {
          // let obj = {
          //   '代销': [
          //     {r_time: '1', goods_title: '2', goods_count: '3', pay_price: '4', rebate_money: '5', base_rebate: '6', coupon_rebate: '7', active_rebate: '8'}
          //   ],
          //   '推荐': [
          //     {r_time: 'a', child_id: 'b', task_rank: 'c', rebate_money: 'd'}
          //   ],
          //   '活跃': [
          //     {'01': 'e', '02': 'f', '03': 'g', '04': 'h', '05': 'i', '06': '完成', '07': 'k', '08': 'l'},
          //     {'01': 'e', '02': 'f', '03': 'g', '04': 'h', '05': 'i', '06': '完成', '07': 'k', '08': 'l'}
          //   ]
          // }
          let status = false
          listItem.expand = res.data.map(item => {
            if (item['06'] == '完成' && v.selectedItem == 2) {
              if (status) {
                item['06'] = '/'
              }
              status = true
            }
            return item
          })
          this.comshow = true
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
      submit (cash_id, state) {
        auditCashWithdrawal({
          cash_id,
          state  // 1: 通过  2: 驳回
        }).then(res => {
          if (!res.data) {
            this.$message.error('操作失败！')
          } else {
            this.getData()
          }
        })
      },
      tableToExcel(){
        let data = this.tableData
        if (this.selectList.length) {
          data = this.selectList
        }
        let map = [
          {name: 'add_time', value: '申请时间'},
          {name: 'user_id', value: '用户ID'},
          {name: 'nickname', value: '昵称'},
          {name: 'amount', value: '提现金额'},
          {name: 'state', value: '状态'}
        ]
        tableToExcel({
          name: "提现审核列表.xlsx",
          data,
          map
        })
      }
    }
  }
</script>

<style lang='less'>
</style>

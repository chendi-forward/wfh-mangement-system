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
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="用户ID"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.userid }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="昵称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="申请时间">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.date }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="提现金额">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.withdrawDeposit }}</span></template>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="150">
          <el-button size="mini" class="success-btn" @click="submit">确认</el-button>
        </el-table-column>
        <el-table-column
          type="expand"
          align='center'>
          <template slot-scope="scope">
            <sub-nav v-model="selected" :sub-list='subList' class="not-border"></sub-nav>
            <component :is="selected" :data='scope.row.expand'></component>
          </template>
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
  import subNav from 'COMPONENTS/SubNav_comp'
  import dxls from './TxshComs/Dxls'
  import tjls from './TxshComs/Tjls'
  import hyls from './TxshComs/Hyls'
  export default {
    name: 'txsh',
    components: {
      'sub-nav': subNav,
      'my-pagination': Pagination
    },
    data () {
      return {
        tableData: [
          {userid: 'WFH0...', nickname: 'WFH0...', date: '2019-03-22 09:20', withdrawDeposit: 2000, expand: []},
          {userid: 'WFH0...', nickname: 'WFH0...', date: '2019-03-22 09:20', withdrawDeposit: 2000, expand: []},
          {userid: 'WFH0...', nickname: 'WFH0...', date: '2019-03-22 09:20', withdrawDeposit: 2000, expand: []},
          {userid: 'WFH0...', nickname: 'WFH0...', date: '2019-03-22 09:20', withdrawDeposit: 2000, expand: []},
          {userid: 'WFH0...', nickname: 'WFH0...', date: '2019-03-22 09:20', withdrawDeposit: 2000, expand: []}
        ],
        selected: dxls,
        subList: [
          {name: '代销流水', component: dxls},
          {name: '推荐流水', component: tjls},
          {name: '活跃流水', component: hyls}
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

<style lang='less'>
</style>

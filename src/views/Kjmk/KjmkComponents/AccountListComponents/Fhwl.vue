<template>
  <div class="account-list__item">
    <div class="account-list__item--body">
      <el-table
        class="fhwl-table"
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
          min-width="100"
          label="状态">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.status }}</span></template>
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
          min-width="150"
          label="商品名称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.goodsName }}</span></template>
        </el-table-column>
        <el-table-column
          prop="number"
          align='center'
          label="数量"
          min-width="60">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.number }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="收件人"
          min-width="100">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.addressee }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="收货地址"
          min-width="150">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.address }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="联系电话"
          min-width="120">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.cellphone }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="物流"
          min-width="100">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.express }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="物流单号"
          min-width="120">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.expressNum }}</span></template>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="160">
          <template slot-scope="scope">
            <el-button type="primary" class="definition-btn" icon="el-icon-edit" @click='editHandle(scope.row)'></el-button>
            <el-button type="primary" class="definition-btn" icon="el-icon-delete" @click='deleteHandle(scope.row)'></el-button>
          </template>
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
    name: 'account-list-fhwl',
    data () {
      return {
        tableData: [
          {
            date: '2019-01-02 15:20:11',
            status: '已下单',
            userId: '9fasdfe',
            nickname: '隔壁老王',
            goodsName: 'sdfafee',
            number: '11',
            addressee: '隔壁老王',
            address: '北京海淀',
            cellphone: '12312345678',
            express: '顺丰',
            expressNum: '111111212121'
          },
          {
            date: '2019-01-02 15:20:11',
            status: '已下单',
            userId: '9fasdfe',
            nickname: '隔壁老王',
            goodsName: 'sdfafee',
            number: '11',
            addressee: '隔壁老王',
            address: '北京海淀',
            cellphone: '12312345678',
            express: '顺丰',
            expressNum: '111111212121'
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

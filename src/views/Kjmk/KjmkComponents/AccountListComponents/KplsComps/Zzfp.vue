<template>
  <el-table
    class="kpls-table"
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
      label="申请时间"
      align='center'
      width="180">
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
      min-width="120"
      label="用户ID">
      <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.userId }}</span></template>
    </el-table-column>
    <el-table-column
      align='center'
      min-width="120"
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
      label="发票抬头"
      min-width="100">
      <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.invoiceTitle }}</span></template>
    </el-table-column>
    <el-table-column
      align='center'
      label="公司税号"
      min-width="100">
      <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.taxId }}</span></template>
    </el-table-column>
    <el-table-column
      align='center'
      label="收件人"
      min-width="100">
      <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.addressee }}</span></template>
    </el-table-column>
    <el-table-column
      align='center'
      label="邮寄地址"
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
      label="操作"
      align='center'
      width="160">
      <template slot-scope="scope">
        <el-button type="primary" class="definition-btn" icon="el-icon-edit" @click='editHandle(scope.row)'></el-button>
        <el-button type="primary" class="definition-btn" icon="el-icon-delete" @click='deleteHandle(scope.row)'></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'kpls-zzfp',
    data () {
      return {
        tableData: [
          {
            date: '2019-01-02 15:20:11',
            status: '已开具',
            userId: '9fasdfe',
            nickname: '隔壁老王',
            goodsName: 'sdfafee',
            number: '11',
            invoiceTitle: '北京海淀科技有限公司',
            taxId: '12312345678',
            addressee: '隔壁老王',
            address: '北京海淀中关村',
            cellphone: '12312345678'
          },
          {
            date: '2019-01-02 15:20:11',
            status: '已开具',
            userId: '9fasdfe',
            nickname: '隔壁老王',
            goodsName: 'sdfafee',
            number: '11',
            invoiceTitle: '北京海淀科技有限公司',
            taxId: '12312345678',
            addressee: '隔壁老王',
            address: '北京海淀中关村',
            cellphone: '12312345678'
          }
        ]
      }
    },
    methods: {
      handleSelectionChange () {
        // ..
      },
      editHandle (row) {
        console.log(row)
      },
      deleteHandle (row) {
        console.log(row)
      }
    }
  }
</script>

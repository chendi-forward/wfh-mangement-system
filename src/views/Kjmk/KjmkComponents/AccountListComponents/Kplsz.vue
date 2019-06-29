<template>
  <div class="account-list__item">
    <div class="account-list__item--body">
      <div class="kpls-table--classify">
        <div class="kpls-table--classify-item electronic" @click='toggleInvoce("electronic")'>电子发票</div>
        <div class="kpls-table--classify-item">|</div>
        <div class="kpls-table--classify-item paper" @click='toggleInvoce("paper")'>纸质发票发票</div>
      </div>
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
          label="发票抬头"
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
          label="邮箱"
          min-width="150">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.email }}</span></template>
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
    name: 'account-list-fhwl',
    data () {
      return {
        invoiceClassify: 'electronic',
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
            email: '21219121@sina.com',
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
            email: '21219121@sina.com',
            cellphone: '12312345678'
          }
        ],
        isAllSelect: false,
        currentPage: 1,
        total: 100
      }
    },
    methods: {
      toggleInvoce (classify) {
        let target = window.event.target
        target.classList.add('active')
        this.invoiceClassify = classify
      },
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

<style lang="less" scoped>
  .kpls-table--classify {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-bottom: 1px solid #ebeef5;
    .kpls-table--classify-item {
      margin: 10px;
    }
  }
</style>

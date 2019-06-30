<template>
  <div class="account-list__item">
    <div class="account-list__item--body">
      <div class="kpls-table--classify">
        <sub-nav v-model="selected" :sub-list='subList'></sub-nav>
      </div>
      <component :is='selected'></component>
      <!-- <el-table
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
      </el-table> -->
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
  import subNav from '../SubNav_comp'
  import dzfp from './KplsComps/Dzfp'
  import zzfp from './KplsComps/Zzfp'
  export default {
    name: 'account-list-fhwl',
    components: {
      'sub-nav': subNav
    },
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
        total: 100,
        selected: dzfp,
        subList: [
          {name: '纸质发票', component: zzfp},
          {name: '电子发票', component: dzfp}
        ]
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

<style lang="less">
  .kpls-table--classify {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
    .sub-nav {
      padding: 0;
      height: 45px;
      .sub-nav__item {
        margin-right: 0 !important;
        padding: 0 50px;
        border: none !important;
        border-left: 1px solid #363f51 !important;
        &:first-child {
          border-left: 1px solid rgba(0, 0, 0, 0) !important;
        }
      }
    }
  }
</style>

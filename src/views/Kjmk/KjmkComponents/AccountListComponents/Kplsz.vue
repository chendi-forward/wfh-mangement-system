<template>
  <div class="account-list__item">
    <div class="account-list__item--body">
      <div class="kpls-table--classify">
        <sub-nav v-model="selected" :sub-list='subList' class="not-border"></sub-nav>
        <div class="kpls-table--search">
          <span>流水搜索：</span>
          <el-input class="kpls-table__input" placeholder="请输入用户ID/发票票号..." prefix-icon="el-icon-search" v-model="searchVal">
          </el-input>
          <el-button size="small" plain @click="search">搜索</el-button>
        </div>
      </div>
      <component :is='selected' :table-data='tableData' @handle-selection-change='handleSelectionChange' @handle-delete='handleDelete' @handle-edit='handleEdit'></component>
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
    <dialog-Com width='500px' v-model='dialogFlag' title='编辑开票' @sure-save='sureSave' @cancle-save='cancleSave' :is-show-footer='invoiceInfo.state !== 1'>
      <div class="add-authority">
        <el-form ref="form" :model="form" label-position="left" label-width="90px">
          <el-form-item label="发票类型：">
            <span>电子发票</span>
          </el-form-item>
          <el-form-item label="发票抬头:">
            <span>{{invoiceInfo.invoice_title}}</span>
          </el-form-item>
          <el-form-item label="商品明细:">
            <p class="form-p" v-for="(item, i) in invoiceInfo.order_detail" :key="i"><span>{{item.goods_title}}</span> <span>x{{item.count}}</span></p>
          </el-form-item>
          <el-form-item label="邮箱地址:">
            <span>{{invoiceInfo.address}} </span>
          </el-form-item>
          <el-form-item label="发票号码:" prop="invoice_num" :rules="rules.required">
            <el-input v-model='form.invoice_num'></el-input>
          </el-form-item>
          <el-form-item label="" :is-show-footer='invoiceInfo.state === 1'>
            <span style="color: #FF4B57">开票成功！</span>
          </el-form-item>
        </el-form>
      </div>
    </dialog-Com>
  </div>
</template>

<script>
import subNav from 'COMPONENTS/SubNav_comp'
import dzfp from './KplsComps/Dzfp'
import zzfp from './KplsComps/Zzfp'
import Pagination from 'COMPONENTS/Pagination'
import DialogCom from 'COMPONENTS/DialogCom'
import { tableToExcel } from 'COMMONS/util.js'

export default {
  name: 'account-list-fhwl',
  components: {
    'sub-nav': subNav,
    'my-pagination': Pagination,
    'dialog-Com': DialogCom
  },
  data() {
    return {
      invoiceClassify: 'electronic',
      tableData: [],
      selected: dzfp,
      subList: [
        { name: '电子发票', component: dzfp },
        // { name: '纸质发票', component: zzfp },
      ],
      searchVal: '',
      total: 0,
      currentPage: 1,
      pageCount: 10,
      multipleSelection: [], // 勾选的项
      // 编辑弹窗
      dialogFlag: false,
      form: {
        invoice_num: ''
      },
      rules: {
        required: [{ required: true, message: '该项为必填项' }]
      },
      invoiceInfo: {},
      editInvoiceId: ''
    }
  },
  created() {
    this.getData()
  },
  watch: {
    selected(val) {
      this.currentPage = 1
      this.multipleSelection = []
      this.searchVal = ''
      this.getData()
    }
  },
  methods: {
    toggleInvoce(classify) {
      let target = window.event.target
      target.classList.add('active')
      this.invoiceClassify = classify
    },
    handleEdit(invoice_id) {
      const params = {
        invoice_id: invoice_id
      }
      this.dialogFlag = true
      this.$get('/accountant/invoice_detail', params).then(res => {
        this.invoiceInfo = res.data
        this.form.invoice_num = this.invoiceInfo.invoice_num
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    search() {
      this.currentPage = 1
      this.getData()
    },
    sureSave() {
      this.form.invoice_num
      const params = {
        invoice_id: this.invoiceInfo.invoice_id,
        state: 1,
        invoice_num: this.form.invoice_num
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('/accountant/update_invoice', params).then(res => {
            this.dialogFlag = false
            this.cancleSave()
            this.getData()
          })
        }
      })
    },
    cancleSave() {
      this.invoiceInfo = {}
      this.form.invoice_num = ''
    },
    exportFn() {
      let params = {
        search: this.searchVal,
        is_e_invoice: 0,
        page_count: 10000,
        current_page: 1
      }
      if (this.selected === dzfp) {
        params.is_e_invoice = 1
      } else {
        params.is_e_invoice = 0
      }
      let map = [
        { name: 'add_time', value: '申请时间' },
        { name: 'state', value: '状态' },
        { name: 'user_id', value: '用户ID' },
        { name: 'nickname', value: '昵称' },
        { name: 'goods_title', value: '商品名称' },
        { name: 'goods_count', value: '数量' },
        { name: 'invoice_title', value: '发票抬头' },
        { name: 'tin_number', value: '公司税号' },
        { name: 'recipient', value: '收件人' },
        { name: 'address', value: '邮箱' },
        { name: 'tel', value: '联系电话' }
      ]
      this.$get('/accountant/invoice_info_list', params).then(res => {
        let tableData = res.data.data_list.map(item => {
          return {
            ...item,
            state: item.state === 0 ? '未开票' : '已开票'
          }
        })
        tableToExcel({
          name: '开票流水账.xlsx',
          data: tableData,
          map
        })
      })
    },
    deleteMany() {
      if (!this.multipleSelection.length) return
      let ids = this.multipleSelection.map(item => item.invoice_id)
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
        invoice_id: ids
      }
      this.$post('/accountant/delete_invoice', params)
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
      let params = {
        search: this.searchVal,
        is_e_invoice: 0,
        page_count: this.pageCount,
        current_page: this.currentPage
      }
      if (this.selected === dzfp) {
        params.is_e_invoice = 1
      } else {
        params.is_e_invoice = 0
      }
      this.$get('/accountant/invoice_info_list', params).then(res => {
        this.total = res.data.count
        this.tableData = res.data.data_list.map(item => {
          return {
            ...item,
            state: item.state === 0 ? '未开票' : '已开票'
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.kpls-table--classify {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  padding-right: 30px;
  border-bottom: 1px solid #ebeef5;
}
.kpls-table__input {
  margin-right: 20px;
}
.kpls-table--search {
  display: flex;
  width: 35%;
  align-items: center;
  white-space: nowrap;
}
.form-p {
  margin: 0;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>

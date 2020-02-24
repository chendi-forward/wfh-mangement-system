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
      <component :is='selected' :table-data='tableData' @handle-selection-change='handleSelectionChange'></component>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="small" @click="exportFn">导出</el-button>
        <el-button size="small" type="danger" @click="deleteMany">批量删除</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total">
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import subNav from 'COMPONENTS/SubNav_comp'
import dzfp from './KplsComps/Dzfp'
import zzfp from './KplsComps/Zzfp'
import Pagination from 'COMPONENTS/Pagination'

export default {
  name: 'account-list-fhwl',
  components: {
    'sub-nav': subNav,
    'my-pagination': Pagination
  },
  data() {
    return {
      invoiceClassify: 'electronic',
      tableData: [],
      selected: zzfp,
      subList: [
        { name: '纸质发票', component: zzfp },
        { name: '电子发票', component: dzfp }
      ],
      searchVal: '',
      total: 0,
      currentPage: 1,
      pageCount: 10,
      multipleSelection: [] // 勾选的项
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
    editHandle(item) {
      // ..
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    search() {
      this.currentPage = 1
      this.getData()
    },
    exportFn() {
      // ..
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
      }).then(() => {
        return this.deleteData(ids)
      }).then(res => {
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
      this.$get('/accountant/delete_invoice', params)
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
    submit() {
      // ..
    },
    getData() {
      let params = {
        search: '',
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
</style>

<template>
  <div class="account-list__item">
    <div class="account-list__item--body">
      <div class="kpls-table--classify">
        <sub-nav v-model="selected" :sub-list='subList' class="not-border"></sub-nav>
        <div class="kpls-table--search">
          <span>流水搜索：</span>
           <el-input
              class="kpls-table__input"
              placeholder="请输入用户ID/发票票号..."
              prefix-icon="el-icon-search"
              v-model="searchVal">
            </el-input>
          <el-button size="mini" class="success-btn" @click="search">搜索</el-button>
        </div>
      </div>
      <component :is='selected'></component>
    </div>
    <div class="account-list__item--footer">
      <!-- <div class="selectAll-wrap">
        <el-button size="mini" class="success-btn" @click="exportFn">导出</el-button>
        <el-button size="mini" @click="deleteMany">批量删除</el-button>
      </div> -->
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
  import subNav from 'COMPONENTS/SubNav_comp'
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
        ],
        searchVal: ''
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
      search () {
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

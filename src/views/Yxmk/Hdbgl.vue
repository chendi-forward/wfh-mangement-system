<template>
  <div class="yxmk-hdbgl">
    <yxmk-head :info='info'></yxmk-head>
    <div class="yhqgl-body">
      <div class="yhqgl-body__head">
        <div class="body__head--title">活动表</div>
        <div>
          <el-button size="small" @click="showCreateItem">创建</el-button>
        </div>
      </div>
      <div class="yhqgl-body__content">
        <el-table class="ssxd-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="活动编号" align='center' prop="active_no" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column align='center' min-width="150" prop="active_name" label="活动名称">
          </el-table-column>
          <el-table-column align='center' label="折扣比例（%）" prop="discount_percent" width="120">
          </el-table-column>
          <el-table-column align='center' label="扣减金额（元）" prop="discount_money" width="140">
          </el-table-column>
          <el-table-column align='center' width="170" prop="start_time" label="开始时间">
          </el-table-column>
          <el-table-column align='center' width="170" prop="end_time" label="结束时间">
          </el-table-column>
          <el-table-column align='center' label="状态" prop="state" width="80">
          </el-table-column>
          <el-table-column label="操作" align='center' width="120">
            <template slot-scope="scope">
              <el-button plain size='small' icon="el-icon-edit" @click='editHandle(scope.row)'></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="ssxd-footer">
          <div class="selectAll-wrap">
            <el-button size="small" @click="deleteClickMulti">删除</el-button>
          </div>
          <div class="page-wrap">
            <my-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="currentPage" :total="total">
            </my-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="yxmk-setting" v-if='isShowSetting'>
      <hdb-setting @hide-setting="hideSetting" :action='action' :activeId='active_id'></hdb-setting>
    </div>
  </div>
</template>

<script>
import Pagination from 'COMPONENTS/Pagination'
import YxmkHead from './CommonComponents/YxmkHead'
import HdbSetting from './YxmkSetting/HdbSetting'
import { addActive, getActiveList, getActiveDetail, updateActive, deleteActive } from 'API/Yxmk'

export default {
  name: 'yxmk-hdb',
  components: {
    'yxmk-head': YxmkHead,
    'my-pagination': Pagination,
    'hdb-setting': HdbSetting
  },
  data() {
    return {
      active_id: '',
      total: 100,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      isShowSetting: false,
      action: 'add',
      active_id_data: [],
      info: {
        active: 0,
        coupon: 0
      }
    }
  },
  methods: {
    getActiveData() {
      let data = {
        page_count: this.pageSize,
        current_page: this.currentPage
      }
      getActiveList(data).then(res => {
        if (res.message === 'ok') {
          this.tableData = res.data.data_list.map(item => {
            return {
              ...item,
              discount_percent: item.discount_type === '折扣' ? item.discount_num : '',
              discount_money: item.discount_type === '折扣' ? '' : item.discount_num
            }
          })
          this.total = res.data.count
        }
      })
    },
    showCreateItem() {
      this.action = 'add'
      this.isShowSetting = true
    },
    hideSetting() {
      this.isShowSetting = false
      this.getActiveData()
    },
    handleSizeChange(n) {
      this.pageSize = n
      this.getActiveData()
    },
    handleCurrentChange(n) {
      this.currentPage = n
      this.getActiveData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteClickMulti() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: '请选择活动',
          type: 'error'
        })
      } else {
        let ids = this.multipleSelection.map(item => item.active_id)
        let names = this.multipleSelection.map(item => item.active_name)
        this.handleDelete(ids, names)
        let obj = {
          active_id: this.active_id_data.join(',')
        }
        this.handleDelete(ids, names)
      }
    },
     handleDelete(_ids, _names) {
      let names = _names.join(',')
      let ids = _ids.join(',')
      this.$confirm(`确定要删除“${names}”吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteActive({active_id: ids})
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getActiveData()
        })
    },
    editHandle(row) {
      this.action = 'edit'
      this.isShowSetting = true
      this.active_id = row.active_id
    },
    getCount() {
      this.$get('/marketing/discounts_info').then(res => {
        this.info = res.data
      })
    }
  },
  created() {
    this.getActiveData()
    this.getCount()
  }
}
</script>

<style lang="less" scoped>
.yxmk-hdbgl {
  position: relative;
  .yhqgl-body,
  .yhqgl-footer {
    .yhqgl-body__head {
      height: 65px;
      line-height: 65px;
      background-color: #f7f8f9;
      display: flex;
      padding: 0 30px 0 45px;
      border-radius: 6px 6px 0 0;
      .body__head--title {
        flex: 1;
      }
      button {
        color: #fff;
        background: #ff4b57;
      }
    }
  }
  .yhqgl-body {
    margin-bottom: 15px;
  }
  .yxmk-setting {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background-color: #f1f3f5;
    // z-index: 3;
  }
  .yhqgl-body__content {
    .ssxd-footer {
      button {
        width: 70px;
        height: 30px;
        border: 1px solid rgba(150, 161, 182, 1);
        background: #fff;
      }
    }
    .el-table__row {
      button {
        border: 0px solid #000;
        color: #ff4b57;
        font-size: 18px;
      }
    }
    .el-table__row:hover {
      button {
        background: #f1f1f1;
      }
    }
  }
}
</style>

<template>
  <div>
    <div
      v-if="!isShowSetting"
      class="find-active"
    >
      <div class="newMan-content">
        <div class="con-num">
          活动搜索：
        </div>
        <div class="con-search">
          <el-input
            placeholder="请输入历史内容关键字..."
            v-model="searchVal"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button
            type="danger"
            size="mini"
            @click="search"
          >搜索</el-button>
        </div>
        <div class="con-new">
          <el-button
            type="danger"
            @click="showSetting"
            size="mini"
          >新建</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          row-key="active_id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="内容"
            min-width='300'
          >
            <template slot-scope="scope">
              <div class="con-box">
                <div class="con-img">
                  <img :src="base_url + scope.row.cover_pic" alt="" >
                </div>
                <div class="con-text">
                  {{ scope.row.title }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="label"
            label="标签类别"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="发布时间"
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop='status'
            label="状态"
            width="120"
          >
          </el-table-column>
          <el-table-column
            width="190"
            label="排序"
          >
          <template slot-scope="scope">
            <div class="order-con">
              <el-button
                size="mini"
                type="danger"
                @click="handleSortUp(scope.$index, scope.row)"
              >上移</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleSortDown(scope.$index, scope.row)"
              >下移</el-button>
            </div>
          </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row, scope.$index)" icon="el-icon-edit" size="small"></el-button>
            <el-button @click="deleteClick(scope.row, scope.$index)" icon="el-icon-delete" size="small"></el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="ssxd-footer">
        <div class="selectAll-wrap">
          <el-button
            size="mini"
            class="success-btn"
            @click="deleteClickMulti"
          >删除</el-button>
        </div>
        <div class="page-wrap" v-show="total">
          <my-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total"
          >
          </my-pagination>
        </div>
      </div>
    </div>
    <div v-else class="content-setting" >
      <content-setting @hide-setting='hideSetting' :detail='detail'></content-setting>
    </div>
  </div>
</template>

<script>
import ContentSetting from '../BasicComponents/ContentSetting'
import Pagination from 'COMPONENTS/Pagination'
import moment from 'moment'
import * as commonsConfig from 'COMMONS/commonsConfig.js'
const base_url = commonsConfig.BASE_URL

export default {
  name: 'fxy',
  components: {
    'content-setting': ContentSetting,
    'my-pagination': Pagination
  },
  data() {
    return {
      base_url: base_url,
      searchVal: '', // 搜索关键字
      tableData: [],
      isShowSetting: false, // 是否显示内容设置页
      detail: {},
      total: 0,
      page_count: 10,
      current_page: 1
    }
  },
  created() {
    this.getData()
  },
  methods: {
    search () {
      this.current_page = 1
      this.getData()
    },
    deleteClickMulti () {
      if (!this.multipleSelection.length) return
      let ids = this.multipleSelection.map(item => item.active_id)
      let names = this.multipleSelection.map(item => item.title)
      this.handleDelete(ids, names)
    },
    deleteClick (row, index) {
      let current = this.tableData[index]
      let ids = [current.active_id]
      let names = [current.title]
      this.handleDelete(ids, names)
    },
    handleDelete (_ids, _names) {
      let names = _names.join(',')
      let ids = _ids.join(',')
      this.$confirm(`确定要删除“${names}”吗？`, '提示', {
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
    handleEdit(row, index) {
      this.detail = row
      this.isShowSetting = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    showSetting() {
      this.isShowSetting = true
    },
    hideSetting(v) {
      this.isShowSetting = false
      if (v.action !== 'cancel') {
        this.getData()
      }
    },
    handleSortUp(index, row) {
      let params = {
        active_id: row.active_id,
        order: 'up'
      }
      this.updateData(params)
    },
    handleSortDown(index, row) {
      let params = {
        active_id: row.active_id,
        order: 'down'
      }
      this.updateData(params)
    },
    updateData(params) {
      return this.$post('/content/active/update_goods', params)
      .then(res => {
        this.getData()
        return res
      })
      .catch(err => {
        return Promise.reject()
      })
    },
    handleSizeChange (v) {
      this.page_count = v
      this.current_page = 1
      this.getData()
    },
    handleCurrentChange (v) {
      this.current_page = v
      this.getData()
    },
    deleteData (ids) {
      this.$get('/content/active/del_goods', {active_id: ids})
      .then(res => {
        this.getData()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '请求出错!'
        })
      })
    },
    getData() {
      let params = {
        page_count: this.page_count,
        current_page: this.current_page
      }
      if (!!this.searchVal) params.search = this.searchVal
      this.$get('/content/active/get_goods', params).then(res => {
        if (res.message === 'ok') {
          this.total = res.data.count
          let result = res.data.content
          this.tableData = result.map(item => {
            return {
              ...item,
              status: item.state === 1 ? '显示' : '隐藏',
              time: item.time ? moment(item.time).format('YYYY-MM-DD HH:mm:ss') : '立即发布'
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.el-tabs--border-card {
  box-shadow: none;
}

.find-active {
  width: 100%;
  height: 100%;
  .newMan-content {
    display: flex;
    padding: 25px;
    // justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 0 0 6px 6px;
    .con-search {
      flex: 1;
      display: flex;
      align-items: center;
      .el-input {
        width: 400px;
        height: 40px;
        margin-right: 30px;
      }
      .el-button {
        width: 70px;
        height: 30px;
        padding: 0;
      }
    }
    .con-new {
      .el-button {
        padding: 0;
      }
      button {
        background: #fe3a56;
        width: 70px;
        height: 30px;
        font-size: 15px;
      }
    }
  }
  .table-content {
    width: 100%;
    // height: calc(~'100% - 180px');
    margin-top: 20px;
    // overflow: hidden;
    border-radius: 6px;
    // padding: 10px;
    background: #fff;
    .el-table {
      border-radius: 6px;
    }
    .con-icon {
      font-size: 20px;
      i {
        margin-left: 3px;
      }
      .el-icon-edit {
        color: #ff4b57;
      }
    }
    .order-con {
      padding: 0;
      display: flex;
      .el-button {
        width: 65px;
        height: 30px;
        padding: 0;
        border: 1px solid rgba(255, 75, 87, 1);
        color: #ff4b57;
        background: rgba(255, 224, 226, 1);
      }
    }
    .el-table {
      td {
        border: none;
      }
    }
    .con-box {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .con-img {
      width: 170px;
      height: 80px;
      img {
        height: 100%;
      }
    }
    .con-text {
      margin-left: 10px;
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .table-footer {
    width: calc(~'100% - 20px');
    height: 120px;
    border-radius: 0 0 6px 6px;
    background: #fff;
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    .el-button {
      width: 80px;
      height: 30px;
      padding: 0;
    }
    .el-pagination {
      position: absolute;
      right: 10px;
    }
  }
}
</style>

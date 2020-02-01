<template>
  <div class="ssxd">
    <div class="ssxd-header">
      <form class="ssxd-form">
        <div class="ssxd-form-item">
          <label class="ssxd-form--label">
            <span>触发状态</span>
            <span>：</span>
          </label>
          <el-radio-group class="ssxd-form--radio" v-model="formSsxd.touchStatus" :disabled='!canEdit'>
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </div>
        <div class="ssxd-form-item">
          <label class="ssxd-form--label">
            <span>脚本运行</span>
            <span>：</span>
          </label>
          <el-radio-group class="ssxd-form--radio" v-model="formSsxd.scriptStatus" :disabled='!canEdit'>
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <label class="ssxd-form--label">
            <span>脚本1小时内随机播放产生次数</span>
            <span>：</span>
          </label>
          <el-input
            :disabled='!canEdit'
            class="ssxd-form--input"
            v-model="formSsxd.count"
            placeholder='输入内容...'>
          </el-input>
          <div class="ssxd-form--btn">
            <el-button size="small" type="success" @click="edit" v-show="!canEdit">编辑</el-button>
            <el-button size="small" type="success" @click="submit" v-show="canEdit">确定</el-button>
          </div>
        </div>
      </form>
    </div>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
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
          label="注册时间"
          align='center'
          prop="add_time"
         >
        </el-table-column>
        <el-table-column
          align='center'
          prop="nickname"
          label="昵称">
        </el-table-column>

      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="small" type="danger" @click="deleteClickMulti">删除</el-button>
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

export default {
  name: 'ssxd',
  components: {
    'my-pagination': Pagination
  },
  data () {
    return {
      formSsxd: {
        touchStatus: 1,
        scriptStatus: 1,
        count: 10
      },
      tableData: [
      ],
      page_count: 10,
      current_page: 1,
      total: 0,
      canEdit: false
    }
  },
  created() {
    this.getSettings()
    this.getData()
  },
  methods: {
    edit () {
      this.canEdit = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteClickMulti() {
      if (!this.multipleSelection.length) return
      let ids = this.multipleSelection.map(item => item.id)
      this.deleteHandle(ids)
    },
    deleteHandle (_ids) {
      let ids = _ids.join(',')
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
    submit () {
      let scriptParams = {
        method: 'script',
        count: +this.formSsxd.count,
        state: this.formSsxd.scriptStatus
      }
      let triggerParams = {
        method: 'trigger',
        state: this.formSsxd.touchStatus
      }
      this.editSettings(scriptParams)
      this.editSettings(triggerParams)
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
    deleteData(ids) {
      let params = {
        id: ids
      }
      this.$get('/broadcast/delete_content', params)
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
    // 修改设置信息 
    editSettings(data) {
      let params = {
        type: 'register',
        method: data.method,
        count: data.count,
        state: data.state
      }
      this.$get('/broadcast/update_setting', params)
      .then(res => {
        if (res.message === 'ok') {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.canEdit = false
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 获取数据
    getData () {
      let params = {
        type: 'register',
        page_count: this.page_count,
        current_page: this.current_page
      }
      this.$get('/broadcast/get_content', params)
      .then(res => {
        if (res.message === 'ok') {
          this.total = res.data.count
          let result = res.data.data_list
          this.tableData = result
        }
      })
    },
    // 获取设置信息
    getSettings() {
      let params = {
        type: 'register'
      }
      this.$get('/broadcast/get_setting', params)
      .then(res => {
        if (res.message === 'ok') {
          this.formSsxd.touchStatus = res.data.trigger.state
          this.formSsxd.scriptStatus = res.data.script.state
          this.formSsxd.count = res.data.script.count
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .ssxd {
    & > div {
      background-color: #fff;
    }
    .ssxd-header {
      height: 204px;
      box-sizing: border-box;
      padding: 47px 30px 47px 60px;
      margin-bottom: 13px;
    }
    .page-wrap {
      display: flex;
    }
  }
</style>

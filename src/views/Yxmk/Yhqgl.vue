<template>
  <div class="yxmk-yhqgl">
    <yxmk-head :info='info'></yxmk-head>
    <div class="yhqgl-body">
      <div class="yhqgl-body__head">
        <div class="body__head--title">优惠券表</div>
        <div class="body__head--btn">
          <el-button type="success" @click="showCreateItem('普通')" size="small">创建</el-button>
        </div>
      </div>
      <div class="yhqgl-body__content">
        <el-table class="ssxd-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="优惠券编号" align='center' prop="coupon_no" min-width="120">
          </el-table-column>
          <el-table-column align='center' min-width="150" prop="coupon_name" label="优惠券名称">
          </el-table-column>
          <el-table-column align='center' label="数量" prop="coupon_num" width="90">
          </el-table-column>
          <el-table-column align='center' label="折扣比例（%）" prop="discount_percent" width="120">
          </el-table-column>
          <el-table-column align='center' label="扣减金额（元）" prop="discount_money" width="140">
          </el-table-column>
          <el-table-column align='center' width="170" prop="start_time" label="起始时间">
          </el-table-column>
          <el-table-column align='center' width="170" prop="end_time" label="结束时间">
          </el-table-column>
          <el-table-column align='center' label="状态" prop="state" width="80">
          </el-table-column>
          <el-table-column label="操作" align='center' width="120">
            <template slot-scope="scope">
              <el-button size="small" icon="el-icon-edit" @click='editHandle(scope.row)'></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="ssxd-footer">
          <div class="selectAll-wrap">
            <el-button size="small" type="danger" @click="deleteClickMulti">下线</el-button>
          </div>
          <div class="page-wrap">
            <my-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total">
            </my-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="yhqgl-footer">
      <div class="yhqgl-body__head">
        <div class="body__head--title">新手优惠券设置</div>
        <div class="body__head--btn">
          <el-radio-group v-model="newerSetting[0].discount_type" v-show="isEdit" class="body__head--btn--sale">
            <el-radio label="折扣">按比例</el-radio>
            <el-radio label="金额">按金额</el-radio>
          </el-radio-group>
          <el-button v-show="isEdit" type="success" @click="handleSaveNew" size="small">保存</el-button>
          <el-button v-show="isEdit" @click="handleCancelNew" size="small">取消</el-button>
          <el-button v-show="!isEdit" type="success" @click="handleEditNew" size="small">编辑</el-button>
        </div>
      </div>
      <div class="yhqgl-body__content">
        <el-table class="ssxd-table" ref="multipleTable" :data="newerSetting" tooltip-effect="dark" style="width: 100%">
          <el-table-column align='center' min-width="150" label="优惠券名称">
            <template slot-scope="scope">{{ scope.row.coupon_name }}</template>
          </el-table-column>
          <el-table-column align='center' label="数量" min-width="120">
            <template slot-scope="scope">
              <span v-show="!isEdit">{{ scope.row.coupon_num }}</span>
              <el-input type="number" v-show="isEdit" v-model.number="scope.row.coupon_num"></el-input>
            </template>
          </el-table-column>
          <el-table-column align='center' label="折扣比例（%）" min-width="120">
            <template slot-scope="scope">
              <span v-show="!isEdit || newerSetting[0].discount_type !== '折扣'">{{ scope.row.discount_percent }}</span>
              <el-input type="number" v-show="isEdit && newerSetting[0].discount_type === '折扣'" v-model.number="scope.row.discount_percent"></el-input>
            </template>
          </el-table-column>
          <el-table-column align='center' label="扣减金额（元）" min-width="120">
            <template slot-scope="scope">
              <span v-show="!isEdit || newerSetting[0].discount_type !== '金额' ">{{ scope.row.discount_money }}</span>
              <el-input type="number" v-show="isEdit && newerSetting[0].discount_type === '金额'" v-model.number="scope.row.discount_money"></el-input>
            </template>
          </el-table-column>
          <el-table-column align='center' label="生效天数" min-width="120">
            <template slot-scope="scope">
              <span v-show="!isEdit">{{ scope.row.days }}</span>
              <el-input type="number" v-show="isEdit" v-model.number="scope.row.days"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="状态" align='center' min-width="160">
            <template slot-scope="scope">
              <el-radio-group :disabled='!isEdit' v-model="scope.row.is_close" @change="val => changeClose(val, scope.row)">
                <el-radio :label="0">开启</el-radio>
                <el-radio :label="1">关闭</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="yxmk-setting" v-if='isShowSetting'>
      <yhq-setting @hide-setting="hideSetting" :action='action' :type='type' ref="yhqSetting" :coupon_id="coupon_id"></yhq-setting>
    </div>
  </div>
</template>

<script>
import Pagination from 'COMPONENTS/Pagination'
import YxmkHead from './CommonComponents/YxmkHead'
import YhqSetting from './YxmkSetting/YhqSetting'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'yxmk-yhqgl',
  components: {
    'my-pagination': Pagination,
    'yxmk-head': YxmkHead,
    'yhq-setting': YhqSetting
  },
  data() {
    return {
      tableData: [],
      newerSetting: [{}],
      total: 0,
      isShowSetting: false,
      action: 'add',
      type: '普通',
      coupon_id: '',
      multipleSelection: [],
      info: {
        active: 0,
        coupon: 0
      },
      // 新手优惠券
      isEdit: false
    }
  },
  created() {
    this.getData('普通')
    this.getData('新手')
    this.getCount()
  },
  methods: {
    showCreateItem(type) {
      this.action = 'add'
      this.isShowSetting = true
      this.type = type
    },
    hideSetting(val) {
      this.isShowSetting = false
      if (Object.keys(val) && val.state === 'success') {
        this.getData(val.type)
      }
    },
    editHandle(row) {
      this.action = 'edit'
      this.isShowSetting = true
      this.coupon_id = row.coupon_id
    },
    handleSizeChange(v) {
      this.page_count = v
      this.current_page = 1
      this.getData('普通')
    },
    handleCurrentChange(v) {
      this.current_page = v
      this.getData('普通')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteClickMulti() {
      if (!this.multipleSelection.length) return
      let ids = this.multipleSelection.map(item => item.coupon_id)
      let names = this.multipleSelection.map(item => item.coupon_name)
      this.handleDelete(ids, names)
    },
    handleDelete(_ids, _names) {
      let names = _names.join(',')
      let ids = _ids.join(',')
      this.$confirm(`确定要下线“${names}”吗？`, '提示', {
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
            message: '下线成功!'
          })
        })
    },
    changeClose(val, row) {
      this.$post('/marketing/close_coupon', { coupon_id: '' + row.coupon_id, is_close: '' + val }).then(res => {
        console.log(res)
      })
    },
    deleteData(ids) {
      this.$post('/marketing/delete_coupon', { coupon_id: ids })
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

    // 点击编辑新用户按钮
    handleEditNew() {
      this.cloneNewerSetting = _.cloneDeep(this.newerSetting)
      this.isEdit = true
    },
    // 编辑新用户
    handleSaveNew() {
      this.isEdit = false
      let params = {
        ...this.newerSetting[0],
        coupon_type: '新手',
        discount_num: this.newerSetting[0].discount_type === '金额' ? this.newerSetting[0].discount_money : this.newerSetting[0].discount_percent,
        start_time: moment().format('YYYY-MM-DD 00:00:00'),
        end_time: moment()
          .add(this.newerSetting[0].days, 'days')
          .format('YYYY-MM-DD 00:00:00')
      }
      console.log('============>: handleSaveNew -> params', params)
      this.$post('/marketing/update_coupon', params).then(res => {
        console.log('============>: handleSaveNew -> res', res)
      })
      // this.$post
    },
    // 取消编辑新用户
    handleCancelNew() {
      this.isEdit = false
      this.newerSetting = this.cloneNewerSetting
    },

    getData(coupon_type) {
      let params = {
        page_count: this.page_count,
        current_page: this.current_page,
        coupon_type
      }
      if (coupon_type === '新手') {
        params.current_page = 1
        params.page_count = 1000
      }
      this.$get('/marketing/get_coupon_list', params).then(res => {
        if (res.message === 'ok') {
          if (coupon_type === '新手') {
            this.newerSetting = res.data.data_list.map(item => {
              let days = moment(item.end_time) - moment(item.start_time)
              return {
                ...item,
                days: moment.duration(days).days(),
                discount_percent: item.discount_type === '折扣' ? item.discount_num : '',
                discount_money: item.discount_type === '折扣' ? '' : item.discount_num
              }
            })
          } else {
            this.tableData = res.data.data_list.map(item => {
              return {
                ...item,
                discount_percent: item.discount_type === '折扣' ? item.discount_num : '',
                discount_money: item.discount_type === '折扣' ? '' : item.discount_num
              }
            })
            this.total = res.data.count
          }
        }
      })
    },
    getCount() {
      this.$get('/marketing/discounts_info').then(res => {
        this.info = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.yxmk-yhqgl {
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
}
</style>

<style lang='less'>
.el-tabs--border-card {
  box-shadow: none;
}
.yhqgl-body__content {
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
.body__head--btn--sale {
  margin-right: 30px;
}
</style>

<template>
  <div class="table-box">
    <div class="filtrate commom-card flex-item-center">
      <span class="lebel">订单搜索：</span>
      <el-input placeholder="输入订单编号/商品编号..." v-model="searchOrder" prefix-icon="el-icon-search">
      </el-input>
      <span class="lebel">用户搜索：</span>
      <el-input placeholder="输入用户ID/昵称..." v-model="searchUser" prefix-icon="el-icon-search">
      </el-input>
      <span class="lebel">时间查找：</span>
      <el-date-picker v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="danger" size="small" plain @click="searchData">搜索</el-button>
    </div>
    <el-table ref="multipleTable" stripe align='center' :data="data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="order_id" align='center' label="订单编号" width="100">
      </el-table-column>
      <el-table-column prop='nickname' label="用户昵称" align='center' min-width="100">
      </el-table-column>
      <el-table-column prop="nickname" label="用户ID" align='center' width="100">
      </el-table-column>
      <el-table-column prop='time' align='center' label="评价时间" width="100">
      </el-table-column>
      <!-- <el-table-column
            prop='province'
            align='center'
            label="商品名称">
            </el-table-column> -->
      <el-table-column prop='progress' align='center' width="150" label="产品口味">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.taste_score" disabled :colors="['#FF4B57', '#FF4B57', '#FF4B57']" disabled-void-color="#A6AFBF">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop='level' align='center' label="服务态度" width="150">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.service_score" disabled :colors="['#FF4B57', '#FF4B57', '#FF4B57']" disabled-void-color="#A6AFBF">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop='level' align='center' label="物流服务" width="150">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.express_score" disabled :colors="['#FF4B57', '#FF4B57', '#FF4B57']" disabled-void-color="#A6AFBF">
          </el-rate>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            user_id: 'WFH001',
            nickname: 'WFH001',
            gender: 'WFH001',
            label: '新品推广',
            add_time: '王小虎',
            province: '退款',
            progress: '通过申请',
            level: '2019-05-03 17:33:33',
            ydh: '/',
            balance: 1444,
            invite_code: '23131',
            order: 12313,
            deal_money: 321341,
            expend: '111'
          }
        ]
      }
    }
  },
  data() {
    return {
      searchOrder: '',
      searchUser: '',
      time: [
        moment()
          .week(moment().week())
          .startOf('week')
          .format('YYYY-MM-DD'),
        moment()
          .week(moment().week())
          .endOf('week')
          .format('YYYY-MM-DD')
      ],
      rate1: 4
    }
  },
  methods: {
    searchData() {
      let data = {
        order_id: this.searchOrder,
        user_info: this.searchUser,
        start_time: moment(this.time[0]).format('YYYY-MM-DD'),
        end_time: moment(this.time[1]).format('YYYY-MM-DD')
      }
      this.$emit('searchParams', data)
    },
    handleSelectionChange(n) {
      this.$emit('deleteitem', n)
    }
  }
}
</script>

<style lang="less" scoped>
.table-box {
  .filtrate {
    height: 96px;
    margin-bottom: 10px;
    .lebel {
      padding-left: 20px;
      font-size: 15px;
    }
    .el-input {
      width: 200px;
    }
    .el-date-editor {
      width: 250px;
    }
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>

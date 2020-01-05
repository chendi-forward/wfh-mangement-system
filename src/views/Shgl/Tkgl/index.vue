<template>
  <div class="shgl tkgl">
    <div class="data-list">
      <div class="tab-model">
        <el-tabs v-model="currentTab" @tab-click="tabChage">
          <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.name"></el-tab-pane>
        </el-tabs>
        <!-- <div class="btn-wrap">
          <el-button size="mini" type="danger" @click="addHandle">新建</el-button>
        </div> -->
      </div>
      <el-table
        ref="multipleTable"
        stripe
        align='center'
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="user_id"
          align='center'
          label="订单编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户ID"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='add_time'
          label="昵称"
          align='center'
          min-width="100">
        </el-table-column>
        <el-table-column
          prop='gender'
          align='center'
          label="微信交易号"
          width="100">
        </el-table-column>
        <el-table-column
          align='center'
          label="状态"
          width="100">
          <template slot-scope="scope">
            {{status[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column
          prop='province'
          align='center'
          label="售后类型">
        </el-table-column>
        <el-table-column
          prop='progress'
          align='center'
          label="退款进度">
        </el-table-column>
        <el-table-column
          prop='level'
          align='center'
          label="最新操作时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop='ydh'
          align='center'
          label="退运单号"
          width="150">
        </el-table-column>
        <el-table-column
          prop='balance'
          label="商品名称"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='invite_code'
          label="数量"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='order'
          label="实付总额"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='deal_money'
          label="返利总额"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='label'
          label="退款"
          align='center'
          width="100">
        </el-table-column>
        <!-- <el-table-column align='center' label="操作" width="100">
          <template slot-scope="scope">
            <div v-show="currentTab=='0'">
              <div @click='receivingHandle(scope.row)' class="con-icon">
                <i class="el-icon-circle-check"></i>
              </div>
              <div @click='refundHandle(scope.row)' class="con-icon">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <div v-show="currentTab!='0'">
              <div @click='refundHandle(scope.row)' class="con-icon">
                <i class="el-icon-edit theme-color"></i>
              </div>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          type="expand"
          align='center'>
          <template>
            <div class="expend-wrap">
              <el-timeline v-if="currentTab == '0'">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :type="activity.type">
                  {{activity.content }}
                  <span class="my-timestamp">{{activity.timestamp}}</span>
                  <i class="el-icon-circle-check icon" :class="activity.class" @click="openDialog(activity.comIndex)"></i>
                </el-timeline-item>
              </el-timeline>
              <el-timeline v-else>
                <el-timeline-item
                  v-for="(activity, index) in activities2"
                  :key="index"
                  :type="activity.type">
                  {{activity.content }}
                  <span class="my-timestamp">{{activity.timestamp}}</span>
                  <i class="el-icon-circle-check icon" :class="activity.class" @click="openDialog(activity.comIndex)"></i>
                </el-timeline-item>
              </el-timeline>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini" v-show="currentTab == '0'">取消退款</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :currentPage="currentPage"
          :total="400">
        </my-pagination>
      </div>
    </div>
    <dialog-Com v-model='dialogFlag' :title='currentCom.name' @sure-save='sureSave' @cancle-save='cancleSave'>
      <component :is="currentCom.com"></component>
    </dialog-Com>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>

</style>

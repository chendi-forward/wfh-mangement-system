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
      <el-table ref="multipleTable" stripe align='center' :data="tableData" tooltip-effect="dark" style="width: 100%" @expand-change="expandChange" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="order_id" align='center' label="订单编号" show-overflow-tooltip width="150">
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID" align='center' width="150">
        </el-table-column>
        <el-table-column prop='nickname' label="昵称" align='center' min-width="100">
        </el-table-column>
        <el-table-column v-if="currentTab=== '3'" prop='wechat_id' align='center' label="微信交易号" width="100">
        </el-table-column>
        <el-table-column align='center' label="商品名称" width="120">
          <template slot-scope="scope">
            <el-popover placement="right" width="320" trigger="hover" @show="showGoodsName(scope.row)">
              <el-table :data="gridData">
                <el-table-column property="goods_title" label="商品名称"></el-table-column>
                <el-table-column width="90" property="goods_count" label="数量"></el-table-column>
                <el-table-column width="90" property="taste" label="口味"></el-table-column>
              </el-table>
              <el-button type="small" slot="reference">
                商品信息
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop='refund_type' align='center' label="售后类型">
        </el-table-column>
        <el-table-column prop='end_time' align='center' label="最后操作时间" width="160">
        </el-table-column>
        <el-table-column prop='express_number' align='center' label="退运单号" width="150">
        </el-table-column>
        <el-table-column prop='goods_count' label="数量" align='center' width="100">
        </el-table-column>
        <el-table-column prop='pay_money' label="实付总额" align='center' width="100">
        </el-table-column>
        <el-table-column prop='rebate_money' label="返利总额" align='center' width="100">
        </el-table-column>
        <el-table-column label="退款" align='center' width="100">
          <template slot-scope="scope">
            <b>{{scope.row.refund_money}}</b>
          </template>
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
        <el-table-column type="expand" align='center'>
          <template slot-scope="scope">
            <!-- refund_type -->
            <div class="expend-wrap">
              <el-timeline v-if="scope.row.refund_type=='只退款'">
                <el-timeline-item v-for="(activity, index) in activities2" :key="index" :type="scope.row.rstate > activity.comIndex ? activity.type : ''">
                  {{activity.content }}
                  <span class="my-timestamp" v-if='scope.row.rstate > activity.comIndex'>{{scope.row.end_time}}</span>
                  <i class="el-icon-circle-check icon" :class="scope.row.rstate > activity.comIndex ? activity.class : ''" @click="openDialog(activity.comIndex, scope.row)"></i>
                </el-timeline-item>
              </el-timeline>
              <el-timeline v-else>
                <el-timeline-item v-for="(activity, index) in activities" :key="index" :type="scope.row.rstate > index ? activity.type : ''">
                  {{activity.content }}
                  <!-- 发货/shipments_time   收货/confirm_time  确认退货/refund_time -->
                  <span class="my-timestamp" v-if='(scope.row.rstate > index) && (index == 0)'>{{scope.row.shipments_time}}</span>
                  <span class="my-timestamp" v-if='(scope.row.rstate > index) && (index == 1)'>{{scope.row.confirm_time}}</span>
                  <span class="my-timestamp" v-if='(scope.row.rstate > index) && (index == 2)'>{{scope.row.refund_time}}</span>
                  <i class="el-icon-circle-check icon" :class="scope.row.rstate > index ? activity.class : ''" @click="openDialog(activity.comIndex, scope.row)"></i>
                </el-timeline-item>
              </el-timeline>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini" v-show="currentTab == '1'" @click="cancleTuik">取消退款</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="currentPage" :total="total">
        </my-pagination>
      </div>
    </div>
    <dialog-Com :isShowFooter='false' v-model='dialogFlag' :title='currentCom.name'>
      <component :data='suredata' :is="currentCom.com" :goodsid='goodsid' @sure-save='sureSave' @cancle-save='cancleSave'></component>
    </dialog-Com>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>
</style>

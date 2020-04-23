<template>
  <div class="shgl">
    <div class="gross grid-row-3">
      <div class="commom-card">
        <div class="top-card">
          <div class="gross-num">
            <span class="num-value">{{saleHead.all_count.delivered}}</span>
            <span class="num-name">已发货总数量 </span>
          </div>
          <div class="gross-icon">
            <img :src="carIcon" alt="">
          </div>
        </div>
        <div class="bottom-card" v-if="saleHead.delivered.length">
          <div class="gross-num">
            <span class="num-value">{{saleHead.delivered[saleHeadIndex.delivered].count}}</span>
            <span class="num-name">{{saleHead.delivered[saleHeadIndex.delivered].goods_title}}</span>
          </div>
          <div class="gross-icon">
            <i class="el-icon-caret-top" @click="lunbo('delivered', 'up')"></i>
            <i class="el-icon-caret-bottom" @click="lunbo('delivered')"></i>
          </div>
        </div>
      </div>
      <div class="commom-card">
        <div class="top-card">
          <div class="gross-num">
            <span class="num-value">{{saleHead.all_count.undelivered}}</span>
            <span class="num-name">待发货总数量 </span>
          </div>
          <div class="gross-icon">
            <img :src="boxIcon" alt="">
          </div>
        </div>
        <div class="bottom-card" v-if="saleHead.undelivered.length">
          <div class="gross-num">
            <span class="num-value">{{saleHead.undelivered[saleHeadIndex.undelivered].count}}</span>
            <span class="num-name">{{saleHead.undelivered[saleHeadIndex.undelivered].goods_title}}</span>
          </div>
          <div class="gross-icon">
            <i class="el-icon-caret-top" @click="lunbo('undelivered', 'up')"></i>
            <i class="el-icon-caret-bottom" @click="lunbo('undelivered')"></i>
          </div>
        </div>
      </div>
      <div class="commom-card">
        <div class="top-card">
          <div class="gross-num">
            <span class="num-value">{{saleHead.all_count.inventory}}</span>
            <span class="num-name">库存总数量 </span>
          </div>
          <div class="gross-icon">
            <img :src="homeIcon" alt="">
          </div>
        </div>
        <div class="bottom-card" v-if="saleHead.inventory.length">
          <div class="gross-num">
            <span class="num-value">{{saleHead.inventory[saleHeadIndex.inventory].count}}</span>
            <span class="num-name">{{saleHead.inventory[saleHeadIndex.inventory].goods_title}}</span>
          </div>
          <div class="gross-icon">
            <i class="el-icon-caret-top" @click="lunbo('inventory', 'up')"></i>
            <i class="el-icon-caret-bottom" @click="lunbo('inventory')"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="filtrate commom-card flex-item-center">
      <span class="lebel">订单搜索：</span>
      <el-input placeholder="输入订单编号/商品编号..." v-model="orderParams.number" prefix-icon="el-icon-search">
      </el-input>
      <span class="lebel">用户搜索：</span>
      <el-input placeholder="输入用户ID/昵称..." v-model="orderParams.user" prefix-icon="el-icon-search">
      </el-input>
      <span class="lebel">时间查找：</span>
      <el-date-picker v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="danger" size="small" plain @click="search">搜索</el-button>
    </div>
    <div class="data-list">
      <div class="tab-model">
        <el-tabs v-model="currentTab" @tab-click="tabChage">
          <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <el-table ref="multipleTable" stripe align='center' :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="order_id" align='center' label="订单编号" width="100">
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID" align='center' width="100">
        </el-table-column>
        <el-table-column prop='nickname' label="昵称" align='center' min-width="100">
        </el-table-column>
        <el-table-column prop='wechat_id' align='center' label="微信交易号" width="100">
        </el-table-column>
        <el-table-column align='center' label="商品名称" width="120">
          <template slot-scope="scope">
            <el-popover placement="right" width="280" trigger="hover" @show="showGoodsName(scope.row.order_id)">
              <el-table :data="gridData">
                <el-table-column property="goods_title" label="商品名称"></el-table-column>
                <el-table-column width="90" property="count" label="数量"></el-table-column>
              </el-table>
              <el-button type="small" slot="reference">
                商品信息
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop='order_state' align='center' label="状态">
        </el-table-column>
        <el-table-column prop='update_time' align='center' label="最新操作时间" width="150">
        </el-table-column>
        <el-table-column prop='pay_money' label="实付总额" align='center' width="100">
        </el-table-column>
        <el-table-column prop='rebate_money' label="返利总额" align='center' width="100">
        </el-table-column>
        <el-table-column prop='address' label="收货信息" align='center' width="100">
        </el-table-column>
        <el-table-column prop='express_number' label="物流单号" align='center' width="100">
        </el-table-column>
        <el-table-column align='center' label="操作" width="150">
          <template slot-scope="scope">
            <div @click='lineItem(scope.row)' class="con-icon theme-color" title="订单详情">
              <i class="icon iconfont icon-sousuowenjian"></i>
            </div>
            <div @click='fahuo(scope.row)' class="con-icon theme-color" title="发货" v-if="scope.row.order_state=='已付款'">
              <i class="el-icon-truck" style="font-size: 20px"></i>
            </div>
            <div @click='tuikuan(scope.row)' title="退款" class="con-icon" v-if="scope.row.order_state=='已付款' || scope.row.order_state =='已发货'">
              <i class="icon iconfont icon-fanhui"></i>
            </div>
            <!-- <div @click='deleteOrder(scope.row)' class="con-icon">
            <i class="el-icon-circle-close"></i>
          </div> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini" @click="xiazai">导出数据</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="orderParams.current_page" :total="total">
        </my-pagination>
      </div>
    </div>
    <div class="manage grid-row-3">
      <div class="spgl-item">
        <div class="spgl-item--title">退款管理</div>
        <div class="spgl-item--content flex-item-center">
          <div class="manage-info">
            <span class="value">{{refundNum}}&nbsp;</span>
            <span class="name new-point">退款中</span>
          </div>
          <div class="handle">
            <i class="icon iconfont icon-list_icon" v-show='refundNum' @click="toList('shgl-tkgl')"></i>
          </div>
        </div>
      </div>
      <div class="spgl-item">
        <div class="spgl-item--title">评价管理</div>
        <div class="spgl-item--content flex-item-center">
          <div class="manage-info">
            <span class="value">{{evaluationNum}}&nbsp;</span>
            <span class="name new-point">新评价</span>
          </div>
          <div class="handle">
            <i class="icon iconfont icon-list_icon" v-show='evaluationNum' @click="toList('shgl-pjgl')"></i>
          </div>
        </div>
      </div>
    </div>
    <dialog-com v-model='dialogFlag' :title='currentCom.name' @sure-save='currentCom.handle' @cancle-save='cancleSave'>
      <component :is="currentCom.com" :data="currentCom.data" :dialogFlag="dialogFlag"></component>
    </dialog-com>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>
</style>

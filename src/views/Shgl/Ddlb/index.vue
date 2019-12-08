<template>
  <div class="shgl">
    <div class="gross grid-row-3">
      <div class="commom-card">
        <div class="top-card">
          <div class="gross-num">
            <span class="num-value">20000</span>
            <span class="num-name">已发货总数量 </span>
          </div>
          <div class="gross-icon">
            <img :src="carIcon" alt="">
          </div>
        </div>
        <div class="bottom-card">
          <div class="gross-num">
            <span class="num-value">20000</span>
            <span class="num-name">袋鼠系列蛋白粉 </span>
          </div>
          <div class="gross-icon">
            <i class="el-icon-caret-top"></i>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
      </div>
      <div class="commom-card">
        <div class="top-card">
          <div class="gross-num">
            <span class="num-value">20000</span>
            <span class="num-name">待发货总数量  </span>
          </div>
          <div class="gross-icon">
            <img :src="boxIcon" alt="">
          </div>
        </div>
        <div class="bottom-card">
          <div class="gross-num">
            <span class="num-value">20000</span>
            <span class="num-name">袋鼠系列蛋白粉 </span>
          </div>
          <div class="gross-icon">
            <i class="el-icon-caret-top"></i>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
      </div>
      <div class="commom-card">
        <div class="top-card">
          <div class="gross-num">
            <span class="num-value">20000</span>
            <span class="num-name">库存总数量 </span>
          </div>
          <div class="gross-icon">
            <img :src="homeIcon" alt="">
          </div>
        </div>
        <div class="bottom-card">
          <div class="gross-num">
            <span class="num-value">20000</span>
            <span class="num-name">袋鼠系列蛋白粉 </span>
          </div>
          <div class="gross-icon">
            <i class="el-icon-caret-top"></i>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="filtrate commom-card flex-item-center">
      <span class="lebel">订单搜索：</span>
      <el-input
        placeholder="输入订单编号/商品编号..."
        v-model="searchOrder"
        prefix-icon="el-icon-search">
      </el-input>
      <span class="lebel">用户搜索：</span>
      <el-input
        placeholder="输入用户ID/昵称..."
        v-model="searchUser"
        prefix-icon="el-icon-search">
      </el-input>
      <span class="lebel">时间查找：</span>
      <el-date-picker
        v-model="time"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="danger" size="small" plain>搜索</el-button>
    </div>
    <div class="data-list">
      <div class="tab-model">
        <el-tabs v-model="currentTab" @tab-click="tabChage">
          <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.name"></el-tab-pane>
        </el-tabs>
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
          prop='province'
          align='center'
          label="状态">
        </el-table-column>
        <el-table-column
          prop='level'
          align='center'
          label="最新操作时间"
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
          label="收货信息"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='summeroy'
          label="物流单号"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column align='center' label="操作" width="150">
          <template slot-scope="scope">
          <div @click='lineItem(scope.row)' class="con-icon theme-color">
            <i class="icon iconfont icon-sousuowenjian"></i>
          </div>
          <div @click='editHandle(scope.row)' class="con-icon theme-color">
            <i class="icon iconfont icon-xiazai"></i>
          </div>
          <div @click='editHandle(scope.row)' class="con-icon">
            <i class="icon iconfont icon-fanhui"></i>
          </div>
          <div @click='editHandle(scope.row)' class="con-icon">
            <i class="el-icon-circle-close"></i>
          </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini">取消订单</el-button>
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
    <div class="manage grid-row-3">
      <div class="spgl-item">
        <div class="spgl-item--title">退款管理</div>
        <div class="spgl-item--content flex-item-center">
          <div class="manage-info">
            <span class="value">2&nbsp;</span>
            <span class="name new-point">退款中</span>
          </div>
          <div class="handle">
            <i class="icon iconfont icon-list_icon" @click="toList('shgl-tkgl')"></i>
          </div>
        </div>
      </div>
      <div class="spgl-item">
        <div class="spgl-item--title">评价管理</div>
        <div class="spgl-item--content flex-item-center">
          <div class="manage-info">
            <span class="value">10&nbsp;</span>
            <span class="name new-point">新评价</span>
          </div>
          <div class="handle">
            <i class="icon iconfont icon-list_icon" @click="toList('shgl-pjgl')"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>

</style>

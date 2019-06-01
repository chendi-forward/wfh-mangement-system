<template>
  <div class="yhgl">
    <div class="headerSearch">
      <div class="header-search">
        <span class="header-text">用户搜索:</span>
        <el-input
          placeholder="请输入用户ID/昵称/用户手机号..."
          prefix-icon="el-icon-search"
          v-model="idNameNum">
        </el-input>
        <el-button type="danger">确认</el-button>
      </div>
      <div class="header-select">
        <span class="header-text">标签选择:</span>
        <el-select v-model="selectKey" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="danger">设置标签</el-button>
      </div>
    </div>
    <div class="tab-model">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="普通用户" name="common"></el-tab-pane>
        <el-tab-pane label="企业用户" name="company"></el-tab-pane>
        <el-tab-pane label="黑名单" name="blacklist"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-content">
      <el-table
        ref="multipleTable"
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="头像"
          min-width='60'>
          <template slot-scope="scope">
            <div class="con-box">
              <div class="con-img">
                <img :src="scope.row.img" alt="">
              </div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="ID"
          label="用户ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          width="100">
        </el-table-column>
        <el-table-column
          prop='logintime'
          label="注册时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop='sex'
          label="性别"
          width="50">
        </el-table-column>
        <el-table-column
          prop='loc'
          label="地区"
          width="60">
        </el-table-column>
        <el-table-column
          prop='level'
          label="等级"
          width="50">
        </el-table-column>
        <el-table-column
          prop='accountSum'
          label="账户金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop='code'
          label="推荐码"
          width="100">
        </el-table-column>
        <el-table-column
          prop='num'
          label="订单数"
          width="100">
        </el-table-column>
        <el-table-column
          prop='summeroy'
          label="累计成交额"
          width="100">
        </el-table-column>
        <el-table-column
          width="100"
          label="状态">
          <div class="order-con">
            <el-button
              size="mini"
            >黑名单</el-button>
          </div>
        </el-table-column>
        <el-table-column
          prop='label'
          label="标签"
          width="100">
        </el-table-column>
        <el-table-column label="操作" width="86" @cell-click='editHandle(row)'>
          <div class="con-icon">
            <i class="el-icon-edit"></i>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer">
      <el-checkbox label="全选"></el-checkbox>
      <el-button class="black-meun" v-if="activeName !== 'blacklist'">加入黑名单</el-button>
      <el-button class="black-move" v-if="activeName == 'blacklist'">移出黑名单</el-button>
      <el-select class="move-select" v-model="moveKey" clearable placeholder="移动到">
        <el-option
          v-for="item in moveOptions1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="delete">删除</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <my-dialog></my-dialog>
  </div>
</template>

<script src='./script.js'></script>


<style src="./style.less" lang="less">

</style>

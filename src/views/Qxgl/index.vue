<template>
  <div class="qxgl">
    <div class="header">
      <div class="header-title">{{title}}</div>
      <div class="add-btn">
        <el-button type="danger">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      height="430"
      stripe
      row-class-name='rowClassName'
      header-row-class-name='tableHeader'
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="密码"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作权限">
        <template slot-scope="scope">
          <el-checkbox label="售后"></el-checkbox>
          <el-checkbox label="会计"></el-checkbox>
          <el-checkbox label="会员"></el-checkbox>
          <el-checkbox label="数据库"></el-checkbox>
          <el-checkbox label="内容"></el-checkbox>
          <el-checkbox label="营销"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="180">
        <template slot-scope="scope">
        <i class="el-icon-edit"></i>
        &nbsp;
        <i class="el-icon-delete"></i>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./script.js"></script>


<style src="./style.less" lang="less">

</style>

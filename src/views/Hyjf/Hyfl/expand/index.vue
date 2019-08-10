<template>
  <div class="expand-table">
    <el-table
      class="ssxd-table"
      ref="multipleTable"
      :data="tableItems"
      tooltip-effect="dark"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="子用户昵称"
        align='center'
        width="150">
        <template slot-scope="scope">{{ scope.row.userid }}</template>
      </el-table-column>
      <el-table-column
        align='center'
        label="代理用户历史贡献（元）">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
      </el-table-column>
      <el-table-column
        align='center'
        label="代理用户注册日期">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.date }}</span></template>
      </el-table-column>
      <el-table-column
        align='center'
        label="天数">
        <template slot-scope="scope">
          <span class='text-overflow'><el-input type="text" :id="scope.row.userid" v-model="scope.row.withdrawDeposit" class="focus-border"/></span>&nbsp;&nbsp;
          <label :for="scope.row.userid"><span class="icon-btn theme-color"><i class="el-icon-edit"></i></span></label>
          </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align='center'
        width="150">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.dlflje }}</span></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.less" lang="less">

</style>

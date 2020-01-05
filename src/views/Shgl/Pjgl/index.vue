<template>
  <div class="shgl tkgl">
    <div class="data-list">
      <div class="tab-model">
        <el-tabs v-model="currentTab" @tab-click="tabChage">
          <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.name" ></el-tab-pane>
        </el-tabs>
      </div>
      <component :is="tabs[currentTab].com" :data='tableData' @search='getSearchData' @searchParams='searchParams' @updateData='updateData' @deleteitem='deleteitem'></component>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini" @click="deletePingjia">批量删除</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :currentPage="currentPage"
          :total="total">
        </my-pagination>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>

</style>

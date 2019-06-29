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
        <el-button type="danger" @click='setTags'>设置标签</el-button>
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
          label="头像"
          align='center'
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
          align='center'
          label="用户ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='logintime'
          label="注册时间"
          align='center'
          min-width="150">
        </el-table-column>
        <el-table-column
          prop='sex'
          align='center'
          label="性别">
        </el-table-column>
        <el-table-column
          prop='loc'
          align='center'
          label="地区">
        </el-table-column>
        <el-table-column
          prop='level'
          align='center'
          label="等级"
          width="50">
        </el-table-column>
        <el-table-column
          prop='accountSum'
          label="账户金额"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='code'
          label="推荐码"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='num'
          label="订单数"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='summeroy'
          label="累计成交额"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          width="100"
          align='center'
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
          align='center'
          width="100">
        </el-table-column>
        <el-table-column align='center' label="操作" width="86">
          <template slot-scope="scope">
          <div @click='editHandle(scope.row)' class="con-icon">
            <i class="el-icon-edit"></i>
          </div>
          </template>
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
      <my-pagination @sizeChange='handleSizeChange' @currentChange='handleCurrentChange' :total="100"></my-pagination>
      </el-pagination>
    </div>
    <dialog-Com :dialogFlag='dialogFlag' :title='title' @sure-save='sureSave' @cancle-save='cancleSave'>
      <div class="form-box" v-if="editOrSet == 'edit'">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
          <el-form-item label="添加标签:">
          <el-select class="labelAddSelect" v-model="formLabelAlign.option" clearable placeholder="请选择">
            <el-option
              v-for="item in formOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="邀请码设置:">
            <el-col :span='16'>
              <el-input class="setInput" v-model="formLabelAlign.update"></el-input>
            </el-col>
            <el-col :span='4'>
              <el-button class="updateBtn">更新</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="修改状态:">
            <el-col :span='7'>
              <el-radio v-model="formLabelAlign.radio" label="1">正常</el-radio>
            </el-col>
            <el-col :span='7'>
              <el-radio v-model="formLabelAlign.radio" label="2">黑名单</el-radio>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div class="tags-box" v-if="editOrSet == 'set'">
        <div class="tag-box">
          <p class="header-title">当前标签</p>
          <div class="tag-con"></div>
        </div>
        <div class="add-tag-box">
          <p class="header-title">添加标签</p>
        </div>
      </div>
    </dialog-Com> 
  </div>
</template>
<script src='./script.js'></script>
<style src="./style.less" lang="less">
</style>

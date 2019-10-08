<template>
  <div class="shgl">
    <div class="gross grid-row-3">
      <div class="commom-card">
        <div class="name">优惠券返利金额（元）</div>
        <div class="value">1000</div>
      </div>
      <div class="commom-card">
        <div class="name">活动返利金额（元）</div>
        <div class="value">1000</div>
      </div>
      <div class="commom-card">
        <div class="name">活跃值返利金额（元）</div>
        <div class="value">1000</div>
      </div>
    </div>
    <div class="data-list">
      <div class="tab-model">
        <el-tabs v-model="currentTab" @tab-click="tabChage">
          <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.name"></el-tab-pane>
        </el-tabs>
        <div class="btn-wrap">
          <el-button size="mini" type="danger" @click="addHandle">新建</el-button>
        </div>
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
          :label="currentType + '编号'">
        </el-table-column>
        <el-table-column
          prop="nickname"
          :label="currentType + '名称'"
          align='center'>
        </el-table-column>
        <el-table-column
          v-if="currentTab === '1'"
          prop='add_time'
          label="数量"
          align='center'>
        </el-table-column>
        <el-table-column
          prop='gender'
          align='center'
          label="折扣比例（%）">
        </el-table-column>
        <el-table-column
          prop='province'
          align='center'
          label="减扣金额（元）">
        </el-table-column>
        <el-table-column
          prop='level'
          align='center'
          label="起始时间">
        </el-table-column>
        <el-table-column
          prop='balance'
          label="结束时间"
          align='center'>
        </el-table-column>
        <el-table-column
          prop='invite_code'
          label="状态"
          align='center'>
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <div @click='editHandle(scope.row)' class="con-icon theme-color">
              <i class="el-icon-edit"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini">删除</el-button>
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
    <div class="manage grid-row-2-1">
      <div class="spgl-item">
        <div class="spgl-item--title">
          <span>新手优惠券设置</span>
          <div class="edit" v-show='!editNewDataShow'>
            <el-button size="mini" class="success-btn" @click="editNewDataFn">编辑</el-button>
          </div>
          <div class="edit" v-show='editNewDataShow'>
            <el-button size="mini" class="success-btn" @click="saveNewDataFn">保存</el-button>
            <el-button size="mini" @click="cancelNewDataFn">取消</el-button>
          </div>
        </div>
        <div class="spgl-item--content flex-item-center">
          <el-table
            class="ssxd-table"
            ref="multipleTable"
            :data="newData"
            tooltip-effect="dark"
            stripe
            style="width: 100%">
            <el-table-column
              label="优惠券名称"
              align='center'
              width="150">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.intro }}</span></template>
            </el-table-column>
            <el-table-column
              align='center'
              label="ID限发数量">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.max_count" :input-data="scope.row.max_count" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.max_count = v}"></input-or-text>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="折扣比例（%）">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.integral_num" :input-data="scope.row.integral_num" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.integral_num = v}"></input-or-text>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="减扣金额（元）">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.max_integral" :input-data="scope.row.max_integral" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.max_integral = v}"></input-or-text>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="生效天数">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.max_integral" :input-data="scope.row.max_integral" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.max_integral = v}"></input-or-text>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="状态">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.max_integral" :input-data="scope.row.max_integral" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.max_integral = v}"></input-or-text>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="spgl-item">
        <div class="spgl-item--title">消息中心</div>
        <div class="spgl-item--content">
          <div class="setItem">
            <span>短信提醒设置</span>
            <span class="icon iconfont icon-list_icon"></span>
          </div>
          <div class="setItem">
            <span>微信服务设置</span>
            <span class="icon iconfont icon-list_icon"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>

</style>

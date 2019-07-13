<template>
  <div class="sfsz">
    <div class="spgl-wrap1">
      <div class="spgl-item">
        <div class="spgl-item--title">积分任务设置</div>
        <div class="spgl-item--content content1">
          <el-table
            class="ssxd-table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              label="任务"
              align='center'
              width="150">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.date }}</span></template>
            </el-table-column>
            <el-table-column
              align='center'
              label="周内上限次数">
              <template slot-scope="scope">
                <input-or-text v-if="scope.row.id!==6 && scope.row.id!==7" :text-data="scope.row.yjdx" :input-data="scope.row.yjdx" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.yjdx = v}"></input-or-text>
                <span v-if="scope.row.id==6 || scope.row.id==7" class='text-overflow'>{{ scope.row.yjdx }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="对应分值">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.rwjd" :input-data="scope.row.rwjd" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.rwjd = v}"></input-or-text>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="顶格分值">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.tjfled" :input-data="scope.row.tjfled" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.tjfled = v}"></input-or-text>
              </template>
            </el-table-column>
          </el-table>
          <div class="edit" v-show='!editTaskShow'>
            <el-button size="mini" class="success-btn" @click="editTaskFn">编辑</el-button>
          </div>
          <div class="edit" v-show='editTaskShow'>
            <el-button size="mini" class="success-btn" @click="saveTaskFn">保存</el-button>
            <el-button size="mini" @click="cancelTaskFn">取消</el-button>
          </div>
        </div>
      </div>
      <div class="spgl-item">
        <div class="spgl-item--title">积分兑现门槛</div>
        <div class="spgl-item--content content2">
          <div class="edit-div sub-content" v-show='editSillShow'>
            <p>每<el-input v-model="editSillForm.every" placeholder="请输入分值"></el-input>（分），
            可领取<el-input v-model="editSillForm.everyM" placeholder="请输入金额"></el-input>（元）；</p>
            <p>达<el-input v-model="editSillForm.reach" placeholder="请输入分值"></el-input>（分）之后，
            每<el-input v-model="editSillForm.reachEvery" placeholder="请输入分值"></el-input>（分），
            可领取<el-input v-model="editSillForm.reachEveryM" placeholder="请输入金额"></el-input>（元）。</p>
          </div>
          <div class="view-div sub-content" v-show='!editSillShow'>
            <p>每{{SillForm.every}}（分），可领取{{SillForm.everyM}}（元）奖励；</p>
            <p>达{{SillForm.reach}}（分）之后，每{{SillForm.reachEvery}}（分），可领取{{SillForm.reachEveryM}}（元）奖励。</p>
          </div>
          <div class="edit" v-show='!editSillShow'>
            <el-button size="mini" class="success-btn" @click="editSill">编辑</el-button>
          </div>
          <div class="edit" v-show='editSillShow'>
            <el-button size="mini" class="success-btn" @click="saveSill">保存</el-button>
            <el-button size="mini" @click="cancelSill">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="spgl-wrap2">
      <div class="spgl-item">
      <div class="spgl-item--title">积分赠送</div>
        <div class="spgl-item--content content3">
          <p>赠送分值:<input-or-text :text-data="present" :input-data="integral" holder="输入分值" :show-input='editIntegral' @change="(v)=>{this.integral = v}"></input-or-text>
          <div v-show='!editIntegral'>
            <el-button size="mini" class="success-btn" @click="editIntegralFn">编辑</el-button>
          </div>
          <div v-show='editIntegral'>
            <el-button size="mini" class="success-btn" @click="saveIntegralFn">保存</el-button>
            <el-button size="mini" @click="cancelIntegralFn">取消</el-button>
          </div>
        </div>
      </div>
      <div class="spgl-item--footer">
        <div class="search-div sub-wrap">
          <p>用户搜索:<el-input v-model="searchKey" placeholder="输入用户ID/昵称..." prefix-icon="el-icon-search"></el-input></p>
          <el-button size="mini" class="success-btn" @click="search">搜索</el-button>
        </div>
        <div class="list-div sub-wrap">
          <el-scrollbar style="height: 100%;">
            <ul class="row" v-for="(item, i) in userList" :key="i">
              <li class="checkbox"><el-checkbox v-model="item.checked"></el-checkbox></li>
              <li class="name">{{item.user + i}}</li>
              <li></li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="btn-div sub-wrap">
          <el-button size="mini" class="success-btn" @click="save">赠送</el-button>
          <el-button size="mini" class="cancel-btn" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.less" lang="less">

</style>

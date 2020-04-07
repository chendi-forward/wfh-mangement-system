<template>
  <div class="sfsz jfsz">
    <div class="spgl-wrap1">
      <div class="spgl-item">
        <div class="spgl-item--title">积分任务设置</div>
        <div class="spgl-item--content content1">
          <el-table class="ssxd-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" stripe style="width: 100%">
            <el-table-column label="任务" align='center' width="150">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.intro }}</span></template>
            </el-table-column>
            <el-table-column
              align='center'
              label="周期内上限次数">
              <template slot-scope="scope">
                <input-or-text v-if="scope.row.integral_id!=='06' && scope.row.integral_id!=='07'" :text-data="scope.row.max_count" :input-data="scope.row.max_count" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.max_count = v}"></input-or-text>
                <span v-if="scope.row.integral_id=='06'" class='text-overflow'>永久{{scope.row.max_count}}次</span>
                <span v-if="scope.row.integral_id=='07'" class='text-overflow'>{{scope.row.max_count}}</span>
              </template>
            </el-table-column>
            <el-table-column align='center' label="对应分值">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.integral_num" :input-data="scope.row.integral_num" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.integral_num = v}"></input-or-text>
              </template>
            </el-table-column>
            <el-table-column align='center' label="顶格分值">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.max_integral" :input-data="scope.row.max_integral" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.max_integral = v}"></input-or-text>
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
            <p>每<el-input v-model="editSillForm.low_base" placeholder="请输入分值"></el-input>（分），
              可领取<el-input v-model="editSillForm.low_ratio" placeholder="请输入金额"></el-input>（元）；</p>
            <p>达<el-input v-model="editSillForm.threshold" placeholder="请输入分值"></el-input>（分）之后，
              每<el-input v-model="editSillForm.hig_base" placeholder="请输入分值"></el-input>（分），
              可领取<el-input v-model="editSillForm.hig_ratio" placeholder="请输入金额"></el-input>（元）。</p>
          </div>
          <div class="view-div sub-content" v-show='!editSillShow'>
            <p>每{{SillForm.low_base}}（分），可领取{{SillForm.low_ratio}}（元）奖励；</p>
            <p>达{{SillForm.threshold}}（分）之后，每{{SillForm.hig_base}}（分），可领取{{SillForm.hig_ratio}}（元）奖励。</p>
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
          <p>
            赠送分值:
            <input-or-text :text-data="present" :input-data="integral" holder="输入分值" :show-input='editIntegral' @change="(v)=>{this.integral = v}"></input-or-text>
            <div v-show='!editIntegral'>
              <el-button size="mini" class="success-btn" @click="editIntegralFn">编辑</el-button>
            </div>
            <div v-show='editIntegral'>
              <el-button size="mini" class="success-btn" @click="saveIntegralFn">保存</el-button>
              <el-button size="mini" @click="cancelIntegralFn">取消</el-button>
            </div>
        </div>
        <div class="spgl-item--content content3">
          <p>
            筛选类型:
            <el-select v-model="selectType" @change="selectTypeChange" placeholder="请选择...">
              <el-option label="按标签筛选" value="tab"></el-option>
              <el-option label="按用户筛选" value="user"></el-option>
            </el-select>
          </p>
        </div>
        <div class="spgl-item--content content3">
          <p>
            {{selectTypeName}}:
            <el-select v-show="selectType==='tab'" v-model="formYhsz.bqsx" multiple collapse-tags clearable placeholder="请选择...">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-show="selectType==='user'" v-model="formYhsz.bqsx" multiple collapse-tags clearable placeholder="请选择...">
            <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          </p>
        </div>
      </div>
      <div class="spgl-item--footer">
        <div class="search-div sub-wrap">
          <p>
            用户搜索:
            <el-input v-model="searchKey" placeholder="输入用户ID/昵称..." prefix-icon="el-icon-search"></el-input>
          </p>
          <el-button size="mini" class="success-btn" @click="search">搜索</el-button>
        </div>
        <div class="list-div sub-wrap">
          <div class="overflow-wrap" v-infinite-scroll="loadData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <ul class="row" v-for="(item, i) in userList" :key="i" :class="{'selected': item.checked}">
              <li class="checkbox">
                <el-checkbox v-model="item.checked"></el-checkbox>
              </li>
              <li class="name">{{item.nickname}}</li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="btn-div sub-wrap">
          <el-button size="mini" class="success-btn" @click="save">赠送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.less" lang="less">
</style>

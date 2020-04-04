<template>
  <div class="sfsz flsz">
    <div class="spgl-wrap1">
      <div class="spgl-item">
        <div class="spgl-item--title">代销返利设置</div>
        <div class="spgl-item--content content1">
          <el-table
            class="ssxd-table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            stripe
            style="width: 100%">
            <el-table-column
              label="会员等级"
              align='center'
              width="80">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.level }}</span></template>
            </el-table-column>
            <!-- <el-table-column
              align='center'
              label="返利基准"
              width="80">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.rebate_proportion * 100" :input-data="scope.row.rebate_proportion * 100" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.rebate_proportion = v / 100}"></input-or-text>%
              </template>
            </el-table-column> -->
            <el-table-column
              align='center'
              label="升级标准">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.up_num" :input-data="scope.row.up_num" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.up_num = v}"></input-or-text> 罐/
                <input-or-text :text-data="scope.row.up_money" :input-data="scope.row.up_money" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.up_money = v}"></input-or-text>元
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="最低标准">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.base_num" :input-data="scope.row.base_num" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.base_num = v}"></input-or-text> 罐/
                <input-or-text :text-data="scope.row.base_money" :input-data="scope.row.base_money" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.base_money = v}"></input-or-text>元
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="等级回升标准">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.back_num" :input-data="scope.row.back_num" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.back_num = v}"></input-or-text> 罐/
                <input-or-text :text-data="scope.row.back_money" :input-data="scope.row.back_money" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.back_money = v}"></input-or-text>元
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
        <div class="spgl-item--title">推荐返利设置</div>
        <div class="spgl-item--content content2">
          <sub-nav v-model="selected" :sub-list='subList' class="not-border"></sub-nav>
          <div v-show="selected == 1">
            <div class="edit-div sub-content" v-show='editCommonShow'>
              <p v-for="(item, i) in editCommonForm" :key='i'>
                {{item.notes}}：<el-input v-model="item.num" placeholder="请输入分值"></el-input>
                <span v-if="item.type_id=='rebate'">
                  <!-- （%） -->
                </span>
                <span v-else>
                  （天）
                </span>
              </p>
            </div>
            <div class="view-div sub-content" v-show='!editCommonShow'>
              <p v-for="(item, i) in commonForm" :key='i'>
                {{item.notes}}：{{item.num}}
                <span v-if="item.type_id=='rebate'">
                  <!-- （%） -->
                </span>
                <span v-else>
                  （天）
                </span>
              </p>
            </div>
            <div class="edit" v-show='!editCommonShow'>
              <el-button size="mini" class="success-btn" @click="editCommon">编辑</el-button>
            </div>
            <div class="edit" v-show='editCommonShow'>
              <el-button size="mini" class="success-btn" @click="saveCommon">保存</el-button>
              <el-button size="mini" @click="cancelCommon">取消</el-button>
            </div>
          </div>
          <div v-show="selected == 0">
            <el-table
              class="ssxd-table"
              ref="multipleTable"
              :data="editAgencyForm.task"
              tooltip-effect="dark"
              stripe
              style="width: 100%">
              <el-table-column
                label="任务阶段"
                align='center'
                width="80">
                <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.task }}</span></template>
              </el-table-column>
              <el-table-column
                align='center'
                label="销量要求(罐)">
                <template slot-scope="scope">
                  <input-or-text :text-data="scope.row.sell_number" :input-data="scope.row.sell_number" holder="输入分值" :show-input='editAgencyShow' @change="(v)=>{scope.row.sell_number = v}"></input-or-text>
                </template>
              </el-table-column>
              <el-table-column
                align='center'
                label="销售金额(元)">
                <template slot-scope="scope">
                  <input-or-text :text-data="scope.row.sell_money" :input-data="scope.row.sell_money" holder="输入分值" :show-input='editAgencyShow' @change="(v)=>{scope.row.sell_money = v}"></input-or-text>
                </template>
              </el-table-column>
              <el-table-column
                align='center'
                label="奖励返利(元)">
                <template slot-scope="scope">
                  <input-or-text :text-data="scope.row.rebate_money" :input-data="scope.row.rebate_money" holder="输入分值" :show-input='editAgencyShow' @change="(v)=>{scope.row.rebate_money = v}"></input-or-text>
                </template>
              </el-table-column>
            </el-table>
            <div class="edit-div sub-content" v-show='editAgencyShow'>
              <p v-for="(item, i) in editAgencyForm.time" :key="i">
                {{item.notes}}：<el-input v-model="item.num" placeholder="请输入分值"></el-input>（天）
              </p>
            </div>
            <div class="view-div sub-content" v-show='!editAgencyShow'>
              <p v-for="(item, i) in agencyForm.time" :key="i">{{item.notes}}：{{item.num}}（天）</p>
            </div>
            <div class="edit" v-show='!editAgencyShow'>
              <el-button size="mini" class="success-btn" @click="editAgency">编辑</el-button>
            </div>
            <div class="edit" v-show='editAgencyShow'>
              <el-button size="mini" class="success-btn" @click="saveAgency">保存</el-button>
              <el-button size="mini" @click="cancelAgency">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spgl-wrap2">
      <div class="spgl-item">
        <div class="spgl-item--title">代理用户分销拓扑图</div>
        <div class="spgl-item--content content3">
          <el-table
            class="ssxd-table"
            ref="multipleTable"
            :data="tableItems"
            tooltip-effect="dark"
            stripe
            @expand-change="expandChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="代理用户ID"
              align='center'
              width="150">
              <template slot-scope="scope">{{ scope.row.user_id }}</template>
            </el-table-column>
            <el-table-column
              align='center'
              label="代理用户昵称">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
            </el-table-column>
            <el-table-column
              align='center'
              label="代理成交金额">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.deal_money }}</span></template>
            </el-table-column>
            <el-table-column
              align='center'
              label="代理成交数量">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.order }}</span></template>
            </el-table-column>
            <el-table-column
              label="代理返利金额"
              align='center'
              width="150">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.balance }}</span></template>
            </el-table-column>
            <el-table-column
              label="返利详情"
              type="expand"
              width="150"
              align='center'>
              <template slot-scope="scope">
                <my-expand :data='scope.expand'></my-expand>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="ssxd-footer">
      <!-- <div class="selectAll-wrap">
        <el-button size="mini">删除</el-button>
      </div> -->
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page_size="pageSize"
          :total="total">
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.less" lang="less">

</style>

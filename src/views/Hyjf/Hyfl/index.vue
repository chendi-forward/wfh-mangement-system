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
              width="150">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.date }}</span></template>
            </el-table-column>
            <el-table-column
              align='center'
              label="返利基准">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.yjdx" :input-data="scope.row.yjdx" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.yjdx = v}"></input-or-text>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="最低标准">
              <template slot-scope="scope">
                <input-or-text :text-data="scope.row.rwjd" :input-data="scope.row.rwjd" holder="输入分值" :show-input='editTaskShow' @change="(v)=>{scope.row.rwjd = v}"></input-or-text>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="等级回升标准">
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
        <div class="spgl-item--title">推荐返利设置</div>
        <div class="spgl-item--content content2">
          <sub-nav v-model="selected" :sub-list='subList' class="not-border"></sub-nav>
          <div v-show="selected == 0">
            <div class="edit-div sub-content" v-show='editCommonShow'>
              <p>返佣比例：<el-input v-model="editCommonForm.every" placeholder="请输入分值"></el-input>（%）</p>
              <p>邀请有效时间：<el-input v-model="editCommonForm.reach" placeholder="请输入分值"></el-input>（天）</p>
              <p>提成有效时间：<el-input v-model="editCommonForm.reachEvery" placeholder="请输入分值"></el-input>（天）</p>
            </div>
            <div class="view-div sub-content" v-show='!editCommonShow'>
              <p>返佣比例：{{commonForm.every}}（%）</p>
              <p>邀请有效时间：{{commonForm.reach}}（天）</p>
              <p>提成有效时间：{{commonForm.reachEvery}}（天）</p>
            </div>
            <div class="edit" v-show='!editCommonShow'>
              <el-button size="mini" class="success-btn" @click="editCommon">编辑</el-button>
            </div>
            <div class="edit" v-show='editCommonShow'>
              <el-button size="mini" class="success-btn" @click="saveCommon">保存</el-button>
              <el-button size="mini" @click="cancelCommon">取消</el-button>
            </div>
          </div>
          <div v-show="selected == 1">
            <el-table
              class="ssxd-table"
              ref="multipleTable"
              :data="editAgencyForm.data"
              tooltip-effect="dark"
              stripe
              style="width: 100%">
              <el-table-column
                label="任务阶段"
                align='center'
                width="80">
                <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.date }}</span></template>
              </el-table-column>
              <el-table-column
                align='center'
                label="销量要求(罐)">
                <template slot-scope="scope">
                  <input-or-text :text-data="scope.row.yjdx" :input-data="scope.row.yjdx" holder="输入分值" :show-input='editAgencyShow' @change="(v)=>{scope.row.yjdx = v}"></input-or-text>
                </template>
              </el-table-column>
              <el-table-column
                align='center'
                label="销售金额(元)">
                <template slot-scope="scope">
                  <input-or-text :text-data="scope.row.rwjd" :input-data="scope.row.rwjd" holder="输入分值" :show-input='editAgencyShow' @change="(v)=>{scope.row.rwjd = v}"></input-or-text>
                </template>
              </el-table-column>
              <el-table-column
                align='center'
                label="奖励返利(元)">
                <template slot-scope="scope">
                  <input-or-text :text-data="scope.row.tjfled" :input-data="scope.row.tjfled" holder="输入分值" :show-input='editAgencyShow' @change="(v)=>{scope.row.tjfled = v}"></input-or-text>
                </template>
              </el-table-column>
            </el-table>
            <div class="edit-div sub-content" v-show='editAgencyShow'>
              <p>邀请有效时间：<el-input v-model="editAgencyForm.reach" placeholder="请输入分值"></el-input>（天）</p>
              <p>提成有效时间：<el-input v-model="editAgencyForm.reachEvery" placeholder="请输入分值"></el-input>（天）</p>
            </div>
            <div class="view-div sub-content" v-show='!editAgencyShow'>
              <p>邀请有效时间：{{agencyForm.reach}}（天）</p>
              <p>提成有效时间：{{agencyForm.reachEvery}}（天）</p>
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
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="代理用户ID"
              align='center'
              width="150">
              <template slot-scope="scope">{{ scope.row.userid }}</template>
            </el-table-column>
            <el-table-column
              align='center'
              label="代理用户昵称">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
            </el-table-column>
            <el-table-column
              align='center'
              label="代理成交金额">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.date }}</span></template>
            </el-table-column>
            <el-table-column
              align='center'
              label="代理成交数量">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.withdrawDeposit }}</span></template>
            </el-table-column>
            <el-table-column
              label="代理返利金额"
              align='center'
              width="150">
              <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.dlflje }}</span></template>
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
      <div class="selectAll-wrap">
        <el-button size="mini">删除</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="400">
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.less" lang="less">

</style>

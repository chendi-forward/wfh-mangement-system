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
        <el-button type="danger" @click='inputChange'>确认</el-button>
      </div>
      <div class="header-select">
        <span class="header-text">标签选择:</span>
        <el-select v-model="selectKey" @change='selectChange' placeholder="请选择">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="danger" @click='setTags'>设置标签</el-button>
      </div>
    </div>
    <div class="tab-model">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="普通用户" name="ordinary"></el-tab-pane>
        <el-tab-pane label="企业用户" name="super"></el-tab-pane>
        <el-tab-pane label="黑名单" name="black"></el-tab-pane>
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
                <img :src="scope.row.avatar" alt="">
              </div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="user_id"
          align='center'
          :show-overflow-tooltip='true'
          min-width="130"
          label="用户ID">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          :show-overflow-tooltip='true'
          align='center'
          min-width="130">
        </el-table-column>
        <el-table-column
          prop='add_time'
          label="注册时间"
          :show-overflow-tooltip='true'
          align='center'
          width="160">
        </el-table-column>
        <el-table-column
          prop='gender'
          align='center'
          width="90"
          label="性别">
        </el-table-column>
        <el-table-column
          prop='province'
          align='center'
          width="100"
          label="地区">
        </el-table-column>
        <el-table-column
          prop='level'
          align='center'
          label="等级"
          sortable
          width="80">
        </el-table-column>
        <el-table-column
          prop='balance'
          label="账户金额"
          sortable
          align='center'
          width="100">
        </el-table-column>
        <!-- <el-table-column
          prop='invite_code'
          label="推荐码"
          :show-overflow-tooltip='true'
          align='center'
          min-width="130">
        </el-table-column> -->
        <el-table-column
          prop='order'
          label="订单数"
          sortable
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='deal_money'
          label="累计成交额"
          align='center'
          width="100">
        </el-table-column>
        <!-- <el-table-column
          prop='is_black'
          label="状态"
          align='center'
          width="100">
          <template slot-scope="scope">
            <div class="con-box">
              <button v-if="scope.row.is_black">
                黑名单
              </button>
              <button></button>
            </div>
        </template>
        </el-table-column> -->
        <el-table-column
          prop='label'
          label="标签"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='label'
          label="备注"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop='summeroy'
          label="用户类型"
          align='center'
          width="100"
          v-if="activeName == 'black'">
        </el-table-column>
        <el-table-column align='center' label="操作" width="86">
          <template slot-scope="scope">
            <el-button size="small" plain icon='el-icon-edit' @click='editHandle(scope.row)'></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer">
      <el-button class="black-meun" v-if="activeName !== 'black'" :disabled="btnFlag" @click='changeUserBach("1")'>加入黑名单</el-button>
      <el-button class="black-meun" v-if="activeName == 'ordinary'" :disabled="btnFlag" @click='changeUserBach("3")'>加入企业用户</el-button>
      <el-button class="black-meun" v-if="activeName == 'super'" :disabled="btnFlag" @click='changeUserBach("2")'>加入普通用户</el-button>
      <el-select class="move-select" v-if="activeName == 'black'" :class="{'dis-move-select': btnFlag}" v-model="moveKey" placeholder="移动到" :disabled="btnFlag" @change='moveUser'>
        <el-option
          v-for="item in moveOptions3"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <my-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' :total="total"></my-pagination>
    </div>

    <dialog-Com v-model='dialogFlag' :title='title' :is-show-footer='true' @sure-save='sureSave' @cancle-save='cancleSave'>
      <!-- 编辑用户 -->
      <div class="form-box" v-if="editOrSet == 'edit'">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
          <el-form-item label="添加标签:">
          <el-select class="labelAddSelect" v-model="formLabelAlign.option" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="修改状态:">
            <el-col :span='7'>
              <el-radio v-model="formLabelAlign.is_black" label="0">正常</el-radio>
            </el-col>
            <el-col :span='7'>
              <el-radio v-model="formLabelAlign.is_black" label="1">黑名单</el-radio>
            </el-col>
          </el-form-item>
          <div class="companyDis">
            <el-form-item label="会员保级">
              <el-col :span='7'>
                <el-radio v-model="formLabelAlign.level_protect" label="0">开启</el-radio>
              </el-col>
              <el-col :span='7'>
                <el-radio v-model="formLabelAlign.level_protect" label="1">关闭</el-radio>
              </el-col>
            </el-form-item>
            <el-form-item label="限制提现">
              <el-col :span='7'>
                <el-radio v-model="formLabelAlign.advance" label="0">开启</el-radio>
              </el-col>
              <el-col :span='7'>
                <el-radio v-model="formLabelAlign.advance" label="1">关闭</el-radio>
              </el-col>
            </el-form-item>
            <button class="constraint-btn" @click="confirmWithDraw">强制提现</button>
            <el-form-item label="下游提成" v-if="activeName == 'super'">
              <el-input class="pushMoney" type='number' placeholder="输入金额..." v-model="formLabelAlign.pushmoney">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="用户等级">
              <el-select v-model="formLabelAlign.level" placeholder="请选择">
                <el-option
                  v-for="item in levelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注(选填):">
              <el-input size="small" width='200' class="level" type='text' placeholder="输入备注信息..." v-model="formLabelAlign.remark">
              </el-input>
            </el-form-item>
          </div>
          <el-form-item label="邀请码设置:">
            <el-col :span='16'>
              <el-input class="setInput" v-model="formLabelAlign.update"></el-input>
            </el-col>
            <el-col :span='4'>
              <el-button class="updateBtn" @click='getInviteCode'>更新</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>

      <!-- 添加新标签 -->
      <div class="tags-box" v-if="editOrSet == 'set'">
        <div class="tag-box">
          <p class="header-title">当前标签</p>
          <div class="tag-con">
            <div class="tab-con_lable" v-for="(item, index) in options" :key="index">
              <div class="tab_con_cur-lab disable-label" v-show="index < 2">{{item.label}}</div>
              <div class="tab_con_cur-lab able-label" v-show="index >= 2">
                {{item.label}}
                <button class="tab-btn-close" @click='delBabel(item)'>X</button>
              </div>
            </div>
          </div>
        </div>
        <div class="add-tag">
          <p class="header-title">添加标签</p>
          <el-form
            :model='formTag'
            ref='formTag'
            class="add-tag--content"
          >
            <el-form-item
              prop="newTag"
              :rules="rules.length10"
            >
              <el-input
                type="text"
                size="small"
                placeholder="输入标签..."
                v-model="formTag.newTag"
                @change="addLabel"
              ></el-input>
              <el-button
                size="small"
                type="success"
                @click="addLabel"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </dialog-Com>
  </div>
</template>
<script src='./script.js'></script>
<style src="./style.less" lang="less">
</style>
<style lang="less">
.add-tag {
    .add-tag--content {
      .el-form-item {
        width: 100%;
      }
      .el-input {
        width: calc(100% - 60px);
      }
    }
  }
</style>
<template>
  <div class="sjsz">
    <div class="spgl-item">
      <div class="spgl-item--title">积分任务设置</div>
      <div class="spgl-item--content content1">
        <div class="set-time" v-show='!editTimeShow'>
          <p class="row"><span class="row-name">确认收货周期：</span>{{time.qrsh}}天</p>
          <p class="row"><span class="row-name">未付款周期：</span>{{time.wfk}}天</p>
          <p class="row"><span class="row-name">会员周期：</span>{{time.hy}}天</p>
          <p class="row"><span class="row-name">积分清空周期：</span>{{time.jfqk}}天</p>
          <p class="row"><span class="row-name">邀请码更新周期：</span>{{time.yqm}}天</p>
        </div>
        <div class="set-time" v-show='editTimeShow'>
          <p class="row"><span class="row-name">确认收货周期：</span><el-input v-model="editTime.qrsh" placeholder="请输入数字"></el-input>（单位：天）</p>
          <p class="row"><span class="row-name">未付款周期：</span><el-input v-model="editTime.wfk" placeholder="请输入数字"></el-input>（单位：天）</p>
          <p class="row"><span class="row-name">会员周期：</span><el-input v-model="editTime.hy" placeholder="请输入数字"></el-input>（单位：天）</p>
          <p class="row"><span class="row-name">积分清空周期：</span><el-input v-model="editTime.jfqk" placeholder="请输入数字"></el-input>（单位：天）</p>
          <p class="row"><span class="row-name">邀请码更新周期：</span><el-input v-model="editTime.yqm" placeholder="请输入数字"></el-input>（单位：天）</p>
        </div>
        <div class="edit" v-show='!editTimeShow'>
          <el-button size="mini" class="success-btn" @click="editTimeFn">编辑</el-button>
        </div>
        <div class="edit" v-show='editTimeShow'>
          <el-button size="mini" class="success-btn" @click="saveTimeFn">保存</el-button>
          <el-button size="mini" @click="cancelTimeFn">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>

</style>

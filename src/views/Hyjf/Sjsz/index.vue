<template>
  <div class="sjsz">
    <div class="spgl-item">
      <div class="spgl-item--title">时间设置</div>
      <div class="spgl-item--content content1">
        <div class="set-time" v-show='!editTimeShow'>
          <p class="row" v-for="(item, i) in time" :key="i"><span class="row-name">{{item.notes}}：</span>{{item.time_days}}天</p>
        </div>
        <div class="set-time" v-show='editTimeShow'>
          <p class="row" v-for="(item, i) in editTime" :key="i"><span class="row-name">{{item.notes}}：</span><el-input v-model="item.time_days" placeholder="请输入数字"></el-input>（单位：天）</p>
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

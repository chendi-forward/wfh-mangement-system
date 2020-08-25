<template>
  <div class="ssxd-body">
    <el-table class="ssxd-table" ref="multipleTable" :data="data" tooltip-effect="dark" stripe style="width: 100%">
      <el-table-column label="日期" align='center' width="150">
        <template slot-scope="scope">{{ scope.row.r_time }}</template>
      </el-table-column>
      <el-table-column align='center' label="推荐对象">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.child_id }}</span></template>
      </el-table-column>
      <el-table-column align='center' label="任务阶段">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.task_rank }}</span></template>
      </el-table-column>
      <el-table-column align='center' label="推荐返利额度">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.rebate_money }}</span></template>
      </el-table-column>
    </el-table>
    <div class="ssxd-count">
      <span class="ssxd-count--title">推荐返利总数：</span><span>{{this.flCount}}元</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fltq',
  props: ['data'],
  data() {
    return {
      flCount: 0
    }
  },
  created() {
    this.data.forEach(item => {
      this.flCount += item.rebate_money * 100
    })
    this.flCount = this.flCount /100
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .ssxd-body {
    margin-bottom: unset;
  }
  .ssxd-count {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    font-weight: bold;
    text-align: end;
    .ssxd-count--title {
      margin-left: 20px;
      color: #ff4b57;
    }
  }
</style>

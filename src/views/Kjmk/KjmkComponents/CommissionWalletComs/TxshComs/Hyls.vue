<template>
  <div class="ssxd-body">
    <el-table class="ssxd-table" ref="multipleTable" :data="data" tooltip-effect="dark" max-height="300" stripe style="width: 100%">
      <!-- <el-table-column label="积分结算日期" align='center' width="150">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column align='center' label="获得返利">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['rebate'] }}</span></template>
      </el-table-column> -->
      <el-table-column align='center' label="分享">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['01'] }}</span></template>
      </el-table-column>
      <el-table-column align='center' label="成功邀请">
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['02'] }}</span></template>
      </el-table-column>
      <el-table-column label="登陆奖励" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['03'] }}</span></template>
      </el-table-column>
      <el-table-column label="代销" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['04'] }}</span></template>
      </el-table-column>
      <el-table-column label="评论奖励" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['05'] }}</span></template>
      </el-table-column>
      <el-table-column label="实名认证" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['06'] }}</span></template>
      </el-table-column>
      <el-table-column label="补偿奖励" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['07'] }}</span></template>
      </el-table-column>
      <el-table-column label="月销售排名积分将" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['08'] }}</span></template>
      </el-table-column>
      <el-table-column label="积分总和" align='center'>
        <template slot-scope="scope"><span class='text-overflow'>{{ scope.row['all'] }}</span></template>
      </el-table-column>
    </el-table>
    <div class="ssxd-count">
      <span class="ssxd-count--title">获得返利总数：</span><span>{{this.flCount}}元</span>
      <span class="ssxd-count--title">获得积分总数：</span><span>{{this.jfCount}}分</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fltq',
  props: ['data'],
  data() {
    return {
      flCount: 0,
      jfCount: 0
    }
  },
  created() {
    this.data.forEach(item => {
      this.flCount += item.rebate * 100
      this.jfCount += item.all * 100
    })
    this.jfCount = this.jfCount / 100
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

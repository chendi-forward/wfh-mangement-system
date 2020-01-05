<template>
  <div class="yxmk-head">
    <div class="yxmk-head__item">
      <span class="head__item--text">优惠券返利金额（元）</span>
      <span class="head__item--num">{{info.coupon}}</span>
    </div>
    <div class="yxmk-head__item">
      <span class="head__item--text">活动返利金额（元）</span>
      <span class="head__item--num">{{info.active}}</span>
    </div>
    <div class="yxmk-head__item">
      <span class="head__item--text">活跃值返利金额（元）</span>
      <span class="head__item--num">{{info.active}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .yxmk-head {
    height: 80px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 25px;
    margin-bottom: 15px;
    .yxmk-head__item {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 10px;
    }
    .head__item--num {
      flex: 1;
      text-align: center;
      font-size: 28px;
      color: #ff4b57;
    }
    .head__item--text {
      line-height: 60px;
      background-color: #f7f8f9;
      // padding: 0 20px;
      margin-right: 20px;
    }
  }
</style>

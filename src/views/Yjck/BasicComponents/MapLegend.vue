<template>
  <div class="footer__top">
    <div class="footer__top--item" v-for="(item, index) in chinaData" :key="index">
      <span class="footer__top--item__inner footer__top--item--index">{{index + 1}}</span>
      <span class="footer__top--item__inner footer__top--item--province">{{item.name}}</span>
      <span class="footer__top--item__inner footer__top--item--percent">{{(item.value / dataTotal * 100).toFixed(1)}}%</span>
      <div class="footer__top--item__inner footer__top--item--bar">
        <div class="footer__top--item--bar__inner" :style="{ width: (item.value / dataTotal * 100).toFixed(1) + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chinaData: [Object, Array],
    dataTotal: [String, Number]
  }
}
</script>

<style lang="less" scoped>
.footer__top {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  padding: 40px;
  padding-left: unset;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .footer__top--item {
    display: flex;
    align-items: center;
    position: relative;
  }
  .footer__top--item--index {
    margin-right: 20px;
  }
  .footer__top--item--province {
    margin-right: 20px;
  }
  .footer__top--item--percent {
    margin-right: 25px;
  }
  .footer__top--item--bar {
    position: absolute;
    right: 0;
    display: inline-block;
    width: 40%;
    height: 50%;
    border-radius: 8px;
    background-color: #f1f3f5;
    .footer__top--item--bar__inner {
      background: #ff4b57;
      height: 100%;
      border-radius: 8px;
    }
  }
}
</style>
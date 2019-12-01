<template>
  <div class="footer__top">
    <div class="footer__top--item" v-for="item in 8">
      <span class="footer__top--item__inner footer__top--item--index">{{item}}</span>
      <span class="footer__top--item__inner footer__top--item--province">广东</span>
      <span class="footer__top--item__inner footer__top--item--percent">30%</span>
      <div class="footer__top--item__inner footer__top--item--bar">
        <div class="footer__top--item--bar__inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
  }
  .footer__top--item--index {
    margin-right: 20px;
  }
  .footer__top--item--province {
    margin-right: 30px;
  }
  .footer__top--item--percent {
    margin-right: 25px;
  }
  .footer__top--item--bar {
    display: inline-block;
    width: 40%;
    height: 50%;
    border-radius: 8px;
    background-color: #f1f3f5;
    .footer__top--item--bar__inner {
      width: 57%;
      background: #ff4b57;
      height: 100%;
      border-radius: 8px;
    }
  }
}
</style>
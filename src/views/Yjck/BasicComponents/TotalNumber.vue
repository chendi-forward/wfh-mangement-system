<template>
  <div class="total-number">
    <div class="total-number--item" v-for="item in itemList" :key="item.name">
      <div class="total-item__name">
        {{item.name}}
      </div>
      <div class="total-item__number">
        {{item.number | thousand_tranf}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'total-number',
  props: {
    itemList: Array
  },
  data () {
    return {
    }
  },
  filters: {
    thousand_tranf: function (value) {
      value = String(value)
      if (value.length > 3) {
        let reg = /(?=(?!\b)(\d{3})+$)/g
        return value.replace(reg, ',')
      } else {
        return value
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .total-number {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .total-number--item {
      display: flex;
      height: 50px;
      line-height: 50px;
      background-color: #f7f8f9;
      justify-content: space-between;
      padding: 0 15px;
    }
  }
</style>

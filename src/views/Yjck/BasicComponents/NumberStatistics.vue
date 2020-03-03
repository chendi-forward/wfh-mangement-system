<template>
  <div class="number-statistics">
    <div class="number-statistics--info">
      <div class="number-statistics__item--number">{{number | thousand_tranf}}</div>
      <div class="number-statistics__item--name">{{name}}</div>
    </div>
    <div class="number-statistics--icon">
      <svg-icon :icon-class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'number-statistics',
  props: ['name', 'number', 'icon'],
  data () {
    return {
      item: {
        number: 2000,
        name: '总订单数'
      }
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
  .number-statistics {
    display: flex;
    .number-statistics--info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .number-statistics__item--number {
        font-size: 30px;
        color: #363f51
      }
    }
    .number-statistics--icon {
      width: 68px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid #96a1b6;
      .svg-icon {
        width: 30px;
        height: 30px;
      }
    }
  }
</style>
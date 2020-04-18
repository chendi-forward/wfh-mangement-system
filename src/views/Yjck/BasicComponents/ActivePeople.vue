<template>
  <div class="actvie-people">
    <div class="actvie-people--item" v-for="item in itemList" :key="item.name">
      <div class="active-item__name">
        {{item.name}}
      </div>
      <div class="active-item__number">
        {{item.number | thousand_tranf}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'active-people',
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

<style lang='less' scoped>
  .actvie-people {
    height: 410px;
    padding: 30px;
    .actvie-people--item {
      background-color: #f7f8f9;
      line-height: 50px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
</style>
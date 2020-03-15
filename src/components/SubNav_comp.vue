<template>
  <ul class="sub-nav">
    <li class="sub-nav__item" :class="{active: index === selectedItem }" v-for="(item, index) in subList"  @click='selectItem(item, index)'>{{item.name}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'subNav-cpmponent',
    props: {
      subList: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        selectedItem: 0
      }
    },
    methods: {
      selectItem (item, index) {
        this.selectedItem = index
        item.component.selectedItem = index
        this.$emit('input', item.component, index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .sub-nav {
    display: flex;
    align-items: center;
    height: 90px;
    padding: 20px;
    background-color: #fff;
    .sub-nav__item {
      cursor: pointer;
      margin-right: 20px;
      padding: 8px 14px;
      border: 1px solid rgba(0, 0, 0, 0);
      &.active {
        color: #ff4b57;
        border: 1px solid #ff4b57;
      }
    }
  }
</style>

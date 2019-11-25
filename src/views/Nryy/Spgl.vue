<template>
  <div class="spgl">
    <spgl-list ref="spglList" v-if="component === 'SpglList'" @toggle-component='toggleComponent'></spgl-list>
    <spgl-detail ref="spglDetail" v-else @toggle-component='toggleComponent'></spgl-detail>
  </div>
</template>

<script>
import SpglDetail from './SpglComponents/SpglDetail'
import SpglList from './SpglComponents/SpglList'
export default {
  name: 'spgl',
  components: {
    'spgl-detail': SpglDetail,
    'spgl-list': SpglList
  },
  data () {
    return {
      component: 'SpglList'
    }
  },
  methods: {
    toggleComponent (val) {
      console.log(val)
      if (val === 'newGoods') {
        this.component = 'SpglDetail'
      } else if (val === 'cancel') {
        this.component = 'SpglList'
      }
    }
  }
}
</script>

<style lang='less' scoped></style>

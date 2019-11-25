<template>
  <div class="yxmk-xxzx">
    <div class="xxzx-body__head">
      <el-tabs class="xxzx-body--tabs" type="border-card" v-model="activeName">
      <el-tab-pane label="短信提醒" name="dxtx"></el-tab-pane>
      <el-tab-pane label="微信提醒" name="wxtx"></el-tab-pane>
      </el-tabs>
    </div>
    <component :is="activeComponent"></component>
  </div>
</template>

<script>
  import dxtx from './XxzxComponents/Dxtx'
  import wxtx from './XxzxComponents/Wxtx'

  export default {
    name: 'yxmk-xxzx',
    data () {
      return {
        activeName: 'dxtx',
        components: {
          'dxtx': dxtx,
          'wxtx': wxtx
        }
      }
    },
    computed: {
      activeComponent () {
        return this.components[this.activeName]
      }
    }
  }
</script>

<style lang='less'>
.el-tabs--border-card {
  box-shadow: none;
}
</style>

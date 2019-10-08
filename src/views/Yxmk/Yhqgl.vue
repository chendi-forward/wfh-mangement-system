<template>
  <div class="yxmk-yhqgl">
    <div class="yhqgl-head">
      <div class="yhqgl-head__item">
        <span class="head__item--text">优惠券返利金额（元）</span>
        <span class="head__item--num">2000</span>
      </div>
      <div class="yhqgl-head__item">
        <span class="head__item--text">活动返利金额（元）</span>
        <span class="head__item--num">1000</span>
      </div>
      <div class="yhqgl-head__item">
        <span class="head__item--text">活跃值返利金额（元）</span>
        <span class="head__item--num">2000</span>
      </div>
    </div>
    <div class="yhqgl-body">
      <div class="yhqgl-body__head">
        <el-tabs class="yhqgl-body--tabs" type="border-card" v-model="activeName">
        <el-tab-pane label="活动表" name="hdb"></el-tab-pane>
        <el-tab-pane label="常规优惠券表" name="cgyhqb"></el-tab-pane>
        </el-tabs>
        <div class="yhqgl-body--create">
          <el-button type="success" @click="showCreateItem">创建</el-button>
        </div>
      </div>
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
  import hdb from './YhqglComponents/Hdb'
  import cgyhqb from './YhqglComponents/Cgyhqb'

  export default {
    name: 'yxmk-yhqgl',
    data () {
      return {
        activeName: 'hdb',
        components: {
          'hdb': hdb,
          'cgyhqb': cgyhqb
        }
      }
    },
    computed: {
      activeComponent () {
        return this.components[this.activeName]
      }
    },
    methods: {
      showCreateItem () {
        this.$router.push({ path: '/yxmk-cjyhq', query: 'create' })
      }
    }
  }
</script>

<style lang="less" scoped>
.yxmk-yhqgl {
  .yhqgl-head {
    height: 80px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 35px;
    margin-bottom: 15px;
    .yhqgl-head__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 10px 57px 10px 10px;
    }
    .head__item--num {
      font-size: 36px;
      color: #ff4b57;
    }
    .head__item--text {
      line-height: 60px;
      background-color: #f7f8f9;
      padding: 0 20px;
    }
  }
  .yhqgl-body {
    .yhqgl-body__head {
      display: flex;
    }
    .yhqgl-body--tabs {
      flex: 1;
    }
    .yhqgl-body--create {
      width: 120px;
      line-height: 60px;
      background-color: #f7f8f9;
      border-radius: 0 6px 0 0;
    }
  }
}
</style>

<style lang='less'>
.el-tabs--border-card {
  box-shadow: none;
}
</style>

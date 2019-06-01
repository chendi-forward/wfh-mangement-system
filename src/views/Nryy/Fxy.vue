<template>
  <div class="find">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="活动公告" name="active-bulletin"></el-tab-pane>
      <el-tab-pane label="品牌简介" name="brand-introduction"></el-tab-pane>
      <el-tab-pane label="新手入门" name="newer-join"></el-tab-pane>
      <el-tab-pane label="草稿箱" name="draft-box"></el-tab-pane>
    </el-tabs>
    <component :is="activeComponent"></component>
  </div>
</template>

<script>
  import ActiveBulletin from './FxyComponents/ActiveBullentin'
  import BrandIntroduction from './FxyComponents/BrandIntroduction'
  import NewerJoin from './FxyComponents/NewerJoin'
  import DraftBox from './FxyComponents/DraftBox'

  export default {
    name: 'fxy',
    data () {
      return {
        activeName: 'active-bulletin',
        components: {
          'active-bulletin': ActiveBulletin,
          'brand-introduction': BrandIntroduction,
          'newer-join': NewerJoin,
          'draft-box': DraftBox
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
.find {
  width: 100%;
  height: 100%;
  .el-tabs {
    // height: 60px;
    border: none;
    .el-tabs__header  {
      height: 60px;
      line-height: 60px;
      .el-tabs__nav {
        .is-active {
          border: none;
          background: #FF4B57;
          border-radius: 6px 6px 0 0;
          color: #fff;
        }
      }
    }
    .el-tabs__item {
      height: 60px;
      line-height: 60px;
      width: 170px;
      color: #363F51;
      text-align: center;
    }
    .el-tabs__content {
      // height: ;
      padding: 0;
      .el-tab-pane {
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>

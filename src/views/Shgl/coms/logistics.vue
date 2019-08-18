<template>
    <!-- 确认退款 -->
    <div class="tags-box">
        <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in data"
                :key="index"
                :type="activity.type">
                <span class="my-timestamp">{{activity.timestamp}}</span>
                {{activity.content }}
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => [{
            content: '【杭州市】本人已签收',
            timestamp: '2018-04-12 20:46:30',
            type: 'danger',
            size: 'large',
            class: 'theme-color'
        }, {
            content: '【北京市】已发往杭州',
            timestamp: '2018-04-03 20:46:30'
        }, {
            content: '【北京市】已到达-北京运转中心',
            timestamp: '2018-04-03 20:46:30'
        }, {
            content: '【北京市】圆通快递已揽件',
            timestamp: '2018-04-03 20:46:30'
        }]
      }
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
    .tags-box {
        padding-left: 100px !important;
    }
</style>

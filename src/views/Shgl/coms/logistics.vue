<template>
    <!-- 物流信息 -->
    <div class="tags-box">
        <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in logistics"
                :key="index"
                :type="activity.type">
                <p class="my-timestamp">{{activity.time}}</p>
                {{activity.context }}
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
import {orderLogistics} from 'API/Shgl'
  export default {
    props: {
      data: String,
      dialogFlag: Boolean
    },
    data () {
      return {
        logistics: []
      }
    },
    watch: {
      dialogFlag () {
        if (this.dialogFlag) {
          this.getData()
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        orderLogistics({order_id: this.data}).then(res => {
          if (res.data.data && res.data.data.length) {
            this.logistics = res.data.data
          } else {
            this.logistics = [{context: '暂无物流信息', time: ''}]
          }
          this.logistics[0].type = 'danger'
          this.logistics[0].size = 'large'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    .tags-box {
        padding-left: 100px !important;
        p {
          margin: 0;
        }
    }
</style>

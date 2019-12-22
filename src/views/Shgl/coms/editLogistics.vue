<template>
    <!-- 编辑物流 -->
    <div class="tags-box">
        <div class="tag-box">
          <span class="header-title">物流公司:</span>
          <el-select v-model="data.selectKey" @change='selectChange' placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.name"
              :value="item.logistics_id">
            </el-option>
          </el-select>
        </div>
        <div class="tag-box">
          <span class="header-title">物流单号:</span>
          <el-input
            placeholder="请输入单号..."
            v-model="data.logisticsId">
          </el-input>
        </div>
    </div>
</template>

<script>
import {logisticsManage} from 'API/Shgl'
  export default {
    props: {
      data: {
        type: Object,
        default: () => {
            return {
                selectKey: 1,
                logisticsId: '',
                
            }
        }
      }
    },
    data () {
      return {
        options: [{
            logistics_id: 1,
            name: '顺丰速运'
        }, {
            logistics_id: 2,
            name: '圆通快递'
        }, {
            logistics_id: 3,
            name: '申通快递'
        }]
      }
    },
    created () {
      this.logisticsManage()
    },
    methods: {
      logisticsManage () {
        logisticsManage().then(res => {
          this.options = res.data
        })
      },
      selectChange () {}
    }
  }
</script>

<style lang="less" scoped>
    .tags-box {
        padding-left: 80px;
        .tag-box {
            margin: 50px 0;
            margin-bottom: 80px;
            .header-title {
                display: inline-block;
                width: 100px;
            }
            .el-input, .el-select {
                width: 300px;
            }
        }
    }
</style>

<template>
    <!-- 编辑物流 -->
    <div class="tags-box">
        <div class="tag-box">
          <span class="header-title">物流公司:</span>
          <el-select v-model="selectKey" @change='selectChange' placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="tag-box">
          <span class="header-title">物流单号:</span>
          <el-input
            placeholder="请输入单号..."
            v-model="logisticsId">
          </el-input>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => {
            return {
                selectKey: '1',
                logisticsId: '',
                options: [{
                    value: '1',
                    label: '顺丰速运'
                }, {
                    value: '2',
                    label: '圆通快递'
                }, {
                    value: '3',
                    label: '申通快递'
                }]
            }
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
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

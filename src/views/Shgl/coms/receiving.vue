<template>
    <!-- 确认收货 -->
    <div class="tags-box">
        <div class="order-info">
            <p><span>订单编号:</span> {{data.ddbh}}</p>
            <p><span>退运单号:</span> {{data.tkzh}}</p>
        </div>
        <div class="goods-info">
            <el-table
                ref="multipleTable"
                align='center'
                :data="data.goods"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    align='left'
                    label="商品名称"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="type"
                    align='left'
                    label="口味/规格">
                </el-table-column>
                <el-table-column
                    prop="num"
                    align='center'
                    label="数量">
                </el-table-column>
            </el-table>
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
                ddbh: '1654966632',
                tkzh: '5621654623',
                goods: [
                    {
                        name: '考拉系列乳清蛋白粉',
                        type: '巧克力，500g',
                        num: 20
                    }
                ]
            }
        }
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
        .order-info {
            padding-left: 10px;
        }
        padding: 0 30px !important;
    }
</style>

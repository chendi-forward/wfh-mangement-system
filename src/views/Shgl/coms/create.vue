<template>
<!-- 创建退款 -->
  <div class="tags-box">
    <div class="tag-box">
        <span class="header-title">退款类型:</span>
        <el-select v-model="data.after_sale_type" @change='selectChange' placeholder="请选择">
        <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value">
        </el-option>
        </el-select>
    </div>
    <div class="tag-box">
        <span class="header-title tktt">退款商品:</span>
        <div class="my-table">
          <el-table
            ref="multipleTable"
            stripe
            align='center'
            :data="data.goods"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection">
            </el-table-column>
            <el-table-column
              align='center'
              label="商品名称/规格">
              <template slot-scope="scope">
                <p class="goodsinfo">{{scope.row.goods_title}}</p>
                <p class="goodsinfo">{{scope.row.taste}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="goods_count"
              label="数量"
              align='center'>
            </el-table-column>
            <el-table-column
              prop="pay_price"
              label="实付金额"
              align='center'>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <div class="tag-box">
        <span class="header-title">退款金额:</span>
        <el-input
        placeholder="请输入金额..."
        disabled
        v-model="data.refund_money">
        </el-input>
        （单位：元）
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
                refund_money: 0,
                after_sale_type: '退货退款',
                goods: [],
                refund_goods: [],
                order_id: '',
                sale_state: '', // 订单状态
                remark: '' // 备注
            }
        }
      }
    },
    data () {
      return {
        options: [{
            value: '退货退款',
            label: '退货退款'
        }, {
            value: '只退款',
            label: '仅退款'
        }]
      }
    },
    methods: {
        selectChange (value) {
          this.data.after_sale_type = value
        },
        handleSelectionChange (value) {
          this.data.refund_goods = value
          this.data.refund_money = 0
          this.data.refund_goods.forEach(element => {
            this.data.refund_money += element.pay_price
          });
        }
    }
  }
</script>

<style lang="less" scoped>
.tag-box {
  overflow: hidden;
  .tktt {
    float: left;
    padding-right: 4px;
    padding-top: 4px;
  }
  .my-table {
    width: 300px;
    height: 283px;
    overflow: auto;
    // display: inline-block;
    float: left;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    .goodsinfo {
      margin: 0;
    }
  }
}
</style>

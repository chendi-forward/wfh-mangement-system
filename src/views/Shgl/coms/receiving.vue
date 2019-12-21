<template>
    <!-- 确认收货 -->
    <div class="tags-box">
        <div class="order-info">
            <p><span>订单编号:</span> {{data.ddbh}}</p>
            <p><span>退运单号:</span> {{data.tydh}}</p>
        </div>
        <div class="goods-info">
            <el-table
                ref="multipleTable"
                align='center'
                :data="goods_detail"
                style="width: 100%">
                <el-table-column
                    prop="goods_title"
                    align='left'
                    label="商品名称"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="type"
                    align='left'
                    label="口味/规格">
                    <template slot-scope="scope">
                        <div class="taste">
                            {{scope.row.taste}}、{{scope.row.standard}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="count"
                    align='center'
                    label="数量">
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
        <el-button class="saveBtn" @click.stop="sureSave">确 认</el-button>
        <el-button class="cancleBtn" @click.stop="cancleSave">取 消</el-button></div>
        </div>
    </div>
</template>

<script>
import { refundDetail, confirmReceipt } from 'API/Shgl'
  export default {
    props: {
      data: {
        type: Object,
        default: () => {
            return {
                ddbh: '1654966632',
                tydh: '5621654623',
            }
        }
      },
      goodsid: {
          type: Number,
          default: 0
      }
    },
    data () {
      return {
        goods_detail: []
      }
    },
    watch: {
        goodsid (n) {
            console.log(n, '===')
            this.getDetailData()
        }
    },
    methods: {
        getDetailData () {
            let data ={
                id: this.goodsid
            }
            refundDetail(data).then(res => {
                console.log(res, '===detail')
                if (res.message == 'ok') {
                    this.goods_detail = res.data.goods_detail
                }
            })
        },
        sureSave(){
            let obj ={
                flag: 2
            }
            this.$emit('sure-save', obj)
            let data = {
                id: this.goodsid
            }
            confirmReceipt(data).then(res => {
                this.$message({
                    message: '确认收货成功!',
                    type: 'success'
                });
                console.log(res, 'confirmreceipt====')
            })
        },
        cancleSave() {
            this.$emit('cancle-save')
        }
     },
     created () {
         this.getDetailData()
     }
  }
</script>

<style lang="less" >
    .tags-box {
        .order-info {
            padding-left: 10px;
        }
        padding: 0 30px !important;
    }
    .footer {
        text-align: center;
        margin-top: 20px;
        .el-button {
            width: 70px;
            height: 30px;
            padding: 0;
        }
        .saveBtn {
            background: #FF4B57;
            color: #fff;
            border: 0;
        }
    }
</style>

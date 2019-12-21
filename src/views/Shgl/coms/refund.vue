<template>
    <!-- 确认退款 -->
    <div class="tags-box">
        <p><span>订单编号:</span> {{data.ddbh}}</p>
        <p><span>退款账号:</span> {{data.tkzh}}</p>
        <p><span>退款金额:</span> {{data.tkje}}(元)</p>
        <div class="footer">
        <el-button class="saveBtn" @click.stop="sureSave">确 认</el-button>
        <el-button class="cancleBtn" @click.stop="cancleSave">取 消</el-button></div>
        </div>
    </div>
</template>

<script>
import { refund } from 'API/Shgl'
  export default {
    props: {
      data: {
        type: Object,
        default: () => {
            return {
                ddbh: '1654966632',
                tkzh: '5621654623',
                tkje: 400
            }
        }
      },
      goodsid: {
          type: Number,
          default: 0
      }
    },
    watch: {
        goodsid (n) {
            console.log(n, '===')
            // this.getDetailData()
        }
    },
    data () {
      return {
      }
    },
    methods: {
      sureSave() {
        let obj = {
          flag: 3
        }
        this.$emit('sure-save', obj)
        let data = {
          id: this.goodsid
        }
        refund(data).then(res => {
          console.log(res, '======')
          this.$message({
              message: '确认退款成功!',
              type: 'success'
          });
        })
      },
      cancleSave() {
        this.$emit('cancle-save')
      }
    }
  }
</script>

<style lang="less" >
    .tags-box {
        padding-left: 200px !important;
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

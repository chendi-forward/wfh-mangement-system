<template>
<!-- 编辑退款 -->
  <div class="tags-box">
    <div class="tag-box">
        <span class="header-title">物流公司:</span>
        <el-select v-model="selectKey" @change='selectChange' placeholder="请选择">
        <el-option
            v-for="(item, index) in logisticsData"
            :key="index"
            :label="item.name"
            :value="item.logistics_id">
        </el-option>
        </el-select>
    </div>
    <div class="tag-box">
        <span class="header-title">退运单号:</span>
        <el-input
        placeholder="请输入单号..."
        v-model="tydh">
        </el-input>
    </div>
    <!-- <div class="tag-box">
        <span class="header-title">退款账户:</span>
        <el-input
        placeholder="请输入微信交易号..."
        v-model="data.wxid">
        </el-input>
        （原路返回）
    </div> -->
    <!-- <div class="tag-box">
        <span class="header-title">退款金额:</span>
        <el-input
        placeholder="请输入金额..."
        v-model="data.money">
        </el-input>
        （单位：元）
    </div> -->
    <div class="footer">
      <el-button class="saveBtn" type="primary" @click.stop="sureSave">保 存</el-button>
      <el-button class="cancleBtn" @click.stop="cancleSave">取 消</el-button></div>
    </div>
</template>

<script>
import { logisticsManage } from 'API/Shgl'
  export default {
    props: {
      data: {
        type: Object,
        default: () => {
            return {
                tydh: '',
                wxid: '',
                money: '',
                selectKey: '1',
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
      },
    },
    data () {
      return {
        selectKey: '',
        tydh: '',
        logisticsData: [],
      }
    },
    methods: {
        sureSave (){
          if (!this.selectKey || !this.tydh) {
            this.$message({
              message: '请正确填写表单信息',
              type: 'warning'
            });
            return;
          } else {
            let obj = {
              selectKey: this.selectKey,
              tydh: this.tydh,
              flag: 1
            }
            console.log('sureSave')
            this.$emit('sure-save', obj)
          }
        },
        cancleSave () {
          console.log('cancleSave')
          this.$emit('cancle-save')
        },
        getLogisticsData () {
          logisticsManage().then(res => {
            console.log(res, '==logisticsManage==')
            if (res.message == 'ok') {
              this.logisticsData = res.data
            }
          })
        },
        selectChange () {}
    },
    mounted () {
      this.getLogisticsData()
      // console.log(this.goodsid, '=fooodwd==')
    }
  }
</script>

<style lang="less">
.footer {
  text-align: center;
}
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
</style>

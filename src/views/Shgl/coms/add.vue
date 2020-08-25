<template>
<!-- 编辑退款 -->
  <div class="tags-box">
    <div class="tag-box">
        <span class="header-title">物流公司:</span>
        <el-select v-model="selectKey" @change='selectChange' :disabled="data.status" placeholder="请选择">
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
        :disabled="data.status"
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
    <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in logistics.data"
            :key="index"
            :type="activity.type">
            <p class="my-timestamp">{{activity.time}}</p>
            {{activity.context }}
        </el-timeline-item>
    </el-timeline>
    <div class="footer" v-if="!data.status">
      <el-button class="saveBtn" type="primary" @click.stop="sureSave">保 存</el-button>
      <el-button class="cancleBtn" @click.stop="cancleSave">取 消</el-button></div>
    </div>
</template>

<script>
import { logisticsManage, cancelOrderLogistics } from 'API/Shgl'
  export default {
    props: {
      data: {
        type: Object,
        default: () => {
            return {
                id: '',
                status: true
            }
        }
      },
    },
    data () {
      return {
        selectKey: '',
        tydh: '',
        logisticsData: [],
        logistics: {
          com: "huitongkuaidi",
          condition: "D01",
          ischeck: "1",
          message: "ok",
          name: "百世快递",
          nu: "73502713736236",
          state: "签收",
          status: "200",
          data: []
        }
      }
    },
    methods: {
        open () {
          this.data.status && this.cancelOrderLogistics()
          this.getLogisticsData()
        },
        sureSave (){
          if (!this.selectKey || !this.tydh) {
            this.$message({
              message: '请正确填写表单信息',
              type: 'warning'
            });
            return;
          } else {
            let item = this.logisticsData.find(item => item.logistics_id == this.selectKey)
            let obj = {
              selectKey: item.name,
              tydh: this.tydh,
              flag: 1
            }
            this.$emit('sure-save', obj)
          }
        },
        cancleSave () {
          this.$emit('cancle-save')
        },
        getLogisticsData () {
          logisticsManage().then(res => {
            if (res.message == 'ok') {
              this.logisticsData = res.data
            }
          })
        },
        cancelOrderLogistics () {
          cancelOrderLogistics({id: this.data.id}).then(res => {
            if (res.data && res.data.data && res.data.data.length) {
              this.logistics = res.data
              this.tydh = this.logistics.nu
              this.selectKey = this.logistics.name
            } else {
              this.tydh = res.data.nu || '无快递单号'
              this.selectKey = res.data.name || "无快递信息"
              this.logistics.data = [{context: res.data.message, time: ''}]
            }
            this.logistics.data[0].type = 'danger'
            this.logistics.data[0].size = 'large'
          })
        },
        selectChange () {}
    },
    mounted () {
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

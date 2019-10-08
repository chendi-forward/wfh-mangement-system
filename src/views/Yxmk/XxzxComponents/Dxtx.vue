<template>
  <div class="xxzx-dxtx">
    <div class="dxtx-head">
      <div class="dxtx-head__type">
        <div class="head__type--text">
          提醒类型：
        </div>
        <div class="head__type--input">
          <el-select v-model="value" placeholder="选择提醒类型...">
            <el-option
              v-for="(item, i) in options"
              :key="i"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="dxtx-head__send" v-show="!isShowMessage">
        <div class="head__send--text">剩余优惠券手动提醒：</div>
        <div>
          <el-button type="success" @click="sendMessage">发送</el-button>
        </div>
      </div>
    </div>
    <div class="dxtx-body">
      <div class="dxtx-body__title">
        消息设置
      </div>
      <div class="dxtx-body__content">
        <div class="body__content--control">
          <div class="body__content--text">启动控制：</div>
          <div class="body__content--radio">
            <el-radio v-model="radio" label="1">开启</el-radio>
            <el-radio v-model="radio" label="0">关闭</el-radio>
          </div>
        </div>
        <div class="body__content--message" v-if="isShowMessage">
          <div class="body__content--text">消息内容：</div>
          <div class="body__content--textarea">
            <el-input
              type="textarea"
              :rows="6"
              v-model="message"
              placeholder="请输入消息内容...">
            </el-input>
          </div>
        </div>
      </div>
      <div class="dxtx-body__btns">
        <el-button type="success">保存</el-button>
        <el-button >取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xxzx-dxtx',
  data () {
    return {
      options: [
        {
          label: '好友接受邀请通知',
          value: 1
        },
        {
          label: '优惠券通知',
          value: 2
        },
        {
          label: '活动通知',
          value: 3
        },
        {
          label: '提醒通知',
          value: 4
        }
      ],
      value: 1,
      radio: '0',
      message: ''
    }
  },
  computed: {
    isShowMessage () {
      return this.value !== 2
    }
  },
  methods: {
    sendMessage () {}
  }
}
</script>

<style lang="less" scoped>
  .xxzx-dxtx {
    .dxtx-head {
      display: flex;
      height: 98px;
      background-color: #fff;
      border-radius: 0 0 6px 6px;
      .dxtx-head__type {
        flex: 1;
        display: flex;
        padding: 30px;
        align-items: center;
        .head__type--text {
          width: 150px;
        }
        .head__type--input {
          width: 350px;
          .el-select {
            width: 100%;
          }
        }
      }
      .dxtx-head__send {
        display: flex;
        align-items: center;
        margin-right: 40px;
        .head__send--text {
          width: 200px;
        }
      }
    }
    .dxtx-body {
      margin-top: 15px;
      .dxtx-body__title {
        height: 63px;
        line-height: 63px;
        padding: 0 20px;
        font-size: 20px;
        background-color: #f7f8f9;
      }
      .dxtx-body__content {
        background-color: #fff;
        padding: 40px;
        border-bottom: 1px solid #d5d8db;
        .body__content--control,
        .body__content--message {
          display: flex;
        }
        .body__content--text {
          width: 150px;
        }
        .body__content--message {
          margin-top: 20px;
          .body__content--textarea {
            width: 80%;
          }
        }
      }
      .dxtx-body__btns {
        text-align: end;
        background-color: #fff;
        padding: 20px 40px;
      }
    }
  }
</style>

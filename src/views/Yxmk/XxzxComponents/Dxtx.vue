<template>
  <div class="xxzx-dxtx">
    <div class="dxtx-head">
      <div class="dxtx-head__type">
        <div class="head__type--text">
          提醒类型：
        </div>
        <div class="head__type--input">
          <el-select v-model="value" @change="changeType" placeholder="选择提醒类型...">
            <el-option v-for="(item, i) in options" :key="i" :label="item.title" :value="item.sms_id"></el-option>
          </el-select>
        </div>
      </div>
      <!-- <div class="dxtx-head__send" v-show="!isShowMessage">
        <div class="head__send--text">剩余优惠券手动提醒：</div>
        <div>
          <el-button type="success" @click="sendMessage">发送</el-button>
        </div>
      </div> -->
    </div>
    <div class="dxtx-body">
      <div class="dxtx-body__title">
        消息设置
      </div>
      <div class="dxtx-body__content">
        <div class="body__content--control">
          <div class="body__content--text">启动控制：</div>
          <div class="body__content--radio">
            <el-radio-group v-model="radio" :disabled='showEdit'>
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="body__content--message" v-show="message">
          <div class="body__content--text">消息内容：</div>
          <div class="body__content--textarea">
            <el-input ref="messageInput" disabled type="textarea" :rows="6" v-model="message" placeholder="请输入消息内容...">
            </el-input>
          </div>
        </div>
      </div>
      <div class="dxtx-body__btns">
        <el-button type="success" v-show='showEdit' size="small" @click="handleEdit">编辑</el-button>
        <el-button type="success" v-show="!showEdit" size="small" @click="handleSave">保存</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xxzx-dxtx',
  data() {
    return {
      options: [],
      value: '',
      radio: 1,
      showEdit: true,
      message: ''
    }
  },
  computed: {
    isShowMessage() {
      return this.value !== 2
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeType(e) {
      this.getData()
    },
    handleEdit() {
      this.showEdit = false
      this.$nextTick(() => {
        this.$refs.messageInput.focus()
      })
    },
    handleSave() {
      let params = {
        sms_id: this.value,
        is_close:  Number(!this.radio)
      }
      this.$post('/marketing/update_module', params)
      .then(res => {
        this.showEdit = true
        this.$message.success('修改成功！')
      })
    },
    sendMessage() {},
    getList() {
      const params = {
        type: 'sms'
      }
      this.$get('/marketing/module_list', params).then(res => {
        this.options = res.data
      })
    },
    getData() {
      let params = {
        sms_id: this.value
      }
      this.$get('/marketing/module_detail', params).then(res => {
        this.radio = Number(!res.data.is_close)
        console.log('============>: getData -> !res.data.is_close', !res.data.is_close)
        this.message = res.data.module_content
      })
    }
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

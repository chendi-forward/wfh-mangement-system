<template>
  <div class="yxmk-cjyhq">
    <div class="cjyhq-box">
      <div class="cjyhq-xxsz">
        <div class="cjyhq-title">优惠券信息设置</div>
        <el-form
          class="cjyhq-content"
          name="formXxsz"
          label-width="130px"
          label-position="left"
          :model="formXxsz"
          ref="formXxsz"
        >
          <el-form-item
            class="content-content__item"
            label="优惠券编号："
            prop="coupon_no"
            :rules='rules.length10'
          >
            <el-input
              v-model="formXxsz.coupon_no"
              placeholder="输入优惠券编号..."
            ></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item
            class="content-content__item"
            label="优惠券名称："
            prop="coupon_name"
            :rules='rules.length10'
          >
            <el-input
              v-model="formXxsz.coupon_name"
              placeholder="输入优惠券名称..."
            ></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item
            class="content-content__item"
            label="已参加显示名称："
            prop="trolley_show_name"
            :rules='rules.length10'
          >
            <el-input
              v-model="formXxsz.trolley_show_name"
              placeholder="输入已参加显示名称..."
            ></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item
            class="content-content__item"
            label="下单页显示名称："
            prop="order_show_name"
            :rules='rules.length5'
          >
            <el-input
              v-model="formXxsz.order_show_name"
              placeholder="输入下单页显示名称..."
            ></el-input>
            <div class="content__item--rule">*5个字符以内</div>
          </el-form-item>
          <el-form-item
            class="content-content__item"
            label="生效时间："
            prop="dateRange"
            :rules="rules.dateRange"
          >
            <div class="form--dateSelect">
              <el-date-picker
                class="data-input"
                v-model="formXxsz.start_time"
                @change='changeDate("start_time")'
                type="datetime"
                placeholder="选择时间..."
              ></el-date-picker>
              <div style="width: 20px; display: flex; align-items: center; padding: 3px;">
                <div class="date-throught"></div>
              </div>
              <el-date-picker
                class="data-input"
                v-model="formXxsz.end_time"
                type="datetime"
                @change='changeDate("end_time")'
                placeholder="选择时间..."
              ></el-date-picker>
            </div>
            <div class="content__item--rule">*必填项</div>
          </el-form-item>
          <el-form-item
            class="content-content__item"
            label="发放数量："
            prop="coupon_limit"
            :rules="rules.coupon_limit"
          >
            <el-radio-group v-model="formXxsz.coupon_limit" @change='inputChange($event)'>
              <div class="form--radio__ff">
                <el-radio label="张">每人限发</el-radio>
                <el-input
                  placeholder="输入数字..."
                  type="number"
                  @input="inputChange($event)"
                  v-model="formXxsz.coupon_num"
                ></el-input>
                <span>张</span>
              </div>
              <div class="form--radio__ff">
                <el-radio label="不限">不限数量</el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            class="content-content__item"
            label="订单条件："
            prop="threshold_type"
            :rules="rules.threshold_type"
          >
            <el-radio-group v-model="formXxsz.threshold_type">
              <div class="form--radio__ff">
                <el-radio label="元">金额达到</el-radio>
                <el-input
                  placeholder="输入数字..."
                  type="number"
                  @input="inputChange($event)"
                  v-model="formXxsz.ddMoney"
                ></el-input>
                <span>元</span>
              </div>
              <div class="form--radio__ff">
                <el-radio label="罐">数量达到</el-radio>
                <el-input
                  placeholder="输入数字..."
                  type="number"
                  @input="inputChange($event)"
                  v-model="formXxsz.ddNumber"
                ></el-input>
                <span>罐</span>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            class="content-content__item"
            label="折扣设置："
            prop="discount_type"
            :rules="rules.discount_type"
          >
            <el-radio-group v-model="formXxsz.discount_type">
              <div class="form--radio__ff">
                <el-radio label="金额">金额减扣</el-radio>
                <el-input
                  placeholder="输入数字..."
                  type="number"
                  @input="inputChange($event)"
                  v-model="formXxsz.zkMoney"
                ></el-input>
                <span>元</span>
              </div>
              <div class="form--radio__ff">
                <el-radio label="折扣">比例减扣</el-radio>
                <el-input
                  placeholder="输入数字..."
                  type="number"
                  @input="inputChange($event)"
                  v-model="formXxsz.zkNumber"
                ></el-input>
                <span>%</span>
              </div>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="cjyhq-spsz">
        <div class="cjyhq-title">优惠商品设置</div>
        <el-form
          class="cjyhq-content form-spsz"
          name="formSpsz"
          label-width="130px"
          label-position="left"
        >
          <el-form-item
            label="参与优惠商品："
            class="item__sale--wrap"
            prop="activeGoods"
          >
            <div
              class="item__sale"
              v-for="item in activeGoods"
              :key="item.goods_id"
            >
              <img
                class="item__sale--img"
                :src='base_url + item.pic_link'
              />
              <div class="item__sale--text text-overflow-mult">{{item.title}}</div>
            </div>
          </el-form-item>
        </el-form>
        <div class="content-edit">
          <span class="content-edit--total">共 {{activeGoods.length}} 条</span>
          <el-button
            type="success"
            size="small"
            @click="showTag"
          >更改</el-button>
        </div>
      </div>
    </div>
    <div class="cjyhq-box__setting">
      <div class="cjyhq-title">优惠用户设置</div>
      <el-form
        name="formYhsz"
        class="yhsz-content"
        label-width="90px"
        label-position="left"
      >
        <el-form-item
          label="标签筛选："
          class="content-content__item"
          :show-message='false'
        >
          <el-select
            v-model="formYhsz.user_label_id"
            clearable
            @change="changeUserLabel"
            placeholder="请选择..."
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="yhsz-search">
        <el-form
          name="formYhsz"
          class="yhsz-content yhsz-content--search"
          label-width="90px"
          label-position="left"
        >
          <el-form-item
            label="用户搜索："
            class="content-content__item"
          >
            <el-input
              type="text"
              v-model="userKey"
              placeholder="输入用户ID..."
            ></el-input>
            <el-button size="small" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="content__search--options">
          <el-checkbox-group v-model="checkList" v-infinite-scroll="loadData">
            <el-checkbox
              v-for="item in checkLists"
              :key="item.user_id"
              :label="item.user_id"
            >{{item.nickname}}</el-checkbox>
          </el-checkbox-group>
          <div style="text-align: center; line-height: 40px; font-size: 12px;" v-show="userPageOver">没有更多了~~</div>
        </div>
        <div class="content__group--btn">
          <el-button
            type="success"
            size="small"
          >编辑</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
    </div>
    <div class="cjyhq-box__footer">
      <el-button
        type="success"
        size="small"
        @click="handleSave"
      >保存</el-button>
      <el-button
        @click="hideSetting"
        size="small"
      >取消</el-button>
    </div>

    <dialog-com
      v-model="isShowTag"
      title="参加活动商品"
      :is-show-footer='false'
      class="tag-dialog"
    >
      <div class="dialog-search">
        <div class="search-title">商品搜索：</div>
        <div class="search-input">
          <el-input
            type="text"
            v-model="activeSearch"
            placeholder="输入商品编号/商品名称..."
          ></el-input>
        </div>
        <div class="search-button">
          <el-button size="small">搜索</el-button>
        </div>
      </div>
      <div class="dialog-list">
        <div class="search-title">商品添加：</div>
        <div class="search-list">
          <div class="search-list--item">
            <el-table
              class="ssxd-table"
              ref="multipleTable"
              :data="goodList"
              tooltip-effect="dark"
              style="width: 100%"
              height='300'
              v-infinite-scroll="loadGoods"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              >
              </el-table-column>
              <el-table-column
                align='center'
                label="商品图片"
                width="100"
              >
                <template slot-scope="scope">
                  <img
                    class="dialog-img"
                    :src="base_url + scope.row.pic_link"
                    alt=""
                  >
                </template>
              </el-table-column>
              <el-table-column
                align='center'
                label="商品编号"
                width="130"
              >
                <template slot-scope="scope">{{ scope.row.goods_id }}</template>
              </el-table-column>
              <el-table-column
                align='center'
                label="商品名称"
              >
                <template slot-scope="scope">{{ scope.row.title }}</template>
              </el-table-column>
            </el-table>
            <div style="text-align: center; line-height: 40px; font-size: 12px;" v-show="goodsPageOver">没有更多了~~</div>
          </div>
        </div>
      </div>
      <div class="dialog-btns">
        <el-button
          size="small"
          type="success"
          @click="handleAddGoods"
        >确定</el-button>
        <el-button
          size="small"
          @click="hideTag"
        >取消</el-button>
      </div>
    </dialog-com>
  </div>
</template>

<script>
import DialogCom from 'COMPONENTS/DialogCom'
import $ from 'jquery'
import { BASE_URL } from 'COMMONS/commonsConfig.js'
import _ from 'lodash'
import moment from 'moment'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'yxmk-cjyhq',
  components: {
    'dialog-com': DialogCom,
    InfiniteLoading
  },
  props: {
    action: String,
    type: String,
    coupon_id: [String, Number]
  },
  data() {
    let length10 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('该项不能为空'))
      } else if (value.length > 10) {
        callback(new Error('10个字符以内'))
      } else {
        callback()
      }
    }
    let length5 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('该项不能为空'))
      } else if (value.length > 5) {
        callback(new Error('5个字符以内'))
      } else {
        callback()
      }
    }
    let dateRange = (rule, value, callback) => {
      if (!(value && value.length && value.length > 1)) {
        callback(new Error('活动开始时间和结束时间不能为空'))
      } else {
        callback()
      }
    }
    let required = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('该项为必填项'))
      } else {
        callback()
      }
    }
    let coupon_num = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择发放数量'))
      } else if (value === '不限') {
        callback()
      } else {
        if (!this.formXxsz.coupon_limit) {
          callback(new Error('发放数量不能为空'))
        } else {
          callback()
        }
      }
    }
    let threshold_type = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择订单条件'))
      } else if (value === '元') {
        if (!this.formXxsz.ddMoney) {
          callback(new Error('订单金额不能为空'))
        } else {
          callback()
        }
      } else if (value === '罐') {
        if (!this.formXxsz.ddNumber) {
          callback(new Error('订单数量不能为空'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    let discount_type = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择折扣设置'))
      } else if (value === '金额') {
        if (!this.formXxsz.zkMoney) {
          callback(new Error('折扣金额不能为空'))
        } else {
          callback()
        }
      } else if (value === '折扣') {
        if (!this.formXxsz.zkNumber) {
          callback(new Error('折扣比例不能为空'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      base_url: BASE_URL,
      formXxsz: {
        coupon_no: '',
        coupon_name: '',
        trolley_show_name: '',
        order_show_name: '',
        start_time: '',
        end_time: '',
        dateRange: [],
        coupon_num: '',
        coupon_limit: '张',
        threshold_type: '',
        discount_type: ''
      },
      isShowTag: false,
      effectiveDate_s: '',
      effectiveDate_e: '',
      options: [],
      formYhsz: {},
      rules: {
        number: [{ type: 'number', required: true, message: '必须是数字' }],
        required: [
          { validator: required, message: '该项不能不空', trigger: 'blur' }
        ],
        length10: [{ validator: length10, trigger: 'blur' }],
        length5: [{ validator: length5, trigger: 'blur' }],
        dateRange: [{ validator: dateRange, trigger: 'blur' }],
        coupon_limit: [{ validator: coupon_num, trigger: 'blur' }],
        threshold_type: [{ validator: threshold_type, trigger: 'blur' }],
        discount_type: [{ validator: discount_type, trigger: 'blur' }]
      },
      userPage: 1,
      userPageOver: false, // 无限加载完毕
      goodsPage: 1,
      goodsPageOver: false,
      userKey: '',
      checkList: [],
      checkLists: [],
      activeSearch: '',
      activeGoods: [],
      goodList: [],

      multipleSelection: []
    }
  },
  directives: {
    loadmore: {
      // 指令的定义
      bind(el, binding, vnode) {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
          const sign = 10
          const scrollDistance =
            this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign) {
            binding.value()
          }
        })
      }
    }
  },
  async created() {
    if (this.action === 'add') {
      let a = this.getLabelData()
      // let b = this.getUserList()
      await a
    } else {
      await this.getLabelData()
      await this.getDetail(this.coupon_id)
    }
  },
  mounted() {
    let wrapH =
      $('.cjyhq-xxsz').height() +
      $('.cjyhq-spsz').height() -
      63 -
      70 -
      70 -
      62 -
      3
    $('.content__search--options').height(wrapH)
    let wrapW = $('.item__sale--wrap').width() - 130
    $('.item__sale--wrap .el-form-item__content').width(wrapW)
  },
  methods: {
    inputChange(e) {
      this.$forceUpdate()
    },
    changeDate(type) {
      if (type === 'start_time') {
        this.formXxsz.dateRange[0] = this.formXxsz.start_time
      } else {
        this.formXxsz.dateRange[1] = this.formXxsz.end_time
      }
    },
    showTag() {
      this.isShowTag = true
      let params = {
        page_count: 10,
        current_page: this.goodsPage
      }
      this.goodsPending = true
      return this.getGoodsList(params)
      .then(res => {
        this.goodsPending = false
        if (res.length < 10) {
          this.goodsPageOver = true
        } else {
          this.goodsPage++
          this.goodsPageOver = false
        }
        this.goodList = [...this.goodList, ...res]
        return res
      })
    },
    hideTag() {
      this.isShowTag = false
    },
    hideSetting(v = {}) {
      this.$emit('hide-setting', v)
    },
    handleSelectionChange(val) {
      this.userPageOver = false
      this.multipleSelection = val
    },
    handleAddGoods() {
      this.hideTag()
      this.activeGoods = _.cloneDeep(this.multipleSelection)
    },

    changeUserLabel() {
      this.userPage = 1
      this.checkLists = []
      this.getUserList()
    },
    handleSearch() {
      this.userPage = 1
      this.checkLists = []
      this.getUserList()
    },

    handleSave() {
      if (!this.activeGoods.length) {
        return this.$alert('活动商品不能为空！')
      }
      if (!this.checkList.length) {
        return this.$alert('用户列表不能为空！')
      }
      this.$refs.formXxsz.validate(valid => {
        if (valid) {
          let params = {
            coupon_type: this.type,
            coupon_no: this.formXxsz.coupon_no,
            coupon_name: this.formXxsz.coupon_name,
            order_show_name: this.formXxsz.order_show_name,
            trolley_show_name: this.formXxsz.trolley_show_name,
            start_time: moment(this.formXxsz.start_time).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
            end_time: moment(this.formXxsz.end_time).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
            threshold_type: this.formXxsz.threshold_type,
            threshold_num:
              this.formXxsz.threshold_type === '元'
                ? +this.formXxsz.ddMoney
                : +this.formXxsz.ddNumber,
            discount_type: this.formXxsz.discount_type,
            discount_num:
              this.formXxsz.discount_type === '金额'
                ? +this.formXxsz.zkMoney
                : +this.formXxsz.zkNumber,
            coupon_num: this.formXxsz.coupon_limit === '不限' ? 9999 : +this.formXxsz.coupon_num,
            goods_list: (this.activeGoods || []).map(item => item.goods_id),
            label_id: +this.formYhsz.user_label_id || 2,
            user_list: this.checkList
          }
          if (this.action === 'add') {
            this.$post('/marketing/add_coupon', params).then(res => {
              if (res.data === true && res.message === 'ok') {
                this.hideSetting({ state: 'success', type: this.type })
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              }
            })
          } else {
            params.coupon_id = this.coupon_id
            this.$post('/marketing/update_coupon', params).then(res => {
              if (res.data === true && res.message === 'ok') {
                this.hideSetting({ state: 'success', type: this.type })
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
              }
            })
          }
        }
      })
    },
    getLabelData() {
      return this.$get('/user/get_label').then(res => {
        if (res && res.length) {
          this.options = res
        } else {
          this.$message({
            type: 'info',
            message: '暂无标签数据'
          })
        }
      })
    },
    getDetail(coupon_id) {
      return this.$get(`/marketing/get_coupon_detail?coupon_id=${coupon_id}`)
        .then(res => {
          this.formXxsz = Object.assign({}, res.data)
          if (res.data.threshold_type === '元') {
            this.formXxsz.threshold_type = '元'
            this.formXxsz.ddNumber = ''
            this.formXxsz.ddMoney = res.data.threshold_num
          } else {
            this.formXxsz.threshold_type = '罐'
            this.formXxsz.ddNumber = res.data.threshold_num
            this.formXxsz.ddMoney = ''
          }
          if (res.data.discount_type === '折扣') {
            this.formXxsz.discount_type = '折扣'
            this.formXxsz.zkMoney = ''
            this.formXxsz.zkNumber = res.data.discount_num
          } else {
            this.formXxsz.discount_type = '金额'
            this.formXxsz.zkMoney = res.data.discount_num
            this.formXxsz.zkNumber = ''
          }
          if (res.data.coupon_num < 9999) {
            this.formXxsz.coupon_num = res.data.coupon_num
            this.formXxsz.coupon_limit = '张'
          } else {
            this.formXxsz.coupon_num = ''
            this.formXxsz.coupon_limit = '不限'
          }
          this.formXxsz.start_time = new Date(res.data.start_time)
          this.formXxsz.dateRange = [new Date(res.data.start_time), new Date(res.data.end_time)]
          this.formYhsz.user_label_id = res.data.user_label_id
          return {goods_list: res.data.goods_list, user_list: res.data.user_list}
        })
        .then(({goods_list, user_list}) => {
          let params = { goods_id: goods_list.join(',') }
          this.getGoodsList(params).then(res => {
            this.activeGoods = res
          })
          let paramsUser = { user_id: user_list.join(',') }
          this.getUsersList(paramsUser).then(res => {
            this.checkLists = res
            this.checkList = res.map(item => item.user_id)
          })
        })
    },
    // 获取标签数据
    getLabelData() {
      return this.$get('/user/get_label').then(res => {
        if (res && res.length) {
          this.options = res
        } else {
          this.$message({
            type: 'info',
            message: '暂无标签数据'
          })
        }
      })
    },
    getGoodsList(params) {
      return this.$get('/marketing/goods_list', { ...params })
      .then(res => {
        return res.data.data_list
      })
    },
    getUsersList(params) {
      return this.$get('/marketing/user_list', { ...params }).then(res => {
        return res.data.data_list
      })
    },
    loadData () {
      if (this.userPageOver) return
      this.getUserList()
    },
    loadGoods() {
      if (this.goodsPageOver) return
      if (this.goodsPending) return
      this.showTag()
    },
    getUserList() {
      let params = {
        search: this.userKey,
        page_count: 10,
        current_page: this.userPage,
        label_id: this.formYhsz.user_label_id
      }
      return this.$get('/marketing/user_list', { ...params }).then(res => {
        this.checkLists = [...this.checkLists, ...res.data.data_list]
        if (res.data.data_list.length < 10) {
          this.userPageOver = true
        } else {
          this.userPage++
          this.userPageOver = false
        }
        return res.data.data_list
      })
    }
  }
}
</script>

<style lang="less" scoped>
.yxmk-cjyhq {
  display: grid;
  grid-template-columns: 7fr 4fr;
  grid-column-gap: 20px;
  grid-template-areas:
    'headerLeft headerRight'
    'footer footer';
  .cjyhq-box {
    grid-area: headerLeft;
  }
  .cjyhq-box__setting {
    grid-area: headerRight;
  }
  .cjyhq-box__footer {
    grid-area: footer;
  }
  .cjyhq-title {
    width: 100%;
    height: 63px;
    line-height: 63px;
    font-size: 20px;
    background-color: #f7f8f9;
    border-radius: 6px 6px 0 0;
    padding: 0 20px;
  }
  .cjyhq-content {
    background-color: #fff;
    padding: 15px;
  }
  .content-content__item {
    /deep/ .el-input {
      width: 70%;
    }
    .content__item--tag {
      padding-left: 30px;
      width: 170px;
      font-size: 15px;
    }
    .content__item--input--img {
      width: 650px;
      white-space: nowrap;
      overflow: auto;
    }
    .content__item--unit,
    .content__item--rule {
      display: inline;
      padding-left: 20px;
      color: #fe4a56;
      font-size: 15px;
    }
    .content__item--unit {
      color: #333;
    }
    .content__item--btn {
      margin: 0 30px;
    }
    .form--dateSelect {
      width: 70%;
      display: inline-flex;
      justify-content: space-between;
    }
    .form--radio__ff {
      display: inline-block;
      margin-right: 30px;
      &:last-of-type {
        margin-right: unset;
      }
      & /deep/ .el-radio {
        margin-right: 10px;
      }
      .el-input {
        width: 110px;
      }
      span {
        margin-left: 5px;
      }
    }
    .date-throught {
      height: 2px;
      background-color: #363f51;
      width: 100%;
    }
  }
  .yhsz-content {
    padding: 15px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 0 0 6px 6px;
    .content__item--tag {
      width: 110px;
    }
    .content-content__item {
      margin-bottom: unset;
    }
    .el-select {
      width: 65%;
      /deep/ .el-input {
        width: 90%;
      }
    }
  }
  .yhsz-content--search {
    margin-bottom: unset;
  }
  .yhsz-search {
    background-color: #fff;
    .content__item--tag {
      width: 110px;
    }
    .content__group--btn {
      padding: 15px;
      text-align: end;
    }
  }
  .content__search--options {
    height: 627px;
    margin: 0 30px;
    border: 1px solid #d5d8db;
    overflow: auto;
    .el-checkbox {
      display: block;
      height: 75px;
      line-height: 75px;
      padding: 0 20px;
      margin-right: unset;
    }
  }
  .cjyhq-xxsz {
    .content__item--input {
      flex: 1;
    }
  }
  .cjyhq-spsz {
    margin-top: 20px;
    .form-spsz {
      /deep/ .el-form-item {
        margin-bottom: unset;
      }
      /deep/ .el-form-item__content {
        border: 1px solid #d5d8db;
        padding: 15px;
        width: 500px;
        overflow: auto;
        white-space: nowrap;
      }
    }
    .content-content__item {
      align-items: flex-start;
    }
    .content__item--input {
      border: 1px solid #d5d8db;
      // margin-right: 100px;
      padding: 10px 0;
    }
    .item__sale--wrap /deep/ .el-form-item__content {
      height: 132px;
    }
    .item__sale {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 100px;
      height: 100px;
      margin: 0 15px;
      .item__sale--img {
        width: 50px;
        height: 50px;
      }
      .item__sale--text {
        white-space: normal;
        word-break: break-word;
        height: 40px;
        line-height: 20px;
        margin-top: 10px;
      }
    }
  }
  .content-edit {
    background-color: #fff;
    padding: 15px;
    text-align: end;
    .content-edit--total {
      margin-right: 20px;
    }
  }
  .tag-dialog {
    .dialog-search {
      display: flex;
      align-items: center;
    }
    .dialog-list {
      display: flex;
      margin-top: 15px;
    }
    .dialog-btns {
      margin-top: 20px;
      text-align: center;
    }
    .search-list {
      flex: 1;
      border: 1px solid #d5d8db;
      border-radius: 4px;
      padding: 1px;
    }
    .search-title {
      width: 100px;
    }
    .search-input {
      flex: 1;
    }
    .search-button {
      padding-left: 20px;
    }
    .dialog-img {
      width: 100px;
    }
  }
}

.cjyhq-box__footer {
  background-color: #fff;
  height: 75px;
  line-height: 75px;
  text-align: end;
  margin-top: 20px;
  padding: 0 15px 0 15px;
}
</style>

<style lang='less'>
.el-tabs--border-card {
  box-shadow: none;
}
.el-input.data-input {
  width: 45%;
  .el-input__inner {
    padding-right: 15px;
    padding-left: 15px;
  }
  .el-input__prefix {
    right: 5px;
    left: unset;
  }
}
.content__search--options {
  .el-checkbox {
    .el-checkbox__label {
      margin-left: 40px;
    }
    &.is-checked {
      background-color: #ff4b57;
      .el-checkbox__label {
        color: #fff;
      }
    }
  }
}
</style>

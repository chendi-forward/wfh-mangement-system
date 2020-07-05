<template>
  <div class="yxmk-cjyhq">
    <div class="cjyhq-box">
      <div class="cjyhq-xxsz">
        <div class="cjyhq-title">活动信息设置</div>
        <el-form :model="formXxsz" class="cjyhq-content" ref="formXxsz" name="formXxsz" label-width="130px" label-position="left">
          <el-form-item class="content-content__item" label="活动名称：" prop="active_name" :rules='rules.length10'>
            <el-input v-model="formXxsz.active_name" placeholder="输入活动名称..."></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="已参加显示名称：" prop="order_show_name" :rules='rules.length10'>
            <el-input v-model="formXxsz.order_show_name" placeholder="输入已参加显示名称..."></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="下单页显示名称：" prop="trolley_show_name" :rules='rules.length5'>
            <el-input v-model="formXxsz.trolley_show_name" placeholder="输入下单页显示名称..."></el-input>
            <div class="content__item--rule">*5个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="极限销售额：" prop="jxsse" :rules="rules.jxsse">
            <el-input v-model="formXxsz.jxsse" placeholder="输入极限销售额..."></el-input>
            <div class="content__item--unit">（单位：元）</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="活动时间：" prop="dateRange" :rules='rules.dateRange'>
            <div class="form--dateSelect">
              <el-date-picker class="data-input" v-model="effectiveDate_s" @change='changeDate("start_time")' type="datetime" placeholder="选择时间..."></el-date-picker>
              <div style="width: 20px; display: flex; align-items: center;">
                <div class="date-throught"></div>
              </div>
              <el-date-picker class="data-input" v-model="effectiveDate_e" @change='changeDate("end_time")' type="datetime" placeholder="选择时间..."></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item class="content-content__item" label="订单条件：" prop="ddType" :rules='rules.threshold_type'>
            <el-radio-group v-model="formXxsz.ddType">
              <div class="form--radio__ff">
                <el-radio label="元">金额达到</el-radio>
                <el-input placeholder="输入数字..." type="number" v-model="formXxsz.ddMoney"></el-input>
                <span>元</span>
              </div>
              <div class="form--radio__ff">
                <el-radio label="罐">数量达到</el-radio>
                <el-input placeholder="输入数字..." type="number" v-model="formXxsz.ddNumber"></el-input>
                <span>罐</span>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="content-content__item" label="折扣设置：" prop="zkType" :rules='rules.discount_type'>
            <el-radio-group v-model="formXxsz.zkType">
              <div class="form--radio__ff">
                <el-radio label="金额">金额减扣</el-radio>
                <el-input placeholder="输入数字..." type="number" v-model="formXxsz.zkMoney"></el-input>
                <span>元</span>
              </div>
              <div class="form--radio__ff">
                <el-radio label="折扣">比例减扣</el-radio>
                <el-input placeholder="输入数字..." type="number" v-model="formXxsz.zkNumber"></el-input>
                <span>%</span>
              </div>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="cjyhq-spsz">
        <div class="cjyhq-title">活动商品设置</div>
        <el-form class="cjyhq-content form-spsz" name="formSpsz" label-width="130px" label-position="left">
          <el-form-item label="参与优惠商品：">
            <template v-if='goodsData.length'>
              <div class="item__sale" v-for="(item, index) in goodsData" :key="index">
                <img class="item__sale--img" :src=' base_url + item.pic_link' />
                <div class="item__sale--text text-overflow-mult">{{item.title}}</div>
              </div>
            </template>
            <div class="noData" v-else>
              暂无数据
            </div>
          </el-form-item>
        </el-form>
        <div class="content-edit">
          <span class="content-edit--total">共 {{goodsData.length}} 件</span>
          <el-button class="saveBtn" size="small" @click="showTag">{{updateFlag ? '更改' : '添加'}}</el-button>
        </div>
      </div>
    </div>
    <div class="cjyhq-box__setting">
      <div class="cjyhq-title">优惠用户设置</div>
      <el-form name="formYhsz" class="yhsz-content" label-width="90px" label-position="left">
        <el-form-item :label="selectTypeName" class="content-content__item" :show-message='false'>
          <el-select @change="labelChange" v-model="formYhsz.bqsx" multiple collapse-tags clearable placeholder="请选择...">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户筛选" class="content-content__item" :show-message='false'>
          <el-select @change="labelChange" v-model="formYhsz.yhsx" multiple collapse-tags clearable placeholder="请选择...">
            <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="yhsz-search">
        <el-form name="formYhsz" class="yhsz-content yhsz-content--search" label-width="90px" label-position="left">
          <el-form-item label="用户搜索：" class="content-content__item">
            <el-input type="text" v-model='userKey' placeholder="输入用户ID..."></el-input>
            <el-button size="small" class="searchBtn" @click='keyChangeUserData'>搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="content__search--options">
          <el-checkbox-group v-if='checkLists.length' v-model="checkList" v-infinite-scroll="loadData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <el-checkbox v-for="item in checkLists" :key="item.user_id" :label="item.user_id">{{item.nickname}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="cjyhq-box__footer">
      <el-button class="saveBtn" size="small" @click="saveActivity" v-if="!updateFlag">保存</el-button>
      <el-button class="saveBtn" size="small" @click="updateActivity" v-if="updateFlag">修改</el-button>
      <el-button @click="hideSetting" size="small">取消</el-button>
    </div>

    <dialog-com v-model="isShowTag" title="参加活动商品" :is-show-footer='false' class="tag-dialog">
      <div class="dialog-search">
        <div class="search-title">商品搜索：</div>
        <div class="search-input">
          <el-input type="text" v-model="activeSearch" placeholder="输入商品编号/商品名称..."></el-input>
        </div>
        <div class="search-button">
          <el-button class="searchBtn" @click="serchGoods">搜索</el-button>
        </div>
      </div>
      <div class="dialog-list">
        <div class="search-title">商品添加：</div>
        <div class="search-list">
          <div class="search-list--item">
            <el-table class="ssxd-table" ref="multipleTable" :data="activeGoods" tooltip-effect="dark" style="width: 100%" height='300' v-loadmore="load" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column align='center' label="商品图片" width="100">
                <template slot-scope="scope">
                  <img class="dialog-img" :src=" base_url + scope.row.pic_link" alt="">
                </template>
              </el-table-column>
              <el-table-column align='center' label="商品编号" width="130">
                <template slot-scope="scope">{{ scope.row.goods_id }}</template>
              </el-table-column>
              <el-table-column align='center' label="商品名称">
                <template slot-scope="scope">{{ scope.row.title }}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="dialog-btns">
        <el-button class="saveBtn" @click="sureAddGoods">确定</el-button>
        <el-button @click="hideTag">取消</el-button>
      </div>
    </dialog-com>
  </div>
</template>

<script>
import DialogCom from 'COMPONENTS/DialogCom'
import $ from 'jquery'
import moment from 'moment'
import { addActive, getActiveList, getActiveDetail, updateActive, getLableData, getGoodsList, getUserList } from 'API/Yxmk'
import CONFIG from '@/config/baseURL'
import { BASE_URL } from 'COMMONS/commonsConfig.js'
import _ from 'lodash'

const regPositvie = /^\d+(?=\.{0,1}\d+$|$)/
const regPositvie100 = /^100$|^(\d|[1-9]\d)(\.\d{1,4})*$/

export default {
  name: 'yxmk-cjyhq',
  components: {
    'dialog-com': DialogCom
  },
  props: {
    activeId: [String, Number],
    action: String
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
    let jxsse = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('该项为必填项'))
      } else if (!regPositvie.test(value)) {
        callback(new Error('请输入正数'))
      } else {
        callback()
      }
    }
    let threshold_type = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择订单条件'))
      } else if (value === '元') {
        if (!this.formXxsz.ddMoney) {
          callback(new Error('订单金额不能为空'))
        } else if (!regPositvie.test(this.formXxsz.ddMoney)) {
          callback(new Error('请输入非负数'))
        } else {
          callback()
        }
      } else if (value === '罐') {
        if (!this.formXxsz.ddNumber) {
          callback(new Error('订单数量不能为空'))
        } else if (!regPositvie.test(this.formXxsz.ddNumber)) {
          callback(new Error('请输入非负数'))
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
        } else if (!regPositvie.test(this.formXxsz.zkMoney)) {
          callback(new Error('请输入非负数'))
        } else {
          callback()
        }
      } else if (value === '折扣') {
        if (!this.formXxsz.zkNumber) {
          callback(new Error('折扣比例不能为空'))
        } else if (!regPositvie100.test(this.formXxsz.zkNumber)) {
          callback(new Error('请输入非负数'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      base_url: BASE_URL,

      updateFlag: false,
      busy: false,
      userKey: '',
      userPage: 1,
      goodsData: [],
      goodsPage: 1, // 商品页数
      total: 10, // 总件数
      formXxsz: {
        // active_no: "",
        active_name: '',
        order_show_name: '',
        trolley_show_name: '',
        jxsse: '',
        ffType: '1', // 发放类型
        ffNumber: '', // 发放数量
        ddType: '元', // 订单类型
        ddMoney: '', // 订单金额
        ddNumber: '', // 订单数量
        zkType: '金额', // 折扣设置
        zkMoney: '', // 减扣金额
        zkNumber: '', // 比例
        dateRange: [],
        discount_type: '' // 折扣方式
      },
      rules: {
        number: [{ type: 'number', required: true, message: '必须是数字' }],
        required: [{ validator: required, message: '该项不能不空', trigger: 'blur' }],
        length10: [{ validator: length10, trigger: 'blur' }],
        length5: [{ validator: length5, trigger: 'blur' }],
        dateRange: [{ validator: dateRange, trigger: 'blur' }],
        threshold_type: [{ validator: threshold_type, trigger: 'blur' }],
        jxsse: [{ validator: jxsse, trigger: 'blur' }],
        discount_type: [{ validator: discount_type, trigger: 'blur' }]
      },
      isShowTag: false,
      effectiveDate_s: '',
      effectiveDate_e: '',
      options: [],
      formYhsz: {
        bqsx: '',
        yhsx: ''
      },
      selectType: 'tab',
      selectTypeName: '标签筛选：',
      userTypeOptions: [
        { label: '所有用户', value: 'all' },
        { label: '1级用户', value: '1级用户' },
        { label: '2级用户', value: '2级用户' },
        { label: '3级用户', value: '3级用户' },
        { label: '4级用户', value: '4级用户' },
        { label: '5级用户', value: '5级用户' },
        { label: '普通用户', value: '普通用户' },
        { label: '企业用户', value: '企业用户' }
      ],
      checkList: [],
      checkLists: [],
      activeSearch: '',
      activeGoods: []
    }
  },
  watch: {
    activeId() {
      this.editOrcreate()
    }
  },
  mounted() {
    this.$nextTick(() => {
      let wrapH = $('.cjyhq-xxsz').height() + $('.cjyhq-spsz').height() - 123 - 40 - 70 - 62 - 3
      $('.content__search--options').height(wrapH)
    })
    if (this.action === 'add') {
    } else {
      this.editOrcreate()
    }
    this.getLableData()
    this.getUserData()
  },
  directives: {
    loadmore: {
      // 指令的定义
      bind(el, binding, vnode) {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
          const sign = 10
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign) {
            binding.value()
          }
        })
      }
    }
  },
  methods: {
    labelChange () {
      this.userPage = 1
      this.getUserData()
    },
    changeDate(type) {
      if (type === 'start_time') {
        this.formXxsz.dateRange[0] = this.effectiveDate_s
      } else {
        this.formXxsz.dateRange[1] = this.effectiveDate_e
      }
    },
    selectTypeChange(val) {
      if (val === 'tab') this.selectTypeName = '标签筛选：'
      if (val === 'user') this.selectTypeName = '用户筛选：'
      this.formYhsz.bqsx = ''
    },
    updateActivity() {
      let goods_id = []
      this.goodsData.forEach(item => {
        goods_id.push(item.goods_id)
      })
      let obj = {
        active_id: this.activeId,
        active_name: this.formXxsz.active_name, //  -- 活动标题
        order_show_name: this.formXxsz.order_show_name, //-- 在订单显示的名称
        trolley_show_name: this.formXxsz.trolley_show_name, // -- 在购物车的名称
        max_money: Number(this.formXxsz.jxsse), // 极限销售额
        start_time: moment(this.effectiveDate_s).format('YYYY-MM-DD hh:mm:ss'), // -- 开始时间
        end_time: moment(this.effectiveDate_e).format('YYYY-MM-DD hh:mm:ss'), // -- 结束时间
        threshold_type: this.formXxsz.ddType,
        threshold_num: this.formXxsz.ddType === '元' ? +this.formXxsz.ddMoney : +this.formXxsz.ddNumber,
        discount_type: this.formXxsz.zkType,
        discount_num: this.formXxsz.zkType === '金额' ? +this.formXxsz.zkMoney : +this.formXxsz.zkNumber,
        goods_list: goods_id, // -- 商品id 的列表
        user_list: this.checkList, // -- user_id
        label_id: this.formYhsz.bqsx || [],
        user_type: this.formYhsz.yhsx || []
      }
      updateActive(obj).then(res => {
        this.$emit('hide-setting')
      })
    },
    keyChangeUserData() {
      let obj = {
        search: this.userKey,
        label_id: this.formYhsz.bqsx.join(',') || '',
        user_type: this.formYhsz.yhsx.join(',') || '',
        page_count: 1000,
        current_page: 1
      }
      getUserList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.flag = false
        })
        if (this.updateFlag) {
          this.checkLists = _.uniqBy(this.checkLists.concat(result).reverse(), 'user_id')
        } else {
          this.checkLists = _.uniqBy(result.reverse(), 'user_id')
        }
      })
    },
    getUserData() {
      this.busy = true
      let obj = {
        search: this.userKey,
        label_id: this.formYhsz.bqsx.join(',') || '',
        user_type: this.formYhsz.yhsx.join(',') || '',
        page_count: 20,
        current_page: this.userPage
      }
      getUserList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.flag = false
        })
        if (!result.length) {
          if (this.userPage > 1) {
            this.userPage--
          }
        } else {
          this.checkLists = _.uniqBy(this.checkLists.concat(result).reverse(), "user_id")
        }
        this.busy = false
      })
    },
    getLableData() {
       getLableData().then(res => {
        this.options = res
      })
    },
    editOrcreate() {
      if (this.activeId) {
        this.updateFlag = true
        let obj = {
          active_id: this.activeId
        }
        getActiveDetail(obj).then(res => {
          let result = res.data
          this.checkList = result.user_list
          this.formXxsz.active_name = result.active_name
          this.formXxsz.order_show_name = result.order_show_name
          this.formXxsz.trolley_show_name = result.trolley_show_name
          this.formXxsz.jxsse = result.max_money
          this.formXxsz.zkType = result.discount_type
          this.formYhsz.bqsx = result.label_id
          this.formYhsz.yhsx = result.user_type
          result.discount_type === '折扣' ? (this.formXxsz.zkNumber = result.discount_num) : (this.formXxsz.zkMoney = result.discount_num)
          this.formXxsz.ddType = result.threshold_type
          result.threshold_type === '罐' ? (this.formXxsz.ddNumber = result.threshold_num) : (this.formXxsz.ddMoney = result.threshold_num)
          this.effectiveDate_s = result.start_time
          this.effectiveDate_e = result.end_time
          let str = result.goods_list.join(',')
          this.goodsFancha(str)
          let str2 = result.user_list.join(',')
          this.userFanCha(str2)
        })
      } else {
      }
    },
    // 用户反查
    userFanCha(str) {
      let obj = {
        user_id: str,
        page_count: 1000,
        current_page: 1
      }
      getUserList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.flag = true
        })
        this.checkLists = result
      })
    },
    // 货物反查
    goodsFancha(str) {
      let obj = {
        goods_id: str,
        page_count: 1000,
        current_page: 1
      }
      getGoodsList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.pic_link = item.pic_link
        })
        this.goodsData = result
      })
    },
    load() {
      this.goodsPage++
      this.showTag()
    },
    loadData() {
      this.userPage++
      this.getUserData()
    },
    saveActivity() {
      if (!this.goodsData.length) {
        return this.$message.error('活动商品不能为空！')
      }
      this.$refs.formXxsz.validate(valid => {
        if (valid) {
          let goods_id = []
          this.goodsData.forEach(item => {
            goods_id.push(item.goods_id)
          })
          let obj = {
            // active_no: this.formXxsz.active_no,          // -- 活动编号
            active_name: this.formXxsz.active_name, //  -- 活动标题
            order_show_name: this.formXxsz.order_show_name, //-- 在订单显示的名称
            trolley_show_name: this.formXxsz.trolley_show_name, // -- 在购物车的名称
            max_money: Number(this.formXxsz.jxsse), // 极限销售额
            start_time: moment(this.effectiveDate_s).format('YYYY-MM-DD hh:mm:ss'), // -- 开始时间
            end_time: moment(this.effectiveDate_e).format('YYYY-MM-DD hh:mm:ss'), // -- 结束时间
            threshold_type: this.formXxsz.ddType, //  -- 满减的单位（元/罐）
            threshold_num: this.formXxsz.ddType == '元' ? Number(this.formXxsz.ddMoney) : Number(this.formXxsz.ddNumber), // -- 满减的阈值
            discount_type: this.formXxsz.zkType, // -- 折扣的方式（折扣/金额）
            discount_num: this.formXxsz.zkType == '金额' ? Number(this.formXxsz.zkMoney) : Number(this.formXxsz.zkNumber), // -- 折扣的金额或百分比
            goods_list: goods_id, // -- 商品id 的列表
            user_list: this.checkList, // -- user_id
            label_id: this.formYhsz.bqsx || [],
            user_type: this.formYhsz.yhsx || []
          }
          addActive(obj).then(res => {
            this.$emit('hide-setting')
          })
        }
      })
    },
    sureAddGoods() {
      this.isShowTag = false
    },
    serchGoods() {
      let obj = {
        search: this.activeSearch,
        page_count: 100,
        current_page: 1
      }
      getGoodsList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.pic_link = item.pic_link
        })
        this.activeGoods = result
      })
    },
    showTag() {
      let obj = {
        page_count: 10,
        current_page: this.goodsPage
      }
      getGoodsList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.pic_link = item.pic_link
        })
        if (!result.length) {
          if (this.goodsPage > 1) {
            this.goodsPage--
          }
        } else {
          this.activeGoods = this.activeGoods.concat(result)
        }
        this.isShowTag = true
      })
    },
    hideTag() {
      this.isShowTag = false
      this.goodsData = []
    },
    hideSetting() {
      this.$emit('hide-setting')
    },
    handleSelectionChange(n) {
      this.goodsData = n
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
  .goodsImage {
    width: 100px;
    height: 50px;
  }
  .editBtn {
    background: #ff4b57;
    color: #fff;
  }
  .searchBtn {
    background: #ffe0e2;
    color: #ff4b57;
    border: 0px solid #000;
  }
  .saveBtn {
    background: #ff4b57;
    color: #fff;
  }
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
    .noData {
      width: 100%;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
  }
  .content-content__item {
    /deep/ .el-input {
      width: 70%;
    }
    .updateBtn {
      background: #ff4b57;
      color: #fff;
    }
    .searchBtn {
      background: #ffe0e2;
      color: #ff4b57;
      border: 0px solid #000;
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
      display: flex;
      justify-content: space-between;
    }
    .form--radio__ff {
      display: inline-block;
      margin-right: 30px;
      .el-radio {
        margin-right: 5px;
      }
      .el-input {
        width: 110px;
      }
      & > span {
        font-size: 14px;
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
    .content-content__item:last-of-type {
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
    padding-bottom: 30px;
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
        button {
          background: #ff4b57;
          color: #fff;
        }
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
    .item__sale {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 100px;
      height: 100px;
      margin: 0 25px;
      .item__sale--img {
        display: inline-block;
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
    button {
      color: #fff;
      background: #ff4b57;
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
      .saveBtn {
        background: #ff4b57;
        color: #fff;
      }
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

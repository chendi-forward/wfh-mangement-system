<template>
  <div class="yxmk-cjyhq">
    <div class="cjyhq-box">
      <div class="cjyhq-xxsz">
        <div class="cjyhq-title">活动信息设置</div>
        <el-form :model="formXxsz" class="cjyhq-content" ref="formXxsz" name="formXxsz" label-width="130px" label-position="left">
          <el-form-item class="content-content__item" label="活动编号：">
            <el-input v-model="formXxsz.active_no" placeholder="输入活动编号..."></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="活动名称：">
            <el-input v-model="formXxsz.active_name" placeholder="输入活动名称..."></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="已参加显示名称：">
            <el-input v-model="formXxsz.order_show_name" placeholder="输入已参加显示名称..."></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="下单页显示名称：">
            <el-input v-model="formXxsz.trolley_show_name" placeholder="输入下单页显示名称..."></el-input>
            <div class="content__item--rule">*5个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="极限销售额：">
            <el-input v-model="formXxsz.jxsse" placeholder="输入极限销售额..."></el-input>
            <div class="content__item--unit">（单位：元）</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="活动时间：">
            <div class="form--dateSelect">
              <el-date-picker
                class="data-input"
                v-model="effectiveDate_s"
                type="datetime"
                placeholder="选择时间..."
              ></el-date-picker>
              <div style="width: 20px; display: flex; align-items: center;">
                <div class="date-throught"></div>
              </div>
              <el-date-picker
                class="data-input"
                v-model="effectiveDate_e"
                type="datetime"
                placeholder="选择时间..."
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item class="content-content__item" label="订单条件：">
            <div class="form--radio__ff">
              <el-radio v-model="formXxsz.ddType" label="1">金额达到</el-radio>
              <el-input placeholder="输入数字..." type="number" v-model="formXxsz.ddMoney"></el-input>
              <span>元</span>
            </div>
            <div class="form--radio__ff">
              <el-radio v-model="formXxsz.ddType" label="2">数量达到</el-radio>
              <el-input placeholder="输入数字..." type="number" v-model="formXxsz.ddNumber"></el-input>
              <span>罐</span>
            </div>
          </el-form-item>
          <el-form-item class="content-content__item" label="折扣设置：">
              <div class="form--radio__ff">
                <el-radio v-model="formXxsz.zkType" label="1">金额减扣</el-radio>
                <el-input placeholder="输入数字..." type="number" v-model="formXxsz.zkMoney"></el-input>
                <span>元</span>
              </div>
              <div class="form--radio__ff">
                <el-radio v-model="formXxsz.zkType" label="2">比例减扣</el-radio>
                <el-input placeholder="输入数字..." type="number" v-model="formXxsz.zkNumber"></el-input>
                <span>%</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="cjyhq-spsz">
        <div class="cjyhq-title">活动商品设置</div>
        <el-form class="cjyhq-content form-spsz" name="formSpsz" label-width="130px" label-position="left">
          <el-form-item label="参与优惠商品：">
            <div class="item__sale" v-if='goodsData.length' v-for="(item, index) in goodsData" :key="index">
              <img class="item__sale--img" :src='item.pic_link' />
              <div class="item__sale--text text-overflow-mult">{{item.title}}</div>
            </div>
            <div class="noData" v-if='!goodsData.length'>
              暂无数据
            </div>
          </el-form-item>
        </el-form>
        <!-- <div class="content-content__item">
          <div class="content__item--tag">参与优惠商品：</div>
          <div class="content__item--input content__item--input--img">
            <div class="item__sale" v-for="item in 7">
              <img class="item__sale--img" src />
              <div class="item__sale--text text-overflow-mult">dafasefasdfasefadasdsdasfsad</div>
            </div>
          </div>
        </div> -->
        <div class="content-edit">
          <span class="content-edit--total">共 {{goodsData.length}} 件</span>
          <el-button class="saveBtn" size="small" @click="showTag">{{updateFlag ? '更改' : '添加'}}</el-button>
        </div>
      </div>
    </div>
    <div class="cjyhq-box__setting">
      <div class="cjyhq-title">优惠用户设置</div>
      <el-form name="formYhsz" class="yhsz-content" label-width="90px" label-position="left">
        <el-form-item label="标签筛选：" class="content-content__item" :show-message='false'>
          <el-select @change='keyChangeUserData' v-model="formYhsz.bqsx" placeholder="请选择...">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <!-- <el-button class="updateBtn" size="small">添加</el-button> -->
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
          <el-checkbox-group @change='userDataChange' v-if='checkLists.length' v-model="checkList" v-infinite-scroll="loadData">
            <el-checkbox v-for="(item, i) in checkLists" :key="i" :label="item.user_id" v-model='item.nickname' :checked='item.flag'></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="content__group--btn" v-if="updateFlag">
          <el-button class="editBtn" size="small" @click="getUserData">更改</el-button>
          <!-- <el-button size="small">取消</el-button> -->
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
            <el-table
              class="ssxd-table"
              ref="multipleTable"
              :data="activeGoods"
              tooltip-effect="dark"
              style="width: 100%"
              height='300'
              v-loadmore="load"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                align='center'
                label="商品图片"
                width="100">
                <template slot-scope="scope">
                  <img class="goodsImage" :src="scope.row.pic_link" alt="">
                </template>
              </el-table-column>
              <el-table-column
                align='center'
                label="商品编号"
                width="130">
                <template slot-scope="scope">{{ scope.row.goods_id }}</template>
              </el-table-column>
              <el-table-column
                align='center'
                label="商品名称">
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

export default {
	name: "yxmk-cjyhq",
	components: {
		'dialog-com': DialogCom
  },
  props: ['activeId'],
  data () {
    return {
      updateFlag: false,
      userKey: '',
      userPage: 1,
      goodsData: [],
      goodsPage: 1, // 商品页数
      total: 10, // 总件数
      formXxsz: {
        active_no: "",
        active_name: "",
        order_show_name: "",
        trolley_show_name: '',
        jxsse: "",
        ffType: "1", // 发放类型
        ffNumber: "", // 发放数量
        ddType: "1", // 订单类型
        ddMoney: "", // 订单金额
        ddNumber: "", // 订单数量
        zkType: '1', // 折扣设置
        zkMoney: '', // 减扣金额
        zkNumber: '' // 比例
			},
			isShowTag: false,
      effectiveDate_s: "",
      effectiveDate_e: "",
      options: ["九月大客户", "新用户"],
      formYhsz: {
        bqsx: ""
      },
      checkList: [],
      checkLists: [],
			activeSearch: '',
			activeGoods: []
    }
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
            // console.log('距离底部小于100了')
            // console.log(vnode.context)
            // // 指令中不能用this关键字
            // vnode.context.getNewData()
          }
        })
      }
    }
  },
  watch: {
    activeId () {
      this.editOrcreate()
    },
    'formYhsz.bqsx' () {
      this.checkLists = []
    }
  },
  mounted () {
    let wrapH = $('.cjyhq-xxsz').height() + $('.cjyhq-spsz').height() - 63 - 70 - 70 - 62 - 3
    $('.content__search--options').height(wrapH)
    this.editOrcreate()
    this.getUserData()
  },
	methods: {
    updateActivity () {
      // this.vaildFormData()
      let goods_id = []
      this.goodsData.forEach(item => {
        goods_id.push(item.goods_id)
      })
      let obj = {
        active_id: this.activeId,
        active_no: this.formXxsz.active_no,          // -- 活动编号
        active_name: this.formXxsz.active_name,     //  -- 活动标题
        order_show_name: this.formXxsz.order_show_name,      //-- 在订单显示的名称
        trolley_show_name: this.formXxsz.trolley_show_name,  // -- 在购物车的名称
        max_money: Number(this.formXxsz.jxsse), // 极限销售额
        start_time: moment(this.effectiveDate_s).format('YYYY-MM-DD hh:mm:ss'), // -- 开始时间
        end_time: moment(this.effectiveDate_e).format('YYYY-MM-DD hh:mm:ss'),    // -- 结束时间
        threshold_type: this.formXxsz.ddType == 1 ? '元' : '罐',          //  -- 满减的单位（元/罐）
        threshold_num: this.formXxsz.ddType == 1 ? Number(this.formXxsz.ddMoney): Number(this.formXxsz.ddNumber),             // -- 满减的阈值
        discount_type: this.formXxsz.zkType == 1 ? '金额' : '折扣',          // -- 折扣的方式（折扣/金额）
        discount_num: this.formXxsz.zkType == 1 ? Number(this.formXxsz.zkMoney) : Number(this.formXxsz.zkNumber),               // -- 折扣的金额或百分比
        goods_list: goods_id,  // -- 商品id 的列表
        label_id: 1,      //   -- 用户标签的id
        user_list: this.checkList // -- user_id
      }
      console.log(obj, '=====')
      updateActive(obj).then(res => {
        console.log(res, '=====dwadaw====')
        this.$emit('hide-setting')
      })
    },
    userDataChange (n) {
      console.log(n, '====')
    },
    keyChangeUserData () {
      let obj = {
        search: this.userKey,
        label_id: this.formYhsz.bqsx,
        page_count: 1000,
        current_page: 1
      }
      getUserList(obj).then(res => {
        console.log(res, '=====user====')
        let result = res.data.data_list
        result.forEach((item) => {
          item.flag = false
        })
        if (this.updateFlag) {
          this.checkLists = this.checkLists.concat(result)
        } else {
          this.checkLists = result
        }
      })
    },
    getUserData () {
      let obj = {
        search: this.userKey,
        label_id: this.formYhsz.bqsx,
        page_count: 20,
        current_page: this.userPage
      }
      getUserList(obj).then(res => {
        let result = res.data.data_list
        result.forEach((item) => {
          item.flag = false
        })
        if (!result.length) {
          if (this.userPage > 1) {
            this.userPage--
          }
        } else {
          this.checkLists = this.checkLists.concat(result)
        }
      })
      getLableData().then(res => {
        this.options = res
      })
    },
    editOrcreate () {
      if (this.activeId) {
        this.updateFlag = true
        let obj = {
          active_id: this.activeId
        }
        getActiveDetail(obj).then(res => {
          console.log(res, '===edit===')
          let result = res.data;
          this.formXxsz.active_no = result.active_no;
          this.formXxsz.active_name = result.active_name;
          this.formXxsz.order_show_name = result.order_show_name;
          this.formXxsz.trolley_show_name = result.trolley_show_name;
          this.formXxsz.jxsse = result.max_money;
          this.formXxsz.zkType = result.discount_type == '折扣' ? '1' : '2';
          result.discount_type == '折扣' ? this.formXxsz.ddMoney = result.discount_num : this.formXxsz.ddNumber = result.discount_num;
          this.formXxsz.ddType = result.threshold_type == '罐' ? '1' : '2';
          result.threshold_type == '罐' ? this.formXxsz.zkMoney = result.threshold_num : this.formXxsz.zkNumber = result.threshold_num;
          this.effectiveDate_s = result.start_time;
          this.effectiveDate_e = result.end_time;
          this.formYhsz.bqsx = result.user_label_id;
          let str = result.goods_list.join(',')
          this.goodsFancha(str);
          let str2 = result.user_list.join(',')
          this.userFanCha(str2)
        })
      } else {
        console.log('创建')
      }
    },
    // 用户反查
    userFanCha (str) {
      let obj = {
        user_id: str,
        page_count: 1000,
        current_page: 1,
      }
      getUserList(obj).then(res => {
        let result = res.data.data_list
        result.forEach((item) => {
          item.flag = true
        })
        this.checkLists = result
      })
    },
    // 货物反查
    goodsFancha (str) {
      let obj = {
        goods_id: str,
        page_count: 1000,
        current_page: 1,
      }
      getGoodsList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.pic_link = CONFIG.api + item.pic_link
        })
        this.goodsData = result
        console.log(this.activeGoods, '===002222200===')
      })
    },
    load () {
      this.goodsPage++
      this.showTag()
    },
    loadData () {
      this.userPage++
      this.getUserData()
    },
    vaildFormData () {
      if (this.formXxsz.number || this.formXxsz.number.length < 1 || this.formXxsz.number.length > 10) {
        this.$message({
          message: '请正确填写活动编号',
          type: 'error'
        });
        return
      }
      if (this.formXxsz.yhqName || this.formXxsz.yhqName.length < 1 || this.formXxsz.yhqName.length > 10) {
        this.$message({
          message: '请正确填写活动名称',
          type: 'error'
        });
        return
      }
      if (this.formXxsz.ycjName || this.formXxsz.ycjName.length < 1 || this.formXxsz.ycjName.length > 10) {
        this.$message({
          message: '请正确填写已参加显示名称',
          type: 'error'
        });
        return
      }
      if (this.formXxsz.jxsse || this.formXxsz.jxsse.length < 1 || this.formXxsz.jxsse.length > 5) {
        this.$message({
          message: '请正确填写下单页名称',
          type: 'error'
        });
        return
      }
    },
    saveActivity () {
      // this.vaildFormData()
      let goods_id = []
      this.goodsData.forEach(item => {
        goods_id.push(item.goods_id)
      })
      let obj = {
        active_no: this.formXxsz.active_no,          // -- 活动编号
        active_name: this.formXxsz.active_name,     //  -- 活动标题
        order_show_name: this.formXxsz.order_show_name,      //-- 在订单显示的名称
        trolley_show_name: this.formXxsz.trolley_show_name,  // -- 在购物车的名称
        max_money: Number(this.formXxsz.jxsse), // 极限销售额
        start_time: moment(this.effectiveDate_s).format('YYYY-MM-DD hh:mm:ss'), // -- 开始时间
        end_time: moment(this.effectiveDate_e).format('YYYY-MM-DD hh:mm:ss'),    // -- 结束时间
        threshold_type: this.formXxsz.ddType == 1 ? '元' : '罐',          //  -- 满减的单位（元/罐）
        threshold_num: this.formXxsz.ddType == 1 ? Number(this.formXxsz.ddMoney): Number(this.formXxsz.ddNumber),             // -- 满减的阈值
        discount_type: this.formXxsz.zkType == 1 ? '金额' : '折扣',          // -- 折扣的方式（折扣/金额）
        discount_num: this.formXxsz.zkType == 1 ? Number(this.formXxsz.zkMoney) : Number(this.formXxsz.zkNumber),               // -- 折扣的金额或百分比
        goods_list: goods_id,  // -- 商品id 的列表
        label_id: 1,      //   -- 用户标签的id
        user_list: this.checkList // -- user_id
      }
      console.log(obj, '=====')
      addActive(obj).then(res => {
        console.log(res, '=====dwadaw====')
        this.$emit('hide-setting')
      })
    },
    sureAddGoods () {
      this.isShowTag = false
    },
    serchGoods () {
      let obj = {
        search: this.activeSearch,
        page_count: 100,
        current_page: 1
      }
      getGoodsList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.pic_link = CONFIG.api + item.pic_link
        })
        this.activeGoods = result
      })
    },
		showTag () {
      let obj = {
        page_count: 10,
        current_page: this.goodsPage
      }
      getGoodsList(obj).then(res => {
        let result = res.data.data_list
        result.forEach(item => {
          item.pic_link = CONFIG.api + item.pic_link
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
		hideTag () {
      this.isShowTag = false
      this.goodsData = []
    },
    hideSetting () {
      this.$emit('hide-setting')
    },
		handleSelectionChange (n) {
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
    "headerLeft headerRight"
    "footer footer";
  .goodsImage {
    width: 100px;
    height: 50px;
  }
  .editBtn {
    background: #ff4b57;
    color: #fff;
  }
  .searchBtn {
    background: #FFE0E2;
    color: #FF4B57;
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
      background: #FFE0E2;
      color: #FF4B57;
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
        margin-right: unset;
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
    padding-bottom: 60px;
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

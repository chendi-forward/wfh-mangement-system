<template>
  <div class="yxmk-yhqgl">
    <yxmk-head :info='info'></yxmk-head>
    <div class="yhqgl-body">
      <div class="yhqgl-body__head">
        <div class="body__head--title">优惠券表</div>
        <div class="body__head--btn">
          <el-button type="success" @click="showCreateItem('普通')" size="small">创建</el-button>
        </div>
      </div>
      <div class="yhqgl-body__content">
        <el-table class="ssxd-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="优惠券编号" align='center' prop="coupon_no" show-overflow-tooltip min-width="150">
          </el-table-column>
          <el-table-column align='center' min-width="150" prop="coupon_name" label="优惠券名称">
          </el-table-column>
          <el-table-column align='center' label="数量" prop="coupon_num" width="90">
          </el-table-column>
          <el-table-column align='center' label="折扣比例（%）" prop="discount_percent" width="120">
          </el-table-column>
          <el-table-column align='center' label="扣减金额（元）" prop="discount_money" width="140">
          </el-table-column>
          <el-table-column align='center' width="170" prop="start_time" label="起始时间">
          </el-table-column>
          <el-table-column align='center' width="170" prop="end_time" label="结束时间">
          </el-table-column>
          <el-table-column align='center' label="状态" prop="state" width="80">
          </el-table-column>
          <el-table-column label="操作" align='center' width="120">
            <template slot-scope="scope">
              <el-button size="small" icon="el-icon-edit" @click='editHandle(scope.row)'></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="ssxd-footer">
          <div class="selectAll-wrap">
            <el-button size="small" type="danger" @click="deleteClickMulti">下线</el-button>
          </div>
          <div class="page-wrap">
            <my-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total">
            </my-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="yhqgl-footer">
      <div class="yhqgl-body__head">
        <div class="body__head--title">新手优惠券设置</div>
        <div class="body__head--btn">
          <el-button type="success" @click="handleAddProduct" size="small">添加商品</el-button>
          <el-button v-show="isEdit" type="success" @click="handleSaveNew" size="small">保存</el-button>
          <el-button v-show="isEdit" @click="handleCancelNew" size="small">取消</el-button>
          <el-button v-show="!isEdit" type="success" @click="handleEditNew" size="small">编辑</el-button>
        </div>
      </div>
      <div class="yhqgl-body__content">
        <el-table class="ssxd-table" ref="multipleTable" :data="newerSetting" tooltip-effect="dark" style="width: 100%">
          <el-table-column align='center' min-width="150" label="优惠券名称">
            <template slot-scope="scope">{{ scope.row.coupon_name }}</template>
          </el-table-column>
          <el-table-column align='center' label="数量" min-width="120">
            <template slot-scope="scope">
              <span v-show="!isEdit">{{ scope.row.coupon_num }}</span>
              <el-input type="number" v-show="isEdit" v-model.number="scope.row.coupon_num"></el-input>
            </template>
          </el-table-column>
          <el-table-column align='center' label="折扣比例（%）" min-width="80">
            <template slot-scope="scope">
              <span v-show="!isEdit || newerSetting[0].discount_type !== '折扣'">{{ scope.row.discount_percent }}</span>
              <el-input type="number" v-show="isEdit && newerSetting[0].discount_type === '折扣'" v-model.number="scope.row.discount_percent"></el-input>
            </template>
          </el-table-column>
          <el-table-column align='center' label="生效天数" min-width="120">
            <template slot-scope="scope">
              <span v-show="!isEdit">{{ scope.row.days }}</span>
              <el-input type="number" v-show="isEdit" v-model.number="scope.row.days"></el-input>
            </template>
          </el-table-column>
          <el-table-column align='center' width="120px" label="关联商品" type="expand" min-width="120">
            <template slot-scope="scope">
              <el-table class="ssxd-table" ref="multipleTable" :data="tableDataNew" tooltip-effect="dark" style="width: 100%" stripe>
                <el-table-column label="商品名称" align='center' width="150" prop="title"></el-table-column>
                <el-table-column label="商品图片" align='center' width="150" prop="pic_link">
                  <template slot-scope="scopeSub">
                    <img width="100" height="100" :src="scopeSub.row.pic_link" alt="">
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="状态" align='center' min-width="160">
            <template slot-scope="scope">
              <el-radio-group :disabled='!isEdit' v-model="scope.row.is_close" @change="val => changeClose(val, scope.row)">
                <el-radio :label="0">开启</el-radio>
                <el-radio :label="1">关闭</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="yxmk-setting" v-if='isShowSetting'>
      <yhq-setting @hide-setting="hideSetting" :action='action' :type='type' ref="yhqSetting" :coupon_id="coupon_id"></yhq-setting>
    </div>

    <dialog-com v-model="isShowTag" title="参加活动商品" :is-show-footer='false' class="tag-dialog">
      <div class="item__sale--wrap">
        <div class="item__sale" v-for="item in multipleSelectionNew" :key="item.goods_id">
          <img class="item__sale--img" :src='base_url + item.pic_link' />
          <div class="item__sale--text text-overflow-mult">{{item.title}}</div>
        </div>
      </div>
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
            <el-table class="ssxd-table" ref="multipleTable" :data="goodList" tooltip-effect="dark" style="width: 100%" height='300' v-infinite-scroll="loadGoods" @selection-change="handleSelectionChangeNew">
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
import Pagination from 'COMPONENTS/Pagination'
import YxmkHead from './CommonComponents/YxmkHead'
import YhqSetting from './YxmkSetting/YhqSetting'
import moment from 'moment'
import _ from 'lodash'
import DialogCom from 'COMPONENTS/DialogCom'
import { BASE_URL } from 'COMMONS/commonsConfig.js'

export default {
  name: 'yxmk-yhqgl',
  components: {
    'my-pagination': Pagination,
    'yxmk-head': YxmkHead,
    'yhq-setting': YhqSetting,
    'dialog-com': DialogCom
  },
  data() {
    return {
      tableData: [],
      newerSetting: [{}],
      total: 0,
      isShowSetting: false,
      action: 'add',
      type: '普通',
      coupon_id: '',
      multipleSelection: [],
      info: {
        active: 0,
        coupon: 0
      },
      // 新手优惠券
      base_url: BASE_URL,
      isEdit: false,
      isShowTag: false,
      activeSearch: '',
      goodList: [],
      multipleSelectionNew: [],
      tableDataNew: []
    }
  },
  created() {
    this.getData('普通')
    this.getData('新手')
    this.getCount()
  },
  methods: {
    serchGoods() {
      let params = {
        search: this.activeSearch,
        page_count: 100,
        current_page: 1
      }
      return this.getGoodsList(params).then(res => {
        this.goodsPending = false
        if (res.length < 10) {
          this.goodsPageOver = true
        } else {
          this.goodsPage++
          this.goodsPageOver = false
        }
        this.goodList = [...res]
        return res
      })
    },
    showCreateItem(type) {
      this.action = 'add'
      this.isShowSetting = true
      this.type = type
    },
    hideSetting(val) {
      this.isShowSetting = false
      if (Object.keys(val) && val.state === 'success') {
        this.getData(val.type)
      }
    },
    editHandle(row) {
      this.action = 'edit'
      this.isShowSetting = true
      this.coupon_id = row.coupon_id
    },
    handleSizeChange(v) {
      this.page_count = v
      this.current_page = 1
      this.getData('普通')
    },
    handleCurrentChange(v) {
      this.current_page = v
      this.getData('普通')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteClickMulti() {
      if (!this.multipleSelection.length) return
      let ids = this.multipleSelection.map(item => item.coupon_id)
      let names = this.multipleSelection.map(item => item.coupon_name)
      this.handleDelete(ids, names)
    },
    handleDelete(_ids, _names) {
      let names = _names.join(',')
      let ids = _ids.join(',')
      this.$confirm(`确定要下线“${names}”吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.deleteData(ids)
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '下线成功!'
          })
        })
    },
    changeClose(val, row) {
      this.$post('/marketing/close_coupon', { coupon_id: '' + row.coupon_id, is_close: '' + val }).then(res => {
        // console.log(res)
      })
    },
    deleteData(ids) {
      this.$post('/marketing/delete_coupon', { coupon_id: ids })
        .then(res => {
          this.getData()
        })
        .catch(err => {
          this.$message({
            type: 'warning',
            message: '请求出错!'
          })
        })
    },

    // 新手优惠券
    handleAddProduct() {
      this.showTag()
    },
    sureAddGoods() {
      let params = {
        coupon_type: '新手',
        coupon_id: this.newerSetting[0].coupon_id,
        coupon_type: '新手',
        coupon_name: '新手优惠券',
        order_show_name: '新手优惠券',
        trolley_show_name: '新手优惠券',
        discount_type: '折扣',
        discount_num: this.newerSetting[0].discount_percent,
        coupon_num: this.newerSetting[0].coupon_num,
        threshold_type: '元',
        threshold_num: 0,
        start_time: moment().format('YYYY-MM-DD 00:00:00'),
        end_time: moment()
          .add(this.newerSetting[0].days, 'days')
          .format('YYYY-MM-DD 00:00:00'),
        is_close: Number(this.newerSetting[0].is_close),
        goods_list: (this.multipleSelectionNew || []).map(item => item.goods_id)
      }
      this.$post('/marketing/update_coupon', params).then(res => {
        if (res.message === 'ok') {
          this.isShowTag = false
          this.getGoodsListNew()
          this.$message.success('修改成功！')
        } else {
          this.$message.error('修改异常！')
        }
      })
    },
    hideTag() {
      this.multipleSelectionNew = []
    },
    loadGoods() {
      if (this.goodsPageOver) return
      if (this.goodsPending) return
      this.showTag()
    },
    showTag() {
      this.isShowTag = true
      let params = {
        page_count: 10,
        current_page: this.goodsPage
      }
      this.goodsPending = true
      return this.getGoodsList(params).then(res => {
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
    getGoodsList(params) {
      return this.$get('/marketing/goods_list', { ...params }).then(res => {
        return res.data.data_list
      })
    },
    handleSelectionChangeNew(val) {
      this.multipleSelectionNew = val
    },
    getGoodsListNew() {
      this.$get('/marketing/get_coupon_detail?coupon_id=' + this.newerSetting[0].coupon_id).then(res => {
        if (res.data && res.data.goods_list) {
          this.getGoodsList({ goods_id: res.data.goods_list.join(',') }).then(sub_res => {
            this.tableDataNew = sub_res
          })
        }
      })
    },

    // 点击编辑新用户按钮
    handleEditNew() {
      this.cloneNewerSetting = _.cloneDeep(this.newerSetting)
      this.isEdit = true
    },
    // 编辑新用户
    handleSaveNew() {
      this.isEdit = false
      let params = {
        coupon_id: this.newerSetting[0].coupon_id,
        coupon_type: '新手',
        coupon_name: '新手优惠券',
        order_show_name: '新手优惠券',
        trolley_show_name: '新手优惠券',
        discount_type: '折扣',
        discount_num: this.newerSetting[0].discount_percent,
        coupon_num: this.newerSetting[0].coupon_num,
        threshold_type: '元',
        threshold_num: 0,
        start_time: moment().format('YYYY-MM-DD 00:00:00'),
        end_time: moment()
          .add(this.newerSetting[0].days, 'days')
          .format('YYYY-MM-DD 00:00:00'),
        is_close: Number(this.newerSetting[0].is_close)
      }
      this.$post('/marketing/update_coupon', params).then(res => {
        if (res.message === 'ok') {
          this.$message.success('修改成功！')
        } else {
          this.$message.error('修改异常！')
        }
      })
      // this.$post
    },
    // 取消编辑新用户
    handleCancelNew() {
      this.isEdit = false
      this.newerSetting = this.cloneNewerSetting
    },

    getData(coupon_type) {
      let params = {
        page_count: this.page_count,
        current_page: this.current_page,
        coupon_type
      }
      if (coupon_type === '新手') {
        params.current_page = 1
        params.page_count = 1000
      }
      this.$get('/marketing/get_coupon_list', params).then(res => {
        if (res.message === 'ok') {
          if (coupon_type === '新手') {
            this.newerSetting = res.data.data_list.map(item => {
              let days = moment(item.end_time) - moment(item.start_time)
              return {
                ...item,
                days: moment.duration(days).days(),
                discount_percent: item.discount_type === '折扣' ? item.discount_num : '',
                discount_money: item.discount_type === '折扣' ? '' : item.discount_num
              }
            })
            this.getGoodsListNew()
          } else {
            this.tableData = res.data.data_list.map(item => {
              return {
                ...item,
                discount_percent: item.discount_type === '折扣' ? item.discount_num : '',
                discount_money: item.discount_type === '折扣' ? '' : item.discount_num
              }
            })
            this.total = res.data.count
          }
        }
      })
    },
    getCount() {
      this.$get('/marketing/discounts_info').then(res => {
        this.info = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.yxmk-yhqgl {
  position: relative;

  .yhqgl-body,
  .yhqgl-footer {
    .yhqgl-body__head {
      height: 65px;
      line-height: 65px;
      background-color: #f7f8f9;
      display: flex;
      padding: 0 30px 0 45px;
      border-radius: 6px 6px 0 0;
      .body__head--title {
        flex: 1;
      }
    }
  }
  .yhqgl-body {
    margin-bottom: 15px;
  }
  .yxmk-setting {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background-color: #f1f3f5;
    // z-index: 3;
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
      width: 132px;
    }
    .item__sale--wrap {
      border: 1px solid #d5d8db;
      padding: 10px 0;
      height: 120px;
      width: 100%;
      white-space: nowrap;
      overflow-x: auto;
      margin-bottom: 10px;
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
}
</style>

<style lang='less'>
.el-tabs--border-card {
  box-shadow: none;
}
.yhqgl-body__content {
  .el-table__row {
    button {
      border: 0px solid #000;
      color: #ff4b57;
      font-size: 18px;
    }
  }
  .el-table__row:hover {
    button {
      background: #f1f1f1;
    }
  }
}
.body__head--btn--sale {
  margin-right: 30px;
}
</style>

import Pagination from 'COMPONENTS/Pagination'
import boxIcon from 'ASSETS/image/box_icon.png'
import carIcon from 'ASSETS/image/car_icon.png'
import homeIcon from 'ASSETS/image/home_icon.png'
import {saleHead, orderList, orderGoods, applyRefund, deliverGoods} from 'API/Shgl'
import moment from 'moment'
import createCom from '../coms/create'
import DialogCom from 'COMPONENTS/DialogCom'
import EditLogistics from '../coms/editLogistics'
import {tableToExcel} from 'COMMONS/util.js'

export default {
  name: 'shgl-ddlb',
  components: {
    'my-pagination': Pagination,
    'dialog-com': DialogCom,
    'create-com': createCom,
    'editLogistics-dialog': EditLogistics
  },
  data () {
    return {
      boxIcon,
      carIcon,
      homeIcon,
      dialogFlag: false,
      saleHead: {
        all_count: {},
        delivered: [{}],
        undelivered: [{}],
        inventory: [{}]
      },
      saleHeadIndex: {
        delivered: 0,
        undelivered: 0,
        inventory: 0
      },
      time: null,
      tableData: [{
        address: "3",
        express_number: null,
        nickname: "WFH49939757",
        order_id: "WFH49939757201909050011021261",
        order_state: "待评价",
        pay_money: 3000,
        rebate_money: 300,
        update_time: "2019-12-15 14:11:35.181464",
        user_id: "WFH49939757",
        wechat_id: null
      }],
      tabs: [
        {label: '全部订单', name: '-1'}, {label: '未付款', name: '0'}, {label: '已付款', name: '1'}, {label: '已发货', name: '2'},
        {label: '已成交', name: '3'}, {label: '退款中', name: '5'}, {label: '已关闭', name: '6'}
      ],
      currentTab: '-1',
      orderParams: {
        current_page: 1,
        page_count: 10,
        status: '',
        number: '',
        user: '',
        s_time: '',
        e_time: ''
      },
      total: 40,
      tlxx: {
        refund_money: 0,
        after_sale_type: '退货退款',
        goods: [],
        refund_goods: [],
        order_id: '',
        sale_state: '', // 订单状态
        remark: '' // 备注
      },
      currentCom: {name: '新建退款', com: 'create-com', data: this.tlxx, showBtn: true, handle: this.tuikuanHandle},
      coms: [
        {name: '发货', com: 'editLogistics-dialog', data: { name: '', express_number: '', order_id: '' }, showBtn: true, handle: this.fahuoHandle},
        {name: '新建退款', com: 'create-com', data: this.tlxx, showBtn: true, handle: this.tuikuanHandle}
      ]
    }
  },
  created () {
    this.initData()
  },
  watch: {
    time () {
      if (this.time) {
        this.orderParams.s_time = moment(this.time[0]).format('YYYY-MM-DD')
        this.orderParams.e_time = moment(this.time[1]).format('YYYY-MM-DD')
      } else {
        this.orderParams.s_time = ''
        this.orderParams.e_time = ''
      }
    }
  },
  methods: {
    initData () {
      saleHead().then(res => {
        this.saleHead = res.data
      })
      this.getOrderList()
    },
    getOrderList (data={}) { // 获取订单列表
      // > number  -- 订单id
      // > user    -- 用户信息(用户id 或昵称)
      // > s_time   -- 开始时间
      // > e_time   -- 结束时间
      // > status      --订单状态 (0 待付款， 1 已付款， 2 已发货,  3. 已成交  5. 退款中  6.已关闭, 全部传入空)
      // > page_count     -- 每页的数量
      // > current_page  -- 当前也
      orderList(Object.assign(this.orderParams, data)).then(res => {
        this.total = res.data.count // data_list
        this.tableData = res.data.data_list
      })
    },
    search () {
      this.getOrderList()
    },
    lunbo (prop, type) {
      if (type == 'up') {
        this.saleHeadIndex[prop] ++
        if (this.saleHeadIndex[prop] >= this.saleHead[prop].length) {
          this.saleHeadIndex[prop] = 0
        }
      } else {
        this.saleHeadIndex[prop] --
        if (this.saleHeadIndex[prop] <= 0) {
          this.saleHeadIndex[prop] = this.saleHead[prop].length - 1
        }
      }
    },
    tabChage () {
      this.orderParams.current_page = 1
      this.orderParams.status = this.currentTab == '-1' ? '' : this.currentTab - 0
      this.getOrderList()
    },
    handleSelectionChange () {},
    lineItem (row) {
      this.$router.push({
        name: 'shgl-ddxq',
        query: row
      })
    },
    toList (name) {
      this.$router.push({
        name
      })
    },
    xiazai () {
      this.tableToExcel()
    },
    fahuo (row) {
      this.currentCom = this.coms[0]
      this.currentCom.data.order_id = row.order_id
      this.dialogFlag = true
    },
    tuikuan (row) {
      this.currentCom = this.coms[1]
      this.dialogFlag = true
      orderGoods({
        order_id: row.order_id
      }).then(res => {
        this.tlxx.order_id = row.order_id
        this.tlxx.sale_state = row.order_state
        this.tlxx.goods = res.data
      })
    },
    deleteOrder () {},
    handleSizeChange (value) { // 每页显示数量变化
      this.orderParams.page_count = value
      this.getOrderList()
    },
    handleCurrentChange (value) { // 当前页改变
      this.orderParams.current_page = value
      this.getOrderList()
    },
    fahuoHandle () {
      deliverGoods(this.currentCom.data).then(res => {
        if (res.data) {
          this.$message.success('发货成功！')
          this.getOrderList()
        } else {
          this.$message.error('发货失败！')
        }
      }) 
    },
    tuikuanHandle () {
      if (this.tlxx.refund_money > this.tlxx.refund_money_copy) {
        return this.$message.error('保存失败，退款金额不得大于订单总金额')
      }
      delete this.tlxx.goods
      delete this.tlxx.refund_money_copy
      applyRefund(this.tlxx).then(res => {
        if (res.data) {
          this.$message.success('退款成功！')
          this.getOrderList()
        } else {
          this.$message.error('退款失败！')
        }
      })
      this.dialogFlag = false
    },
    cancleSave () {
      this.dialogFlag = false
    },
    tableToExcel(){
      let map = [
        {name: 'nickname', value: '昵称'},
        {name: 'order_id', value: '订单号'},
        {name: 'order_state', value: '订单状态'},
        {name: 'pay_money', value: '实付金额'},
        {name: 'rebate_money', value: '返利金额'},
        {name: 'update_time', value: '更新时间'},
        {name: 'user_id', value: '用户ID'},
        {name: 'wechat_id', value: '微信交易号'},
        {name: 'address', value: '收货地址'},
        {name: 'express_number', value: '物流单号'},
      ]
      tableToExcel({
        name: "订单列表.xlsx",
        data: this.tableData,
        map
      })
    }
  }
}

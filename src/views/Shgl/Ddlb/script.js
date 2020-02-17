import Pagination from 'COMPONENTS/Pagination'
import boxIcon from 'ASSETS/image/box_icon.png'
import carIcon from 'ASSETS/image/car_icon.png'
import homeIcon from 'ASSETS/image/home_icon.png'
import {saleHead, orderList, orderGoods, applyRefund} from 'API/Shgl'
import moment from 'moment'
import createCom from '../coms/create'
import DialogCom from 'COMPONENTS/DialogCom'

export default {
  name: 'shgl-ddlb',
  components: {
    'my-pagination': Pagination,
    'dialog-com': DialogCom,
    'create-com': createCom
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
      }
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
        console.log('1111', res)
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
    tuikuan (row) {
      orderGoods({
        order_id: row.order_id
      }).then(res => {
        this.tlxx.order_id = row.order_id
        this.tlxx.sale_state = row.order_state
        this.tlxx.goods = res.data
      })
      this.dialogFlag = true
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
    sureSave () {
      if (this.tlxx.refund_money > this.tlxx.refund_money_copy) {
        return this.$message.error('保存失败，退款金额不得大于订单总金额')
      }
      delete this.tlxx.goods
      delete this.tlxx.refund_money_copy
      applyRefund(this.tlxx)
      this.dialogFlag = false
    },
    cancleSave () {
      this.dialogFlag = false
    },
    tableToExcel(){
      //要导出的json数据
      const jsonData = this.tableData
      //列标题，逗号隔开，每一个逗号就是隔开一个单元格
      // let str = `收货地址,物流单号,昵称,订单号,订单状态,实付金额,返利金额,更新时间,用户ID,微信交易号\n`;
      let str = '';
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
      //增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < map.length; i++) {
        const item = map[i]
        if (i == map.length - 1) {
          str += `${item.value}\n`
        } else {
          str += `${item.value},`
        }
      }
      for(let i = 0 ; i < jsonData.length ; i++ ){
        for (let index = 0; index < map.length; index++) {
          const item = map[index].name;
          str+=`${jsonData[i][item] + '\t'},`;
        }
        str+='\n';
      }
      //encodeURIComponent解决中文乱码
      let uri = 'data:text/xlsx;charset=utf-8,\ufeff' + encodeURIComponent(str);
      //通过创建a标签实现
      let link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download =  "订单列表.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

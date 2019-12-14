import Pagination from 'COMPONENTS/Pagination'
import boxIcon from 'ASSETS/image/box_icon.png'
import carIcon from 'ASSETS/image/car_icon.png'
import homeIcon from 'ASSETS/image/home_icon.png'
import {saleHead, orderList} from 'API/Shgl'
import moment from 'moment'

export default {
  name: 'shgl-ddlb',
  components: {
    'my-pagination': Pagination
  },
  data () {
    return {
      boxIcon,
      carIcon,
      homeIcon,
      currentPage: 1,
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
      time: [new Date(), new Date()],
      tableData: [{
        user_id: 'WFH001',
        nickname: 'WFH001',
        gender: 'WFH001',
        label: '新品推广',
        add_time: '王小虎',
        province: '未付款',
        level: '2019-05-03 17:33:33',
        balance: 1444,
        invite_code: '23131',
        order: 12313,
        deal_money: 321341,
        summeroy: 1111
      }],
      tabs: [
        {label: '全部订单', name: '0'}, {label: '未付款', name: '1'}, {label: '已付款', name: '2'}, {label: '已发货', name: '3'},
        {label: '已成交', name: '4'}, {label: '退款中', name: '5'}, {label: '已关闭', name: '6'}
      ],
      currentTab: '0',
      orderParams: {
        current_page: 0,
        page_count: 10,
        status: '',
        number: '',
        user: ''
        // s_time: moment(this.time[0]).format('YYYY-MM-DD'),
        // e_time: moment(this.time[1]).format('YYYY-MM-DD')
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      saleHead().then(res => {
        this.saleHead = res.data
      })
      this.getOrderList()
    },
    getOrderList (data={}) {
      // > number  -- 订单id
      // > user    -- 用户信息(用户id 或昵称)
      // > s_time   -- 开始时间
      // > e_time   -- 结束时间
      // > status      --订单状态 (0 待付款， 1 已付款， 2 已发货,  3. 已成交  5. 退款中  6.已关闭, 全部传入空)
      // > page_count     -- 每页的数量
      // > current_page  -- 当前也
      orderList(Object.assign(this.orderParams, data)).then(res => {
        console.log('orderList', res)
      })
    },
    search () {
      this.getOrderList({
        user: searchUser,
        number: searchOrder,

      })
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
    tabChage () {},
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
    editHandle () {},
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}

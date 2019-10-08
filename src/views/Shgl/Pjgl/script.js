import Pagination from 'COMPONENTS/Pagination'
import Ddpj from './coms/ddpj'
import Sppj from './coms/sppj'

export default {
  name: 'shgl-tkgl',
  components: {
    'my-pagination': Pagination,
    'ddpj-com': Ddpj,
    'sppj-com': Sppj
  },
  data () {
    return {
      currentPage: 1,
      tableData: [{
        user_id: 'WFH001',
        nickname: 'WFH001',
        gender: 'WFH001',
        label: '新品推广',
        add_time: '王小虎',
        province: '退款',
        progress: '通过申请',
        level: '2019-05-03 17:33:33',
        ydh: '/',
        balance: 1444,
        invite_code: '23131',
        order: 12313,
        deal_money: 321341,
        expend: '111'
      }],
      tabs: [
        {label: '商品评价', name: '0', com: 'sppj-com'}, {label: '订单评价', name: '1', com: 'ddpj-com'}
      ],
      currentTab: '0',
      // 退款时间线
      activities: [{
        content: '退货清单',
        timestamp: '2018-04-12 20:46',
        type: 'danger',
        class: 'theme-color'
      }, {
        content: '仓库收货',
        timestamp: '2018-04-03 20:46'
      }, {
        content: '确认退款',
        timestamp: '2018-04-03 20:46'
      }]
    }
  },
  methods: {
    tabChage (v) {
      this.currentTab = v.name
    },
    handleSelectionChange () {},
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}

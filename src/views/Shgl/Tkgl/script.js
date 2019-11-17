import Pagination from 'COMPONENTS/Pagination'
import DialogCom from 'COMPONENTS/DialogCom'
import addRefund from '../coms/add'
import Refund from '../coms/refund'
import Receiving from '../coms/receiving'

export default {
  name: 'shgl-tkgl',
  components: {
    'my-pagination': Pagination,
    'dialog-Com': DialogCom,
    'add-dialog': addRefund,
    'refund-dialog': Refund,
    'receiving-dialog': Receiving
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
        expend: '111',
        status: 0
      }],
      status: ['已付款', '已发货', '已完成'],
      tabs: [
        {label: '退款中', name: '0'}, {label: '退款完成', name: '1'}
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
      }],
      // 弹框部分
      dialogFlag: false,
      currentCom: {},
      coms: [
        {name: '确认收货', com: 'receiving-dialog', data: null},
        {name: '确认退款', com: 'refund-dialog', data: null},
        {name: '退款信息', com: 'add-dialog', data: null}
      ]
    }
  },
  methods: {
    tabChage (v) {
      this.currentTab = v.name
    },
    receivingHandle () {
      this.dialogFlag = true
      this.currentCom = this.coms[0]
    },
    refundHandle (row) {
      this.dialogFlag = true
      this.currentCom = this.coms[1]
    },
    addHandle (row) {
      this.dialogFlag = true
      this.currentCom = this.coms[2]
    },
    handleSelectionChange () {},
    handleSizeChange () {},
    handleCurrentChange () {},
    sureSave (flag) {
      this.dialogFlag = flag
    },
    cancleSave (flag) {
      this.dialogFlag = flag
    }
  }
}

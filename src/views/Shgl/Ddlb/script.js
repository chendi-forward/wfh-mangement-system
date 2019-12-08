import Pagination from 'COMPONENTS/Pagination'
import boxIcon from 'ASSETS/image/box_icon.png'
import carIcon from 'ASSETS/image/car_icon.png'
import homeIcon from 'ASSETS/image/home_icon.png'

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
      searchOrder: '',
      searchUser: '',
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
      currentTab: '0'
    }
  },
  methods: {
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

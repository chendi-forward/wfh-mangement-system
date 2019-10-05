import Pagination from 'COMPONENTS/Pagination'

export default {
  name: 'shgl-ddlb',
  components: {
    'my-pagination': Pagination
  },
  data () {
    return {
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
        {label: '活动表', name: '0', type: '活动'}, {label: '常规优惠券表', name: '1', type: '优惠券'}
      ],
      currentTab: '0',
      newData: [],
      newDataOrigin: [],
      editNewDataShow: false
    }
  },
  computed: {
    currentType () {
      return this.tabs[this.currentTab].type
    }
  },
  methods: {
    tabChage (v) {
    },
    handleSelectionChange () {},
    addHandle () {},
    editHandle () {},
    handleSizeChange () {},
    handleCurrentChange () {},
    getNewData () {
      // 请求接口获取新手优惠券设置
    },
    changeNewData () {
      // 请求接口修改优惠券设置
    },
    editNewDataFn () {
      this.editNewDataShow = true
    },
    saveNewDataFn () {
      // this.changeNewData(this.newData)
      this.editNewDataShow = false
    },
    cancelNewDataFn () {
      this.newData = JSON.parse(JSON.stringify(this.newDataOrigin))
      this.editNewDataShow = false
    },
  }
}

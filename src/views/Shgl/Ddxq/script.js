import DialogCom from 'COMPONENTS/DialogCom'

export default {
  name: 'shgl-ddxq',
  components: {
    'dialog-Com': DialogCom
  },
  data () {
    return {
      dialogFlag: false,
      logisticsId: null,
      tableData1: [{
        user_id: 'WFH001',
        nickname: 'WFH001',
        gender: 'WFH001',
        label: '新品推广',
        add_time: '王小虎',
        province: '未付款',
        level: '2019-05-03 17:33:33',
        balance: '/',
        invite_code: '/',
        order: '/'
      }],
      tableData2: [{
        user_id: '',
        nickname: '',
        add_time: 20,
        gender: 2000,
        province: '',
        label: 2000
      },
      {
        user_id: '考拉系列乳清蛋白粉',
        nickname: '奶茶，500g',
        add_time: 10,
        gender: 1000,
        province: '优惠券返利',
        label: 20
      }],
      selectKey: '1',
      options: [{
        value: '1',
        label: '顺丰速运'
      }, {
        value: '2',
        label: '圆通快递'
      }, {
        value: '3',
        label: '申通快递'
      }]
    }
  },
  methods: {
    goBack () {
      this.$router.push({name: 'shgl-ddlb'})
    },
    editHandle () {
      this.dialogFlag = true
    },
    cancleItem () {},
    selectChange () {},
    sureSave (flag) {
      this.dialogFlag = flag
    },
    cancleSave (flag) {
      this.dialogFlag = flag
    }
  }
}

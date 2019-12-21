import DialogCom from 'COMPONENTS/DialogCom'
import EditLogistics from '../coms/editLogistics'
import Logistics from '../coms/logistics'
import {orderDetail} from 'API/Shgl'

export default {
  name: 'shgl-ddxq',
  components: {
    'dialog-Com': DialogCom,
    'editLogistics-dialog': EditLogistics,
    'logistics-dialog': Logistics
  },
  data () {
    return {
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
      // 弹框部分
      dialogFlag: false,
      currentCom: {},
      coms: [
        {name: '编辑', com: 'editLogistics-dialog', data: null},
        {name: '物流追踪', com: 'logistics-dialog', data: null}
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.push({name: 'shgl-ddlb'})
    },
    editHandle () {
      this.currentCom = this.coms[0]
      this.dialogFlag = true
    },
    trace () {
      this.currentCom = this.coms[1]
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

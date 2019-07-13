import inputOrText from './input'
export default {
  name: 'spgl',
  components: {
    'input-or-text': inputOrText
  },
  data () {
    return {
      tableData: [
        {date: '分享到群', yjdx: 30, rwjd: 5, tjfled: 5, id: 1},
        {date: '成功邀请', yjdx: 5, rwjd: 100, tjfled: 100, id: 2},
        {date: '登录奖励', yjdx: 30, rwjd: 5, tjfled: 5, id: 3},
        {date: '代销', yjdx: 200, rwjd: 100, tjfled: 100, id: 4},
        {date: '评论奖励', yjdx: 5, rwjd: 20, tjfled: 20, id: 5},
        {date: '实名认证', yjdx: '永久1次', rwjd: 100, tjfled: 100, id: 6},
        {date: '补偿奖励', yjdx: '手动操作', rwjd: 20, tjfled: 20, id: 7},
        {date: '月度销售排行奖', yjdx: 1, rwjd: 20000, tjfled: 10000, id: 8}
      ],
      tableDataOrigin: [
        {date: '分享到群', yjdx: 30, rwjd: 5, tjfled: 5, id: 1},
        {date: '成功邀请', yjdx: 5, rwjd: 100, tjfled: 100, id: 2},
        {date: '登录奖励', yjdx: 30, rwjd: 5, tjfled: 5, id: 3},
        {date: '代销', yjdx: 200, rwjd: 100, tjfled: 100, id: 4},
        {date: '评论奖励', yjdx: 5, rwjd: 20, tjfled: 20, id: 5},
        {date: '实名认证', yjdx: '永久1次', rwjd: 100, tjfled: 100, id: 6},
        {date: '补偿奖励', yjdx: '手动操作', rwjd: 20, tjfled: 20, id: 7},
        {date: '月度销售排行奖', yjdx: 1, rwjd: 20000, tjfled: 10000, id: 8}
      ],
      userList: [
        {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false},
        {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false},
        {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false}, {user: 'WFDOLL', checked: false}
      ],
      editSillForm: {
        every: 1000,
        everyM: 1000,
        reach: 5000,
        reachEvery: 50,
        reachEveryM: 5
      },
      SillForm: {
        every: 1000,
        everyM: 1000,
        reach: 5000,
        reachEvery: 50,
        reachEveryM: 5
      },
      editTaskShow:false,
      editSillShow: false,
      editIntegral: false,
      present: 50,
      integral: 50,
      searchKey: ''
    }
  },
  methods: {
    save () {
      // ..
    },
    cancel () {
      // ..
    },
    edit () {},
    editTaskFn () {
      this.editTaskShow = true
    },
    saveTaskFn () {
      this.editTaskShow = false
    },
    cancelTaskFn () {
      this.tableData = JSON.parse(JSON.stringify(this.tableDataOrigin))
      this.editTaskShow = false
    },
    editSill () {
      Object.assign(this.editSillForm, this.SillForm)
      this.editSillShow = true
    },
    saveSill () {
      Object.assign(this.SillForm, this.editSillForm)
      this.editSillShow = false
    },
    cancelSill () {
      this.editSillShow = false
    },
    editIntegralFn () {
      this.integral = this.present
      this.editIntegral = true
    },
    saveIntegralFn () {
      this.present = this.integral
      this.editIntegral = false
    },
    cancelIntegralFn () {
      this.editIntegral = false
    },
    search (v) {}
  }
}

import inputOrText from 'COMPONENTS/inputOrText'
import expand from './expand'
import Pagination from 'COMPONENTS/Pagination'
import SubNav from 'COMPONENTS/SubNav_comp'
export default {
  name: 'spgl',
  components: {
    'input-or-text': inputOrText,
    'my-pagination': Pagination,
    'my-expand': expand,
    'sub-nav': SubNav
  },
  data () {
    return {
      selected: 0,
      subList: [
        {name: '普通用户', component: 0},
        {name: '代理用户', component: 1}
      ],
      tableData: [ // 代销返利
        {date: 1, yjdx: '5%', rwjd: 0, tjfled: 5, id: 1},
        {date: 2, yjdx: '20%', rwjd: 100, tjfled: 100, id: 2},
        {date: 3, yjdx: '30%', rwjd: 5, tjfled: 5, id: 3},
        {date: 4, yjdx: '35%', rwjd: 100, tjfled: 100, id: 4},
        {date: 5, yjdx: '40%', rwjd: 20, tjfled: 20, id: 5}
      ],
      tableDataOrigin: [
        {date: 1, yjdx: '5%', rwjd: 0, tjfled: 5, id: 1},
        {date: 2, yjdx: '20%', rwjd: 100, tjfled: 100, id: 2},
        {date: 3, yjdx: '30%', rwjd: 5, tjfled: 5, id: 3},
        {date: 4, yjdx: '35%', rwjd: 100, tjfled: 100, id: 4},
        {date: 5, yjdx: '40%', rwjd: 20, tjfled: 20, id: 5}
      ],
      tableItems: [ // 代理用户分销拓扑图
        {userid: 'WFH0...', nickname: 'WFH0...', date: 2000, withdrawDeposit: 2000, dlflje: 200, expand: []},
        {userid: 'WFH0...', nickname: 'WFH0...', date: 2000, withdrawDeposit: 2000, dlflje: 200, expand: []},
        {userid: 'WFH0...', nickname: 'WFH0...', date: 2000, withdrawDeposit: 2000, dlflje: 200, expand: []},
        {userid: 'WFH0...', nickname: 'WFH0...', date: 2000, withdrawDeposit: 2000, dlflje: 200, expand: []},
        {userid: 'WFH0...', nickname: 'WFH0...', date: 2000, withdrawDeposit: 2000, dlflje: 200, expand: []}
      ],
      editCommonForm: { // 普通用户
        every: 1000,
        reach: 5000,
        reachEvery: 50
      },
      commonForm: {
        every: 1000,
        reach: 5000,
        reachEvery: 50
      },
      editAgencyForm: { // 代理用户
        data: [
          {date: 1, yjdx: 10, rwjd: 2000, tjfled: 2000},
          {date: 2, yjdx: 10, rwjd: 2000, tjfled: 2000},
          {date: 3, yjdx: 10, rwjd: 2000, tjfled: 2000}
        ],
        reach: 5000,
        reachEvery: 50
      },
      agencyForm: {
        data: [
          {date: 1, yjdx: 10, rwjd: 2000, tjfled: 2000},
          {date: 2, yjdx: 10, rwjd: 2000, tjfled: 2000},
          {date: 3, yjdx: 10, rwjd: 2000, tjfled: 2000}
        ],
        reach: 5000,
        reachEvery: 50
      },
      editTaskShow: false,
      editCommonShow: false,
      editAgencyShow: false
    }
  },
  methods: {
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
    editCommon () {
      Object.assign(this.editCommonForm, this.commonForm)
      this.editCommonShow = true
    },
    saveCommon () {
      Object.assign(this.commonForm, this.editCommonForm)
      this.editCommonShow = false
    },
    cancelCommon () {
      this.editCommonShow = false
    },
    editAgency () {
      Object.assign(this.editAgencyForm, this.agencyForm)
      this.editAgencyShow = true
    },
    saveAgency () {
      Object.assign(this.agencyForm, this.editAgencyForm)
      this.editAgencyShow = false
    },
    cancelAgency () {
      this.editAgencyShow = false
    },
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}

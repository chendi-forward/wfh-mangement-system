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
      tableData: [],
      tableDataOrigin: [],
      // 代理用户分销拓扑图
      tableItems: [],
      expendList: [],
      // 普通用户
      editCommonForm: [
        {
          notes: '返利比例',
          num: 0.1,
          type_id: 'rebate'
        },
        {
          notes: '返利比例',
          num: 0.1,
          type_id: 'rebate'
        },
        {
          notes: '返利比例',
          num: 0.1,
          type_id: 'rebate'
        }
      ],
      commonForm: [
        {
          notes: '返利比例',
          num: 0.1,
          type_id: 'rebate'
        },
        {
          notes: '返利比例',
          num: 0.1,
          type_id: 'rebate'
        },
        {
          notes: '返利比例',
          num: 0.1,
          type_id: 'rebate'
        }
      ],
      editAgencyForm: { // 代理用户
        task: [
          {task: 1, sell_number: 10, sell_money: 2000, rebate_money: 2000},
          {task: 2, sell_number: 10, sell_money: 2000, rebate_money: 2000},
          {task: 3, sell_number: 10, sell_money: 2000, rebate_money: 2000}
        ],
        time: [
          {
            notes: '普通用户邀请有效期',
            num: 20,
            type_id: '06'
          },
          {
            notes: '普通用户提成有效期',
            num: 30,
            type_id: '07'
          }
        ]
      },
      agencyForm: {
        task: [
          {task: 1, sell_number: 10, sell_money: 2000, rebate_money: 2000},
          {task: 2, sell_number: 10, sell_money: 2000, rebate_money: 2000},
          {task: 3, sell_number: 10, sell_money: 2000, rebate_money: 2000}
        ],
        time: [
          {
            notes: '普通用户邀请有效期',
            num: 20,
            type_id: '06'
          },
          {
            notes: '普通用户提成有效期',
            num: 30,
            type_id: '07'
          }
        ]
      },
      page: 1,
      pageSize: 10,
      total: 0,
      editTaskShow: false,
      editCommonShow: false,
      editAgencyShow: false
    }
  },
  created () {
    this.superUserList()
    this.getIntegralTask()
    this.getCommonRecommendRebateSetting()
    this.getSuperRecommendRebateSetting()
  },
  methods: {
    // 获取代销返利设置 /integral/get_sell_rebate_setting
    getIntegralTask () {
      this.$get('/integral/get_sell_rebate_setting').then(res => {
        if (res.data) {
          this.tableDataOrigin = res.data
          this.tableData = JSON.parse(JSON.stringify(res.data))
        } else {
          this.$message.error('数据获取异常异常')
        }
      })
    },
    //修改代销返利设置 /integral/change_sell_rebate_setting
    changeIntegralTask () {
      let obj = {}
      let error
      this.tableData.forEach(item => {
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            const element = item[key] - 0
            if (element < 0 || isNaN(element)) {
              item[key] = 0
              error = true
            }
          }
        }
        obj[item.level] = item
      })
      if (error) return error
      this.$post('/integral/change_sell_rebate_setting', obj).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
          this.editTaskShow = false
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    // 获取普通用户的推荐返利设置
    getCommonRecommendRebateSetting () {
      this.$get('/integral/get_common_recommend_rebate_setting').then(res => {
        if (res.data) {
          this.editAgencyForm = res.data
          this.agencyForm = JSON.parse(JSON.stringify(res.data))
        } else {
          this.$message.error('数据获取异常异常')
        }
      })
    },
    // 修改普通用户的推荐返利设置
    changeCommonRecommendRebateSetting () {
      let task = this.editAgencyForm.task
      let time = this.editAgencyForm.time
      for (let i = 0; i < task.length; i++) {
        const element = task[i]
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            const item = element[key];
            if(!(item - 0 >= 0)) {
              element[key] = 0
              return true
            }
          }
        }
      }
      for (let i = 0; i < time.length; i++) {
        if (!(time[i].num - 0 >= 0)) {
          time[i].num = 0
          return true
        }
      }
      this.$post('/integral/change_common_recommend_rebate_setting', this.editAgencyForm).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
          this.editAgencyShow = false
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    // 获取代理用户的推荐返利设置
    getSuperRecommendRebateSetting () {
      this.$get('/integral/get_super_recommend_rebate_setting').then(res => {
        if (res.data) {
          this.editCommonForm = res.data
          this.commonForm = JSON.parse(JSON.stringify(res.data))
        } else {
          this.$message.error('数据获取异常异常')
        }
      })
    },
    // 修改代理用户的推荐返利设置
    changeSuperRecommendRebateSetting () {
      let obj = {}
      let error
      this.editCommonForm.forEach(item => {
        if (!(item.num - 0 >= 0)) {
          error = true
          item.num = 0
        }
        obj[item.type_id] = item.num
      })
      if (obj.rebate > 1) {
        this.$message.error('返利比例不得大于1')
        return false
      }
      if (error) return error
      this.$post('/integral/change_super_recommend_rebate_setting', obj).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
          this.editCommonShow = false
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    // 代理用户的关系扑朔图 /integral/super_user_list
    superUserList () {
      this.$get('/integral/super_user_list', {
        page_count: this.pageSize,
        current_page: this.page
      }).then(res => {
        if (res.data) {
          this.tableItems = res.data.content
          this.total = res.data.count
        } else {
          this.$message.error('数据获取异常')
        }
      })
    },
    //  扑朔图的下拉子用户 /integral/super_user_children
    superUserChildren (id, cb) {
      this.$get('/integral/super_user_children', {
        user_id: id
      }).then(res => {
        if (res.data) {
          cb(res.data.content)
        } else {
          this.$message.error('数据获取异常')
        }
      })
    },
    editTaskFn () {
      this.editTaskShow = true
    },
    saveTaskFn () {
      let res = this.changeIntegralTask()
      if (res) return this.$message.error('请输入大于等于零的数字')
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
      let res = this.changeSuperRecommendRebateSetting()
      if (res) return this.$message.error('请输入大于等于零的数字')
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
      let res = this.changeCommonRecommendRebateSetting()
      if (res) return this.$message.error('请输入大于等于零的数字')
    },
    cancelAgency () {
      this.editAgencyShow = false
    },
    handleSizeChange (v) {
      this.pageSize = v
      this.superUserList()
    },
    handleCurrentChange (v) {
      this.page = v
      this.superUserList()
    },
    expandChange (row, v) {
      if (this.expendList.indexOf(row.user_id) >= 0) return
      this.expendList.push(row.user_id)
      this.superUserChildren(row.user_id, data => {
        row.expend = data
      })
    }
  }
}

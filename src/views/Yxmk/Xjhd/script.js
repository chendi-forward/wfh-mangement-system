import inputOrText from 'COMPONENTS/inputOrText'
// import _ from 'lodash'
export default {
  name: 'spgl',
  components: {
    'input-or-text': inputOrText
  },
  data () {
    return {
      tableData: [],
      tableDataOrigin: [],
      userList: [],
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
      editTaskShow: false,
      editSillShow: false,
      editIntegral: false,
      present: 50,
      integral: 50,
      searchKey: ''
    }
  },
  created () {
    this.getIntegralTask()
    this.getIntegralAdvance()
  },
  methods: {
    // 获取积分任务配置
    getIntegralTask () {
      this.$get('/integral/get_integral_setting').then(res => {
        if (res.data) {
          this.tableDataOrigin = res.data
          this.tableData = JSON.parse(JSON.stringify(res.data))
        } else {
          this.$message.error('数据获取异常异常')
        }
      })
    },
    //修改积分任务配置
    changeIntegralTask (data) {
      let obj = {}
      data.forEach(item => {
        obj[item.integral_id] = JSON.stringify(item)
      })
      console.log(obj, data)
      this.$get('/integral/change_integral_setting', obj).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    // 获取积分兑换门槛
    getIntegralAdvance () {
      this.$get('/integral/get_integral_advance').then(res => {
        if (res.data) {
          this.editSillForm = res.data
          this.SillForm = JSON.parse(JSON.stringify(res.data))
        } else {
          this.$message.error('数据获取异常异常')
        }
      })
    },
    // 修改积分兑换门槛
    changeIntegralAdvance () {
      this.$post('/integral/change_integral_setting', this.SillForm).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    // 赠送积分
    save () {
      let str = []
      this.userList.forEach(item => {
        if (item.checked) {
          str.push(item.user)
        }
      })
      this.$get('/integral/given_integral', {
        user_id: str.join(','),
        integral: this.integral
      }).then(res => {
        if (res.data) {
          this.$message.success('积分曾送成功')
        } else {
          this.$message.error('积分曾送失败')
        }
      })
    },
    cancel () {
      // ..
    },
    edit () {},
    editTaskFn () {
      this.editTaskShow = true
    },
    saveTaskFn () {
      this.changeIntegralTask(this.tableData)
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
      this.changeIntegralAdvance()
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
    // 搜索用户
    search () {
      this.$get('/integral/show_user', {
        search: this.searchKey,
        current_page: 1
      }).then(res => {
        if (res.data.content) {
          this.userList = res.data.content.map(item => {
            return {
              user: item.user_id,
              checked: false
            }
          })
        } else {
          this.$message.error('搜索异常')
        }
      })
    }
  }
}

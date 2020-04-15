import inputOrText from 'COMPONENTS/inputOrText'
import $ from 'jquery'
import { getLableData } from 'API/Yxmk'
import _ from 'lodash'

export default {
  name: 'spgl',
  components: {
    'input-or-text': inputOrText
  },
  data() {
    return {
      selectType: 'tab',
      selectTypeName: '标签筛选',
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
      searchKey: '',
      userPage: 1,
      userPageOver: false,
      busy: false,
      formYhsz: {
        bqsx: '',
        yhsx: ''
      },
      options: [],
      userTypeOptions: [
        { label: '所有用户', value: 'all' },
        { label: '1级用户', value: '1级用户' },
        { label: '2级用户', value: '2级用户' },
        { label: '3级用户', value: '3级用户' },
        { label: '4级用户', value: '4级用户' },
        { label: '5级用户', value: '5级用户' },
        { label: '普通用户', value: '普通用户' },
        { label: '企业用户', value: '企业用户' }
      ],
    }
  },
  created() {
    this.getIntegralTask()
    this.getIntegralAdvance()
  },
  mounted() {
    let wrapH = $('.spgl-wrap1').height() - 63 - 62 - 73 - 62 - 50 - 100 -73
    $('.overflow-wrap').height(wrapH)
    this.getUserList()
    this.getLableData()
  },
  directives: {
    loadmore: {
      // 指令的定义
      bind(el, binding, vnode) {
        const selectWrap = el
        selectWrap.addEventListener('scroll', function() {
          const sign = 10
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign) {
            binding.value()
          }
        })
      }
    }
  },
  methods: {
    // label切换
    labelChange () {
      this.userPage = 1
      this.getUserList()
    },
    // 获取积分任务配置
    getIntegralTask() {
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
    changeIntegralTask(data) {
      let obj = {}
      let error
      data.forEach(item => {
        if (!(item.integral_num >= 0)) {
          item.integral_num = 0
          error = true
        }
        if (!(item.max_count >= 0)) {
          item.max_count = 0
          error = true
        }
        if (!(item.max_integral >= 0)) {
          item.max_integral = 0
          error = true
        }
        obj[item.integral_id] = item
      })
      if (error) return error
      this.$post('/integral/change_integral_setting', obj).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
          this.editTaskShow = false
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    // 获取积分兑换门槛
    getIntegralAdvance() {
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
    changeIntegralAdvance() {
      for (const key in this.SillForm) {
        if (this.SillForm.hasOwnProperty(key)) {
          const element = this.SillForm[key];
          if (!(element - 0 >= 0)) {
            this.SillForm[key] = 0
            return true
          }
        }
      }
      this.$post('/integral/change_integral_advance ', this.SillForm).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
          this.editSillShow = false
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    // 赠送积分
    save() {
      let str = []
      this.userList.forEach(item => {
        if (item.checked) {
          str.push(item.user)
        }
      })
      let obj = {
        user_id: str.join(','),
        integral: this.integral
      }
      if (this.selectType === 'tab') {
        obj.label_id = this.formYhsz.bqsx || []
      } else {
        obj.user_type = this.formYhsz.bqsx || []
      }
      this.$get('/integral/given_integral', obj).then(res => {
        if (res.data) {
          this.$message.success('积分赠送成功')
        } else {
          this.$message.error('积分赠送失败')
        }
      })
    },
    loadData() {
      if (this.userPageOver) return
      this.getUserList()
    },
    cancel() {
      // ..
    },
    edit() { },
    editTaskFn() {
      this.editTaskShow = true
    },
    saveTaskFn() {
      let res = this.changeIntegralTask(this.tableData)
      if (res) return this.$message.error('请输入大于等于零的数字')
    },
    cancelTaskFn() {
      this.tableData = JSON.parse(JSON.stringify(this.tableDataOrigin))
      this.editTaskShow = false
    },
    editSill() {
      Object.assign(this.editSillForm, this.SillForm)
      this.editSillShow = true
    },
    saveSill() {
      Object.assign(this.SillForm, this.editSillForm)
      let res = this.changeIntegralAdvance()
      if (res) return this.$message.error('请输入大于等于零的数字')
    },
    cancelSill() {
      this.editSillShow = false
    },
    editIntegralFn() {
      this.integral = this.present
      this.editIntegral = true
    },
    saveIntegralFn() {
      if (!(this.integral - 0 >= 0)) return this.$message.error('请输入大于等于零的数字')
      this.present = this.integral
      this.editIntegral = false
    },
    cancelIntegralFn() {
      this.editIntegral = false
    },
    selectTypeChange(val) {
      if (val === 'tab') this.selectTypeName = '标签筛选'
      if (val === 'user') this.selectTypeName = '用户筛选'
      this.formYhsz.bqsx = ''
    },
    // 搜索用户
    search() {
      this.userPage = 1
      this.getUserList()
    },
    getUserList() {
      this.busy = true
      this.$get('/marketing/user_list', {
        search: this.searchKey,
        current_page: this.userPage,
        label_id: this.formYhsz.bqsx.join(',') || '',
        user_type: this.formYhsz.yhsx.join(',') || '',
        page_count: 15
      }).then(res => {
        if (res.data.data_list) {
          this.userList = [...this.userList, ...res.data.data_list.map(item => {
            return {
              user: item.user_id,
              nickname: item.nickname,
              checked: false
            }
          })]
          this.userList = _.uniqBy(this.userList, 'user').reverse()
          if (res.data.data_list.length <= 10) {
            this.userPageOver = true
          } else {
            this.userPage++
            this.userPageOver = false
          }
        } else {
          this.$message.error('搜索异常')
        }
        this.busy = false
      })
    },
    // 获取标签
    getLableData() {
      getLableData().then(res => {
        this.options = res
      })
    }
  }
}

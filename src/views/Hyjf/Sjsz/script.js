export default {
  name: 'hyjf',
  data () {
    return {
      editTimeShow: false,
      time: [],
      editTime: []
    }
  },
  created () {
    this.getSettingTime()
  },
  methods: {
    // 获取所有的设置时间
    getSettingTime () {
      this.$get('/integral/get_setting_time').then(res => {
        if (res.data) {
          this.time = res.data
          this.editTime = JSON.parse(JSON.stringify(res.data))
        } else {
          this.$message.error('数据获取异常')
        }
      })
    },
    // 修改所有的设置时间
    changeTimeSetting (data) {
      let obj = {}
      data.forEach(item => {
        obj[item.time_id] = item.time_days
      })
      this.$post('/integral/change_time_setting', obj).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    editTimeFn () {
      this.editTimeShow = true
    },
    saveTimeFn () {
      if (this.verify()) return this.$message.error('不能为空值')
      this.time = JSON.parse(JSON.stringify(this.editTime))
      this.changeTimeSetting(this.time)
      this.editTimeShow = false
    },
    cancelTimeFn () {
      this.editTime = JSON.parse(JSON.stringify(this.time))
      this.editTimeShow = false
    },
    verify () {
      for (const key in this.editTime) {
        if (this.editTime.hasOwnProperty(key)) {
          const element = this.editTime[key]
          if (!element) return true
        }
      }
    }
  }
}

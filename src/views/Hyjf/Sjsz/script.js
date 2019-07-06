export default {
  name: 'hyjf',
  data () {
    return {
      editTimeShow: false,
      time: {qrsh: 10, wfk: 7, hy: 30, jfqk: 30, yqm: 30},
      editTime: {qrsh: 10, wfk: 7, hy: 30, jfqk: 30, yqm: 30}
    }
  },
  methods: {
    editTimeFn () {
      Object.assign(this.editTime, this.time)
      this.editTimeShow = true
    },
    saveTimeFn () {
      if (this.verify()) return this.$message.error('不能为空值')
      Object.assign(this.time, this.editTime)
      this.editTimeShow = false
    },
    cancelTimeFn () {
      Object.assign(this.editTime, this.time)
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

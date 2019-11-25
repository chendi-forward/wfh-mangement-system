export default {
  name: 'expand-table',
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    changeDate (v) {
      this.changeBindingTime(v.target.id, v.target.value)
    },
    // 修改代理用户绑定时间 integral/change_binding_time
    changeBindingTime (id, days) {
      this.$post('/integral/change_binding_time', {user_id: id, days: days}).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    handleSelectionChange () {}
  }
}

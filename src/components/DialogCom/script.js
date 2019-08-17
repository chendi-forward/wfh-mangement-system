export default {
  name: 'DialogCom',
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '编辑'
    },
    width: {
      type: String,
      default: '650px'
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    cancleSave () {
      // 取消时的事件
      this.$emit('cancle-save', this.dialogVisible)
    },
    sureSave () {
      // 确定时的事件
      this.$emit('sure-save', this.dialogVisible)
    },
    handleClose () {
      // 右上角关闭的事件
      this.cancleSave()
    }
  },
  watch: {
    dialogFlag (n, o) {
      this.dialogVisible = n
    }
  },
  mounted () {
  }
}

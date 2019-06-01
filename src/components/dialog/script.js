export default {
  name: 'dialog',
  props: {
    dialogFlag: {
      type: Boolean,
      defaultValue: false
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose () {
      console.log('1111')
    }
  },
  watch: {
    dialogFlag (n, o) {
      this.dialogVisible = n
    }
  },
  mounted () {}
}

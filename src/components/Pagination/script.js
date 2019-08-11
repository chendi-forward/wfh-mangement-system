export default {
  name: 'Pagination',
  props: {
    page_sizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    page_size: {
      type: Number,
      dafault: 10
    },
    total: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      pagercount: 5,
      currentPage: 1,
      dialogVisible: true
    }
  },
  methods: {
    handleSizeChange (val) {
      // this.page_size =
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) {
      // this.currentPage = false
      this.$emit('currentChange', val)
    }
  },
  watch: {
  },
  mounted () {
  }
}

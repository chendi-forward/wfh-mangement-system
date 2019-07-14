export default {
  name: 'expand-table',
  props: ['data'],
  data () {
    return {
      tableItems: [
        {userid: 'WFH0...', nickname: 300, date: '2019-03-22 09:20', withdrawDeposit: 20, dlflje: '/'},
        {userid: 'WFH1...', nickname: 300, date: '2019-03-22 09:20', withdrawDeposit: 20, dlflje: '/'},
        {userid: 'WFH2...', nickname: 300, date: '2019-03-22 09:20', withdrawDeposit: 20, dlflje: '/'},
        {userid: 'WFH3...', nickname: 300, date: '2019-03-22 09:20', withdrawDeposit: 20, dlflje: '/'},
        {userid: 'WFH4...', nickname: 300, date: '2019-03-22 09:20', withdrawDeposit: 20, dlflje: '/'}
      ]
    }
  },
  methods: {
    change () {
      this.$emit('change', this.inputData)
    }
  }
}

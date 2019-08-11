import accountList from './KjmkComponents/AccountList'
import commissionWallet from './KjmkComponents/CommissionWallet.vue'
export default {
  name: 'kjmk',
  data () {
    return {
      activeName: 'account-list',
      components: {
        'account-list': accountList,
        'commission-wallet': commissionWallet
      }
    }
  },
  computed: {
    activeComponent () {
      return this.components[this.activeName]
    }
  }
}

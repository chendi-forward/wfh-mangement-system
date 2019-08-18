import * as types from '../../store/types'
import store from '../../store'

export default {
  name: 'login',
  data () {
    return {
      userForm: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    // 验证用户返回结果
    validateUser (res) {
      return new Promise((resolve, reject) => {
        // token保存
        // let token = 'asfesafeafefaefe'
        sessionStorage.setItem('token', res.token)
        sessionStorage.setItem('user', res.data.account)
        sessionStorage.setItem('role', res.data.role)
        sessionStorage.setItem('id', res.data.id)
        store.commit(types.LOGIN, res.token)
        resolve()
      })
    },
    submitUser () {
      let { account, password } = this.userForm
      this.$post('/authority/login', { account, password }).then((res) => {
        if (res.status === 'ok') {
          console.log(res, '~~~~~~~~')
          this.validateUser(res)
          .then(() => {
            this.$emit('login-direct', this.$router.currentRoute.query.from)
          })
        }
      })
      // return new Promise((resolve, reject) => {
      //   if (username === 'admin' && password === '123456') {
      //     this.validateUser()
      //     .then(() => {
      //       this.$emit('login-direct', this.$router.currentRoute.query.from)
      //     })
      //     // 登录成功之后 再执行
      //     resolve()
      //   } else {
      //     reject()
      //   }
      // })
    }
  }
}

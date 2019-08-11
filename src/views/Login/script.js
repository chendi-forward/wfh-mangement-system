import * as types from '../../store/types'
import store from '../../store'

export default {
  name: 'login',
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 验证用户返回结果
    validateUser () {
      return new Promise((resolve, reject) => {
        // token保存
        let token = 'asfesafeafefaefe'
        sessionStorage.setItem('token', token)
        store.commit(types.LOGIN, token)
        resolve()
      })
    },
    submitUser () {
      let { username, password } = this.userForm
      return new Promise((resolve, reject) => {
        if (username === 'admin' && password === '123456') {
          this.validateUser()
          .then(() => {
            this.$emit('login-direct', this.$router.currentRoute.query.from)
          })
          // 登录成功之后 再执行
          resolve()
        } else {
          reject()
        }
      })
    }
  }
}

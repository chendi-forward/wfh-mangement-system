import DialogCom from '../../components/DialogCom'

export default {
  name: 'qxgl',
  components: {
    'dialog-Com': DialogCom
  },
  data () {
    return {
      form: {
        name: '',
        account: '',
        password: '',
        role: []
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        role: [
          { type: 'array', required: true, message: '请至少选择一个角色权限', trigger: 'change' }
        ]
      },
      labelPosition: 'left',
      addtitle: '新增用户',
      dialogFlag: false,
      title: '管理员设置',
      tableData: [],
      role: {
        '1': '售后',
        '2': '会计',
        '3': '会员',
        '4': '内容',
        '5': '营销',
        '6': '数据库'
      },
      id: 0
    }
  },
  methods: {
    deleteUser (row) {
      console.log(row, '===========')
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$get('/authority/delete_user?id=' + row.id).then((res) => {
          if (res && res.ok) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getAllUser()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getAllUser () {
      this.$get('/authority/all_user').then((res) => {
        if (res && res.length) {
          res.forEach((item) => {
            let arr2 = []
            let arr = item.role.split(',')
            arr.forEach((t) => {
              arr2.push(this.role[t])
            })
            item.role = arr2.join('、')
          })
          this.tableData = res
        } else {
          this.$message('暂无数据')
        }
      })
    },
    addUserData () {
      this.$get('/authority/add_user', {
        username: this.form.name,
        account: this.form.account,
        password: this.form.password,
        role: this.form.role.join(',')
      }).then((res) => {
        if (res.ok) {
          this.$message.success('添加用户成功')
          this.getAllUser()
        } else {
          this.$message.error('添加用户失败')
        }
      })
    },
    updateUserData () {
      this.$get('/authority/update_user', {
        id: this.id,
        username: this.form.name,
        account: this.form.account,
        password: this.form.password,
        role: this.form.role.join(',')
      }).then((res) => {
        if (res.ok) {
          this.$message.success('修改用户成功')
          this.getAllUser()
        } else {
          this.$message.error('修改用户失败')
        }
      })
    },
    editUser (data) {
      let item = data.row
      this.id = item.id
      this.form.name = item.username
      this.form.account = item.account
      this.form.password = item.password
      let arr = item.role.split('、')
      let arr2 = []
      for (let key in this.role) {
        arr.forEach((t) => {
          if (t === this.role[key]) {
            arr2.push(key)
          }
        })
      }
      this.form.role = arr2
      this.dialogFlag = true
      this.addtitle = '编辑用户'
    },
    addUser () {
      this.dialogFlag = true
      this.reset()
    },
    reset () {
      this.$refs['form'].resetFields()
    },
    sureSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.addtitle === '新增用户') {
            this.addUserData()
          } else {
            this.updateUserData()
          }
          this.dialogFlag = false
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    cancleSave () {
      this.reset()
      this.dialogFlag = false
    }
  },
  mounted () {
    this.getAllUser()
  }
}

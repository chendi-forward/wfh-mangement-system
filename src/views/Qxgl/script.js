import DialogCom from '../../components/DialogCom'

export default {
    name: 'qxgl',
    components: {
        'dialog-Com': DialogCom
    },
    data() {
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
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
                ],
                role: [
                    { type: 'array', required: true, message: '请至少选择一个角色权限', trigger: 'change' }
                ]
            },
            labelPosition: 'left',
            addtitle: '添加用户',
            dialogFlag: false,
            title: '管理员设置',
            tableData: [],
            role: {
                '1': '业绩面板',
                '2': '内容',
                '5': '售后',
                '6': '会员',
                '7': '营销',
                '8': '会计'
            },
            id: 0
        }
    },
    methods: {
        deleteUser(row) {
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
        getAllUser() {
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
                    this.tableData = res.reverse()
                } else {
                    this.$message('暂无数据')
                }
            })
        },
        addUserData() {
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
        updateUserData() {
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
        editUser(data) {
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
        addUser() {
            this.dialogFlag = true
            this.addtitle = '添加用户'
            this.id = ''
            this.reset()
        },
        reset() {
            // eslint-disable-next-line no-undef
            setTimeout(() => {
                this.$refs['form'].resetFields()
                this.form = {
                    name: '',
                    account: '',
                    password: '',
                    role: []
                }
            })
        },
        sureSave() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.addtitle === '添加用户') {
                        this.addUserData()
                    } else {
                        this.updateUserData()
                    }
                    this.dialogFlag = false
                } else {
                    return false
                }
            })
        },
        cancleSave() {
            this.reset()
            this.dialogFlag = false
        }
    },
    mounted() {
        this.getAllUser()
    }
}
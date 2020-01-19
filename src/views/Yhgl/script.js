import befautify from 'ASSETS/image/timg.jpg'
import DialogCom from '../../components/DialogCom'
import Pagination from '../../components/Pagination'
import baseUrl from '../../config/baseURL'

export default {
    name: 'yhgl',
    components: {
        'dialog-Com': DialogCom,
        'my-pagination': Pagination
    },
    data() {
        return {
            user_id: '',
            btnFlag: true, // 按钮禁用标志
            title: '',
            editOrSet: '',
            radio: '1',
            labelPosition: 'left',
            formOptions: [{
                value: '1',
                label: '无标签用户'
            }, {
                value: '2',
                label: '本月新用户'
            }, {
                value: '3',
                label: '五月优惠用户'
            }],
            formLabelAlign: {
                option: '',
                update: '',
                pushmoney: '',
                radio: '1',
                radio1: '2',
                radio2: '2'
            },
            dialogFlag: false,
            moveOptions: [{
                value: '3',
                label: '企业用户'
            }],
            moveOptions1: [{
                value: '3',
                label: '企业用户'
            }],
            moveOptions2: [{
                value: '2',
                label: '普通用户'
            }],
            moveOptions3: [{
                value: '2',
                label: '普通用户'
            }, {
                value: '3',
                label: '企业用户'
            }],
            moveKey: null, // 移动到
            // ..
            tableData: [{
                img: befautify,
                user_id: 'WFH001',
                nickname: '王小虎',
                gender: '男',
                label: '新品推广',
                add_time: '2019-05-03 17:33:33',
                province: '广东',
                level: 'v1',
                balance: 1444,
                invite_code: '23131',
                order: 12313,
                deal_money: 321341
            }],
            total: 0,
            pageSize: 10,
            currentPage4: 1,
            activeName: 'ordinary', // tabindex
            idNameNum: '', // 搜索关键字
            selectKey: '', // 选择关键字
            newlabel: null, // 设置新的关键字
            options: []
        }
    },
    methods: {
        // 获取邀请码
        getInviteCode(id) {
            this.$get('/user/create_invite_code?user_id=' + id).then((res) => {
                console.log(res, '==========')
            })
        },
        // 添加标签
        addLabel() {
            this.$get('/user/label_setting', {
                behavior: 'add',
                label: this.newlabel
            }).then((res) => {
                if (res) {
                    this.getLabelData()
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '添加失败!'
                    })
                }
            })
        },
        // 删除标签
        delBabel(item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$get('/user/label_setting?behavior=del&id=' + item.value).then((res) => {
                    if (res) {
                        this.getLabelData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 获取标签数据
        getLabelData() {
            this.$get('/user/get_label').then((res) => {
                if (res && res.length) {
                    res.unshift({ label: '全部用户', value: '' })
                    this.options = res
                } else {
                    this.$message({
                        type: 'info',
                        message: '暂无标签数据'
                    })
                }
            })
        },
        // 获取用户信息
        getUserData() {
            let url = `/user/show_user?user_type=${this.activeName}&label_id=${this.selectKey}&search=${this.idNameNum}&page_count=${this.pageSize}&current_page=${this.currentPage4}`
            this.$get(url).then(res => {
                console.log(res, '=====')
                if (res.content && res.content.length) {
                    res.content.forEach((item) => {
                        item.avatar = baseUrl.baseUrl + item.avatar
                        item.add_time = item.add_time.substr(0, 19)
                        item.label = item.label || '--'
                        item.province = item.province || '--'
                        item.gender = item.gender || '--'
                        item.deal_money = item.deal_money || '0'
                    })
                    this.tableData = res.content
                    this.total = res.count
                } else {
                    this.tableData = []
                    this.total = 0
                }
            })
        },
        sureSave(flag) {
            this.dialogFlag = flag
            if (this.editOrSet === 'edit') {
                console.log('编辑')
            } else {
                if (this.newlabel) {
                    this.addLabel()
                } else {
                    this.$message({
                        type: 'info',
                        message: '请填写新标签内容'
                    })
                }
            }
        },
        cancleSave(flag) {
            this.dialogFlag = flag
            if (this.editOrSet === 'edit') {
                console.log('编辑')
            } else {
                this.newlabel = null
            }
        },
        editHandle(row) {
            this.dialogFlag = true
            this.editOrSet = 'edit'
            this.title = '编辑'
            this.formLabelAlign.update = row.invite_code
            console.log(row, '========')
        },
        setTags() {
            this.dialogFlag = true
            this.editOrSet = 'set'
            this.title = '设置标签'
        },
        // 移动用户到---企业or普通
        moveUser(val) {
            console.log(val, '===========')
            this.changeUserBach(val)
        },
        // 批量修改用户的属性
        changeUserBach(val) {
            let url = `/user/change_user_bach?user_id=${this.user_id}&behavior=${val}`
            this.$get(url).then((res) => {
                console.log(res, '000000000')
                if (res) {
                    this.$message({
                        type: 'success',
                        message: '移入成功！！'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '移入失败！！'
                    })
                }
                this.getUserData()
            })
        },
        handleSelectionChange(val) {
            // eslint-disable-next-line no-undef
            console.log(val, '=============')
            if (val.length >= 1) {
                this.btnFlag = false
                var arr = []
                val.forEach((item) => {
                    arr.push(item.user_id)
                })
                this.user_id = arr.join(',')
            } else {
                if (val.length) {
                    this.user_id = val[0].user_id
                }
                this.btnFlag = true
            }
        },
        selectChange() {
            this.getUserData()
        },
        handleCurrentChange(val) {
            // eslint-disable-next-line no-undef
            console.log(val, '----9999----')
            this.currentPage = val
            this.getUserData()
        },
        handleSizeChange(val) {
            console.log(val, '====###')
            this.pageSize = val
            this.getUserData()
        },
        handleClick(val) {
            this.getUserData()
            if (this.activeName === 'ordinary') {}
            if (this.activeName === 'super') {}
            if (this.activeName === 'black') {}
        },
        inputChange() {
            this.getUserData()
        }
    },
    mounted() {
        this.getUserData()
        this.getLabelData()
    }
}
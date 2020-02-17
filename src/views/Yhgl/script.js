import DialogCom from '../../components/DialogCom'
import Pagination from '../../components/Pagination'
import config from '../../config/baseURL'
import { get } from '../../api/http'

export default {
	name: 'yhgl',
	components: {
		'dialog-Com': DialogCom,
		'my-pagination': Pagination
	},
	data() {
		return {
			id: '', // 用户id
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
				is_black: '1',
				level_protect: '1',
				advance: '1',
				level: '1',
				remark: ''
			},
			levelOptions: [{
				value: '1',
				label: 'V1'
			}, {
				value: '2',
				label: 'V2'
			}, {
				value: '3',
				label: 'V3'
			}, {
				value: '4',
				label: 'V4'
			}, {
				value: '5',
				label: 'V5'
			}],
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
			tableData: [],
			total: 0,
			pageSize: 10,
			currentPage4: 1,
			activeName: 'ordinary', // tabindex
			idNameNum: '', // 搜索关键字
			selectKey: '', // 选择关键字
			newlabel: null, // 设置新的关键字
			options: [],

			// 设置标签的弹窗
			formTag: {
				newTag: ''
			},
			rules: {
				length10: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ max: 10, message: '长度范围为10个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		// 获取邀请码
		getInviteCode() {
			if (!this.id) {
				return
			}
			this.$get('/user/create_invite_code?user_id=' + this.id).then((res) => {
				console.log(res, '==========')
				this.formLabelAlign.update = res.invite_code
			})
		},
		// 添加标签
		addLabel() {
			this.$refs.formTag.validate(valid => {
				if (valid) {
					this.$get('/user/label_setting', {
						behavior: 'add',
						label: this.formTag.newTag
					}).then((res) => {
						if (res) {
							this.getLabelData()
							this.$message({
								type: 'success',
								message: '添加成功!'
							})
							this.$nextTick(() => {
								this.formTag.newTag = ''
							})
						} else {
							this.$message({
								type: 'error',
								message: '添加失败!'
							})
						}
					})
				} else {
					return false
				}
			})
		},
		// 删除标签
		delBabel(item) {
			this.$confirm(`此操作将删除“${item.label}”标签, 是否继续?`, '提示', {
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
				console.log(res, '========')
				if (res.content && res.content.length) {
					res.content.forEach((item) => {
						item.avatar = config.baseUrl + item.avatar
						item.add_time = item.add_time.substr(0, 19)
						item.label = item.label || '--'
						item.province = item.province || '--'
						item.gender = item.gender === '1' ? '男' : '女'
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
				let params = {
					user_id: this.id,
					label_id: this.formLabelAlign.option,
					invite_code: this.formLabelAlign.update,
					is_black: this.formLabelAlign.is_black,
					advance: this.formLabelAlign.advance,
					level_protect: this.formLabelAlign.level_protect,
					push_money: this.formLabelAlign.pushmoney || '0',
					level: this.formLabelAlign.level
				}
				console.log(params, '===')
				get('/user/change_user_one', params).then(res => {
					console.log(res, '=========')
				})
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
			console.log(row, '====')
			this.id = row.user_id
			this.dialogFlag = true
			this.editOrSet = 'edit'
			this.title = '编辑'
			this.formLabelAlign.update = row.invite_code
			this.formLabelAlign = {
				option: row.laber_id,
				update: row.invite_code,
				pushmoney: row.push_money,
				is_black: '0',
				level_protect: '1',
				advance: '1',
				level: row.level
			}
		},
		setTags() {
			this.dialogFlag = true
			this.editOrSet = 'set'
			this.title = '设置标签'
		},
		// 移动用户到---企业or普通
		moveUser(val) {
			this.changeUserBach(val)
		},
		// 批量修改用户的属性
		changeUserBach(val) {
			let url = `/user/change_user_bach?user_id=${this.user_id}&behavior=${val}`
			this.$get(url).then((res) => {
				if (res.data && res.message === 'ok') {
					this.$message({
						type: 'success',
						message: '移入成功！！'
					})
					this.getUserData()
					this.btnFlag = true
				} else {
					this.$message({
						type: 'error',
						message: '移入失败！！'
					})
					this.btnFlag = true
				}
			})
		},
		handleSelectionChange(val) {
			if (val.length) {
				this.btnFlag = false
				var arr = []
				val.forEach((item) => {
					arr.push(item.user_id)
				})
				this.user_id = arr.join(',')
			} else {
				this.btnFlag = true
			}
		},
		selectChange() {
			this.getUserData()
		},
		handleCurrentChange(val) {
			this.currentPage4 = val
			this.getUserData()
		},
		handleSizeChange(val) {
			this.pageSize = val
			this.getUserData()
		},
		handleClick(val) {
			this.getUserData()
			if (this.activeName === 'ordinary') { }
			if (this.activeName === 'super') { }
			if (this.activeName === 'black') { }
		},
		inputChange() {
			this.getUserData()
		},
		// 强制提现
		confirmWithDraw() {
			this.$confirm('确定强制提现该用户嘛?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// localStorage.clear()
				// sessionStorage.clear()
				// this.$router.push({path: '/login'})
				this.dialogFlag = false
				this.$message({
					type: 'success',
					message: '已提现'
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消'
				})
			})
		}
	},
	mounted() {
		this.getUserData()
		this.getLabelData()
	}
}
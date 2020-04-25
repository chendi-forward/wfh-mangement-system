import Pagination from 'COMPONENTS/Pagination'
import DialogCom from 'COMPONENTS/DialogCom'
import addRefund from '../coms/add'
import Refund from '../coms/refund'
import Receiving from '../coms/receiving'
import { refundList, refundDeliver, cancelRefund, orderDetail } from 'API/Shgl'

export default {
	name: 'shgl-tkgl',
	components: {
		'my-pagination': Pagination,
		'dialog-Com': DialogCom,
		'add-dialog': addRefund,
		'refund-dialog': Refund,
		'receiving-dialog': Receiving
	},
	data() {
		return {
			idArrtoStr: '', // 退款id拼接数据
			suredata: {}, // 确认退款信息
			goodsid: '',
			pageSize: 10,
			total: 0,
			currentPage: 1,
			tableData: [],
			status: ['已付款', '已发货', '已完成'],
			tabs: [
				{ label: '退款中', name: '1' }, { label: '退款完成', name: '3' }
			],
			currentTab: '1',
			// 退款时间线
			activities: [{
				content: '退货物流',
				timestamp: '2018-04-12 20:46',
				type: 'danger',
				class: 'theme-color',
				comIndex: 0
			}, {
				content: '仓库收货',
				type: 'danger',
				class: 'theme-color',
				timestamp: '2018-04-03 20:46',
				comIndex: 1
			}, {
				content: '确认退款',
				type: 'danger',
				class: 'theme-color',
				timestamp: '2018-04-03 20:46',
				comIndex: 2
			}],
			activities2: [{
				content: '确认退款',
				type: 'danger',
				class: 'theme-color',
				timestamp: '2018-04-03 20:46',
				comIndex: 2
			}],
			// 弹框部分
			dialogFlag: false,
			currentCom: {},
			coms: [
				{ name: '物流信息', com: 'add-dialog', data: null },
				{ name: '确认收货', com: 'receiving-dialog', data: null },
				{ name: '确认退款', com: 'refund-dialog', data: null }
			],
			gridData: []
		}
	},
	methods: {
		cancleTuik() {
			if (this.idArrtoStr) {
				let data = {
					id: this.idArrtoStr
				}
				this.$confirm('确定要取消该退款订单吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					cancelRefund(data).then(res => {
						if (res.data) {
							this.$message.success('取消退款成功')
							this.getData()
						} else {
							this.$message.error('取消退款失败')
						}
					})
				}).catch(() => {
				})
			} else {
				this.$message({
					message: '请先选择要退款订单!',
					type: 'warning'
				});
			}
		},
		getData() {
			let data = {
				state: this.currentTab,
				page_count: this.pageSize,
				current_page: this.currentPage
			}
			refundList(data).then(res => {
				if (res.message == 'ok') {
					this.tableData = res.data.data_list.map(item => {
						if (!item.express_number && item.refund_state != '退款完成') {
							item.rstate = 0
						} else if (item.refund_state == '提交退款') {
							item.rstate = 1
						} else if (item.refund_state == '确认收货') {
							item.rstate = 2
						} else if (item.refund_state == '退款完成') {
							item.rstate = 3
						}
						return item
					})
					this.total = res.data.count
				}
			})
		},
		tabChage(v) {
			this.currentTab = v.name
			this.currentPage = 1
			// this.pageSize = 10
			this.getData()
		},
		expandChange(value, values) {
		},
		openDialog(index, item) {
			this.goodsid = item.id
			let data = {}
			if (index == 0) {
				data = {
					id: item.id,
					status: item.rstate > index
				}
			} else if (index == 1) {
				data = {
					ddbh: item.order_id,
					tydh: item.express_number,
					status: item.rstate > index
				}
			} else if (index == 2) {
				data = {
					ddbh: item.order_id,
					tkzh: item.wechat_id,
					tkje: item.refund_money,
					status: item.rstate > index
				}
			}
			this.suredata = data
			this.dialogFlag = true
			this.currentCom = this.coms[index]
		},
		receivingHandle() {
			this.dialogFlag = true
			this.currentCom = this.coms[0]
		},
		refundHandle(row) {
			this.dialogFlag = true
			this.currentCom = this.coms[1]
		},
		addHandle(row) {
			this.dialogFlag = true
			this.currentCom = this.coms[2]
		},
		handleSelectionChange(item) {
			if (item.length) {
				let arr = []
				item.forEach((i) => {
					arr.push(i.id)
				})
				this.idArrtoStr = arr.join(',')
			} else {
				this.idArrtoStr = ''
			}
		},
		handleSizeChange(size) {
			// console.log(size, '===size')
			this.pageSize = size
			this.getData()
		},
		handleCurrentChange(page) {
			this.currentPage = page
			this.getData()
		},
		sureSave(item) {
			switch (item.flag) {
				case 1:
					// 物流信息的添加
					let data = {
						id: this.goodsid,
						express_name: item.selectKey,
						express_number: item.tydh
					}
					refundDeliver(data).then(res => {
						if (res.data) {
							this.$message.success('物流信息添加成功')
							this.getData()
						} else {
							this.$message.error('物流信息添加失败')
						}
					})
					break;
				default:
					this.getData()
					break;
			}
			this.dialogFlag = false
		},
		cancleSave() {
			this.dialogFlag = false
		},
		showGoodsName(row) {
			this.gridData = row.refund_detail
    }
	},
	created() {
		this.getData()
	}
}
import GoodsList from './BasicComponents/GoodsList'
import NumberStatistics from './BasicComponents/NumberStatistics'
import TotalNumber from './BasicComponents/TotalNumber'
import PieChart from './BasicComponents/PieChart'
import ActivePeople from './BasicComponents/ActivePeople'
import echarts from 'echarts'
import { get } from 'http'
import moment from 'moment'
import MapLegend from './BasicComponents/MapLegend'
import methods from './methods'
import { Submenu } from 'element-ui'

export default {
	name: 'yjck',
	components: {
		'goods-list': GoodsList,
		'number-statistics': NumberStatistics,
		'total-number': TotalNumber,
		'pie-chart': PieChart,
		MapLegend,
		ActivePeople
	},
	mixins: [methods],
	data() {
		return {
			all_count: 0,
			all_money: 0,
			titleList: [{
				number: 0,
				name: '应付销售返利'
			},
			{
				number: 0,
				name: '应付推荐返利'
			},
			{
				number: 0,
				name: '应付积分返利'
			},
			{
				number: 0,
				name: '应付销售额(未完成)'
			},
			{
				number: 0,
				name: '应付代销返利(未完成)'
			}
			],
			options: [{
				value: 'zuotian',
				label: '昨天'
			}, {
				value: 'shangzhou',
				label: '最近一周'
			}, {
				value: 'shanggeyue',
				label: '最近一个月'
			}, {
				value: 'jinbannian',
				label: '最近半年'
			}, {
				value: 'jinyinian',
				label: '近一年'
			}],
			selectDay: 'shangzhou',
			pieChartList: [{
				id: 'sell_rebate',
				name: '销售返利占比',
				total: 5000,
				divide: 1200
			},
			{
				id: 'general_invite_rebate',
				name: '普通用户邀请返利占比',
				total: 5000,
				divide: 100
			},
			{
				id: 'super_invite_rebate',
				name: '代理用户邀请返利占比',
				total: 5000,
				divide: 1200
			},
			{
				id: 'activity_rebate',
				name: '活动优惠券返利占比',
				total: 5000,
				divide: 1200
			},
			{
				id: 'integral_rebate',
				name: '积分返利占比',
				total: 5000,
				divide: 1200
			}
			],
			effectiveDate: [moment().subtract(7, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
			effectiveDate_e: moment().format("YYYY-MM-DD"),
			effectiveDate_s: moment().subtract(7, "days").format("YYYY-MM-DD"),
			activeName1: 'yhdt',
			activeName2: 'all',
			userInfo: [
				{ name: '已实名用户', number: 2000 },
				{ name: '未实名用户', number: 2000 },
				{ name: '代理用户', number: 2000 },
				{ name: '代理关联用户', number: 2000 },
				{ name: '普通用户', number: 2000 }
			],
			vipClass: [
				{ name: '1级会员', number: 2000 },
				{ name: '2级会员', number: 2000 },
				{ name: '3级会员', number: 2000 },
				{ name: '4级会员', number: 2000 },
				{ name: '5级会员', number: 2000 }
			],

			newPeople: [
				{ name: '新增人数', number: 3000 }
			],
			activePeople: [
				{ name: '活跃人数', number: 3000 }
			]
		}
	},
	watch: {
		activeName1(val) {
			this.getUserMap()
		},
		activeName2(val) {
			this.getUserInfo(val)
		},
		effectiveDate: {
			handler(val) {
				if (val) {
					this.effectiveDate_s = val[0]
					this.effectiveDate_e = val[1]
				} else {
					this.effectiveDate_s = ''
					this.effectiveDate_e = ''
				}
			},
			deep: true
		},
		selectDay(val) {
			switch (val) {
				case 'zuotian':
					this.effectiveDate = [moment().subtract(1, "d").format("YYYY-MM-DD"), moment().subtract(1, "d").format("YYYY-MM-DD")]
					break;
				case 'shangzhou':
					this.effectiveDate = [moment().subtract(7, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
					break;
				case 'shanggeyue':
					this.effectiveDate = [moment().subtract(1, "months").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
					break;
				case 'jinbannian':
					this.effectiveDate = [moment().subtract(6, "months").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
					break;
				case 'jinyinian':
					this.effectiveDate = [moment().subtract(1, "years").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
					break;
				default:
					break;
			}
		}
	},
	filters: {
		thousand_tranf: function (value) {
			value = String(value)
			if (value.length > 3) {
				let reg = /(?=(?!\b)(\d{3})+$)/g
				return value.replace(reg, ',')
			} else {
				return value
			}
		}
	},
	mounted() {
		// this.chartLine()
		this.computedCount()
		this.getYesterDay()
		this.getTitleData()
		this.getLineData()
		this.getNumberNameInfo()
		this.getRebateRatio()
		this.getUserMap()
		this.getUserInfo('all')
	},
	methods: {
		handleSeach() {
			this.getLineData()
			this.getRebateRatio()
			this.getUserMap()
			this.getUserInfo()
		},
		// 获取订单的数量信息
		getNumberNameInfo() {
			this.$get('/home/order_num').then(res => {
				this.all_count = res.data.all_count
				this.all_money = res.data.all_money
			})
		},
		// 获取顶部title数据
		getTitleData() {
			this.$get('/home/heard_num').then(res => {
				this.titleList.forEach(item => {
					switch (item.name) {
						case '应付销售返利':
							item.number = res.data.sell
							break;
						case '应付推荐返利':
							item.number = res.data.recommend
							break;
						case '应付积分返利':
							item.number = res.data.integral
							break;
						case '应付销售额(未完成)':
							item.number = res.data.undone_saleroom
							break;
						case '应付代销返利(未完成)':
							item.number = res.data.undone_rebate
							break;
					}
				})
			})
		},
		// 获取折线图数据
		getLineData() {
			this.start_time = moment(this.effectiveDate_s).format('YYYY-MM-DD')
			this.end_time = moment(this.effectiveDate_e).format('YYYY-MM-DD')
			this.$get('/home/sell_trend?start_time=' + this.start_time + '&end_time=' + this.end_time).then(res => {
				this.chartLine(res.data.time_list, res.data.data_list)
			})
		},
		// 获取各个返利占比
		getRebateRatio() {
			this.start_time = moment(this.effectiveDate_s).format('YYYY-MM-DD')
			this.end_time = moment(this.effectiveDate_e).format('YYYY-MM-DD')
			this.$get('/home/rebate_ratio?start_time=' + this.start_time + '&end_time=' + this.end_time)
				.then(res => {
					this.pieChartList = this.pieChartList.map(item => {
						return {
							...item,
							total: res.data.all_rebate,
							divide: res.data[item.id]
						}
					})
				})
		},
		// 获取地图数据
		getUserMap() {
			let params = {
				type: 'user',
				start_time: moment(this.effectiveDate_s).format('YYYY-MM-DD'),
				end_time: moment(this.effectiveDate_e).format('YYYY-MM-DD')
			}
			if (this.activeName1 === 'yhdt') {
				params.type = 'user'
			} else {
				params.type = 'sell'
			}
			this.$get('/home/user_map', params)
				.then(res => {
					let result = res.data
					this.dataTotal = 0
					this.chinaData.forEach(item => {
						result.forEach(sub_item => {
							if (item.name === sub_item.province) {
								item.value = sub_item.count
							}
						})
						this.dataTotal += item.value
					})
					this.chinaData = this.chinaData.sort((a, b) => {
						return b.value - a.value
					})
					this.sortChinaData = this.chinaData.slice(0, 8)
					if (this.activeName1 === 'yhdt') {
						this.chartMap('yhdtMap')
					} else {
						this.chartMap('xsdtMap')
					}
				})
		},
		// 获取用户数据
		getUserInfo(val) {
			let params = {
				type: val,
				start_time: moment(this.effectiveDate_s).format('YYYY-MM-DD'),
				end_time: moment(this.effectiveDate_e).format('YYYY-MM-DD')
			}
			this.$get('/home/user_info', params)
				.then(res => {
					if (val === 'all') {
						this.userInfo[0].number = res.data.real_name_num
						this.userInfo[1].number = res.data.un_real_name_num
						this.userInfo[2].number = res.data.super_num
						this.userInfo[3].number = res.data.super_relevance_num
						this.userInfo[4].number = res.data.general_num
						this.vipClass[0].number = res.data.level_1
						this.vipClass[1].number = res.data.level_2
						this.vipClass[2].number = res.data.level_3
						this.vipClass[3].number = res.data.level_4
						this.vipClass[4].number = res.data.level_4
					} else if (val === 'new') {
						this.newPeople[0].number = res.data.user_count
					} else {
						this.activePeople[0].number = res.data.user_count
					}
				})
		},
		changeDataRange() {
			this.getYesterDay()
		},
		getYesterDay() {
			let yesterDay = moment().subtract(-1, 'd')
			this.dateList = []
			for (let index = 0; index < 24; index++) {
				this.dateList.push(yesterDay.subtract(index, 'hours').format('HH:00'))
			}
		},
		chartLine(timeData, data) {
			let lineWrap = echarts.init(document.getElementById('xlqsChart'))
			let option = {
				grid: {
					left: 80,
					right: 50,
					top: 40,
					bottom: 60
				},
				xAxis: {
					nameGap: 30,
					type: 'category',
					data: timeData
				},
				yAxis: {
					name: '单位(元)',
					nameLocation: 'start',
					nameGap: 20,
					type: 'value'
				},
				series: [{
					name: '时间',
					lineStyle: {
						normal: {
							color: '#363F51',
							width: 2,
							type: 'dashed'
						}
					},
					data: data,
					type: 'line'
				}]
			}
			lineWrap.setOption(option)
		},
		computedCount() {
			let data = this.chinaData.sort((o1, o2) => {
				if (isNaN(o1.value) || o1.value == null) return -1
				if (isNaN(o2.value) || o2.value == null) return 1
				return o2.value - o1.value
			})
		}
	}
}
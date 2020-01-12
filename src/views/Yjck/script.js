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
      titleList: [
        {
          number: 2000,
          name: '应付销售返利'
        },
        {
          number: 500,
          name: '应付推荐返利'
        },
        {
          number: 2000,
          name: '应付积分返利'
        },
        {
          number: 10000,
          name: '应付销售额(未完成)'
        },
        {
          number: 10000,
          name: '应付代销返利(未完成)'
        }
      ],
      options: [{
        value: 'cike',
        label: '此刻'
      }, {
        value: 'zuotian',
        label: '昨天'
      }, {
        value: 'shangzhou',
        label: '上周'
      }, {
        value: 'shanggeyue',
        label: '上个月'
      }, {
        value: 'jinbannian',
        label: '近半年'
      }, {
        value: 'jinyinian',
        label: '近一年'
      }],
      pieChartList: [
        {
          id: 1,
          name: '销售返利占比',
          total: 5000,
          divide: 1200
        },
        {
          id: 2,
          name: '普通用户邀请返利占比',
          total: 5000,
          divide: 1200
        },
        {
          id: 3,
          name: '代理用户邀请返利占比',
          total: 5000,
          divide: 1200
        },
        {
          id: 4,
          name: '活动优惠券返利占比',
          total: 5000,
          divide: 1200
        },
        {
          id: 5,
          name: '积分返利占比',
          total: 5000,
          divide: 1200
        }
      ],
      selectDay: 'zuotian',
      effectiveDate_s: '',
      effectiveDate_e: '',
      activeName1: 'yhdt',
      activeName2: 'yhs',
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
      chinaData: [
        {
          name: "北京",
          value: 5.3
        },
        {
          name: "天津",
          value: 3.8
        },
        {
          name: "上海",
          value: 4.6
        },
        {
          name: "重庆",
          value: 3.6
        },
        {
          name: "河北",
          value: 3.4
        },
        {
          name: "河南",
          value: 3.2
        },
        {
          name: "云南",
          value: 1.6
        },
        {
          name: "辽宁",
          value: 4.3
        },
        {
          name: "黑龙江",
          value: 4.1
        },
        {
          name: "湖南",
          value: 2.4
        },
        {
          name: "安徽",
          value: 3.3
        },
        {
          name: "山东",
          value: 3.0
        },
        {
          name: "新疆",
          value: 1
        },
        {
          name: "江苏",
          value: 3.9
        },
        {
          name: "浙江",
          value: 3.5
        },
        {
          name: "江西",
          value: 2.0
        },
        {
          name: "湖北",
          value: 2.1
        },
        {
          name: "广西",
          value: 3.0
        },
        {
          name: "甘肃",
          value: 1.2
        },
        {
          name: "山西",
          value: 3.2
        },
        {
          name: "内蒙古",
          value: 3.5
        },
        {
          name: "陕西",
          value: 2.5
        },
        {
          name: "吉林",
          value: 4.5
        },
        {
          name: "福建",
          value: 2.8
        },
        {
          name: "贵州",
          value: 1.8
        },
        {
          name: "广东",
          value: 3.7
        },
        {
          name: "青海",
          value: 0.6
        },
        {
          name: "西藏",
          value: 0.4
        },
        {
          name: "四川",
          value: 3.3
        },
        {
          name: "宁夏",
          value: 0.8
        },
        {
          name: "海南",
          value: 1.9
        },
        {
          name: "台湾",
          value: 0.1
        },
        {
          name: "香港",
          value: 0.1
        },
        {
          name: "澳门",
          value: 0.1
        },
        {
          name: '南海诸岛',
          value: 0
        }
      ],
      activePeople: [
        {name: '活跃人数', number: 3000}
      ]
    }
  },
  watch: {
    activeName1(val) {
      if (val === 'yhdt') {
        this.$nextTick(() => {
          this.chartMap('yhdtMap')
        })
      } else {
        this.$nextTick(() => {
          this.chartMap('xsdtMap')
        })
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
    this.chartLine()
    this.chartMap('yhdtMap')
    this.computedCount()
    this.getYesterDay()
  },
  methods: {
    changeDataRange() {
      this.getYesterDay()
    },
    getYesterDay() {
      let yesterDay = moment().subtract(-1, 'd')
      this.dateList = []
      for (let index = 0; index < 24; index++) {
        this.dateList.push(yesterDay.subtract(index, 'hours').format('HH:00'))
      }
      console.log(this.dateList)
    },
    chartLine() {
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
          data: [820, 932, 901, 934, 1290, 1330, 1320],
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

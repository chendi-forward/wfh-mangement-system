import GoodsList from './BasicComponents/GoodsList'
import NumberStatistics from './BasicComponents/NumberStatistics'
import TotalNumber from './BasicComponents/TotalNumber'
import PieChart from './BasicComponents/PieChart'
import ActivePeople from './BasicComponents/ActivePeople'
import echarts from 'echarts'
import {get } from 'http'
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
            titleList: [{
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
                thousand_tranf: function(value) {
                    value = String(value)
                    if (value.length > 3) {
                        let reg = /(?=(?!\b)(\d{3})+$)/g
                        return value.replace(reg, ',')
                    } else {
                        return value
                    }
                }
            ],
            activePeople: [
                { name: '活跃人数', number: 3000 }
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
        thousand_tranf: function(value) {
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
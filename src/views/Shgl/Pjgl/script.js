import Pagination from 'COMPONENTS/Pagination'
import Ddpj from './coms/ddpj'
import Sppj from './coms/sppj'
import { goodsEvaluationList, orderEvaluationList, delGoodsEvaluation, delOrderEvaluation } from 'API/Shgl'
import moment from 'moment'

export default {
    name: 'shgl-tkgl',
    components: {
        'my-pagination': Pagination,
        'ddpj-com': Ddpj,
        'sppj-com': Sppj
    },
    data() {
        return {
            order_Params: [],
            goodsParams: [],
            orderParams: {
                order_id: null,
                user_info: null,
                start_time: moment().week(moment().week()).startOf('week').format('YYYY-MM-DD'),
                end_time: moment().week(moment().week()).endOf('week').format('YYYY-MM-DD')
            },
            params: {
                searchOrder: '',
                selectKey: null,
                time: [moment().week(moment().week()).startOf('week').format('YYYY-MM-DD'), moment().week(moment().week()).endOf('week').format('YYYY-MM-DD')]
            }, // 携带参数
            total: 0,
            pageSize: 10,
            currentPage: 1,
            tableData: [{}],
            tabs: [
                { label: '商品评价', name: '0', com: 'sppj-com' }, { label: '订单评价', name: '1', com: 'ddpj-com' }
            ],
            currentTab: '0',
            // 退款时间线
            activities: [{
                content: '退货清单',
                timestamp: '2018-04-12 20:46',
                type: 'danger',
                class: 'theme-color'
            }, {
                content: '仓库收货',
                timestamp: '2018-04-03 20:46'
            }, {
                content: '确认退款',
                timestamp: '2018-04-03 20:46'
            }]
        }
    },
    methods: {
        deleteitem(n) {
            if (this.currentTab == '0') {
                this.goodsParams = n
            } else {
                this.order_Params = n
            }
        },
        deletePingjia() {
            if (this.currentTab == '0') {
                // this.getData()
                let arr = []
                this.goodsParams.forEach((item) => {
                    arr.push(item.id)
                })
                let data = {
                    id_list: arr
                }
                delGoodsEvaluation(data).then(res => {
                    this.getData()
                })
            } else {
                let arr = []
                this.order_Params.forEach((item) => {
                    arr.push(item.id)
                })
                let data = {
                    order_id: arr
                }
                delOrderEvaluation(data).then(res => {
                    this.getOrderData()
                })
            }
        },
        searchParams(data) {
            this.orderParams = data
            this.getOrderData()
        },
        updateData() {
            if (this.currentTab == '0') {
                this.getData()
            } else {
                this.getOrderData()
            }
        },
        getSearchData(data) {
            this.params = data
            this.getData()
        },
        getData() {
            let data = {
                page_count: this.pageSize,
                current_page: this.currentPage,
                start_time: moment(this.params.time[0]).format('YYYY-MM-DD'),
                end_time: moment(this.params.time[1]).format('YYYY-MM-DD'),
                evaluation_score: this.params.selectKey,
                goods_info: this.params.searchOrder
            }
            goodsEvaluationList(data).then(data => {
                this.tableData = data.data.data_list
                this.tableData.forEach((item) => {
                    item.evaluation_score = item.evaluation_score == 1 ? 'icon-chaping' : item.evaluation_score == 2 ? 'icon-zhongping' : 'icon-haoping';
                })
                let count = data.data.count
                this.total = count
            })
        },
        getOrderData() {
            let data = {
                page_count: this.pageSize,
                current_page: this.currentPage,
                ...this.orderParams
            }
            orderEvaluationList(data).then((res) => {
                this.tableData = res.data.data_list
                this.total = res.data.count
            })
        },
        tabChage(v) {
            this.currentTab = v.name
            this.currentPage = 1
            if (v.name == 0) {
                this.getData()
            } else {
                this.getOrderData()
            }
        },
        handleSelectionChange(n) {
            this.currentPage = n
            if (this.currentTab == '0') {
                this.getData()
            } else {
                this.getOrderData()
            }
        },
        handleSizeChange(n) {
            this.pageSize = n
            if (this.currentTab == '0') {
                this.getData()
            } else {
                this.getOrderData()
            }
        },
        handleCurrentChange() {}
    },
    mounted() {
        this.getData()
    }
}
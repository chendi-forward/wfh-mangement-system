import Pagination from 'COMPONENTS/Pagination'
import Ddpj from './coms/ddpj'
import Sppj from './coms/sppj'
import { goodsEvaluationList } from 'API/Shgl'
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
                console.log(count, data, '========')
            })
        },
        tabChage(v) {
            this.currentTab = v.name
        },
        handleSelectionChange(n) {
            console.log(n, '=========')
            this.currentPage = n
            this.getData()
        },
        handleSizeChange(n) {
            this.pageSize = n
            this.getData()
        },
        handleCurrentChange() {}
    },
    mounted() {
        this.getData()
    }
}
import Pagination from 'COMPONENTS/Pagination'
import DialogCom from 'COMPONENTS/DialogCom'
import addRefund from '../coms/add'
import Refund from '../coms/refund'
import Receiving from '../coms/receiving'
import { refundList, refundDeliver, cancelRefund } from 'API/Shgl'

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
                { label: '退款中', name: '1' }, { label: '退款完成', name: '2' }
            ],
            currentTab: '1',
            // 退款时间线
            activities: [{
                content: '退货清单',
                timestamp: '2018-04-12 20:46',
                type: 'danger',
                class: 'theme-color'
            }, {
                content: '仓库收货',
                timestamp: '2018-04-03 20:46',
                type: 'danger',
                class: 'theme-color'
            }, {
                content: '确认退款',
                timestamp: '2018-04-03 20:46'
            }],
            // 弹框部分
            dialogFlag: false,
            currentCom: {},
            coms: [
                { name: '退款信息', com: 'add-dialog', data: null },
                { name: '确认收货', com: 'receiving-dialog', data: null },
                { name: '确认退款', com: 'refund-dialog', data: null }
            ]
        }
    },
    methods: {
        cancleTuik() {
            if (this.idArrtoStr) {
                let data = {
                    id: this.idArrtoStr
                }
                cancelRefund(data).then(res => {
                    console.log(res, '=====')
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
                    this.tableData = res.data.data_list
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
        openDialog(index, item) {
            this.goodsid = item.id
            let data = {}
            if (index == 1) {
                data = {
                    ddbh: item.order_id,
                    tydh: item.express_number
                }
            } else if (index == 2) {
                data = {
                    ddbh: item.order_id,
                    tkzh: item.wechat_id,
                    tkje: item.refund_money
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
            console.log(item, '==item==')
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
            // console.log(item, '===')
            switch (item.flag) {
                case 1:
                    // 物流信息的添加
                    let data = {
                        id: this.goodsid,
                        express_name: item.selectKey,
                        express_number: item.tydh
                    }
                    refundDeliver(data).then(res => {
                        console.log(res, '====')
                    })
                    break;
                default:
                    break;
            }
            this.dialogFlag = false
        },
        cancleSave() {
            this.dialogFlag = false
        }
    },
    created() {
        this.getData()
    }
}
import DialogCom from 'COMPONENTS/DialogCom'
import EditLogistics from '../coms/editLogistics'
import Logistics from '../coms/logistics'
import {orderDetail, cancelOrder, deliverGoods} from 'API/Shgl'

export default {
  name: 'shgl-ddxq',
  components: {
    'dialog-Com': DialogCom,
    'editLogistics-dialog': EditLogistics,
    'logistics-dialog': Logistics
  },
  data () {
    return {
      tableData1: [{
        "confirm_time": null, //       -- 确认收货时间
        "deliver_time": null, //       -- 发货时间
        "nickname": "WFH49939757", //  -- 用户昵称
        "order_id": "WFH49939757201909071733433102", //  -- 订单id
        "order_state": "订单完成", //            -- 订单状态
        "order_time": null, //                  -- 下单时间
        "pay_time": null, //                   -- 支付时间
        "user_id": "WFH49939757", //           -- 用户的id
        "wechat_id": null  //                  -- 微信的id
      }],
      tableData2: [{
        count: 20,
        goods_title: '',
        original_price: 2000,
        rebate_money: '',
        taste: ''
      },
      {                      
        "count": 2, //                -- 商品数量
        "goods_title": "哇哈哈", //    -- 商品名称
        "original_price": 10000.3, // -- 付款时的单价
        "rebate_money": null, //      -- 返利金额
        "taste": "橘子味" //           -- 口味
      }],
      addressee_info: { // 收货详情
        "address": "北京",  //      -- 收货地址     
        "recipient": "张三", //     -- 收货姓名
        "recipient_tel": "18312341234" //  -- 收货电话
      },
      express_info: { //         -- 物流信息
        "express_name": null, //         -- 快递名称
        "express_number": null, //       -- 快递单号
        "express_type": 1, //            -- 快递类型 0/顺丰到付，1/普通快递
        "postage": 10.0, //               -- 快递费
        "remark": '' // 备注
      },
      invoice_info: { //               发票信息
        "express_name": null, //         -- 发票快递名称
        "express_number": null, //       -- 发票快递单号 
        "invoice_title": "李四", //       -- 发票抬头
        "is_company": 0, //              -- 是否是公司发票
        "is_e_invoice": 1, //            -- 是否是电子发票
        "recipient": "张三", //           -- 收件人
        "recipient_address": "hhhh@qq.com", //  --收件地址/邮箱
        "recipient_tel": "12312341234", //      -- 收件人手机号
        "tin_number": ""  //                    -- 发票税号
      },
      // 弹框部分
      dialogFlag: false,
      currentCom: {},
      coms: [
        {name: '发货', com: 'editLogistics-dialog', data: { name: '', express_number: '', order_id: ''}, showBtn: true},
        {name: '物流追踪', com: 'logistics-dialog', data: this.$route.query.order_id, showBtn: false}
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      orderDetail({order_id: this.$route.query.order_id}).then(res => {
        this.tableData1 = [res.data.order_detail]
        let obj = {
          count: res.data.goods_detail.all_count,
          goods_title: '',
          original_price: res.data.goods_detail.all_money,
          rebate_money: '',
          taste: '',
          rebate: '',
          coupon_rebate:  '',
          active_rebate: ''
        }
        res.data.goods_detail.goods_list.unshift(obj)
        this.tableData2 = res.data.goods_detail.goods_list
        this.addressee_info = res.data.addressee_info
        this.express_info = res.data.express_info
        this.invoice_info = res.data.invoice_info
      })
    },
    goBack () {
      this.$router.push({name: 'shgl-ddlb'})
    },
    editHandle () {
      this.currentCom = this.coms[0]
      this.dialogFlag = true
    },
    trace () {
      this.currentCom = this.coms[1]
      this.dialogFlag = true
    },
    cancleItem () {
      cancelOrder ({order_id: this.$route.query.order_id}).then(res => {
        if (res.data) {
          this.$message.success('订单已取消！')
        } else {
          this.$message.error('取消失败！')
        }
      })
    },
    selectChange () {},
    sureSave (flag) {
      this.dialogFlag = flag
      this.currentCom.order_id = this.$route.query.order_id
      deliverGoods(this.currentCom.data).then(res => {
        if (res.data) {
          this.$message.success('发货成功！')
          this.getOrderList()
        } else {
          this.$message.error('发货失败！')
        }
      })
    },
    cancleSave (flag) {
      this.dialogFlag = flag
    }
  }
}

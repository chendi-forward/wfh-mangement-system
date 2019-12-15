import {post, get, patch, put} from '@/api/http'

// 获取所有的快递公司
export function logisticsManage () {
    return get('/after_sale/logistics_manage')
}
// Mark
export function postLogisticsManage (data) {
    return post('/after_sale/logistics_manage', data)
}
// 售后模块上面的头部部分
export function saleHead () {
    return get('/after_sale/sale_head')
}
// 订单列表
export function orderList (data) {
    return get('/after_sale/order_kind_list', data)
}
// 订单的详情
export function orderDetail (data) {
    return get('/after_sale/order_detail', data)
}
// 最新退款的数量
export function newRefund () {
    return get('/after_sale/new_refund')
}
// 新评价的数量
export function newEvaluation () {
    return get('/after_sale/new_evaluation')
}
// 获取订单下的所有的商品
export function orderGoods (data) {
    return get('/after_sale/get_order_goods', data)
}
// MARK 创建退款
export function postOrderGoods (data) {
    return post('/after_sale/get_order_goods', data)
}
// 获取退款列表
export function refundList (data) {
    return get('/after_sale/refund_list', data)
}
// 退款填写物流信息(post)
export function refundDeliver (data) {
    return post('/after_sale/refund_deliver', data)
}
// 取消退款
export function cancelRefund (data) {
    return get('/after_sale/cancel_refund', data)
}
// 获取退款订单详情（进行确认收货展示）
export function refundDetail (data) {
    return get('/after_sale/refund_detail', data)
}
// 退货订单确定收货
export function confirmReceipt (data) {
    return get('/after_sale/confirm_receipt', data)
}
// 实际完成退款
export function refund (data) {
    return get('/after_sale/refund', data)
}
// 正常订单发货
export function deliverGoods (data) {
    return post('/after_sale/deliver_goods', data)
}
// 获取商品的评价列表
export function goodsEvaluationList (data) {
    return get('/after_sale/goods_evaluation_list', data)
}
// 订单追加评价和修改显示状态
export function postGoodsEvaluationList (data) {
    return post('/after_sale/goods_evaluation_list', data)
}
// 删除订单的评价
export function delGoodsEvaluation (data) {
    return post('/after_sale/del_goods_evaluation', data)
}
// 获取订单的评价
export function orderEvaluationList (data) {
    return get('/after_sale/order_evaluation_list', data)
}
// 删除订单评价
export function delOrderEvaluation (data) {
    return post('/after_sale/del_order_evaluation', data)
}
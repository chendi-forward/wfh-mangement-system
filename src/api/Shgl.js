import {post, get, patch, put} from '@/api/http'

// 获取所有的快递公司
export function logisticsManage () {
    return get('/after_sale/logistics_manage')
}
// Mark
export function logisticsManage (data) {
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
export function orderGoods (data) {
    return post('/after_sale/get_order_goods', data)
}

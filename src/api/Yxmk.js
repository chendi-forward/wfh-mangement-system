import { post, get, patch, put } from '@/api/http'

// 添加活动
export function addActive(data) {
    return post('/marketing/add_active', data)
}
// 获取活动列表（get）
export function getActiveList(data) {
    return get('/marketing/get_active_list', data)
}
// 获取活动详情
export function getActiveDetail(data) {
    return get('/marketing/get_active_detail', data)
}
// 更改活动（post）
export function updateActive(data) {
    return post('/marketing/update_active', data)
}

// 删除活动（post）
export function deleteActive(data) {
    return post('/marketing/delete_active', data)
}
// 获取商品信息
export function getGoodsList(data) {
    return get('/marketing/goods_list', data)
}
// 获取用户列表
export function getUserList(data) {
    return get('/marketing/user_list', data)
}
// 获取标签
export function getLableData() {
    return get('/user/get_label')
}
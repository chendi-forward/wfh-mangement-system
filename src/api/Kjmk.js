import {post, get, patch, put} from '@/api/http'

// 返利提取流水列表
export function brokerageTurnoverList(data) {
    return get('/accountant/brokerage_turnover_list', data)
}
// 提现审核列表
export function cashWithdrawalList (data) {
    return get('/accountant/cash_withdrawal_list', data)
}
// 申请的详情
export function cashWithdrawalDetail (data) {
    return get('/accountant/cash_withdrawal_detail', data)
}
// 审核审批
export function auditCashWithdrawal (data) {
    return get('/accountant/audit_cash_withdrawal', data)
}

import {get, post} from '../http'

// 接口统一管理
export default {
  add (data) { return post('url', data) },
  edit (data) { return post('url', data) },
  delete (data) { return post('url', data) }
}
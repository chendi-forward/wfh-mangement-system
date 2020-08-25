//深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}

//日期格式化
export const dateFormat = function (source, ignore_minute) {
  var myDate
  var separate = '-'
  var minute = ''
  if (source === void (0)) {
    source = new Date()
  }
  if (source) {
    if (source.split) {
      source = source.replace(/-/g, '/')
    } else if (isNaN(parseInt(source))) {
      source = source.toString().replace(/-/g, '/')
    } else {
      source = new Date(source)
    }

    if (new Date(source) && (new Date(source)).getDate) {
      myDate = new Date(source)
      if (!ignore_minute) {
        minute = (myDate.getHours() < 10 ? ' 0' : ' ') + myDate.getHours() + ':' + (myDate.getMinutes() < 10 ? '0' : '') + myDate.getMinutes()
      }
      return myDate.getFullYear() + separate + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute
    } else {
      return source.slice(0, 16)
    }
  } else {
    return source
  }
}
export const tableToExcel = function (obj){
  //要导出的json数据
  const jsonData = obj.data
  //列标题，逗号隔开，每一个逗号就是隔开一个单元格
  // let str = `收货地址,物流单号,昵称,订单号,订单状态,实付金额,返利金额,更新时间,用户ID,微信交易号\n`;
  let str = '';
  let map = obj.map
  //增加\t为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < map.length; i++) {
    const item = map[i]
    if (i == map.length - 1) {
      str += `${item.value}\n`
    } else {
      str += `${item.value},`
    }
  }
  for(let i = 0 ; i < jsonData.length ; i++ ){
    for (let index = 0; index < map.length; index++) {
      const item = map[index].name;
      str+=`${jsonData[i][item] + '\t'},`;
    }
    str+='\n';
  }
  //encodeURIComponent解决中文乱码
  let uri = 'data:text/xls;charset=utf-8,\ufeff' + encodeURIComponent(str);
  //通过创建a标签实现
  let link = document.createElement("a");
  link.href = uri;
  //对下载的文件命名
  link.download =  obj.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/*
//ajax错误处理
export const catchError = function(error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: error.response.data.message || '请求参数异常',
          type: 'error'
        })
        break
      case 401:
        sessionStorage.removeItem('user')
        Vue.prototype.$message({
          message: error.response.data.message || '密码错误或账号不存在！',
          type: 'warning',
          onClose: function(){
            location.reload()
          }
        })
        break
      case 403:
        Vue.prototype.$message({
          message: error.response.data.message || '无访问权限，请联系企业管理员',
          type: 'warning'
        })
        break
      default:
        Vue.prototype.$message({
          message: error.response.data.message || '服务端异常，请联系技术支持',
          type: 'error'
        })
    }
  }
  return Promise.reject(error)
}*/

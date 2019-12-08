const ENV = process.env.VUE_APP_BASE_API

export default (
  function () {
    if (ENV === 'PRO') {
      return {
        'api': 'http://127.0.0.1:7777/',
        'imgPath': 'http://127.0.0.1:7777/'
      }
    } else {
      return {
        'api': '/api',
        'imgPath': '/api'
      }
    }
  }
)()

const ENV = process.env.VUE_APP_BASE_API

export default (
  function () {
    if (ENV === 'PRO') {
      return {
        'api': 'http://47.94.133.35:5500/',
        'imgPath': 'http://47.94.133.35:5500/'
      }
    } else {
      return {
        'api': '/api',
        'imgPath': '/api'
      }
    }
  }
)()

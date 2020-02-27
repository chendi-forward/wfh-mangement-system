const ENV = process.env.VUE_APP_BASE_API

export default (
    function() {
        if (ENV === 'PRO') {
            return {
                'api': 'http://background.wfh-seller.com',
                'imgPath': '',
                'baseUrl': 'http://background.wfh-seller.com',
                'updateImgUrl': 'http://background.wfh-seller.com'
            }
        } else {
            return {
                'api': '/api',
                'imgPath': '',
                'baseUrl': 'http://background.wfh-seller.com',
                'updateImgUrl': 'http://background.wfh-seller.com'
            }
        }
    }
)()
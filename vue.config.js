const path = require('path')

module.exports = {
  configureWebpack: config => {
    config.resolve.extensions = ['.js', '.json', '.css', '.less', '.vue']
    config.resolve.alias = {
      'VIEWS': path.join(__dirname, './src/views'),
      'API': path.join(__dirname, './src/api'),
      'ASSETS': path.join(__dirname, './src/assets'),
      'COMPONENTS': path.join(__dirname, './src/components'),
      'STORE': path.join(__dirname, './src/store'),
      'COMMONS': path.join(__dirname, './src/commons')
    }
  }
}

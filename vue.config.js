const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: config => {
    config.resolve.extensions = ['.js', '.json', '.css', '.less', '.vue']
    //  src目录下的各个文件夹的简称
    config.resolve.alias = {
      '@': path.join(__dirname, './src'),
      'VIEWS': path.join(__dirname, './src/views'),
      'API': path.join(__dirname, './src/api'),
      'ASSETS': path.join(__dirname, './src/assets'),
      'COMPONENTS': path.join(__dirname, './src/components'),
      'STORE': path.join(__dirname, './src/store'),
      'COMMONS': path.join(__dirname, './src/commons')
    }
  },
  devServer: {
    // hot: false,
    proxy: {
      '/api': {
        target: 'http://47.94.133.35:5500',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}

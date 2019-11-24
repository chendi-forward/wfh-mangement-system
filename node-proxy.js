/**
 * Node-proxy
 * 
 * 安装
 * npm i nodemon -g
 * npm i express http-proxy-middleware -D
 *
 * 配置
 * package.json中配置脚本 "m-dev": "nodemon node-proxy.js"
 *
 */

const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()
// 模拟线上地址调试
app.use('/', express.static('./dist'))
app.use('/', proxy({
    target: 'http://47.94.133.35:5500/',
    changeOrigin: true
}))
app.listen(3000)
console.log('\x1B[4m%s\x1B[24m', 'http://47.94.133.35:3000')
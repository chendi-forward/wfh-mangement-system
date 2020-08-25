import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import {post, get, patch, put} from './api/http'

Vue.config.productionTip = false
import '@/icons' // icon

//定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put



Vue.use(ElementUI)

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

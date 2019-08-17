import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './commons/commons.less'
import './commons/tabs.less'
import {post, get, patch, put} from './http'
import 'COMMONS/element-reset.less'
import 'COMMONS/commons.less'
import 'COMMONS/tabs.less'

Vue.config.productionTip = false

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

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
<<<<<<< HEAD
import 'COMMONS/element-reset.less'
import 'COMMONS/commons.less'
import 'COMMONS/tabs.less'
=======
import './commons/commons.less'
import './commons/tabs.less'
import {post, get, patch, put} from './http'
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af

Vue.config.productionTip = false

//定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import axios from './axios/index'
import router from './router'
import store from './store/store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

import 'vant/lib/index.css'
import './plugins/vant'
 
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('ws://127.0.0.1:3000')
}))

Vue.config.productionTip = false
Vue.prototype.axios = axios


// 跳转后返回顶部
router.afterEach(() => {
  window.scrollTo(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

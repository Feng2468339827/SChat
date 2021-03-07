import Vue from 'vue'
import App from './App.vue'
import axios from './axios/index'
import router from './router'
import 'vant/lib/index.css'
import './plugins/vant'
import store from './store/store'

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

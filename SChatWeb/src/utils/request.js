import Axios from 'axios'
import store from '../store/store'
import router from '../router/index'
// 基本api
let api = '/api'

let checkCode = (res) => {
  if (res.data.code >= 200 && res.data.code <= 300) {
    // localStorage.setItem('token', res.data.token)
    return res.data
  }
}
let checkErr = (err) => {
  // 登录凭证失效
  if (JSON.stringify(err).indexOf(400) !== -1) {
    store.commit('SET_LOGINSTATUS', false)
    localStorage.setItem('token', null)
    router.push({
      name: 'login'
    })
  }
}
export async function request (options) {
  Axios.defaults.baseURL = api
  Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  // Axios.defaults.headers.common['token'] = token
  return new Promise((resolve) => {
    Axios(options)
      .then(checkCode)
      .then((data) => resolve(data))
      .catch(checkErr)
  })
}

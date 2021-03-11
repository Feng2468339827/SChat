import Axios from 'axios'
import store from '../store/store'
import router from '../router/index'
import { NOLOGIN, TIMEOUT } from './status'
// 基本api
let api = '/api'

let checkCode = (res) => {
  if (res.data.status === NOLOGIN) {
    return {
      status: NOLOGIN,
      message: '请先登录'
    }
  } else if (res.data.status === TIMEOUT) {
    return {
      status: NOLOGIN,
      message: '账号过期，请重新登录'
    }
  } else {
    localStorage.setItem('token', res.data.token)
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
  console.log(token())
  // Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if(token()) Axios.defaults.headers['Authorization'] = token()
  // Axios.defaults.headers.common['token'] = token
  
  return new Promise((resolve) => {
    Axios(options)
      .then(checkCode)
      .then((data) => resolve(data))
      .catch(checkErr)
  })
}

import Axios from 'axios'
import store from '../store/store'
// import router from '../router/index'
import * as STATUS from './status'
// 基本api
let api = '/api'
// 直接登录
let token = localStorage.getItem('token') || ''

// 检测状态中间件
let checkCode = (res) => {
  let status = res.data.status
  if (status === STATUS.NOLOGIN) {
    store.commit('SET_LOGINSTATUS', false)
    // localStorage.setItem('token', '')
    return {
      status,
      message: '请先登录'
    }
  } else if (status === STATUS.TIMEOUT) {
    store.commit('SET_LOGINSTATUS', false)
    localStorage.setItem('token', '')
    return {
      status,
      message: '账号过期，请重新登录'
    }
  } else if (status === STATUS.LOGINOK) {
    // 记录登录凭证
    localStorage.setItem('token', res.data.user.data)
    return {
      status: 200,
      user: res.data.user,
      message: '登陆成功'
    }
  }
  return res.data
}

let checkErr = (err) => {
  console.log('err:'+err)
  // router.push({
  //   name: 'login'
  // })
}

export async function request (options) {
  Axios.defaults.baseURL = api
  // Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (token) Axios.defaults.headers['Authorization'] = token
  
  return new Promise((resolve) => {
    Axios(options)
      .then(checkCode)
      .then((data) => resolve(data))
      .catch(checkErr)
  })
}

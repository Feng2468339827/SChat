import * as types from './mutation-types'

const mutation = {
  // 设置导航栏类型
  [types.SET_NAVTYPE] (state, type) {
    state.navType = type
  },
  // 设置导航栏标题
  [types.SET_TITLE] (state, title) {
    state.title = title
  },
  // 设置搜索栏展现
  [types.SET_SEARCH] (state, show) {
    state.isSearch = show
  },
  // 设置登陆状态
  [types.SET_LOGINSTATUS] (state, status) {
    state.login.status = status
  },
  // 设置登录token
  [types.SET_LOGINTOKEN] (state, token) {
    state.login.token = token
  }
}

export default mutation

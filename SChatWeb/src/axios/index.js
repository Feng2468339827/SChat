// 1. 引入
import axios from 'axios'
import router from '../router/index'

// 2. 创建实例
const instance = axios.create(config)

// 3. 配置信息
let config = {
	// 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
	baseURL: "http://localhost",
	// 请求超时时间
	timeout: 10000,
	// 每次请求携带cookie
	withCredentials: true
}

// 请求拦截
// instance.interceptors.request.use(
//   config => {...},
//   err => Promise.reject()
// )

// 响应拦截
instance.interceptors.response.use(
  response => { // 拦截未登录
    if (response.data.status === 0) {
        router.replace('/');
    }
    return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:
                  // 这里写清除token的代码
                  router.replace('/');
          }
      }
      return Promise.reject(error.response.data)
  })

// 4. 导出
export default instance
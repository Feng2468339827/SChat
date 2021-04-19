// 单独的创建一个中间件，然后在app.js中注册使用
const jwt = require('jsonwebtoken')
const STATUS = require('../config/status')
const User = require('../models/user') 

async function check(ctx, next) {
  try {
    let url = ctx.url.split('?')[0]
    // 如果是登陆页面和注册页面就不需要验证token了
    if (url === '/users/login' || url === '/users/register') {
      await next()
    } else {
      // 否则获取到token
      let token = ctx.request.headers["authorization"]
      if (token) {
        // 如果有token的话就开始解析
        const tokenItem = jwt.verify(token, 'token')
        // console.log(tokenItem)
        // 将token的创建的时间和过期时间结构出来
        const { time, timeout, user } = tokenItem
        const me = await User.findOne({ _id: user._id }, 'token', (err, u) => u)
        const userToken = me.token
        // 比较token, 对比失败或是token解析错误
        if (!userToken || userToken != token) {
          return ctx.body = {
            status: STATUS.TOKENERR,
            message:'token错误'
          }
        }
        // 拿到当前的时间
        let data = new Date().getTime();
        // 判断一下如果当前时间减去token创建时间小于或者等于token过期时间，说明还没有过期，否则过期
        if (data - time <= timeout) {
          // token没有过期
          // this.user = user
          await next()
        } else {
          ctx.body = {
            status: STATUS.TIMEOUT,
            message:'token 已过期，请重新登陆'
          }  
        }
      } else {
        ctx.body = {
          status: STATUS.NOLOGIN,
          message:'请先登陆'
        } 
      }
    }
  } catch (error) {
    console.error(error)
    ctx.body = {
      status: 0,
      message:'无效访问'
    }
  }
  
}

module.exports = check
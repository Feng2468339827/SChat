const jwt = require('jsonwebtoken')

/**
 * 创建一个token
 * @param {Object} user 用户信息
 */
module.exports = function token (user) {
  return jwt.sign({
    //token的创建日期
    time: Date.now(),
    //token的过期时间
    timeout: Date.now() + 60000,
    user,
    // token：解析token的标识
  }, 'token')
}
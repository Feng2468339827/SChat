const jwt = require('jsonwebtoken')

/**
 * 创建一个token
 * @param {String} id 用户id
 */
module.exports = function token (id) {
  return jwt.sign({
    //token的创建日期
    time: Date.now(),
    //token的过期时间
    timeout: Date.now() + 60000,
    userid: id,
    // token：解析token的标识
  }, 'token')
}
const crypto = require('crypto')

/**
 * 
 * @param {String} password 
 */
let newPwd = (password) => {
  let md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

module.exports = {
  newPwd
}
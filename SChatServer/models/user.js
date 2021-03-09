const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: String,
  avatar: {type: String, default: 'default.jpg'},
  password: String,
  phone: Number,
  // 好友集合
  friends: {type: [{
    name: String,
    avatar: String,
    _id: String
  }], default: []},
  // 请求集合
  request: {type: [{
    /**
     * status
     * 0表示未处理
     * 1表示已通过
     * 2表示已拒绝
     */
    status: { type: Number, default: 0},
    name: String,
    avatar: String,
    _id: String
  }], default: []}

})

userSchema.index({id: 1})

let User = mongoose.model('User', userSchema)

module.exports = User
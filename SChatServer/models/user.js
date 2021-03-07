let mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: String,
  avatar: {type: String, default: 'default.jpg'},
  password: String,
  phone: Number,
  friends: {type: Array, default: []}
})

userSchema.index({id: 1})

let User = mongoose.model('User', userSchema)

// User.find((err, user) => {
//   console.log(user)
//   console.log(err)
// })
module.exports = User
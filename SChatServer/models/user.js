import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: String,
	id: Number,
  avatar: {type: String, default: 'default.jpg'},
  password: String,
  phone: Number
})

userSchema.index({id: 1})

const User = mongoose.model('User', userSchema)

export default User
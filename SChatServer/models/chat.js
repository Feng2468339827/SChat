const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
  // chatid: Number,
  // userid: Number
})

chatSchema.index({id: 1})

const Chat = mongoose.model('Id',chatSchema)

module.exports = Id
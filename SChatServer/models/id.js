let mongoose = require('mongoose')
const Schema = mongoose.Schema

const idSchema = new Schema({
  chatid: Number,
  userid: Number
})

idSchema.index({id: 1})

let Id = mongoose.model('Id',idSchema)
module.exports = Id
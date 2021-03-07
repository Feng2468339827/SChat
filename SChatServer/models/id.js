import mongoose from 'mongoose'
const Schema = mongoose.Schema

const idSchema = new Schema({
  chatid: Number,
  userid: Number
})

idSchema.index({id: 1})

const Id = mongoose.model('Id',idSchema)

export default Id
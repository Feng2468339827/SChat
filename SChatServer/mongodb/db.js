const mongoose = require('mongoose')
const config = require('../config/default')

mongoose.set('useCreateIndex', true)
mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auto_reconnect: true,
  promiseLibrary: global.Promise
})


const db = mongoose.connection

db.once('open' ,() => {
  console.log('连接数据成功')
})

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error)
    mongoose.disconnect()
})

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.url, {server:{auto_reconnect:true}})
})

module.exports = {
  db
}

var router = require('koa-router')()

router.prefix('/users')

router.get('/', function *(next) {
  this.body = 'this is a users response!'
  let { username } = this.query
  console.log(username)
  this.body = {
    status: 200,
    message: '注册成功'
  }
  // res.send({
  //   status: 200,
  //   message: '注册成功'
  // })
})

router.get('/bar', function *(next) {
  this.body = 'this is a users/bar response!'
})

module.exports = router;

const router = require('koa-router')()

router.prefix('/index')

/**
 * 请求通讯录信息 
 */
router.get('/getBookInfo', async (ctx, next) => {
  try {
    // 根据id搜索用户
    const { id } = ctx.request.query
    // 返回头像和名字
    await User.findOne({ id }, (err, user) => {
      // 查找得到返回用户信息
      if (user) return ctx.body = {
        status: 200,
        user
      }
      // 查找不到用户
      ctx.body = {
        status: 0,
        message: '该用户不存在'
      }
    })
  } catch (error) {
    console.error(error)
  }
})
module.exports = router
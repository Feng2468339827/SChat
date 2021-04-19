const router = require('koa-router')()
const User = require('../models/user.js')
const { newPwd } = require('../utils/utils')
const Token = require('../utils/token')
const STATUS = require('../config/status')

const avatar = 'https://schatnet.oss-cn-guangzhou.aliyuncs.com/index/default5.jpg'
const reg_phone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

// 加前缀
router.prefix('/users')

/**
 * 用户登录
 */
router.post('/login', async (ctx, next) => {
  try {
    const { phone, password } = ctx.request.body
    // 手机号为空
    if (phone == '') {
      ctx.body = {
        status: 0,
        message: '手机号不能为空'
      }
    } else if (!reg_phone.test(phone)) {
      // 手机号不符合格式
      ctx.body = {
        status: 0,
        message: '请正确填写您的手机号码'
      }
    } else if (password == '') {
      // 密码为空
      ctx.body = {
        status: 0,
        message: '密码不能为空'
      }
    } else {
      await User.findOne({
        phone,
        password: newPwd(password)
      }, '-password -token', (err, user) => {
        // 若搜寻到此用户，则登录成功
        if (user) {
          let token = Token(user)
          ctx.body = {
            status: STATUS.LOGINOK,
            message: '登陆成功',
            user
          }
          // 设置全局变量，将用户信息保存在全局方便使用
          global.user = user
          user.token = token
          // 更新用户token
          user.save()
        } else {
          ctx.body = {
            status: 0,
            message: '手机号或密码错误'
          }
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
})

/**
 * 退出登录
 */
router.get('/exit', async (ctx, next) => {
  try {
    console.log(this.user)
  } catch (error) {
    
  }
})

/**
 * 用户注册
 */
router.post('/register', async (ctx, next) => {
  console.log(ctx.request.body)
  try {
    const {
      phone,
      password,
      name
    } = ctx.request.body

    // 手机号为空
    if (phone.trim == '') {
      ctx.body = {
        status: 0,
        message: '密码不能为空'
      }
    } else if (!reg_phone.test(phone)) {
      // 手机号不符合格式
      ctx.body = {
        status: 0,
        message: '正确填写您的手机号码'
      }
    } else if (name.trim() == '') {
      // 用户名为空
      ctx.body = {
        status: 0,
        message: '用户名不能为空'
      }
    } else if (name.trim().length > 10) {
      // 用户名不合法
      ctx.body = {
        status: 0,
        message: '用户名不能超过10位'
      }
    } else {
      // 查找手机号是否已被注册
      await User.findOne({ phone }, (err, user) => {
        // 手机号已被注册
        if (user) {
          ctx.body = {
            status: 0,
            message: '该手机号已被注册'
          }
        } else {
          // 手机号未被注册，将密码加密保存进数据库
          new User({
            phone,
            password: newPwd(password),
            avatar,
            name
          }).save()
          ctx.body = {
            status: 200,
            message: '注册成功'
          }
        }
      })
    }
  } catch (err) {
    console.error(err)
  }
})

/**
 * 搜索好友
 */
router.get('/findfriend', async (ctx, next) => {
  try {
    // 根据手机号搜索用户
    const { phone } = ctx.request.query
    console.log(ctx.user)
    // 返回头像和名字
    await User.findOne({ phone }, 'name avatar phone', (err, user) => {
      // 查找得到返回用户信息
      if (user) return ctx.body = {
        status: 200,
        message: '搜索成功',
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

/**
 * 处理好友请求 
 */
router.post('/handlereq', async (ctx, next) => {
  try {
    const {
      userid,
      id,
      type
    } = ctx.request.body
    /**
     * @param type
     * agree 通过请求
     * reject 拒绝请求
     * delete 删除好友
     */
    
    // 通过好友请求
    if (type == 'agree') {
      let fri = await User.findOne({ _id: userid }, "name phone avatar _id friends")
      let me = await User.findOne({ _id: id }, "name phone avatar _id friends")
      // 检测用户是否已添加此好友
      let isAdd = false
      for (let f of me.friends) {
        if(f._id == fri._id) {
          isAdd = true
          break
        }
      }
      if (!isAdd) {
        // 更新用户好友列表
        User.findOne({ _id: userid },function (err, user) {
          user.friends.push(me)
          user.save()
        })
        // 更新好友的好友列表
        User.findOne({ _id: id },function (err, user) {
          user.friends.push(fri)
          // 找到对应请求，并将状态置为1
          for (let r of user.request) {
            if(r._id == userid) {
              r.status = 1
              break
            }
          }
          user.save()
        })
        ctx.body = {
          status: 200,
          message: '添加成功'
        }
      } else {
        ctx.body = {
          status: 0,
          message: '已添加该用户'
        }
      }
    }

    // 拒绝好友请求
    if (type == 'reject') {
      await User.findOne({
        _id: id
      }, (err, user) => {
        for (let r of user.request) {
          // 找到对应请求，并将状态置为2
          if(userid == r._id) {
            r.status = 2
            user.save()
            ctx.body = {
              status: 200,
              message: '拒绝成功'
            }
            break
          }
        }
      })
    }
  } catch (err)  {
    console.error(err)
  }
})

/**
 * 发送好友请求
 */
router.post('/addfriend', async (ctx, next) => {
  try {
    // 根据手机号添加好友
    const { fri_phone } = ctx.request.body
    // 查找好友是否存在
    let fri = await User.findOne({ phone: fri_phone })
    // 拷贝用户信息
    let me = { ...global.user }._doc
    delete me.token
    delete me.friends
    delete me.request
    // 查找不到该好友，直接返回
    if (!fri) return ctx.body = {
      status: 0,
      message: '该用户不存在'
    }
    /**
     * @TODO 
     * 1 好友已收到用户请求，不能重复请求
     * 2 用户已添加好友，不能请求
     */

    User.findOne({ phone: fri_phone }, function (err, fri) {
      if (err) return console.error(err)
      if (fri) {
        // 将用户添加到好友请求列表中
        fri.request.push(me)
        fri.save()
      }
    })
    ctx.body = {
      status: 200,
      message: '发送成功'
    }

  } catch (error) {
    console.error(error)
  }
})

module.exports = router;

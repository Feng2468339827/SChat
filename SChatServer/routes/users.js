let router = require('koa-router')()
let User = require('../models/user.js')
let Id = require('../models/id.js')
let { newPwd } = require('../config/utils')

const avatar = 'https://schatnet.oss-cn-guangzhou.aliyuncs.com/index/default.jpg?Expires=1615124373&OSSAccessKeyId=TMP.3Ki9eFkkpkPeejomKL3p4E69UYnEUtGZXJuV4VfJt5sH1zcR7sh85qWp6mRfvJEkUTr8Ps2zFabffEDcG87KebKHV4C6zK&Signature=vZXek8M0M3MY9485oTgqs7nKN2U%3D'
const reg_phone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

// 加前缀
router.prefix('/users')

/**
 * 用户登录
 */
router.post('/login', function *(next)  {
  try {
    const { phone, password } = this.request.body
    // 手机号为空
    if (phone == '') {
      this.body = {
        status: 0,
        message: '手机号不能为空'
      }
    } else if (!reg_phone.test(phone)) {
      // 手机号不符合格式
      this.body = {
        status: 0,
        message: '请正确填写您的手机号码'
      }
    } else if (password == '') {
      // 密码为空
      this.body = {
        status: 0,
        message: '密码不能为空'
      }
    } else {
      let user = yield User.findOne({
        phone,
        password: newPwd(password)
      })
      // 若搜寻到此用户，则登录成功
      if (user) {
        this.body = {
          status: 200,
          message: '登陆成功',
          user
        }
      } else {
        this.body = {
          status: 0,
          message: '手机号或密码错误'
        }
      }
    }
  } catch (error) {
    console.err(error)
  }
})

/**
 * 用户注册
 */
router.post('/register', function *(next) {
  try {
    const {
      phone,
      password,
      repassword,
      name
    } = this.request.body

    // 手机号为空
    if (phone == '') {
      this.body = {
        status: 0,
        message: '密码不能为空'
      }
    } else if (!reg_phone.test(phone)) {
      // 手机号不符合格式
      this.body = {
        status: 0,
        message: '正确填写您的手机号码'
      }
    } else if (password != repassword) {
      // 两次密码不一致
      this.body = {
        status: 0,
        message: '两次密码不一致'
      }
    } else {
      // 查找手机号是否已被注册
      let user = yield User.findOne({ phone })
      // 手机号已被注册
      if (user) {
        this.body = {
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
        // 应该写在回调里的，但还不知道怎么做
        this.body = {
          status: 200,
          message: '注册成功'
        }
      }
    }
  } catch (error) {
    console.err(error)
  }
})

/**
 * 搜索好友
 */
router.get('/findfriend', function *(next) {
  try {
    // 根据手机号搜索用户
    const { phone } = this.request.query
    // 返回头像和名字
    let user = yield User.findOne({ phone }, 'name avatar')

    // 查找得到返回用户信息
    if (user) return this.body = {
      status: 200,
      message: '搜索成功',
      user
    }
    // 查找不到用户
    this.body = {
      status: 0,
      message: '该用户不存在'
    }
  } catch (error) {
    console.error(error)
  }
})

/**
 * 添加好友
 */
router.get('/addfriend', function *(next) {
  try {
    // 根据手机号添加好友
    const { phone, id } = this.query
    // 查找好友是否存在
    let fri = yield User.findOne({ phone })

    // 查找不到该好友，直接返回
    if (!fri) return this.body = {
      status: 0,
      message: '该用户不存在'
    }

    // 查找该好友是否已添加
    /**
     * 
     *还没做 
     * 
     */

    // 将搜索好友信息存入用户friends数组内，添加成功
    User.findOne({ _id: id }, function (err, user) {
      if (err) return console.error(err)
      // 如果没有匹配 user是 null
      if (user) {
        user.friends.push(fri)
        user.save()
      }
    })
    this.body = {
      status: 200,
      message: '发送成功'
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;

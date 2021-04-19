<template>
  <div class="index">

    <div class="login" v-if="isLogin">
      <div class="title">SChat登录</div>
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field
        placeholder="请填写手机号"
        v-model.trim="login_tel"
        type="tel"
        label="手机号" />
      <!-- 输入密码 -->
      <van-field
        placeholder="填写密码"
        v-model.trim="login_password"
        type="password"
        label="密码" />
      <Button
        @click="loginOp"
        content="登录"
        class="login-button button" />
    </div>
  
    <div class="register" v-else>
      <van-icon
        @click="isLogin = true"
        size="2rem"
        class="register-arrow"
        name="arrow-left" />
      <div class="title">SChat注册</div>
      <van-field
        v-model.trim="reg_tel"
        type="tel"
        placeholder="请填写手机号"
        label="手机号" />
      <van-field
        v-model.trim="reg_name"
        type="text"
        placeholder="请填写用户名"
        label="用户名" />
      <van-field
        v-model.trim="reg_password"
        type="password"
        placeholder="填写密码"
        label="密码" />
      <van-field
        v-model.trim="reg_repassword"
        type="password"
        placeholder="重复密码"
        label="重复密码" />
      <Button
        @click="registerOp"
        content="注册"
      class="register-button button" />
    </div>

    <div class="login-bottom flex-center">
      <div class="login-skipfind">找回密码</div>
      <div class="login-div">|</div>
      <div
        @click="isLogin = !isLogin"
        class="login-skipregister">{{isLogin == false ? "登录" : "注册"}}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Button from '@/components/Button/Button'
import { Notify } from 'vant'
import { apiPost } from '@/utils/index'
const reg_phone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

export default {
  data () {
    return {
      // true登录，false注册
      isLogin: true,
      login_tel: '',
      login_password: '',
      reg_tel: '',
      reg_name: '',
      reg_password: '',
      reg_repassword: ''
    }
  },
  components: {
    Button
  },
  methods: {
    ...mapMutations({
      login: 'SET_LOGINSTATUS',
      setUser: 'SET_USERINFO'
    }),
    /**
     * 点击登录
     */
    loginOp () {
      if (this.login_tel.trim() == '')
        Notify({ type: 'warning', message: '手机号不能为空' })
      else {
        apiPost('/users/login', {
          phone: this.login_tel,
          password: this.login_password
        }).then(res => {
          if (res.status == 200) {
            Notify({ type: 'success', message: '登录成功' })
            console.log(res)
            this.setUser(res.user)
            this.login(true)
             // 用户上线
            this.$socket.emit("sign", { user: res.user }, res => {
              console.log(res)
            })
            localStorage.setItem('token', res.user.token)
          } else {
            Notify({ type: 'warning', message: res.message })
          }
        })
      }
    },
    /**
     * 点击注册
     */
    registerOp () {
      if (!reg_phone.test(this.reg_tel)) 
        Notify({ type: 'warning', message: '手机号格式不正确' })
      else if (this.reg_repassword != this.reg_password) 
        Notify({ type: 'warning', message: '两次密码输入不一致' })
      else if (this.reg_name == '')
        Notify({ type: 'warning', message: '用户名不能为空' })
      else if (this.reg_name.length > 10)
        Notify({ type: 'warning', message: '用户名不能超过10位' })
      else {
        apiPost('/users/register', {
          phone: this.reg_tel,
          password: this.reg_password,
          name: this.reg_name
        }).then(res => {
          if (res.status == 200) {
            Notify({ type: 'success', message: '注册成功' })
            this.isLogin = true
          } else {
            Notify({ type: 'warning', message: res.message })
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './Index.styl'
</style>
<template>
  <div class="index">

    <div class="login" v-if="isLogin">
      <div class="title">SChat登录</div>
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field
        placeholder="请填写手机号"
        v-model="login_tel"
        type="tel"
        label="手机号" />
      <!-- 输入密码 -->
      <van-field
        placeholder="填写密码"
        v-model="login_password"
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
        v-model="reg_tel"
        type="tel"
        placeholder="请填写手机号"
        label="手机号" />
      <van-field
        v-model="reg_password"
        type="password"
        placeholder="填写密码"
        label="密码" />
      <van-field
        v-model="reg_repassword"
        type="password"
        placeholder="重复密码"
        label="密码" />
      <Button
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
export default {
  data () {
    return {
      // true登录，false注册
      isLogin: true,
      login_tel: '',
      login_password: '',
      reg_tel: '',
      reg_password: '',
      reg_repassword: ''
    }
  },
  components: {
    Button
  },
  methods: {
    ...mapMutations({
      login: 'SET_LOGINSTATUS'
    }),
    loginOp () {
      this.login(true)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './Index.styl'
</style>
<template>
  <div id="app">
    <!-- 网站头部 -->
    <AppHeader v-if="login" />

    <!-- 视图 -->
    <router-view  v-if="login" class="views" />

    <!-- 网站底部 -->
    <AppFooter  v-if="login" />
    
    <!-- 搜索视图 -->
    <Search v-show="isSearch && login" />

    <!-- 新的朋友视图 -->
    <NewFriend v-show="isShowNewFriend && login" />

    <!-- 登录视图 -->
    <Index v-if="!login" />
  </div>
</template>

<script>
import AppHeader from '@/base/AppHeader/AppHeader'
import AppFooter from '@/base/AppFooter/AppFooter'
import Search from '@/views/Search/Search'
import Index from '@/views/Index/Index'
import NewFriend from '@/views/NewFriend/NewFriend'
import jwt from 'jsonwebtoken'
import { mapState, mapMutations } from 'vuex' 
  export default {
    name: 'app',
    components: {
      AppHeader,
      AppFooter,
      Search,
      Index,
      NewFriend
    },
    computed: {
      ...mapState([
        'isSearch',
        'login',
        'user',
        'isShowNewFriend'
      ])
    },
    created() {
      // token凭证存在则自动登录
      let token = localStorage.getItem('token')
      if (token != 'undefined' && token) {
        let user = jwt.verify(token, 'token').user
        this.setUser(user)
        this.setLogin(true)
      }
    },
    mounted() {
      // 已登录
      if (JSON.stringify(this.user) != '{}') {
        // 用户上线
        this.$socket.emit("sign", { user: this.user }, res => {
          console.log(res)
        })
      }
    },
    methods: {
      ...mapMutations({
        setLogin: 'SET_LOGINSTATUS',
        setUser: 'SET_USERINFO'
      }),
    }
  }
</script>

<style lang="stylus">
@import "./assets/styl/app.styl"

#app 
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  .views
    margin-top 3.125rem
    overflow auto
    // 计算视图高度 底50px 顶3.125rem
    height calc(100vh - 50px - 3.125rem)
  .index
    .van-cell
      font-size $font-size-normal
      padding 15px 0
      letter-spacing 1px
    .van-cell__title
      color #000000
  .addressbook
    .van-index-anchor--sticky
      color #7e5ad0
    .van-index-anchor
      background #f2f2f2
    .van-cell
      font-size $font-size-normal
</style>

<template>
  <div id="app">
    <!-- 网站头部 -->
    <AppHeader v-if="login.status" />

    <!-- 视图 -->
    <router-view  v-if="login.status" class="views" />

    <!-- 网站底部 -->
    <AppFooter  v-if="login.status" />
    
    <!-- 搜索视图 -->
    <Search v-show="isSearch && login.status" />

    <!-- 登录视图 -->
    <Index v-if="!login.status" />
  </div>
</template>

<script>
import AppHeader from '@/base/AppHeader/AppHeader'
import AppFooter from '@/base/AppFooter/AppFooter'
import Search from '@/views/Search/Search'
import Index from '@/views/Index/Index'
import { apiPost } from '@/utils/index'
import { mapState } from 'vuex' 
  export default {
    name: 'app',
    components: {
      AppHeader,
      AppFooter,
      Search,
      Index
    },
    computed: {
      ...mapState([
        'isSearch',
        'login'
      ])
    },
    mounted () {
      // this.$socket.emit('connect', '连接成功')
      apiPost('/users/login', {
        phone: 18818306204,
        password: 123
      }).then((res) => {
        console.log(res)
      })
    }
  }
</script>

<style lang="stylus">
@import "./assets/styl/app.styl"

// @font-face {
//   font-family: 'iconfont';
//   src: url('./assets/icon/iconfont.eot');
//   src: url('./assets/icon/iconfont.eot?#iefix') format('embedded-opentype'),
//       url('./assets/icon/iconfont.woff2') format('woff2'),
//       url('./assets/icon/iconfont.woff') format('woff'),
//       url('./assets/icon/iconfont.ttf') format('truetype'),
//       url('./assets/icon/iconfont.svg#iconfont') format('svg');
// }

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

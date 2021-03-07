<template>
  <div class="app-footer">
   <van-tabbar
    v-if="navType !== 'chat'"
    v-model="active"
    active-color="#652d90"
    inactive-color="#000"
    @change="changeViews">
      <van-tabbar-item icon="comment-o">聊天</van-tabbar-item>
      <van-tabbar-item icon="friends-o">通讯录</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>

    <!-- 聊天框 -->
    <ChatBox v-if="navType === 'chat'" />
  </div>
</template>

<script>
import ChatBox from '@/components/ChatBox/ChatBox'
import { mapState } from 'vuex'
export default {
 data() {
    return {
      active: 0
    }
  },
  components: {
    ChatBox
  },
  computed: {
    ...mapState([
      'navType'
    ])
  },
  methods: {
    // 切换视图
    changeViews(index) {
      let route = [
        // 聊天视图
        'chat',
        // 通讯录视图
        'addressbook',
        // 我的视图
        'person'
      ]
      this.$router.push(route[index])
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './AppFooter.styl'
</style>
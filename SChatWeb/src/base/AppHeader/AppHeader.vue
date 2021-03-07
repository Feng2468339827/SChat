<template>
  <!-- 个人页隐藏头部 -->
  <div
    v-if="navType !== 'private'"
    class="app-header">

    <!-- 首页头部 -->
    <Nav v-if="navType === 'index'">
      <div slot="left">
        <router-link
          class='logo-link flex-start'
          to='/' >
         {{title}}
        </router-link>
      </div>
      <div slot="right">
        <!-- 设置弹窗 -->
        <van-popover
          v-model="showPopover"
          trigger="click"
          theme="dark"
          :actions="actions"
          placement="bottom-end"
          @select="onSelect"
        >
          <template #reference>
            <span
              class="logo-more icon-gengduo iconfont"></span>
          </template>
        </van-popover>
      </div>
    </Nav>

    <!-- 聊天头部 -->
    <Nav v-if="navType === 'chat'">
      <div slot="left">
        <van-icon
          @click="backPage"
          name="arrow-left"
          size="1.5rem" />
      </div>
      <div slot="middle">
        <span>{{title}}</span>
      </div>
      <div slot="right">
        <van-icon name="ellipsis" size="1.5rem" />
      </div>
    </Nav>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Nav from '@/components/Nav/Nav'
export default {
  data() {
    return {
      isSetting: false,
      showPopover: false,
      actions: [{
        text: '添加好友',
        icon: 'friends'
      }, {
        text: '发起群聊',
        icon: 'chat'
      }]
    }
  },
  components: {
    Nav
  },
  computed: {
    ...mapState([
      'title',
      'navType'
    ])
  },
  methods: {
    ...mapMutations({
      skipSearch: 'SET_SEARCH'
    }),
    onSelect(action, index) {
      // 添加好友
      if (index === 0) {
        // 跳转搜索页
        this.skipSearch(true)
      } else {
        // 发起群聊 
      }
    },
    // 打开设置
    showSetting() {
      this.isSetting = !this.isSetting
    },
    // 返回上一页
    backPage() {
      this.$router.go(-1)
    },
    // 关闭设置
    closeSetting() {
      this.isSetting = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './AppHeader.styl'
</style>
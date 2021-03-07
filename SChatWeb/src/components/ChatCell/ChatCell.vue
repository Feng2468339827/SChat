<template>
  <!-- 聊天列表 -->
  <div
    @click="clickCell"
    class="chatcell flex-between">
    <img
      class="chatcell-image"
      :src="chat.img"
      alt="头像">

    <div class="chatcell-info flex-between">
      <div class="chatcell-name">
        {{chat.name}}
      </div>
      <div class="chatcell-preread van-ellipsis">
        {{chat.content}}
      </div>

      <!-- 暂不做 -->
      <!-- 时间 -->
      <!-- <div class="time"></div> -->
      <!-- 提示 -->
      <!-- <div class="tip"></div> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    chat: Object
  },
  methods: {
    ...mapMutations({
      changeStatus: 'SET_NAVTYPE',
      changeTitle: 'SET_TITLE'
    }),
    // 向父组件传递点击聊天者id
    clickCell () {
      this.$emit('clickCell',this.chat)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './ChatCell.styl'
</style>
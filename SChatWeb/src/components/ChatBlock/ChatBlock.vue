<template>
  <!-- 聊天框+头像 -->
  <div class="chatblock">

    <!-- status:0为左侧，status:1为右侧 -->
    <!-- 左侧聊天 -->
    <div
      class="chatblock-left flex-start"
      v-if="chatBlock.status == 0">
      
      <!-- 头像 -->
      <img
        class="chatblock-image"
        :src="chatBlock.src"
        alt="头像">

      <!-- 聊天文字 -->
      <div class="chat-square">
        {{chatBlock.content}}
      </div>

    </div>

    <!-- 右侧聊天 -->
    <div
      class="chatblock-right
      flex-end"
      v-if="chatBlock.status == 1">
      <!-- 聊天文字 -->
      <div class="chat-square">
        {{chatBlock.content}}
      </div>

      <!-- 头像 -->
      <img
        class="chatblock-image"
        :src="chatBlock.src"
        alt="头像">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatBlock: Object
  }
}
</script>

<style lang="stylus" scoped>
@import './ChatBlock.styl'
</style>
<template>
  <!-- 聊天输入框 -->
  <div
    class="chatbox-container flex-end">
    <!-- <div
      @input="editWord"
      contenteditable="true"
      ref="word"
      class="chatbox-input"></div> -->
    <input
      v-model="chatword"
      type="text"
      class="chatbox-input" />
    <van-icon
      size="2rem"
      name="smile-o"
      class="chatbox-expression" />
    <!-- 输入框为空时 -->
    <van-icon
      v-if="chatword == ''"
      class="chatbox-more"
      size="2rem"
      name="add-o" />
    <!-- 输入框不为空 -->
    <div
      v-else
      class="chatbox-send">发送</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chatword: '',
      isEmpty: true
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import "./ChatBox.styl"
</style>
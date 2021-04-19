<template>
  <div
    @click="click"
    class="button-container flex-center">
    <button class="button">{{content}}</button>
  </div>
</template>

<script>
export default {
  props: {
    content: String
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './NewFriend.styl'
</style>
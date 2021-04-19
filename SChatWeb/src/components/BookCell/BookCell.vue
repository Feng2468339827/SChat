<template>
  <div
    @click="click"
    class="bookcell flex-start">
    <van-icon
      size="1.5rem"
      name="friends-o"
      class="bookcell-icon" />
    <div class="bookcell-tip">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus" scoped>
.bookcell
  height 3rem
  .bookcell-icon
    margin-left 16px
    margin-right 12px
</style>
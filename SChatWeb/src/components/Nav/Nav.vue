<template>
  <div class="nav">
    <div class="nav-left">
      <slot name="left"></slot>
    </div>
      
    <div class="nav-middle">
      <slot name="middle"></slot>
    </div>

    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import './Nav.styl'
</style>
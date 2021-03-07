<template>
  <div class="person flex-center">
    <!-- 设置按钮 -->
    <van-icon
      @click="isShow = true"
      name="setting-o"
      size="1.8rem"
      class="person-setting" />

    <div class="person-portrait">
      <img src="../../assets/images/portrait.jpg" alt="">
    </div>
    <div class="person-name">丰</div>
    <div class="person-id">
      <div class="person-id-word">
        SChatID:
        <span>1231123</span>
      </div>
    </div>

    <!-- 设置面板 -->
    <van-action-sheet
      v-model="isShow"
      :actions="actions"
      @select="onSelect" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Dialog } from 'vant'
export default {
  created () {
    this.changeType('private')
  },
  data () {
    return {
      isShow: false,
      actions: [{
        name: '退出账号'
      }]
    }
  },
  methods: {
    ...mapMutations({
      changeType: 'SET_NAVTYPE',
      exitLogin: 'SET_LOGINSTATUS',
      cleanLogin: 'SET_LOGINLOGIN',
    }),
    onSelect(action, index) {
      // 退出账号
      if (index == 0) {
        Dialog.confirm({
          confirmButtonColor: '#7e5ad0',
          message: '确定要退出吗'
        })
          .then(() => {
            // on confirm
            this.exitLogin()
            this.cleanLogin()
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "./Person.styl"
</style>
<template>
  <div class="person flex-center">
    <!-- 设置按钮 -->
    <van-icon
      @click="isShow = true"
      name="setting-o"
      size="1.8rem"
      class="person-setting" />

    <div class="person-portrait">
      <img :src="user.avatar" alt="">
    </div>
    <div class="person-name">{{user.name}}</div>
    <div class="person-id">
      <div class="person-id-word">
        phone:
        <span>{{user.phone}}</span>
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
import { mapMutations, mapState } from 'vuex'
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
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapMutations({
      changeType: 'SET_NAVTYPE',
      exitLogin: 'SET_LOGINSTATUS',
      cleanLogin: 'SET_LOGINTOKEN',
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
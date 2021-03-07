<template>
  <div class="search">
    <van-search
      v-model="value"
      shape="round"
      background="#f2f2f2"
      placeholder="搜索"
      show-action
      autofocus
      @search="search"
      @cancel="cancel(false)"
    />
    <div
      v-if="!isSearch"
      class="search-tip">
      搜索好友SChatID
    </div>

    <ChatCell
      v-if="isSearch"
      :chat="user" />
    <Button
      v-if="isSearch"
      @click="addFriend"
      content="添加好友"
      class="search-confirm" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ChatCell from '@/components/ChatCell/ChatCell.vue'
import Button from '@/components/Button/Button'
import { Dialog, Toast } from 'vant'
export default {
  components: {
    ChatCell,
    Button
  },
  data () {
    return {
      value: '',
      isSearch: false,
      user: {
        name: '小委屈',
        content: 'SChatID:124214',
        img: require('@/assets/images/portrait.jpg'),
        id:2
      }
    }
  },
  methods: {
    ...mapMutations({
      cancel: 'SET_SEARCH'
    }),
    // 搜索
    search () {
      this.isSearch = true
    },
    // 添加好友
    addFriend () {
      Dialog.confirm({
        confirmButtonColor: '#7e5ad0',
        message: '确定要添加好友吗'
      })
        .then(() => {
          // on confirm
          Toast({
            message: '发送成功',
            position: 'bottom'
          })
          this.isSearch = false
        })
        .catch(() => {
          // on cancel
        });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './search.styl'
</style>
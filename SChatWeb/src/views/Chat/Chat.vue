<template>
  <div class="chat">
    <ChatCell
      @clickCell="skipDetail"
      :chat="item"
      v-for="(item, index) in chatLists"
      :key="index" />

  </div>
</template>

<script>
import ChatCell from '@/components/ChatCell/ChatCell.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Chat',
  components: {
    ChatCell
  },
  methods: {
    ...mapMutations({
      changeTitle: 'SET_TITLE',
      changeType: 'SET_NAVTYPE'
    }),
    skipDetail(user) {
      // 切换头部样式
      this.changeType(true)
      // // 切换标题
      this.changeTitle(user.name)
      this.$router.push({name: 'ChatDetail'})
    }
  },
  created () {
    this.changeTitle('SChat闲聊')
    this.changeType('index')
  },
  data () {
    return {
      chatLists: [{
        content: '哈哈哈哈',
        name: 'RGBA工作室',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      },{
        content: '哈哈哈sadsadasd哈',
        name: 'RGB',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      },{
        content: '哈哈fzx哈哈',
        name: 'RGBA工作室',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      },{
        content: '哈哈xg哈哈',
        name: 'RGBA工作室',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      },{
        content: '哈哈哈dsg哈',
        name: 'R214124工作室',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      },{
        content: '哈哈哈哈',
        name: '124工作室',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      },{
        content: '哈哈哈哈',
        name: 'RGBA工作室',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      },{
        content: '哈哈哈哈',
        name: 'RGBA工作室',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      },{
        content: '哈哈哈哈',
        name: 'RGBA工作室',
        img: require('@/assets/images/portrait.jpg'),
        id: 1
      }]
    }
  }
}
</script>

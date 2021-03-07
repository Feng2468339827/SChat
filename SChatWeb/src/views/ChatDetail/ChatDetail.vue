<template>
  <div class="chatdetail">
    <ChatBlock
      v-for="(item, index) in chat"
      :key="index"
      :chatBlock="item"
      class="chat-block" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ChatBlock from '@/components/ChatBlock/ChatBlock'
export default {
  components: {
    ChatBlock
  },
  data () {
    return {
      // status:0为左侧，status:1为右侧
      chat: [{
        content: 'hhahaa',
        src: require('../../assets/images/portrait.jpg'),
        status: 0
      },{
        content: '三的撒第卅大赛的内塞',
        src: require('../../assets/images/portrait.jpg'),
        status: 1
      },{
        content: '三的撒去问去问我去饿第卅大赛的内塞',
        src: require('../../assets/images/portrait.jpg'),
        status: 0
      },{
        content: '12',
        src: require('../../assets/images/portrait.jpg'),
        status: 1
      },{
        content: 'hhahaa',
        src: require('../../assets/images/portrait.jpg'),
        status: 0
      },{
        content: '三的撒第卅大赛的内塞',
        src: require('../../assets/images/portrait.jpg'),
        status: 1
      },{
        content: '三的撒去问去问我去饿第卅大赛的内塞',
        src: require('../../assets/images/portrait.jpg'),
        status: 0
      },{
        content: '12',
        src: require('../../assets/images/portrait.jpg'),
        status: 1
      },{
        content: 'hhahaa',
        src: require('../../assets/images/portrait.jpg'),
        status: 0
      },{
        content: '三的撒第卅大赛的内塞',
        src: require('../../assets/images/portrait.jpg'),
        status: 1
      },{
        content: '三的撒去问去问我去饿第卅大赛的内塞',
        src: require('../../assets/images/portrait.jpg'),
        status: 0
      },{
        content: '12',
        src: require('../../assets/images/portrait.jpg'),
        status: 1
      }]
    }
  },
  methods: {
    ...mapMutations({
      changeType: 'SET_NAVTYPE',
      changetitle: 'SET_TITLE'
    })
  },
  created () {
    // 设置头部
    this.changeType('chat')
    // this.changetitle('SChat闲聊')
  }
}
</script>

<style lang="stylus" scoped>
@import './ChatDetail.styl'
</style>
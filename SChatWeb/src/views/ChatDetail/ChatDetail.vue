<template>
  <div class="chatdetail">
    <ChatBlock
      v-for="(item, index) in chat"
      :key="index"
      :chatBlock="item"
      class="chat-block" />
      
    <!-- 聊天框 -->
    <ChatBox
      class="chat-footer"
      @sendMessage="sendMessage" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ChatBox from '@/components/ChatBox/ChatBox'
import ChatBlock from '@/components/ChatBlock/ChatBlock'
export default {
  components: {
    ChatBlock,
    ChatBox
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
  sockets: { 
    //  在此接收又服务器发送过来的数据
    //  ps：注意此处的方法名要与服务器的发送的事件保持一致才能接收到
    connect: function() {
      console.log('连接成功');
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
      changetitle: 'SET_TITLE'
    }),
    // 发送信息
    sendMessage (content) {
      // let info = {
      //   // 发送内容
      //   content,
      //   // 发送者id
      //   sendid: 1,
      //   // 接收者id
      //   acceptid: 1
      // }
      // this.$socket.emit('send', info, res => {
      //   this.sockeut.on('reply', (user, data) => {
          
      //   })
      // })
      this.chat.push({
        content,
        src: require('../../assets/images/portrait.jpg'),
        status: 1
      })
      this.scrollToBottom()
    },
    // 滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el
        container.scrollTop = container.scrollHeight
      })
    }
  },
  created () {
    // 设置头部
    this.changeType('chat')
  },
  mounted () {
    // 定位底部
    this.scrollToBottom()
  }
}
</script>

<style lang="stylus" scoped>
@import './ChatDetail.styl'
</style>
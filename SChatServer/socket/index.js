module.exports = (io) => {
  io.on('connection', socket => {
    // 用户在线
    socket.on('sign', ({ user }, fn) => {
      console.log('用户id:' + user._id + ' 已上线')
      fn({
        code: 0,
        message: '登陆成功'
      })
    })
    // 两人聊天
    socket.on('send', (msg) => {
      console.log(msg)
      socket.emit('reply', {id: 1})
    })
  })
}
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  // 自分以外に送信する関数
  const broadCast = (eventName, payload) =>
    socket.broadcast.emit(eventName, payload)

  // 描画の開始
  socket.on('start', (payload) => {
    console.log(payload)
    broadCast('start', payload)
  })

  // マウスが動いているイベント
  socket.on('move', (payload) => {
    broadCast('move', payload)
  })

  // マウスが離れたイベント
  socket.on('end', (payload) => {
    broadCast('end', payload)
  })

  socket.on('disconnect', () => {
    // sendChat({
    //   type: 'announce',
    //   message: 'ユーザーが退室しました'
    // })
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

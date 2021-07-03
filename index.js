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
  // 描画の開始
  socket.on('start', ({ color, position }) => {
    console.log('start', color)
  })

  // マウスが動いているイベント
  socket.on('move', ({ x, y }) => {
    console.log('move')
    // socket.broadcast.emit('move', {
    //   x,
    //   y
    // })
  })

  // マウスが動いているイベント
  socket.on('end', ({ x, y }) => {
    console.log('end')
    // socket.broadcast.emit('move', {
    //   x,
    //   y
    // })
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

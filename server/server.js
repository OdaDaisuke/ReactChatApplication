let express = require('express'),
  app = express(),
  router = express.Router()
  http = require('http'),
  mongoose = require('mongoose')

// mongoose
let User = require('./models/user')
let Chat = require('./models/chat')

mongoose.connect('mongodb://localhost/jsonAPI')

// router
router.use((req, res, next) => {
  console.log('ERROR')
  next()
})

app.use(express.static('../public/'))

// header setting
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next()
})

app.get('/api/message', (req, res) => {
  Chat.find({
    from_id: req.params.from_id
  }, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });

})

app.post('/api/message', (req, res) => {
  let chat = new Chat()

  chat.from_id = req.body.from_id
  chat.send_to = req.body.send_to
  chat.body = req.body.body
  chat.created = req.body.created
  chat.uuid = req.body.uuid

  chat.save((err) => {
    if(err) res.send(err)
    res.json({
      chat: chat
    })
  })
})

let port = process.env.PORT || 3000
let server = http.createServer(app).listen(port, () => {
  console.log('SERVER PORT ', port)
  console.log('WEBSOCKET ESTABLISHED!!!')
})

// socket setting
let io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {

  // クライアントからのメッセージ送信
  socket.on('send_message', (msg) => {
    msg = JSON.parse(msg)

    // DBに登録
    let chat_data = new Chat()
    chat_data.uuid = msg.uuid
    chat_data.created = msg.created
    chat_data.body = msg.body
    chat_data.from_id = msg.from_id
    chat_data.send_to = msg.send_to
    chat_data.save((err) => {
      if(err) console.log(err)
    })

    socket.emit('return_send_message', msg)
    socket.broadcast.emit('return_send_message', 'BroadCast:' + msg)
  })

  // クライアントからの初期メッセージ取得
  socket.on('get_initial_message', () => {
    Chat.find((err, docs) => {
      socket.emit('return_initial_message', docs)
      socket.broadcast.emit('return_initial_message', 'BroadCast:' + docs)
    })
  })

  /**
   * Develop用
   */

  // クライアントからの全メッセージ削除要求
  socket.on('dev_delete_all_message', () => {
    Chat.remove((err, docs) => {
      socket.emit('return_dev_delete_all_message', docs)
      socket.broadcast.emit('return_dev_delete_all_message', 'BroadCast:' + docs)
    })
  })

  socket.on('disconnect', () => {
    log('disconnected')
  })
})

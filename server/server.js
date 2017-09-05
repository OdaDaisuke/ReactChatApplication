let express = require('express')
let app = express()
let router = express.Router()
let http = require('http')

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/jsonAPI')

// DB models
let User = require('./models/user')
let Chat = require('./models/chat')

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
  socket.on('msg send', (msg) => {
    socket.emit('msg push', 'RECEIVEDmsg - ' + msg)
    socket.broadcast.emit('msg push', 'RECEIVEDmsg - ' + msg)
  })
  socket.on('disconnect', () => {
    log('disconnected')
  })
})

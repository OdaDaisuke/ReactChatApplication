let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let router = express.Router()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let xssFilters = require('xss-filters')

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/jsonAPI')

// DB models
let User = require('./models/user')
let Chat = require('./models/chat')

// POSTでデータを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// io setting
io.sockets.on('connection', (socket) => {
  socket.on('sendMessage', (chat) => {
    // メッセージが空だったら
    if (msg == '') return;
    fs.readFile('db/chats.json', (err, data) => {
      let chats = JSON.parse(data)
      chats.push(chat)
      fs.writeFile('db/chats.json', JSON.stringify(chats, null, 4), (err) => {
        socket.emit("receiveMessage", chats)
      })
    })

  })

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  setInterval(() => {
    fs.readFile('db/chats.json', (err, data) => {
      socket.emit('reveiceMessage', JSON.parse(data))
    })
  }, 2000)

})

router.use((req, res, next) => {
  console.log('ERROR')
  next()
})

app.use(express.static('./'))

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

let port = process.env.PORT || 3001
app.listen(port)
console.log('Listening on port ' + port)

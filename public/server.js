let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let router = express.Router()

// POSTでデータを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use((req, res, next) => {
  console.log('ERROR')
  next()
})

app.use(express.static('./'))

router.get('/', (req, res) => {
    // fs.readFile('./index.html', 'UTF-8', (err, data) => {
    //   res.writeHead(200, { 'Content-Type': 'text/html'})
    //   res.write(data)
    //   res.end()
    // })
  })
  .get('/api/message:user_id', (req, res) => {
    res.json({
      message: "Successfully get a test message."
    })
  })
  .post('/api/message:user_id', (req, res) => {
    res.json({
      message: "Successfully post a test message."
    })
  })

let port = process.env.PORT || 3000
app.use('/', router)
app.listen(port)
console.log('Listening on port ' + port)

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const index = require('./routes/index')
const app = express()

// Use PORT environment variable to specify app's port. Otherwise 8080 is set.
app.set('port', process.env.PORT || 8080)

// Host files from public directory statically.
app.use(express.static(__dirname + '/public'))

// Use cookie and body parsers.
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

// Set view engine `ejs` and views directory.
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// Mount routers.
app.use('/', index)

// Listen to requests.
app.listen(app.get('port'), () => {
  "use strict"
  console.log('BVM Bytes is running on port', app.get('port'))
})

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Require Routers.
const index = require('./routes/index')

// Use PORT environment variable to specify app's port. Otherwise 8080 is set.
app.set('port', process.env.PORT || 8080)

// Host files from public directory statically.
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

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

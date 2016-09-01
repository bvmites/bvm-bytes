const express = require('express')
const router = new express.Router()

router.get('/', (req, res) => {
  "use strict"
  res.render('index', {
    title: 'BVM Bytes',
    description: 'Feed Burner for BVMites'
  })
})

router.post('/oauth', (req, res) => {
  "use strict"
  res.render('oauth', {
    headers: req.headers,
    body: req.body
  })
})

module.exports = router

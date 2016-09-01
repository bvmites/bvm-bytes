const express = require('express')
const router = new express.Router()

router.get('/', (req, res) => {
  "use strict"
  res.render('index', {
    title: 'BVM Bytes',
    description: 'Feed Burner for BVMites'
  })
})

module.exports = router

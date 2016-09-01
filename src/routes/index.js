const express = require('express')
const router = new express.Router()

const config = require('../config')
const H = require('../helpers')

router.get('/', (req, res) => {
  H.getToken(req).then(token => {
    H.getMembers(token)
      .then(members =>
        Promise.all(members.map(H.getFeeds(token))))
      .then(feeds => {
        res.render('index', {data: feeds})
      })
      .catch(invalidToken => {
        res.clearCookie('token')
        res.redirect('/')
      })
  })
    .catch(noToken => {
      res.redirect(config.urls.authorize)
    })
})

router.get('/oauth', (req, res) => {
  H.getCode(req)
    .then(code => {
      H.getAccessToken(code)
        .then(token => {
          res.cookie('token', token)
          res.redirect('/')
        })
        .catch(invalidCode => {
          res.redirect('/')
        })
    })
    .catch(noCode => res.redirect('/'))
})

module.exports = router

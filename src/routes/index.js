const express = require('express')
const H = require('../helpers')
const config = require('../config')
const router = new express.Router()

// Renders the feeds page.
router.get('/', (req, res) => {

  // Get token from user.
  H.getToken(req).then(token => {

    // Get members of bvmites. If the user is not a member then only public members will be shown.
    H.getMembers(token)
      .then(members =>

        // Get feeds of each member of bvmites.
        Promise.all(members.map(H.getFeeds(token))))
      .then(data => {

        // Render the page.
        res.render('index', {data})
      })
      .catch(invalidToken => {

        // Clear the token from cookies. And reiterate the authentication.
        res.clearCookie('token')
        res.redirect('/')
      })
  })
    .catch(noToken => {

      // Perform the authentication.
      res.redirect(config.urls.authorize)
    })
})


// Performs the authentication and retrieval of token.
router.get('/oauth', (req, res) => {

  // Get code from the url.
  H.getCode(req)
    .then(code => {

      // Retrieve access token from GitHub for the corresponding code.
      H.getAccessToken(code)
        .then(token => {

          // Set the token. And redirect to feeds view.
          res.cookie('token', token)
          res.redirect('/')
        })
        .catch(invalidCode => {

          // Reiterate the authentication.
          res.redirect('/')
        })
    })
    .catch(noCode => {

      // Redirect to feeds view. For possible deferral of authentication.
      res.redirect('/')
    })
})

module.exports = router

const request = require('request')
const config = require('./config')

// Returns a promise which resolves to the response of given request and option.
const requestPromise = options =>
  url => new Promise((resolve, reject) => {
    request(url, options, (error, response) => {
      !!error ? reject(error) : resolve(JSON.parse(response.body))
    })
  })

// Returns a promise which resolves to the given value if defined, otherwise it rejects.
const definedPromise =
  value => new Promise((resolve, reject) => {
    value === undefined || value === null
      ? reject()
      : resolve(value)
  })

module.exports = {

  // Returns a promise resolving the token from user's request.
  getToken: req => definedPromise(req.cookies['token']),

  // Returns a promise resolving the code from user's request.
  getCode: req => definedPromise(req.query['code']),

  // Returns a promise resolving the list of all members (for unauthorized users, public only) of bvmites.
  getMembers: token => requestPromise({
    method: 'GET',
    headers: {'User-Agent': 'BVM Bytes'}
  })(`${config.urls.members}?access_token=${token}`),

  // Returns a promise resolving the list of public feeds of given user.
  getFeeds: token =>
    user => requestPromise({
      method: 'GET',
      headers: {'User-Agent': 'BVM Bytes'}
    })(`${config.urls.feeds(user.login)}?access_token=${token}`)
      .then(feeds => ({user, feeds})),

  // Returns a promise resolving corresponding token of given code.
  getAccessToken: code => requestPromise({
    method: 'POST',
    headers: {'Accept': 'application/json', 'User-Agent': 'BVM Bytes'}
  })(config.urls.accessToken(code))
    .then(data => data.access_token),

}

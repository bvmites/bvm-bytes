const request = require('request')

const config = require('./config')

const requestPromise = options => url => new Promise((res, rej) => {
  request(url, options, (err, data) => {
    !!err ? rej(err) : res(data)
  })
})

const definedPromise = value => new Promise((res, rej) => {
  value === undefined || value === null ? rej() : res(value)
})

module.exports = {

  getToken: req => definedPromise(req.cookies['token']),

  getCode: req => definedPromise(req.query['code']),

  getMembers: token => requestPromise({
    method: 'GET',
    headers: {'User-Agent': 'BVM Bytes'}
  })(`${config.urls.members}?access_token=${token}`)
    .then(res => JSON.parse(res.body)),

  getFeeds: token => user => requestPromise({
    method: 'GET',
    headers: {'User-Agent': 'BVM Bytes'}
  })(`${config.urls.feeds(user.login)}?access_token=${token}`)
    .then(res => ({user, feeds: JSON.parse(res.body)})),

  getAccessToken: code => requestPromise({
    method: 'POST',
    headers: {'Accept': 'application/json', 'User-Agent': 'BVM Bytes'}
  })(config.urls.accessToken(code))
    .then(res => JSON.parse(res.body).access_token),

}

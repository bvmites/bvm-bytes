const config = {
  clientId: process.env.client_id,
  clientSecret: process.env.client_secret,

  urls: {
    base: 'https://api.github.com',
    get members() {
      return `${config.urls.base}/orgs/bvmites/members`
    },
    feeds: user => `${config.urls.base}/users/${user}/events`,
    get authorize() {
      return `https://github.com/login/oauth/authorize?client_id=${config.clientId}&scope=read:org`
    },
    accessToken: code =>
      `https://github.com/login/oauth/access_token?client_id=${
        config.clientId}&client_secret=${
        config.clientSecret}&code=${
        code}`
  }
}

module.exports = config

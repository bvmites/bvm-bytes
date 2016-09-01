const config = {
  urls: {

    members: 'https://api.github.com/orgs/bvmites/members',

    feeds: user => `https://api.github.com/users/${user}/events`,

    authorize: `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=read:org`,

    accessToken: code =>
      `https://github.com/login/oauth/access_token?client_id=${
        process.env.CLIENT_ID}&client_secret=${
        process.env.CLIENT_SECRET}&code=${code}`
  }
}

module.exports = config

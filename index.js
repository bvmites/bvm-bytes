if (process.env.PRODUCTION) {
  console.log('Using PRODUCTION environment.')
  require('./dist')
} else {
  console.log('Using default (source) environment.')
  require('./src')
}

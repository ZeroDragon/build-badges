const express = require('express')
const app = express()

const badgeHeaders = ((req, res, next) => {
  res.set('Content-Type', 'image/svg+xml')
  res.set('Cache-Control', 'no-cache')
  next()
})
require('./Services').forEach(service => {
  app.get(service.route, badgeHeaders, service.controller)
})

app.set('views', `${__dirname}/assets`)
app.use('/assets', express.static(`${__dirname}/assets/public`))
app.get('/', (req, res) => {
  res.render('./home.pug',{url: `${req.protocol}://${req.get('host')}`})
})

app.listen(5005, () => {
  console.log('Badges online')
})
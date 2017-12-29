const memoize = require('memoizee')
const request = require('request')

const Cacheless = (uri,params = '{}') => {
  return new Promise(resolve => {
    request.get(uri,JSON.parse(params), (err, response, result) => {
      resolve(result)
    })
  })
}

const Requester = memoize(Cacheless, { maxAge: 1000 * 60 })

module.exports = {
  Requester,
  Cacheless
}
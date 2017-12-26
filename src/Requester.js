const memoize = require('memoizee')
const request = require('request')

const Requester = memoize((uri, params = '{}') => {
    return new Promise(resolve => {
      request.get(uri,JSON.parse(params), (err, response, result) => {
        resolve(result)
      })
    })
  },
  { maxAge: 1000 * 60 * this.cacheInMinutes }
)

module.exports = Requester
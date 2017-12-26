const memoize = require('memoizee')
const request = require('request')

/**
* ![love](https://img.shields.io/badge/Love%20%E2%9D%A4-Lots%20of%20it-ff69b4.svg "love")
*/

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
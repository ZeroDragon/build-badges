const { colorRange } = require('../helpers')

const returnData = (val) => {
  if(!val.downloads) return null
  const value = val.downloads.reduce((acum, current) => {
    return acum + current.downloads
  }, 0)
  return {
    color: colorRange(value, [0, value], [1], ['red', 'green']).pop(),
    status: value.toString()
  }
}

module.exports = returnData
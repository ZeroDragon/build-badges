const { colorRange } = require('../helpers')

const returnData = (val) => {
  const value = val.trim()
  if(isNaN(value)) return null
  const color = colorRange(
    parseInt(value, 10)
  ).filter((color, percent) => {
    return percent === parseInt(value, 10)
  })[0] || 'green'
  return {
    color,
    status: `${value}%`
  }
}

module.exports = returnData
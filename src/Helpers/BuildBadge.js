const openBadge = require('openbadge')

const BuildBadge = async payload => {
  return new Promise(resolve => {
    openBadge(payload, function (err, badgeSvg) {
      resolve(badgeSvg)
    })
  })
}

module.exports = BuildBadge
const { BuildBadge, colorTypes } = require('../../Helpers')
const Custom = require('./Custom')

const controller = async (req, res) => {
  const {leftText, rightText, color} = req.params
  let knownColor = colorTypes[color]
  if (!knownColor) {
    const [left = '263238', right = '558B2F'] = (color || '').split('-').map(c => c === '' ? undefined : c)
    knownColor = {
      left: `#${left}`,
      right: `#${right}`,
      font: '#fff'
    }
  }
  const payload = {
    text: [leftText, rightText],
    color: knownColor
  }
  res.send(await BuildBadge(payload))
}

module.exports = {
  prefix: '/custom',
  routes: [
    {
      route: '/:leftText/:rightText/:color?.svg',
      controller
    }
  ]
}
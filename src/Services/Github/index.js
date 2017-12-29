const { Cacheless, BuildBadge, colorTypes } = require('../../Helpers')
const LastCommit = require('./LastCommit')

const lastCommit = async (req, res) => {
  const {username, repo, branch = 'master'} = req.params
  const params = { json: true, headers: {'User-Agent': 'build-badges-by-zerodragon'} }
  const uri = `https://api.github.com/repos/${username}/${repo}/commits/${branch}`

  data = await Cacheless(uri, JSON.stringify(params))
  const processedData = LastCommit(data) || {status: 'Api error', color: 'red'}
  const payload = {
    text: ['Last Commit', processedData.status],
    color: colorTypes[processedData.color]
  }
  res.send(await BuildBadge(payload))
}

module.exports = {
  prefix: '/github',
  routes: [
    {
      route: '/last-commit/:username/:repo/:branch?.svg',
      controller: lastCommit
    }
  ]
}
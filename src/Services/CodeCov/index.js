const { Requester, BuildBadge, colorTypes } = require('../../Helpers')
const CodeCov = require('./CodeCov')

const controller = async (req, res) => {
  const {vcs, username, repo, branch} = req.params
  const {token} = req.query
  const wBranch = branch ? `/branch/${branch}` : ''
  const uri = `https://codecov.io/${vcs}/${username}/${repo}${wBranch}/graphs/badge.txt`
  const params = { qs: { token } }

  data = await Requester(uri, JSON.stringify(params))
  const processedData = CodeCov(data) || {status: 'Api error', color: 'red'}
  const payload = {
    text: ['CodeCov', processedData.status],
    color: colorTypes[processedData.color]
  }
  res.send(await BuildBadge(payload))
}

module.exports = {
  prefix: '/codecov',
  routes: [
    {
      route: '/:vcs/:username/:repo/:branch?.svg',
      controller
    }
  ]
}
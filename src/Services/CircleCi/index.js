const { Requester, BuildBadge, colorTypes } = require('../../Helpers')
const CircleCi = require('./CircleCi')

const controller = async (req, res) => {
  const {vcs, username, repo, branch} = req.params
  const {token} = req.query
  const wBranch = branch ? `/tree/${branch}` : ''
  const uri = `https://circleci.com/api/v1.1/project/${vcs}/${username}/${repo}${wBranch}`
  const params = {
    json: true,
    qs: {
      limit: 1,
      filter: 'completed',
      'circle-token': token
    }
  }
  data = await Requester(uri, JSON.stringify(params))
  const processedData = CircleCi(data) || {status: 'Api error', color: 'red'}
  const payload = {
    text: ['CircleCi', processedData.status],
    color: colorTypes[processedData.color]
  }
  res.send(await BuildBadge(payload))
}

module.exports = {
  prefix: '/circleci',
  routes: [
    {
      route: '/:vcs/:username/:repo/:branch?.svg',
      controller
    }
  ]
}
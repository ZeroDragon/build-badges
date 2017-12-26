const express = require('express')
const app = express()
const BuildBadge = require('./src/BuildBadge')

app.get('/circleci/:vcs/:username/:repo/:branch?.svg', async (req, res) => {
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
  res.set('Content-Type', 'image/svg+xml')
  res.send(await BuildBadge('CircleCi', uri, params))
})

app.get('/codecov/:vcs/:username/:repo/:branch?.svg', async (req, res) => {
  const {vcs, username, repo, branch} = req.params
  const {token} = req.query
  const wBranch = branch ? `/branch/${branch}` : ''
  const uri = `https://codecov.io/${vcs}/${username}/${repo}${wBranch}/graphs/badge.txt`
  const params = { qs: { token } }
  res.set('Content-Type', 'image/svg+xml')
  res.send(await BuildBadge('CodeCov', uri, params))
})

app.get('/npm/downloads/:repo.svg', async (req, res) => {
  const { repo } = req.params
  const params = { json: true }
  const d = (date = new Date().getTime()) => new Date(date)
  const addZ = (i) => `00${i}`.slice(-2)
  const init = `${d(0).getFullYear()}-${addZ(d(0).getMonth()+1)}-${addZ(d(0).getDate())}`
  const today = `${d().getFullYear()}-${addZ(d().getMonth()+1)}-${addZ(d().getDate())}`
  const uri = `https://api.npmjs.org/downloads/range/${init}:${today}/${repo.toLowerCase()}`
  res.set('Content-Type', 'image/svg+xml')
  res.send(await BuildBadge('Npm Downloads', uri, params))
})

app.get('/npm/version/:repo.svg', async (req, res) => {
  const { repo } = req.params
  const params = { json: true }
  const uri = `https://registry.npmjs.org/${repo.toLowerCase()}/latest`
  res.set('Content-Type', 'image/svg+xml')
  res.send(await BuildBadge('Npm Version', uri, params))
})

app.get('/npm/license/:repo.svg', async (req, res) => {
  const { repo } = req.params
  const params = { json: true }
  const uri = `https://registry.npmjs.org/${repo.toLowerCase()}/latest`
  res.set('Content-Type', 'image/svg+xml')
  res.send(await BuildBadge('Npm License', uri, params))
})

app.get('/github/last-commit/:username/:repo/:branch?.svg', async (req, res) => {
  const {username, repo, branch = 'master'} = req.params
  const params = { json: true, headers: {'User-Agent': 'build-badges-by-zerodragon'} }
  const uri = `https://api.github.com/repos/${username}/${repo}/commits/${branch}`
  res.set('Content-Type', 'image/svg+xml')
  res.send(await BuildBadge('Last Commit', uri, params))
})

app.get('/custom/:leftText/:rightText/:rC?.svg', async (req, res) => {
  res.set('Content-Type', 'image/svg+xml')
  res.send(await BuildBadge('Custom', req.params))
})

app.listen(5005, () => {
  console.log('The audience is listening')
})
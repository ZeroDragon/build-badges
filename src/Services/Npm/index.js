const { Requester, BuildBadge, colorTypes } = require('../../Helpers')
const { NpmDownloads, NpmVersion, NpmLicense } = require('./Npm')

const downloads = async (req, res) => {
  const { repo } = req.params
  const params = { json: true }
  const d = (date = new Date().getTime()) => new Date(date)
  const addZ = (i) => `00${i}`.slice(-2)
  const init = `${d(0).getFullYear()}-${addZ(d(0).getMonth()+1)}-${addZ(d(0).getDate())}`
  const today = `${d().getFullYear()}-${addZ(d().getMonth()+1)}-${addZ(d().getDate())}`
  const uri = `https://api.npmjs.org/downloads/range/${init}:${today}/${repo.toLowerCase()}`

  data = await Requester(uri, JSON.stringify(params))
  const processedData = NpmDownloads(data) || {status: 'Api error', color: 'red'}
  const payload = {
    text: ['Npm Downloads', processedData.status],
    color: colorTypes[processedData.color]
  }
  res.send(await BuildBadge(payload))
}

const version = async (req, res) => {
  const { repo } = req.params
  const params = { json: true }
  const uri = `https://registry.npmjs.org/${repo.toLowerCase()}/latest`
  data = await Requester(uri, JSON.stringify(params))
  const processedData = NpmVersion(data) || {status: 'Api error', color: 'red'}
  const payload = {
    text: ['Npm Version', processedData.status],
    color: colorTypes[processedData.color]
  }
  res.send(await BuildBadge(payload))
}

const license = async (req, res) => {
  const { repo } = req.params
  const params = { json: true }
  const uri = `https://registry.npmjs.org/${repo.toLowerCase()}/latest`
  data = await Requester(uri, JSON.stringify(params))
  const processedData = NpmLicense(data) || {status: 'Api error', color: 'red'}
  const payload = {
    text: ['Npm License', processedData.status],
    color: colorTypes[processedData.color]
  }
  res.send(await BuildBadge(payload))
}

module.exports = {
  prefix: '/npm',
  routes: [
    {
      route: '/downloads/:repo.svg',
      controller: downloads
    },
    {
      route: '/version/:repo.svg',
      controller: version
    },
    {
      route: '/license/:repo.svg',
      controller: license
    }
  ]
}
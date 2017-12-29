const { Range } = require('../../Helpers')

const NpmDownloads = (val) => {
  if(!val.downloads) return null
  const value = val.downloads.reduce((acum, current) => {
    return acum + current.downloads
  }, 0)
  const color = (value === 0) ? 'red': 'green'
  return {
    color,
    status: value.toLocaleString()
  }
}

const returnData = (type) => (data) => {
  const prefix = {version: 'v'}[type] || ''
  const value = data[type]
  if(!value) return null
  return {
    color: 'blue',
    status: `${prefix}${value}`
  }
}

module.exports = {
  NpmVersion: returnData('version'),
  NpmLicense: returnData('license'),
  NpmDownloads
}
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
  NpmLicense: returnData('license')
}
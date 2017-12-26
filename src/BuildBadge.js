const openBadge = require('openbadge')
const Requester = require('./Requester')
const { NpmVersion, NpmLicense } = require('./services/NpmVersion')
const services = {
  CircleCi: require('./services/CircleCi'),
  CodeCov: require('./services/CodeCov'),
  NpmDownloads: require('./services/NpmDownloads'),
  NpmVersion,
  NpmLicense,
  LastCommit: require('./services/LastCommit'),
  Custom: require('./services/Custom')
}

const type = {
  blue: {
    left: "#263238",
    right: "#1565C0",
    font: "#fff"
  },
  green: {
    left: "#263238",
    right: "#558B2F",
    font: "#fff"
  },
  yellow: {
    left: "#263238",
    right: "#F9A825",
    font: "#fff"
  },
  red: {
    left: "#263238",
    right: "#c62828",
    font: "#fff"
  }
}

const BuildBadge = async (service, uri, params = {}) => {
  let data = {}
  let serviceName = service
  if(service === 'Custom'){
    const {leftText, rightText, rC} = uri
    data = {
      rightText, rC
    }
    serviceName = leftText
  } else {
    data = await Requester(uri, JSON.stringify(params))
  }
  const processedData = services[service.replace(/\s/g,'')](data) || {status: 'Api error', color: 'red'}
  const payload = {
    text: [serviceName, processedData.status],
    color: type[processedData.color] || {
      right: `#${processedData.color}`
    }
  }
  return new Promise(resolve => {
    openBadge(payload, function (err, badgeSvg) {
      resolve(badgeSvg)
    });
  })
}

module.exports = BuildBadge
const ta = require('time-ago')

const returnData = (data) => {
  if(!data) return null
  const {commit} = data
  if(!commit) return null
  if(!commit.author.date) return null
  return {
    color: 'blue',
    status: `${ta.ago(commit.author.date)}`
  }
}

module.exports = returnData
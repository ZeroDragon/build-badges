const returnData = ({rightText, rC}) => {
  return {
    color: rC || 'green',
    status: rightText
  }
}

module.exports = returnData
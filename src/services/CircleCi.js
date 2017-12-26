const returnData = ([data]) => {

  if (!data) return null
  const { status } = data

  const def = {}
  switch(status) {
    case 'success':
    case 'fixed':
      def.color = 'green'
      def.status = 'Passing'
      break
    case 'failed':
      def.color = 'red'
      def.status = 'Failed'
      break
    case 'no_tests':
    case 'scheduled':
    case 'not_run':
      def.color = 'yellow'
      def.status = status.replace('_', ' ')
      break
    default:
      def.color = 'red'
      def.status = status.replace('_', ' ')
  }
  return def
}

module.exports = returnData
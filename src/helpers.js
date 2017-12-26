const baseRange = (start, end, step) => {
  let index = -1
  let length = Math.max(Math.ceil((end - start) / step), 0)
  const result = Array(length)

  while (length--) {
    result[++index] = start
    start += step
  }
  return result
}
const ranger = (
  percentage,
  [min, max, step = 1] = [0, 100],
  range = [80, 90, 100],
  colors = ['red','yellow','green']
) => {
  const realm = baseRange(min, max, step)
  let ticker = 0
  return realm.map(percent => {
    if (percent >= range[ticker]) ticker += 1
    let color = colors[ticker]
    if (!color) color = colors[colors.length - 1]
    return color
  })
}


module.exports = {
  colorRange: ranger
}
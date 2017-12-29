const { readdirSync, lstatSync } = require('fs')

const routes = []
readdirSync(`${__dirname}/`)
  .filter(item => {
    if (item[0] === '.') return false
    return lstatSync(`${__dirname}/${item}`).isDirectory()
  })
  .forEach(item => {
    try {
      const defaultRoutes = { prefix: '', routes: [] }
      const itemRoutes = Object.assign(defaultRoutes, require(`${__dirname}/${item}`))
      const iRoutes = itemRoutes.routes.forEach(({route, controller}) => {
        routes.push({route: `${itemRoutes.prefix}${route}`, controller})
      })
    } catch (e) {
      console.log(e.message, ':ignoring')
    }
  })

module.exports = routes
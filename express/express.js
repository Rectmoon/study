const http = require('http')
const url = require('url')
const pathRegexp = require('./path-regexp')

function express() {
  const app = {}
  const routes = { all: [] }

  app.use = function(path, handler) {
    const keys = []
    const regexp = pathRegexp(path, keys, { end: true })
    routes.all.push([{ regexp, keys }, handler])
  }

  // init methods
  ;['get', 'put', 'delete', 'post'].forEach(function(method) {
    routes[method] = []
    app[method] = function(path, handler) {
      const keys = []
      const regexp = pathRegexp(path, keys, { end: true })
      routes[method].push([{ regexp, keys }, handler])
    }
  })

  function match(pathname, routes, req, res) {
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i]
      let reg = route[0].regexp
      let keys = route[0].keys
      let matched = reg.exec(pathname)
      if (matched) {
        let params = {}
        for (let i = 0, l = keys.length; i < l; i++) {
          let value = matched[i + 1]
          if (value) {
            params[keys[i]] = value
          }
        }
        req.params = params
        route[1](req, res)
        return true
      }
    }
    return false
  }

  function expressInstall(req, res) {
    let { pathname, query } = url.parse(req.url, true)
    req.query = query
    const method = req.method.toLowerCase()
    if (routes.hasOwnProperty(method)) {
      if (match(pathname, routes[method], req, res)) return
      else {
        if (match(pathname, routes.all, req, res)) {
          return
        }
      }
    } else {
      if (match(pathname, routes.all, req, res)) return
    }

    handle404(req, res)
  }

  function handle404(req, res) {
    res.end('404')
  }

  app.listen = function(...args) {
    const server = http.createServer(expressInstall)
    server.listen(...args)
  }

  return app
}

// ------------------------------------------------------------------------
// test
// ------------------------------------------------------------------------

const app = express()

app.get('/', (req, res) => {
  res.end('hello')
})

app.use('/detail/:id', (req, res) => {
  res.end('detail')
})

app.listen(3001, () => {
  console.log(`http://localhost:3001`)
})

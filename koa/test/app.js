const fs = require('fs')
const path = require('path')
const Koa = require('../Application')

let app = new Koa()

const logger = () => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      console.log('logger')
      resolve()
    }, 1000)
  })
}

app.use(async (ctx, next) => {
  console.log(1)
  console.log(ctx.path)
  ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'))
  await next()
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  await logger()
  next()
  console.log(4)
})

app.use((ctx, next) => {
  console.log(5)
  next()
  console.log(6)
})

app.on('error', err => {
  console.log(err)
})

app.listen(4000, () => {
  console.log('http://localhost:4000')
})

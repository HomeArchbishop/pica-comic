/// <reference path = "./app.d.ts"/>

import express from 'express'
import cors from 'cors'
import apiRouter from './route/apiRouter'

import log from './assets/ts/log'

import apiProxyErrorHandler from './assets/middleware/apiProxyErrorHandler'

const app = express()
app.use(cors())

const port: number = 1210

// 中间件解析请求主体
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use('/', express.static('../pica-client/dist'))
} else {
  app.use('/', express.static('../pica-client/dist'))
}
app.use('/static', express.static('./static'))
app.use('/api', apiRouter)

// error handle.
app.use(apiProxyErrorHandler)

// start server.
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
  log.info('process', { process: 'start', port, env: process.env.NODE_ENV })
})

// catch uncaught error.
process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
})

export default app

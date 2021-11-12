/// <reference path = "./app.d.ts"/>

import express from 'express'
import cors from 'cors'
import apiRouter from './route/apiProxyRouter'

import config from './config/default.json'

import log from './static/ts/log'

const app = express()
app.use(cors())

const port: number = config.port

// 中间件解析请求主体
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/apiProxy', (req, res, next) => {
  log.info(`[api] ${req.path}`)
  next()
})

app.use('/', express.static('../pica-client'))
app.use('/static', express.static('./static'))
app.use('/apiProxy', apiRouter)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
import express from 'express'
import cors from 'cors'
import apiRouter from './route/apiProxyRouter'

const app = express()
app.use(cors())

const port: number = 1210

// 使用body-parser中间件解析请求主体
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', express.static('../pica-client'))
app.use('/apiProxy', apiRouter)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
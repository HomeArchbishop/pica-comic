import { personInfo } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await personInfo(diversionUrl, token)
  console.log(data)
})()
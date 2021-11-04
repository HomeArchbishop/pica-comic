import { androidInfo } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await androidInfo(diversionUrl, token)
  console.log(data)
})()
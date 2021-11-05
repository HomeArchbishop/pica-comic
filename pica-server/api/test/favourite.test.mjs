import { favourite } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await favourite(diversionUrl, token, '5903260d685823089878b4f7')
  console.log(data)
})()
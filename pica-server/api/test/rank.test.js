import { rank } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await rank(diversionUrl, token, 'H24')
  console.log(data)
})()
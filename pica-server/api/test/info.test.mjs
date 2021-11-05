import { info } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await info(diversionUrl, token, '5d56e4370bcf57397e60576b')
  console.log(data)
})()
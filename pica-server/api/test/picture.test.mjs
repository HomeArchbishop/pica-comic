import { picture } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await picture(diversionUrl, token, '5d56e4370bcf57397e60576b', 1, 1)
  console.log(data)
})()
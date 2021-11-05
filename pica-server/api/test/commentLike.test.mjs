import { commentLike } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await commentLike(diversionUrl, token, '616ee990519946d2d6bb4f07')
  console.log(data)
})()
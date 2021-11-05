import { collections } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await collections(diversionUrl, token)
  console.log(data[0].comics)
})()
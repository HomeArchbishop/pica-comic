import { punch } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await punch(diversionUrl, token)
  console.log(data)
})()
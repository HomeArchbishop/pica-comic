import { setTitle } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await setTitle(diversionUrl, token, '5ea832a48182b7596b4546e5', '主教')
  console.log(data)
})()
import { gameList } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await gameList(diversionUrl, token, 1)
  console.log(data)
})()
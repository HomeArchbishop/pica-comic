import { gameInfo } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await gameInfo(diversionUrl, token, '5cc47a334558bf0c1c3d1a35')
  console.log(data)
})()
import { myFavourite } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await myFavourite(diversionUrl, token, 1)
  console.log(data)
})()
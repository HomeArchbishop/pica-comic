import { tagSearch } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await tagSearch(diversionUrl, token, 'COSPLAY', 1)
  console.log(data)
})()
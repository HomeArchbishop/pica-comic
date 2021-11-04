import { search } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await search(diversionUrl, token, 'jk')
  console.log(data)
})()
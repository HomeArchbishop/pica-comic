import { checkToken } from '../pica.ts'
import token from './data/token.ts'
import diversionUrl from './data/diversionUrl.ts'

// globalThis.proxy = null

(async function () {
  const data = await checkToken(diversionUrl, token)
  console.log(data)
})()
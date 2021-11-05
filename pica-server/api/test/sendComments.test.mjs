import { sendComments } from '../dist/pica.js'
import token from './token.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const data = await sendComments(diversionUrl, token, '6050d89bb96c9360e24b5ba7', '啧啧啧')
  console.log(data)
})()
import { authorize } from '../dist/pica.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

export default async function () {
  return await authorize(diversionUrl, 'homeachbishop', 'Cdy20041212')
}

authorize('homeachbishop', 'Cdy20041212').then(data => {
  console.log(data);
})


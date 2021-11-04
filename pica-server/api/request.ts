import Header from './header'
import fetch from 'node-fetch'

const defultUrl: string = 'http://104.22.64.159/'

type Method = 'POST' | 'GET' | 'PUT'

// returns parsed json
async function sendRequest(diversionUrl: string, subUrl: string, method: Method,
  body: object | null, auth: string | null) {

  const header = new Header(subUrl, method)
  const url = diversionUrl + subUrl
  console.log(url)

  header.setAuth(auth)
  const resp = await fetch(url, {
    headers: header.headers,
    method: method,
    body: method === 'POST' ? JSON.stringify(body || {}) : undefined,
  })
  // if (resp.status !== 200) {
    // console.log(resp)
    // throw Error('bad response code')
  // }
  // console.log(resp.headers)
  return await resp.json()
}

async function sendGet(diversionUrl: string, subUrl: string, auth: string | null) {
  return await sendRequest(diversionUrl, subUrl, 'GET', null, auth)
}

async function sendPut(diversionUrl: string, subUrl: string, body: object | null, auth: string | null) {
  return await sendRequest(diversionUrl, subUrl, 'PUT', body, auth)
}

async function sendPost(diversionUrl: string, subUrl: string, body: object | null, auth: string | null) {
  return await sendRequest(diversionUrl, subUrl, 'POST', body, auth)
}

export { sendGet, sendPost, sendPut }

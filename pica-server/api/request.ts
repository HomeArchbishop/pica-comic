import Header from './header'
import fetch from 'node-fetch'

type method = 'POST' | 'GET' | 'PUT'

// const defultUrl: string = 'http://104.22.64.159/'

// returns parsed json
const sendRequest = async function (diversionUrl: string, subUrl: string, method: method,
  body: object | null, auth: string | null) {

  const header = new Header(subUrl, method, auth)
  const url = diversionUrl + subUrl
  console.log(url)

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
  const json = await resp.json()
  return json
}

const sendGet = async function (diversionUrl: string, subUrl: string, auth: string | null) {
  const resp = await sendRequest(diversionUrl, subUrl, 'GET', null, auth)
  return resp
}

const sendPut = async function (diversionUrl: string, subUrl: string, body: object | null, auth: string | null) {
  const resp = await sendRequest(diversionUrl, subUrl, 'PUT', body, auth)
  return resp
}

const sendPost = async function (diversionUrl: string, subUrl: string, body: object | null, auth: string | null) {
  const resp = await sendRequest(diversionUrl, subUrl, 'POST', body, auth)
  return resp
}

export { sendGet, sendPost, sendPut }

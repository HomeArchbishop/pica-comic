import Header from './header'
import fetch from 'node-fetch'
import chinesize from './util/chinesize'

type method = 'POST' | 'GET' | 'PUT'

// const defultUrl: string = 'http://104.22.64.159/'

// returns parsed json
const sendRequest = async function (diversionUrl: string, subUrl: string, method: method,
  body: object | null, auth: string | null, excludeStatus: number[]) {

  const header = new Header(subUrl, method, auth)
  const url = diversionUrl + subUrl
  console.log(url)

  const resp = await fetch(url, {
    headers: header.headers,
    method,
    body: method === 'POST' ? JSON.stringify(body || {}) : undefined,
  })

  if (resp.status !== 200 && !excludeStatus.includes(resp.status)) {
    const errJson = {
      errType: 'apiProxy',
      errApiUrl: url,
      errObj: await chinesize(await resp.json(), resp.status)
    }
    const errStr = JSON.stringify(errJson)
    throw new Error(errStr)
  }

  const respData = await resp.json()
  return respData
}

const sendGet = async function (diversionUrl: string, subUrl: string,
  auth: string | null, excludeStatus: number[] = []) {
  const resp = await sendRequest(diversionUrl, subUrl, 'GET', null, auth, excludeStatus)
  return resp
}

const sendPut = async function (diversionUrl: string, subUrl: string,
  body: object | null, auth: string | null, excludeStatus: number[] = []) {
  const resp = await sendRequest(diversionUrl, subUrl, 'PUT', body, auth, excludeStatus)
  return resp
}

const sendPost = async function (diversionUrl: string, subUrl: string,
  body: object | null, auth: string | null, excludeStatus: number[] = []) {
  const resp = await sendRequest(diversionUrl, subUrl, 'POST', body, auth, excludeStatus)
  return resp
}

export { sendGet, sendPost, sendPut }

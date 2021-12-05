import Header from './header'

// const defultUrl = 'http://104.22.64.159/'

// returns parsed json
const sendRequest = async function (diversionUrl, subUrl, method,
  body, auth, excludeStatus) {
  const header = new Header(subUrl, method, auth)
  const url = diversionUrl + subUrl
  console.log(method, url)
  // console.log(token, auth)

  const fetchOption = {
    headers: header.headers,
    method,
    [method === 'POST' && 'body']: JSON.stringify(body || {})
  }
  const resp = await fetch(url, fetchOption)

  if (resp.status !== 200 && !excludeStatus.includes(resp.status)) {
    const errJson = {
      errType: 'apiProxy',
      errApiUrl: url,
      errObj: await resp.json()
    }
    const errStr = JSON.stringify(errJson)
    throw new Error(errStr)
  }

  const respData = await resp.json()
  return respData
}

const sendGet = async function (diversionUrl, subUrl,
  auth, excludeStatus = []) {
  const resp = await sendRequest(diversionUrl, subUrl, 'GET', null, auth, excludeStatus)
  return resp
}

const sendPut = async function (diversionUrl, subUrl,
  body, auth, excludeStatus = []) {
  const resp = await sendRequest(diversionUrl, subUrl, 'PUT', body, auth, excludeStatus)
  return resp
}

const sendPost = async function (diversionUrl, subUrl,
  body, auth, excludeStatus = []) {
  const resp = await sendRequest(diversionUrl, subUrl, 'POST', body, auth, excludeStatus)
  return resp
}

export { sendGet, sendPost, sendPut }

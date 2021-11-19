export const config = config => {
  if (config.method === 'post') {
    const diversionUrl = JSON.parse(localStorage.diversionUrlList || '[]')[+localStorage.diversionIndex] ||
      'http://104.20.180.50/'
    config.data = {
      ...config.data,
      diversionUrl
    }
  } else if (config.method === 'get') {
    const diversionUrl = JSON.parse(localStorage.diversionUrlList || '[]')[+localStorage.diversionIndex] ||
      'http://104.20.180.50/'
    console.log('get', diversionUrl)
    config.params = {
      ...config.params,
      diversionUrl
    }
  }
  return config
}

export const error = err => {
  return Promise.reject(err)
}

import dialog from '../../assets/js/dialog'

export const response = response => {
  return Promise.resolve(response)
}

export const error = err => {
  const resp = err.response
  // pica server error, not localhost.
  if (resp) {
    console.log('ERROR', resp)
    dialog({
      title: `错误：${resp.status}`,
      content: resp.data.chineseDetail
    })
  }
  return Promise.reject(err)
}

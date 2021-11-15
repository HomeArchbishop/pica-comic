import axios from "axios"

(async function () {
  axios.interceptors.response.use(
    response => {
      return Promise.resolve(response)
    },
    err => {
      const resp = err.response
      console.log('errp:', resp.data)
      return Promise.resolve({ ...resp })
    }
  )
  const url = 'http://localhost:1210/api/appList?diversionUrl=http://104.20.180.50/&tt=H24&token=1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWE4MzJhNDgxODJiNzU5NmI0NTQ2ZTUiLCJlbWFpbCI6ImhvbWVhY2hiaXNob3AiLCJyb2xlIjoibWVtYmVyIiwibmFtZSI6IuaLhuWutuWkp-S4u-aVmSIsInZlcnNpb24iOiIyLjIuMS4zLjMuNCIsImJ1aWxkVmVyc2lvbiI6IjQ1IiwicGxhdGZvcm0iOiJhbmRyb2lkIiwiaWF0IjoxNjM2NDY2MzU4LCJleHAiOjE2MzcwNzExNTh9.gNAXvY7ltd3ETxisSSDujDQq7n29l2OrY4JpOMUmqQw&gameId=611f6911fafd521cfec9f0cf&page=1'
  const res = (await axios.get(url)).data
  console.log(res)
})()
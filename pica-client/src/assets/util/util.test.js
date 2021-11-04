import util from './util'

const timeList = [
  '2021-8-16T04:10:10.947Z',
  '2021-10-14T04:10:10.947Z',
  '2021-10-15T04:10:10.947Z',
  '2021-10-16T04:10:10.947Z',
  '2021-10-16T08:50:10.947Z',
  '2021-10-16T09:05:20.947Z'
]

timeList.forEach((item) => {
  const res = util.formatTime(item)
  console.log(res)
})

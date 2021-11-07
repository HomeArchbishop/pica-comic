import serverConfig from '../../../../pica-server/config/default.json'

export default {
  formatImgUrl: function (fileServer = '', path = '') {
    return fileServer.slice(0, 1) === '@'
      ? `//localhost:${serverConfig.port}/static/${path}`
      : `https://storage1.picacomic.com/static/${path}`
    /*
    if (!fileServer || !path) {
      return null
    }
    if (fileServer.slice(-7) === 'static/') {
      return `${fileServer}${path}`
    }
    if (fileServer.slice(-7) === 'static') {
      return `${fileServer}/${path}`
    }
    return `${fileServer}/static/${path}`
    */
  },
  formatTime: function (timeStr = '') {
    // timeStr: 2021-10-16T04:10:10.947Z
    if (!timeStr) {
      return ''
    }
    const padNumToString = num => String(num).padStart(2, '0')
    const nowTime = new Date()
    const formerTime = new Date(timeStr)
    const ref = {
      formerYear: formerTime.getFullYear(),
      formerMonth: formerTime.getMonth(),
      formerDate: formerTime.getDate(),
      formerHour: formerTime.getHours(),
      formerMinute: formerTime.getMinutes(),
      formerSecond: formerTime.getSeconds(),
      nowYear: nowTime.getFullYear(),
      nowMonth: nowTime.getMonth(),
      nowDate: nowTime.getDate(),
      nowHour: nowTime.getHours(),
      nowMinute: nowTime.getMinutes(),
      nowSecond: nowTime.getSeconds(),
      dateDiffer: (function () {
        const todayTimeLeft = 3600 * (24 - 8) * 1000 - nowTime.getTime() % (3600 * 24 * 1000)
        return ~~((nowTime.getTime() - formerTime.getTime() + todayTimeLeft) / (24 * 3600 * 1000))
      })(),
      minuteDiffer: ~~((nowTime.getTime() - formerTime.getTime()) / (60 * 1000))
    }
    // >3天: 2021年08月10日 x:x
    if (ref.dateDiffer > 3) {
      return `${ref.formerYear}年${ref.formerMonth}月${ref.formerDate}日 ${padNumToString(ref.formerHour)}:${padNumToString(ref.formerMinute)}`
    } else { // 0<=x<=3天: 今天 | 昨天 | 前天
      if (!ref.dateDiffer && ref.minuteDiffer < 60) {
        // < 1min: 刚刚
        if (!ref.minuteDiffer) {
          return `刚刚`
        }
        // 1min<x<60min: 59分钟前
        return `${ref.minuteDiffer}分钟前`
      }
      // >= 60min: 今天19:23
      const dayRef = ['今天', '昨天', '前天']
      console.log(ref.dateDiffer)
      return `${dayRef[ref.dateDiffer]} ${padNumToString(ref.formerHour)}:${padNumToString(ref.formerMinute)}`
    }
  },
  regTime: function (timeStr) {
    return `${timeStr.slice(0, 10).replace(/-/, '年').replace(/-/, '月')}日`
  },
  dateDiffer: function (timeStr) {
    const nowTime = new Date()
    const formerTime = new Date(timeStr)
    const todayTimeLeft = 3600 * (24 - 8) * 1000 - nowTime.getTime() % (3600 * 24 * 1000)
    return ~~((nowTime.getTime() - formerTime.getTime() + todayTimeLeft) / (24 * 3600 * 1000))
  },
  transferOutURL: function (url = 'undifined') {
    return url
      .replace(/%/g, '%25')
      .replace(/\//g, '%2F')
      .replace(/\?/g, '%3F')
      .replace(/#/g, '%23')
      .replace(/&/g, '%26')
      .replace(/=/g, '%3D')
      .replace(/!/g, '%21')
  }
}

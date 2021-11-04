export default function historyState ({ to, from }) {
  console.log('meta', to.meta.keepAlive)
  to.meta.isFirstReq = !to.meta.lastHistoryFullPath
  to.meta.isSamePath = to.meta.lastHistoryFullPath === to.fullPath
  to.meta.lastHistoryFullPath = to.fullPath
}

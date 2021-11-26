import { checkConnect } from '../../api/index'
import dialog from '../../assets/js/dialog'

export default async function checkConnection ({ to }) {
  if (to.meta.connectExclude) { return }
  checkConnect()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      dialog({
        title: '代理服务器发生错误。',
        content: '请检查代理服务器是否运行。'
      })
    })
}

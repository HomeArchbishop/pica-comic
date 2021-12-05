import { checkToken as checkTokenWeb } from '../../api/index'
import { checkToken as checkTokenElectron } from '../../api/api-electron'

const checkToken = process.env.ELECTRON
  ? checkTokenElectron : checkTokenWeb

export default function auth ({ to, next }) {
  if (to.meta.authExclude) {
    return next()
  }
  if (!localStorage.token) {
    return next({ name: 'LoginView' })
  }
  checkToken(localStorage.token)
    .then(res => {
      next(res || { name: 'LoginView' })
    })
}

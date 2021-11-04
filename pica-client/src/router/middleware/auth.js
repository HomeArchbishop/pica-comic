import { checkToken } from '../../api/index'

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

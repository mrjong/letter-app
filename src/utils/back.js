import store from '../redux/store'
import { handleModalShow } from '../redux/common.redux'

const interceptRouteArr = ['/home', '/mails', '/friends', '/user']

export const changeHistoryState = () => {
  if (interceptRouteArr.includes(window.location.pathname)) {
    window.history.pushState(null, null, document.URL)
  }
}
window.addEventListener('popstate', () => {
  changeHistoryState()
  switch (window.location.pathname) {
    case '/home':
    case '/mails':
    case '/friends':
      store.dispatch(
        handleModalShow({
          type: 'logout'
        })
      )
      break
    case '/user':
      store.dispatch(
        handleModalShow({
          type: 'editSave'
        })
      )
      break
    default:
      break
  }
  console.log('back.js')
})

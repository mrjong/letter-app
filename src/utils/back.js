import store from '../redux/store'
import { handleModalShow } from '../redux/common.redux'

const interceptRouteArr = [
  '/home',
  '/mails',
  '/friends',
  '/user',
  '/write_letter',
  // '/outbox',
  // '/inbox',
  // '/post_confirm',
  // '/follow_list',
  // '/draftbox'
]

export const changeHistoryState = () => {
  if (interceptRouteArr.includes(window.location.pathname)) {
    window.history.pushState(null, null, document.URL)
  }
}
window.addEventListener('popstate', () => {
  switch (window.location.pathname) {
    case '/home':
    case '/mails':
    case '/friends':
    case '/user':
      // store.dispatch(
      //   handleModalShow({
      //     type: 'logout'
      //   })
      // )
      break
    case '/write_letter':
      store.dispatch(
        handleModalShow({
          type: 'editSave'
        })
      )
      break
    case '/outbox':
    case '/inbox':
    case '/post_confirm':
    case '/follow_list':
    case '/draftbox':
      // window.ReactRouterHistory.push('/home')
      break
    default:
      break
  }
})

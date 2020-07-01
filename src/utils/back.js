import store from '../redux/store'
import { handleModalShow } from '../redux/common.redux'

const interceptRouteArr = ['/home', '/mails', '/friends', '/user', '/write_letter']

export const changeHistoryState = () => {
  if (interceptRouteArr.includes(window.location.pathname)) {
    window.history.pushState(null, null, document.URL)
  }
}
window.addEventListener('popstate', () => {
  /**首页拦截 */
  if (window.location.pathname === '/home') {
    console.log(666)
    // window.history.pushState(null, null, document.URL);
    return;
  }
  changeHistoryState()
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
    default:
      break
  }
})

import { combineReducers } from 'redux'
import { user } from './user.redux'
import { login } from './login.redux'
import { mail } from './mail.redux'
import { common } from './common.redux'

export default combineReducers({
  user,
  login,
  mail,
  common
})

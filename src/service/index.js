import * as login from './login'
import * as user from './user'
import * as mail from './mail'

export default {
  ...login,
  ...user,
  ...mail
}

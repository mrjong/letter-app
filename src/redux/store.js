import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './index'

let store
//使用redux调试插件
if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}

export default store
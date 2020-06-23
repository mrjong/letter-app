import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import App from './views/App'
import rootReducer from './redux'
import './assets/libs/base.less'
import './setupProxy'

let store
//使用redux调试插件
if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

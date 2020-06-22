import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import App from './views/App'
import rootReducer from './redux'

//使用redux调试插件
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => {}
const store = createStore(rootReducer, compose(applyMiddleware(thunk), reduxDevtools))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

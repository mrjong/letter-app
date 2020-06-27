import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './views/App'
import './utils/back'
import './assets/styles/index.less';
import './assets/libs/flexible.min'
import './setupProxy'



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

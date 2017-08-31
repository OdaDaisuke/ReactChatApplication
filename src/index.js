import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import configureStoreWithMiddleware from "./store/configureStore"

let state = window.__initialState__
const store = configureStoreWithMiddleware(browserHistory, state)

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('root')
)

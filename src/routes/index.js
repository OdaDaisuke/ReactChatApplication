import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../containers/App'
import ChatContainer from "../containers/ChatContainer"

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={ChatContainer} />
    <Route path="chat" component={ChatContainer} />
  </Route>
)

export default routes

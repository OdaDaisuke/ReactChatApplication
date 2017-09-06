import { combineReducers } from 'redux'
import routerReducer from "react-router-redux"
import chatReducer from "./chat"

const rootReducer = combineReducers({
  chatReducer,
  routing: routerReducer,
})

export default rootReducer

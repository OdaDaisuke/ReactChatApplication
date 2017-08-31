import { combineReducers } from 'redux'
import routerReducer from "react-router-redux"
import chat from "./chat"

const rootReducer = combineReducers({
  chat,
  routing: routerReducer,
})

export default rootReducer

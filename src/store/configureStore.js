import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import { routerMiddleware } from 'react-router-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()

export default function createStoreWithMiddleware(history, initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(
        thunkMiddleware, //dispatch()が複数できるようになる
        loggerMiddleware, // 色々デバッグができるようになる
        routerMiddleware(history)
      )
    )
  )
  return store

}

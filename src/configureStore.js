import reducersObject from './reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { registerSimplerRedux } from 'simpler-redux'
import thunkMiddleware from 'redux-thunk'

let store

// Keep the same redux store during a hot reload
if (module.hot) {
  if (typeof module.hot.data !== 'undefined' && typeof module.hot.data.store !== 'undefined') {
    store = module.hot.data.store
  }
  // Save the store before unloading this module into module.hot.data.store
  module.hot.dispose(data => {
    data.store = store
  })
}

if (typeof store === 'undefined') {
  store = registerSimplerRedux(
    createStore(
      combineReducers(reducersObject),
      undefined,
      applyMiddleware(
        thunkMiddleware
      )
    ),
    reducersObject
  )
}

export default store

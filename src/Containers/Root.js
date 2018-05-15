import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import { register } from 'simpler-redux'

const store = configureStore()
register(store)

const Root = () =>
  <Provider store={store}>
    <AsyncApp />
  </Provider>

export default Root

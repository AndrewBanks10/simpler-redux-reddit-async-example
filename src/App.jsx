import React from 'react'
import { Provider } from 'react-redux'
import simplerReduxStore from './configureStore'
import AsyncDemo from './reduxreddit'
import { BrowserRouter } from 'react-router-dom'

const App = () =>
  <Provider store={simplerReduxStore}>
    <BrowserRouter>
      <AsyncDemo />
    </BrowserRouter>
  </Provider>

export default App

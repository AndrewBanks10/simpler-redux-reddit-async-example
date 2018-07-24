import React from 'react'
import { Provider } from 'react-redux'
import simplerReduxStore from './configureStore'
import StateMonitor from './StateMonitor'
import AsyncDemo from './reduxreddit'
import { BrowserRouter } from 'react-router-dom'

const App = () =>
  <Provider store={simplerReduxStore}>
    <BrowserRouter>
      <React.Fragment>
        <AsyncDemo />
        <StateMonitor />
      </React.Fragment>
    </BrowserRouter>
  </Provider>

export default App

import React from 'react'
import { Provider } from 'react-redux'
import simplerReduxStore from './configureStore'
import RedditDemo from './reduxreddit'
import StateMonitor from './StateMonitor'

const App = () =>
  <Provider store={simplerReduxStore}>
    <div>
      <StateMonitor />
      <RedditDemo />
    </div>
  </Provider>

export default App

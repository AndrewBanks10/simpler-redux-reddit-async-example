import React from 'react'
import { Provider } from 'react-redux'
import simplerReduxStore from './configureStore'
import RedditDemo from './reduxreddit'

const App = () =>
  <Provider store={simplerReduxStore}>
    <RedditDemo />
  </Provider>

export default App

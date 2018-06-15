import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'

//
// The below is the necessary technique to utilize hot re-loading of react.
//
const renderRoot = TheApp => {
  render(
    <TheApp />,
    document.getElementById('root')
  )
}

// First module render.
renderRoot(App)

//
// Hot reload support for react. If any of the react components change this will
// hot reload all changed components and then re-render the root
//
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    // The below requires the location of App or whatever is used for the root component
    // The require('./bootstrap/index-common') brings in a new copy of the App module.
    // react will handle keeping the props and state the same after the load.
    renderRoot(require('./App.jsx').default)
  })
}

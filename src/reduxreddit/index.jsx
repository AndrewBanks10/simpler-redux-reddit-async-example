
import React from 'react'
import { Route, Link } from 'react-router-dom'
import SimplerReduxSample from './simpler-redux'
import ReduxSample from './redux/containers/AsyncApp'

const homePath = '/'
const reduxPath = '/redux'

export default () =>
  <React.Fragment>
    <Link style={{ paddingRight: '10px' }} to={homePath}>Simpler-redux</Link>
    <Link to={reduxPath}>Redux</Link>
    <Route exact path={homePath} component={SimplerReduxSample} />
    <Route path={reduxPath} component={ReduxSample} />`
  </React.Fragment>

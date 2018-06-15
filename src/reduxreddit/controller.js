import { connectWithStore } from 'simpler-redux'
import Component from './view'
import { serviceFunctions, selectors } from './model'

export default connectWithStore({
  uiComponent: Component,
  selectors,
  serviceFunctions
})

import { connectLifeCycleComponentWithStore } from 'simpler-redux'
import Component from './view/AsyncApp'
import { serviceFunctions, selectors, storeIsDefinedCallback } from './model'

export default connectLifeCycleComponentWithStore({
  uiComponent: Component,
  selectors,
  serviceFunctions,
  storeIsDefinedCallback,
  usingStateAccessors: true
})

import { connectLifeCycleComponentWithStore } from 'simpler-redux'
import Component from './view/AsyncApp'
import { serviceFunctions, storeIsDefinedCallback, reducerKey, initialUIState } from './model'

export default connectLifeCycleComponentWithStore({
  uiComponent: Component,
  reducerKey,
  initialUIState,
  serviceFunctions,
  storeIsDefinedCallback,
  noStoreParameterOnServiceFunctions: true
})

// Controller
import { connectLifeCycleComponentWithStore, generalReducer } from 'simpler-redux'
import uiComponent from './view/AsyncApp'
import * as modelDefinition from './model'

export default connectLifeCycleComponentWithStore({ uiComponent, ...modelDefinition })
// reducerKey and reducer must be included in your global reducers object. So, you do not have to write a reducer.
export const reducerKey = modelDefinition.reducerKey
export const reducer = generalReducer(reducerKey, modelDefinition.initialState)

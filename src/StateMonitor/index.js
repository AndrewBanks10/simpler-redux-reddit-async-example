// Controller
import { connectWithStore, generalReducer } from 'simpler-redux'
import uiComponent from './view/view'
import * as modelDefinition from './model/model'

export default connectWithStore({ uiComponent, ...modelDefinition })
export const reducerKey = modelDefinition.reducerKey
export const reducer = generalReducer(reducerKey, modelDefinition.initialState)

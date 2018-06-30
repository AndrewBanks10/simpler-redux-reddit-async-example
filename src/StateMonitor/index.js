// Controller
/* Uncomment if you are not using dynamic reducer loading
import { connectWithStore, generalReducer } from 'simpler-redux'
*/
import { connectWithStore } from 'simpler-redux'
import uiComponent from './view/view'
import * as modelDefinition from './model/model'

export default connectWithStore({ uiComponent, ...modelDefinition })

/* If you are not using dynamic reducer loading then uncomment the below and install
   them in your global reducers object.
export const reducerKey = modelDefinition.reducerKey
export const reducer = generalReducer(modelDefinition.reducerKey, modelDefinition.initialState)
*/

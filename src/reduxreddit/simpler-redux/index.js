// Controller
import { connectWithStore } from 'simpler-redux'
import uiComponent from './view/AsyncApp'
import * as modelDefinition from './model'

export default connectWithStore({ uiComponent, ...modelDefinition })

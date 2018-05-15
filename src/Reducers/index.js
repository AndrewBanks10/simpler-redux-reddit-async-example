
import { generalReducer } from 'simpler-redux'
import { initialState as asyncAppInitialState, reducerKey as asyncAppReducerKey } from '../Actions/AsyncApp'

const reducersObject = {
  [asyncAppReducerKey]: generalReducer(asyncAppReducerKey, asyncAppInitialState)
}

export default reducersObject

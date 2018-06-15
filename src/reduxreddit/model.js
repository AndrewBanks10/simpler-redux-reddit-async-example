import { generalReducer, buildSelectorsFromUIState } from 'simpler-redux'

export const reducerKey = 'simplerReduxRedditExample'

const simplerRedux = 'Simpler-redux'
const redux = 'Redux'
const initialState = {
  options: [simplerRedux, redux],
  selection: simplerRedux
}

export const selectors = buildSelectorsFromUIState(reducerKey, initialState)

export const serviceFunctions = {
  onChange: (store, val) => store.setRState(reducerKey, {selection: val})
}

export const reducer = generalReducer(reducerKey, initialState)

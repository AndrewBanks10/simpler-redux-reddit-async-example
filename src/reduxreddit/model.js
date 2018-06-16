export const reducerKey = 'simplerReduxRedditExample'

const simplerRedux = 'Simpler-redux'
const redux = 'Redux'
export const initialUIState = {
  options: [simplerRedux, redux],
  selection: simplerRedux
}

export const initialState = initialUIState

export const serviceFunctions = {
  onChange: (store, val) => store.setRState(reducerKey, {selection: val})
}

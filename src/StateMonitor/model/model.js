import getStackTrace from './callstack'

export const reducerKey = '@@@@stateMonitor'

export const initialUIState = {
  states: [],
  displayMonitor: true, // Set this to false to turn off the monitor. Production code is automatically off.
  displayModule: false,
  isMinimized: false,
  clipBoard: '',
  selectedState: {},
  objOpenStates: []
}

export const initialState = initialUIState

const MAXOBJSTRING = 23
function toString (e) {
  let str = e.toString()
  if (str.length <= MAXOBJSTRING) {
    return str
  }
  str = str.slice(0, MAXOBJSTRING - 3) + '...'
  return str
}

let reducerState
let setState

const listener = (changedReducerKey, objToMerge, type) => {
  if (changedReducerKey === reducerKey) {
    return
  }
  const stack = getStackTrace()
  const states = [...reducerState.states]
  let strObj = ''
  Object.keys(objToMerge).forEach(key => {
    if (strObj !== '') {
      strObj += ', '
    }
    strObj += `${key}: ${toString(objToMerge[key])}`
  })
  if (strObj !== '') {
    strObj = `${changedReducerKey}: {${strObj}}`
  }
  states.push({ reducerKey: changedReducerKey, objToMerge, type, stack, strObj })
  reducerState.states = states
}

export const storeIsDefinedCallback = (store, stateAccessors) => {
  ({ reducerState, setState } = stateAccessors(store, reducerKey, initialState))
  if (process.env.NODE_ENV !== 'production' && reducerState.displayMonitor) {
    store.addListener(listener)
  }
}

export const serviceFunctions = {
  exit: () => (reducerState.displayMonitor = false),
  minimize: () => (reducerState.isMinimized = true),
  maximize: () => (reducerState.isMinimized = false),
  clickedState: (_store, index) => {
    const state = reducerState.states[index]
    const tos = state.stack.length - 1
    let selectedState = {
      reducerKey: state.reducerKey,
      moduleName: state.stack[tos].moduleName,
      line: state.stack[tos].line,
      objToMerge: state.objToMerge
    }
    setState({
      selectedState,
      displayModule: true,
      objOpenStates: Object.keys(state.objToMerge).map(e => false),
      clipBoard: JSON.stringify({ file: state.stack[tos].moduleName, line: state.stack[tos].line, stack: state.stack })
    })
  },
  closeDisplayModule: () => (reducerState.displayModule = false),
  toggleObjOpenState: (_store, index) => {
    const objOpenStates = [...reducerState.objOpenStates]
    objOpenStates[index] = !objOpenStates[index]
    reducerState.objOpenStates = objOpenStates
  }
}

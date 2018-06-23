import getStackTrace from './callstack'

const hmrInvalid = 'Unknown'

export const reducerKey = '@@@@stateMonitor'

export const initialUIState = {
  displayMonitor: true, // Set this to false to turn off the monitor. Production code is automatically off.
  displayModule: false,
  isMinimized: false,
  clipBoard: '',
  selectedState: {},
  states: [],
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
  // If a state change results from this module ignore it.
  if (changedReducerKey === reducerKey) {
    return
  }
  objToMerge = { ...objToMerge }
  // Get the stack trace associated with the consumer code state change.
  const stack = getStackTrace()
  // Construct a friendly string for the state change object.
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
  // redux state change with an array.
  let states = [...reducerState.states]
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
      clipBoard: JSON.stringify({
        file: state.stack[tos].moduleName,
        line: state.stack[tos].line,
        stack: state.stack
      })
    })
  },
  closeDisplayModule: () => (reducerState.displayModule = false),
  toggleObjOpenState: (_store, index) => {
    const objOpenStates = [...reducerState.objOpenStates]
    objOpenStates[index] = !objOpenStates[index]
    reducerState.objOpenStates = objOpenStates
  }
}

//
// HMR support
//

// If a module has been HMR loaded then its source on the stack is invalid.
const handleHMRLoadedModules = changedSourceModules => {
  const allStates = [...reducerState.states]
  const len = allStates.length
  for (let i = 0; i < len; ++i) {
    if (allStates[i].stack !== undefined) {
      allStates[i].stack.forEach(stackEntry => {
        if (stackEntry.moduleName && stackEntry.moduleName !== hmrInvalid) {
          if (changedSourceModules.some(e => stackEntry.moduleName === e)) {
            stackEntry.moduleName = hmrInvalid
            stackEntry.line = hmrInvalid
          }
        }
      })
    }
  }
  reducerState.states = allStates
}

if (module.hot) {
  module.hot.decline()
  const webpackHotUpdate = 'webpackHotUpdate'
  const parentHotUpdateCallback = window[webpackHotUpdate]
  // Webpack uses window[webpackHotUpdate] as the function to call on a hmr.
  // So, save that function and replace it with one of our own so we
  // can determine which module source files changed. Then
  // call the webpack function that was saved.
  window[webpackHotUpdate] =
    (chunkId, moreModules) => {
      // Call the webpack hmr handler.
      if (typeof parentHotUpdateCallback === 'function') {
        parentHotUpdateCallback(chunkId, moreModules)
      }
      // Now handle the changed source modules for the monitor.
      handleHMRLoadedModules(Object.keys(moreModules))
    }
}

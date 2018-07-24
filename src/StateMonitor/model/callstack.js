const stackTraceLimit = 30

const addToStack = (stack, obj) => {
  let index = stack.findIndex(e =>
    e.line === obj.line && e.moduleName === obj.moduleName
  )
  if (index === -1) {
    stack.unshift(obj)
  }
}

export default () => {
  const err = new Error()
  Error.stackTraceLimit = stackTraceLimit
  Error.captureStackTrace(err)
  const unKnown = 'Unknown'
  let line = 0
  let column = 0
  let moduleName = unKnown
  let isTS = false
  let fullModule = unKnown
  let caller = unKnown
  let stack = []
  const frames = err.stack.split('\n').slice(1)
  for (let i = 0; i < frames.length; ++i) {
    const index = frames[i].indexOf('setRState')
    if (index !== -1) {
      for (let j = i; j < frames.length; ++j) {
        const search = 'webpack-internal:///'
        let frame = frames[j]
        let nextIndex = frame.indexOf(search)
        if (nextIndex !== -1) {
          nextIndex = frame.indexOf('node_modules')
          if (nextIndex === -1) {
            try {
              const wholeThing = frame.match(/([^]*)\(([^()]+)\)/)
              caller = wholeThing[1].trim()
              frame = wholeThing[2]
              const matchArray = frame.match(/(webpack-internal:[^:]*):([0-9]+):([0-9]+)$/)
              fullModule = matchArray[1]
              moduleName = fullModule.match(/webpack-internal:\/\/\/([^]*)$/)[1]
              isTS = moduleName.search(/\.tsx?$/) !== -1
              line = parseInt(matchArray[2])
              column = parseInt(matchArray[3])
            } catch (e) { }
            addToStack(stack, { moduleName, line, column, isTS, fullModule, caller, translated: !isTS })
          }
        }
      }
      return stack
    }
  }
  return [{moduleName, line, column, isTS, fullModule, caller, translated: true}]
}

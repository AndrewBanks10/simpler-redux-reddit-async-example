import { generalReducer, stateAccessors } from 'simpler-redux'

export const reducerKey = 'simplerReduxReddit'

//
// Simpler-redux will build a mapStateToProps function directly from this declarative object.
// If you need a selectors object used instead then simpler-redux will build a mapStateToProps
// function from that selectors object. Either way, you do not have to write a mapStateToProps function.
//
export const initialUIState = {
  posts: [],
  selectedSubreddit: 'reactjs',
  isFetching: false,
  lastUpdated: new Date()
}

//
// Note that we do not allow 'cache' to be in the props of the react component
// because if is defined here instead of initialUIState.
//
const initialState = {
  ...initialUIState,
  cache: {}
}

//
// If you need to provide access to state in the module to other modules then define an
// externalSelectors object for that access.
//

//
// reducerState is proxy that wraps the simpler-redux store. This allows simple syntatic sugar
// access to the redux state at the reducerKey.
// For example, reducerState.isFetching translates to a redux store.getState()[reducerKey][isFetching].
// reducerState.isFetching = true translates to a redux state transition at reduxState[reducerKey][isFetching]
//
let setState, reducerState
export const storeIsDefinedCallback = store =>
  ({setState, reducerState} = stateAccessors(store, reducerKey, initialState))

//
// This is from the redux code.
//
const fetchPosts = selectedSubreddit => {
  // Note how simple it is to change the redux state according to the redux rules if only one change is needed.
  reducerState.isFetching = true
  fetch(`https://www.reddit.com/r/${selectedSubreddit}.json`)
    .then(response => response.json())
    .then(json => {
      const received = Date.now()
      const posts = json.data.children.map(child => child.data)
      let cache = { ...reducerState.cache }
      cache[selectedSubreddit] = { posts, received }
      // Make multiple state changes using setState. This will cause only one render of the
      // the react component.
      // For example, reducerState.isFetching = true followed by reducerState.cache = cache
      // will cause the react component to render twice.
      setState({ cache, isFetching: false, selectedSubreddit, posts, lastUpdated: received })
    })
}

// Handles the cache.
const handleChangeSubreddit = selectedSubreddit => {
  const cacheEntry = reducerState.cache[selectedSubreddit]
  if (cacheEntry) {
    setState({ selectedSubreddit, posts: cacheEntry.posts, lastUpdated: cacheEntry.received })
  } else {
    fetchPosts(selectedSubreddit)
  }
}

//
// The debugging and testing for react-redux occurs all over the place.
// However for simpler-redux, all the debugging and testing occurs in this object.
// It is the core of simpler-redux. That is because everything else is declarative and
// all side effects occur as a result of the functions below.
// Note that we also handle the react lifecycle events below. So, you do not need a class
// for the react component just a plain dumb functional component.
// This also allows you to test in isolation the functions in this object without requiring
// a react UI.
// Simpler-redux builds a mapDispatchToProps using this object. So, with the exception
// of react lifecycle event keys, which are handled in a specialized HOC, the other keys
// will automatically be in the props of the react component.
// So, you do not have to write a mapDispatchToProps function.
// If you need service functions for outside modules but do not want them included in the props
// then use an externalServiceFunctions object for those functions. This might be needed
// for a websocket app for example.
//
export const serviceFunctions = {
  handleChangeSubreddit: selectedSubreddit => handleChangeSubreddit(selectedSubreddit),
  handleRefreshList: () => fetchPosts(reducerState.selectedSubreddit),
  // React lifecycle events are handled here in the business code away from the UI. This
  // supports the separation of concerns.
  componentDidMount: () => handleChangeSubreddit(reducerState.selectedSubreddit)
}

// This is to be included in your global reducers object. So, you do not have to write a reducer.
export const reducer = generalReducer(reducerKey, initialState)

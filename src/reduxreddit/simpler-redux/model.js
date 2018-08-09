export const reducerKey = 'simplerReduxReddit'

// This object is the subset of keys from the reducer state that will be inserted into
// the props of the component. So, state to props is declarative.
export const initialUIState = {
  posts: [],
  selectedSubreddit: 'reactjs',
  isFetching: false,
  lastUpdated: new Date()
}

// This object is how to define the state shape at the reducerKey.
export const initialState = {
  ...initialUIState,
  cache: {}
}

// This is called in the constructor of the react component.
let setState, reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
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
      setState({ cache, isFetching: false, selectedSubreddit, posts, lastUpdated: received })
    }).catch(() => (reducerState.isFetching = false))
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

// All functions here will be automatically inserted into the props of the react component.
// The react life cycle events like componentDidMount below will not be in the props but
// will be automatically called when the particular react life cycle event is triggered
// in the react component. So you can handle these events here rather than in the react UI code.
export const serviceFunctions = {
  handleChangeSubreddit: (_store, selectedSubreddit) => handleChangeSubreddit(selectedSubreddit),
  handleRefreshList: () => fetchPosts(reducerState.selectedSubreddit),
  componentDidMount: () => handleChangeSubreddit(reducerState.selectedSubreddit)
}

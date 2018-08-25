export const reducerKey = 'simplerReduxReddit'

export const initialUIState = {
  posts: [],
  selectedSubreddit: 'reactjs',
  isFetching: false,
  lastUpdated: new Date()
}

export const initialState = {
  ...initialUIState,
  cache: {}
}

let setState, reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({setState, reducerState} = stateAccessors(store, reducerKey, initialState))

const fetchPosts = selectedSubreddit => {
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

const handleChangeSubreddit = selectedSubreddit => {
  const cacheEntry = reducerState.cache[selectedSubreddit]
  if (cacheEntry) {
    setState({ selectedSubreddit, posts: cacheEntry.posts, lastUpdated: cacheEntry.received })
  } else {
    fetchPosts(selectedSubreddit)
  }
}

export const serviceFunctions = {
  handleChangeSubreddit: (_store, selectedSubreddit) => handleChangeSubreddit(selectedSubreddit),
  handleRefreshList: () => fetchPosts(reducerState.selectedSubreddit),
  componentDidMount: () => handleChangeSubreddit(reducerState.selectedSubreddit)
}

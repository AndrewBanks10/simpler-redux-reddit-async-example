import { generalReducer, stateAccessors, buildSelectorsFromUIState } from 'simpler-redux'

export const reducerKey = 'simplerReduxReddit'

const initialUIState = {
  posts: [],
  selectedSubreddit: 'reactjs',
  isFetching: false,
  lastUpdated: new Date()
}

const initialState = {
  ...initialUIState,
  cache: {}
}

let setState, reducerState
export const storeIsDefinedCallback = store =>
  ({setState, reducerState} = stateAccessors(store, reducerKey, initialState))

export const selectors = buildSelectorsFromUIState(reducerKey, initialUIState)

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
    })
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
  handleChangeSubreddit: selectedSubreddit => handleChangeSubreddit(selectedSubreddit),
  handleRefreshList: () => fetchPosts(reducerState.selectedSubreddit),
  componentDidMount: () => handleChangeSubreddit(reducerState.selectedSubreddit)
}

export const reducer = generalReducer(reducerKey, initialState)

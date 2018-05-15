import fetch from 'isomorphic-fetch'
import { setState, getState } from 'simpler-redux'

export const reducerKey = 'AsyncApp'

export const initialState = {
  subreddit: 'reactjs'
}

export const selectSubreddit = subreddit =>
  setState(reducerKey, {subreddit}, 'selectSubreddit')

export const invalidateSubreddit = subreddit => {
  setState(
    reducerKey,
    {
      [subreddit]: Object.assign({}, getState(reducerKey)[subreddit], {
        didInvalidate: true
      })
    },
    'invalidateSubreddit'
  )
}

const requestPosts = subreddit => {
  setState(
    reducerKey,
    {
      [subreddit]: Object.assign({}, getState(reducerKey)[subreddit], {
        isFetching: true,
        didInvalidate: false
      })
    },
    'requestPosts'
  )
}

const receivePosts = (subreddit, json) => {
  setState(
    reducerKey,
    {
      subreddit,
      [subreddit]: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: Date.now(),
        items: json.data.children.map(child => child.data)
      }
    },
    'receivePosts'
  )
}

const fetchPosts = subreddit => {
  requestPosts(subreddit)
  fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => receivePosts(subreddit, json))
    .catch(function (reason) {
    })
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state[subreddit]
  if (typeof posts === 'undefined') {
    return true
  } else if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export const fetchPostsIfNeeded = subreddit => {
  if (shouldFetchPosts(getState(reducerKey), subreddit)) {
    fetchPosts(subreddit)
  }
}

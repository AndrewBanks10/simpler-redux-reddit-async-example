import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  reducerKey
} from '../Actions/AsyncApp'
import AsyncApp from '../Views/AsyncApp'

AsyncApp.propTypes = {
  subreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
}

const mapStateToProps = state => {
  const AsyncApp = state[reducerKey]
  const sub = AsyncApp[AsyncApp.subreddit]
  if (typeof sub === 'undefined') {
    return {
      subreddit: AsyncApp.subreddit,
      isFetching: true,
      items: []
    }
  }
  const items = typeof sub.items !== 'undefined' ? sub.items : []
  return {
    subreddit: AsyncApp.subreddit,
    items,
    isFetching: sub.isFetching,
    lastUpdated: sub.lastUpdated
  }
}

const mapDispatchToProps = () => {
  return {
    fetchPostsIfNeeded: subreddit => {
      fetchPostsIfNeeded(subreddit)
    },
    invalidateSubreddit: subreddit => {
      invalidateSubreddit(subreddit)
    },
    selectSubreddit: subreddit => {
      selectSubreddit(subreddit)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp)

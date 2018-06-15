import { reducerKey as reduxredditReducerKey, reducer as reduxredditReducer } from './reduxreddit/simpler-redux'
import { postsBySubreddit, selectedSubreddit } from './reduxreddit/redux/reducers'
import { reducerKey as redditReducerKey, reducer as redditReducer } from './reduxreddit'

export default {
  [redditReducerKey]: redditReducer,
  [reduxredditReducerKey]: reduxredditReducer,
  postsBySubreddit,
  selectedSubreddit
}

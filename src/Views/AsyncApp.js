import React, { Component } from 'react'
import Picker from '../Components/Picker'
import Posts from '../Components/Posts'

export default class AsyncApp extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount () {
    const { fetchPostsIfNeeded, subreddit } = this.props
    fetchPostsIfNeeded(subreddit)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.subreddit !== this.props.subreddit) {
      const { fetchPostsIfNeeded, subreddit } = nextProps
      fetchPostsIfNeeded(subreddit)
    }
  }

  handleChange (nextSubreddit) {
    const { selectSubreddit, fetchPostsIfNeeded } = this.props
    selectSubreddit(nextSubreddit)
    fetchPostsIfNeeded(nextSubreddit)
  }

  handleRefreshClick (e) {
    e.preventDefault()

    const { invalidateSubreddit, fetchPostsIfNeeded, subreddit } = this.props
    invalidateSubreddit(subreddit)
    fetchPostsIfNeeded(subreddit)
  }

  render () {
    const { subreddit, items, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker value={subreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
              onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && items.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && items.length === 0 &&
          <h2>Empty.</h2>
        }
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={items} />
          </div>
        }
      </div>
    )
  }
}

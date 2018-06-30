import React, { Component } from 'react'
import AsyncAppView from '../views/AsyncAppView'
import { connect } from 'react-redux'
import {
  fetchPosts2,
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'

class AsyncApp extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount () {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate (prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange (nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    fetchPosts2(this.props.dispatch, nextSubreddit)
    // this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick (e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render () {
    return <AsyncAppView {...this.props} handleChange={this.handleChange} handleRefreshClick={this.handleRefreshClick} />
  }
}

function mapStateToProps (state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
